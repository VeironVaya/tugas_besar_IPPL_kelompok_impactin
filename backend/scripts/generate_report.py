import json
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
json_path = os.path.join(ROOT, 'OO_metrics_report.json')
md_path = os.path.join(ROOT, 'OO_metrics_report.md')

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

structs = data.get('structs', {})
metrics_rows = []
for sname, sinfo in structs.items():
    m = sinfo.get('metrics', {})
    metrics_rows.append({
        'name': sname,
        'num_methods': m.get('NumMethods', 0),
        'WMC': m.get('WMC', 0),
        'RFC': m.get('RFC', 0),
        'LCOM': m.get('LCOM', 0),
        'DIT': m.get('DIT', 0),
        'NOC': m.get('NOC', 0),
    })

# sort by WMC
by_wmc = sorted(metrics_rows, key=lambda x: x['WMC'], reverse=True)
by_lcom = sorted(metrics_rows, key=lambda x: x['LCOM'], reverse=True)
by_rfc = sorted(metrics_rows, key=lambda x: x['RFC'], reverse=True)

# CBO per package
cbo = data.get('metrics', {}).get('CBO_per_package', {})
by_cbo = sorted(cbo.items(), key=lambda x: x[1], reverse=True)

lines = []
lines.append('# Laporan Metrik OO\n')
lines.append('Dihasilkan otomatis oleh scripts/oo_metrics.py dan scripts/generate_report.py\n')
lines.append('---\n')

lines.append('## Ringkasan per struct\n')
lines.append('| Struct | #Metode | WMC | RFC | LCOM | DIT | NOC |\n')
lines.append('|---|---:|---:|---:|---:|---:|---:|\n')
for r in sorted(metrics_rows, key=lambda x: x['name']):
    lines.append(f"| `{r['name']}` | {r['num_methods']} | {r['WMC']} | {r['RFC']} | {r['LCOM']} | {r['DIT']} | {r['NOC']} |\n")

lines.append('\n---\n')
lines.append('## Struct teratas berdasarkan WMC (kompleksitas) \n')
lines.append('| Peringkat | Struct | WMC | #Metode |\n')
lines.append('|---:|---|---:|---:|\n')
for i,r in enumerate(by_wmc[:10], start=1):
    lines.append(f"| {i} | `{r['name']}` | {r['WMC']} | {r['num_methods']} |\n")

lines.append('\n## Struct teratas berdasarkan LCOM (masalah kohesi) \n')
lines.append('| Peringkat | Struct | LCOM | #Metode |\n')
lines.append('|---:|---|---:|---:|\n')
for i,r in enumerate(by_lcom[:10], start=1):
    lines.append(f"| {i} | `{r['name']}` | {r['LCOM']} | {r['num_methods']} |\n")

lines.append('\n## Struct teratas berdasarkan RFC (pemanggilan) \n')
lines.append('| Peringkat | Struct | RFC | #Metode |\n')
lines.append('|---:|---|---:|---:|\n')
for i,r in enumerate(by_rfc[:10], start=1):
    lines.append(f"| {i} | `{r['name']}` | {r['RFC']} | {r['num_methods']} |\n")

lines.append('\n---\n')
lines.append('## CBO (imports) per paket \n')
lines.append('| Paket | #Imports |\n')
lines.append('|---|---:|\n')
for pkg, cnt in by_cbo[:20]:
    lines.append(f"| `{pkg}` | {cnt} |\n")

# hotspots notes
lines.append('\n---\n')
lines.append('## Temuan & Rekomendasi \n')
lines.append('- **WMC tinggi** menunjukkan cabang yang banyak — pertimbangkan memecah fungsi menjadi helper lebih kecil, memindahkan logika ke objek domain, atau menyederhanakan alur kontrol.\n')
lines.append('- **LCOM tinggi** menunjukkan kohesi rendah — metode tidak berbagi field; pertimbangkan memecah struct menjadi tipe-tipe yang lebih kecil berdasarkan tanggung jawab tunggal.\n')
lines.append('- **RFC tinggi** menunjukkan banyak dependensi/pemanggilan — pertimbangkan mengurangi coupling dan menambahkan interface untuk mempermudah pengujian.\n')

with open(md_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Markdown report written to', md_path)
