import os
import re
import json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
backend = os.path.join(ROOT, '')

# Patterns
struct_pat = re.compile(r"type\s+([A-Za-z_][A-Za-z0-9_]*)\s+struct\s*{")
method_pat = re.compile(r"func\s+\(\s*([^\)]+)\s*\)\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(")
func_pat = re.compile(r"func\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(")
import_block_pat = re.compile(r"import\s*\((.*?)\)", re.S)
import_single_pat = re.compile(r"import\s+\"([^\"]+)\"")

decision_tokens = re.compile(r"\b(if|for|case|switch|select|goto)\b|&&|\|\|")
call_pat = re.compile(r"([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(")

# Helpers to extract function body using brace matching

def extract_functions(src):
    # returns list of (sig_start_idx, sig, body)
    funcs = []
    i = 0
    n = len(src)
    while True:
        m = re.search(r"func\s+(\([^\)]*\)\s*[A-Za-z_][A-Za-z0-9_]*\s*\()", src[i:])
        if not m:
            break
        start = i + m.start()
        # find the opening brace '{' after start
        brace_idx = src.find('{', start)
        if brace_idx == -1:
            i = start + 1
            continue
        # now find matching closing brace
        depth = 0
        j = brace_idx
        while j < n:
            if src[j] == '{':
                depth += 1
            elif src[j] == '}':
                depth -= 1
                if depth == 0:
                    body = src[brace_idx+1:j]
                    sig = src[start:brace_idx].strip()
                    funcs.append((start, sig, body))
                    i = j + 1
                    break
            j += 1
        else:
            break
    return funcs


def analyze():
    data = {
        'files': {},
        'structs': {},
        'metrics': {}
    }

    go_files = []
    for dirpath, _, filenames in os.walk(os.path.join(ROOT)):
        if 'vendor' in dirpath:
            continue
        for fn in filenames:
            if fn.endswith('.go'):
                go_files.append(os.path.join(dirpath, fn))

    # Parse files
    for path in go_files:
        rel = os.path.relpath(path, ROOT)
        with open(path, 'r', encoding='utf-8') as f:
            src = f.read()
        data['files'][rel] = {
            'imports': [],
            'structs': [],
            'methods': []
        }
        # imports
        im = import_block_pat.search(src)
        if im:
            block = im.group(1)
            for line in block.splitlines():
                s = line.strip()
                if s.startswith('"'):
                    data['files'][rel]['imports'].append(s.strip('"'))
        else:
            m2 = import_single_pat.search(src)
            if m2:
                data['files'][rel]['imports'].append(m2.group(1))

        # structs
        for m in struct_pat.finditer(src):
            struct_name = m.group(1)
            # find struct body
            idx = m.end()
            depth = 0
            start = src.find('{', m.start())
            j = start
            n = len(src)
            while j < n:
                if src[j] == '{':
                    depth += 1
                elif src[j] == '}':
                    depth -= 1
                    if depth == 0:
                        body = src[start+1:j]
                        break
                j += 1
            else:
                body = ''
            # extract fields lines
            fields = []
            for line in body.splitlines():
                line = line.strip()
                if line == '':
                    continue
                # anonymous field (embedding) detection: no name before type
                parts = line.split()
                if len(parts) >= 1:
                    # record type-like tokens
                    fields.append(line)
            data['files'][rel]['structs'].append({'name': struct_name, 'fields': fields})
            data['structs'][struct_name] = data['structs'].get(struct_name, {'definitions': [], 'methods': []})
            data['structs'][struct_name]['definitions'].append(rel)

        # functions and methods
        funcs = extract_functions(src)
        for start, sig, body in funcs:
            # detect method receiver
            rm = re.match(r"func\s*\(\s*([^\s)]+)\s+\*?([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*([A-Za-z_][A-Za-z0-9_]*)", sig)
            if rm:
                recv_ident = rm.group(1)
                recv_type = rm.group(2)
                name = rm.group(3)
                kind = 'method'
            else:
                # maybe function
                rf = re.match(r"func\s+([A-Za-z_][A-Za-z0-9_]*)", sig)
                if rf:
                    recv_ident = None
                    recv_type = None
                    name = rf.group(1)
                    kind = 'function'
                else:
                    continue
            # cyclomatic approx
            decisions = len(decision_tokens.findall(body))
            complexity = 1 + decisions
            # calls
            calls = call_pat.findall(body)
            called = ['%s.%s' % (a,b) for (a,b) in calls]
            # store
            entry = {
                'sig': sig.strip(),
                'name': name,
                'kind': kind,
                'receiver_ident': recv_ident,
                'receiver_type': recv_type,
                'cyclomatic': complexity,
                'decisions': decisions,
                'calls': called,
                'fields_accessed': []
            }
            # naive field access: recv_ident.FIELD
            if recv_ident:
                for fline in data['files'][rel]['structs']:
                    pass
                # regex for recv_ident\.([A-Za-z_][A-Za-z0-9_]*)
                pat = re.compile(r"\b%s\.([A-Za-z_][A-Za-z0-9_]*)\b" % re.escape(recv_ident))
                fields = set(pat.findall(body))
                entry['fields_accessed'] = list(fields)
                if recv_type and recv_type in data['structs']:
                    data['structs'][recv_type]['methods'].append(entry)
            data['files'][rel]['methods'].append(entry)

    # Compute struct metrics: WMC, LCOM, DIT, NOC
    for sname, sinfo in data['structs'].items():
        methods = sinfo.get('methods', [])
        wmc = sum(m['cyclomatic'] for m in methods)
        # LCOM calculation
        n = len(methods)
        P = 0
        Q = 0
        for i in range(n):
            for j in range(i+1, n):
                fi = set(methods[i].get('fields_accessed', []))
                fj = set(methods[j].get('fields_accessed', []))
                if fi.intersection(fj):
                    Q += 1
                else:
                    P += 1
        lcom = P - Q
        if lcom < 0:
            lcom = 0
        sinfo['metrics'] = {
            'WMC': wmc,
            'LCOM': lcom,
            'NumMethods': n
        }

    # Embedding relations for DIT & NOC
    # detect anonymous fields as possible embeddings
    embeddings = {}
    for rel, finfo in data['files'].items():
        for s in finfo['structs']:
            name = s['name']
            fields = s['fields']
            for fld in fields:
                # if field line is like 'Parent' or '*Parent' or 'pkg.Parent', treat as embed
                fparts = fld.split()
                if len(fparts) == 1 or (len(fparts) >= 2 and fparts[0].startswith('*') and len(fparts[0])>1):
                    # anonymous embed - type token may include package prefix
                    t = fparts[0].lstrip('*')
                    if '.' in t:
                        t = t.split('.')[-1]
                    embeddings.setdefault(name, []).append(t)
    # compute DIT (max depth following embeddings), and NOC (count children)
    def dit(name, visited=None):
        visited = visited or set()
        if name in visited:
            return 0
        visited.add(name)
        if name not in embeddings:
            return 0
        depths = [1 + dit(child, visited) for child in embeddings.get(name, [])]
        return max(depths) if depths else 1

    # build NOC counts
    noc = {}
    for parent, childs in embeddings.items():
        for c in childs:
            noc[c] = noc.get(c, 0) + 1

    for sname in data['structs']:
        d = dit(sname)
        data['structs'][sname]['metrics'] = data['structs'][sname].get('metrics', {})
        data['structs'][sname]['metrics']['DIT'] = d
        data['structs'][sname]['metrics']['NOC'] = noc.get(sname, 0)

    # CBO: count imports per package (file-level grouped by directory)
    pkg_imports = {}
    for rel, finfo in data['files'].items():
        d = os.path.dirname(rel)
        pkg_imports.setdefault(d, set()).update(finfo['imports'])
    cbo_per_pkg = {pkg: len(imps) for pkg, imps in pkg_imports.items()}

    # RFC (approx): number of distinct methods/functions called by each method
    # and for each struct, aggregate RFC as number of distinct calls from its methods
    for sname, sinfo in data['structs'].items():
        calls = set()
        for m in sinfo.get('methods', []):
            for c in m['calls']:
                calls.add(c)
        sinfo['metrics']['RFC'] = len(calls)

    data['metrics'] = {
        'CBO_per_package': cbo_per_pkg
    }

    # Save report
    out = os.path.join(ROOT, 'OO_metrics_report.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print('Report saved to', out)

if __name__ == '__main__':
    analyze()
