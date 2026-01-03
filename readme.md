# KELOMPOK IMPACTIC - OO Metric
|Nama|NIM|
|---|---|
|Veiron Vaya Yarief|103012300100|
|Gavin Benjiro Ramadhan|103012300452|
|Muhammad Ihsan Naufal|103012300288|
|Nabila Putri Azhari|103012300316|

## Daftar Isi
- [KELOMPOK IMPACTIC - OO Metric](#kelompok-impactic---oo-metric)
  - [Daftar Isi](#daftar-isi)
  - [1. Pengantar](#1-pengantar)
  - [2. Scripts](#2-scripts)
    - [2.1. oo\_metrics.py](#21-oo_metricspy)
    - [2.2. generate\_report.py](#22-generate_reportpy)
  - [3. Ringkasan per struct](#3-ringkasan-per-struct)
  - [4. Struct teratas berdasarkan WMC (kompleksitas)](#4-struct-teratas-berdasarkan-wmc-kompleksitas)
  - [5. Struct teratas berdasarkan LCOM (masalah kohesi)](#5-struct-teratas-berdasarkan-lcom-masalah-kohesi)
  - [6. Struct teratas berdasarkan RFC (pemanggilan)](#6-struct-teratas-berdasarkan-rfc-pemanggilan)
  - [7. CBO (imports) per paket](#7-cbo-imports-per-paket)
  - [8. Temuan \& Rekomendasi](#8-temuan--rekomendasi)

---
## 1. Pengantar

Object-Oriented (OO) Metrics merupakan sekumpulan metrik yang digunakan untuk mengevaluasi kualitas desain perangkat lunak berbasis objek, khususnya dari aspek kompleksitas, kohesi, coupling, dan struktur desain. Meskipun bahasa Go tidak menerapkan paradigma Object-Oriented secara klasik (tanpa class dan inheritance), konsep OO tetap dapat diadaptasi melalui penggunaan **struct**, **method**, dan relasi antar struct.

Dalam konteks Go, **struct** berperan sebagai representasi class, sedangkan **method** adalah fungsi yang terikat pada struct tertentu. Kombinasi struct dan method ini menjadi unit analisis utama dalam pengukuran OO Metrics. Evaluasi metrik dilakukan untuk memahami seberapa besar tanggung jawab suatu struct, seberapa kompleks alur logikanya, serta seberapa kuat ketergantungannya terhadap struct lain.

Metrik **WMC (Weighted Methods per Class)** mengukur tingkat kompleksitas sebuah struct dengan menjumlahkan kompleksitas setiap method di dalamnya. Nilai WMC yang tinggi menunjukkan bahwa struct memiliki banyak tanggung jawab atau alur logika yang rumit, sehingga berpotensi menurunkan maintainability.

Metrik **RFC (Response For a Class)** merepresentasikan jumlah method yang berpotensi dipanggil sebagai respons dari satu pemanggilan method. Dalam aplikasi web, RFC menggambarkan kompleksitas alur eksekusi suatu request, di mana nilai RFC yang tinggi mengindikasikan alur pemanggilan yang sulit ditelusuri dan diuji.

Metrik **LCOM (Lack of Cohesion of Methods)** digunakan untuk menilai tingkat kohesi dalam sebuah struct, yaitu sejauh mana method-method di dalamnya saling berbagi field yang sama. Nilai LCOM yang tinggi menunjukkan kohesi rendah, yang berarti struct tersebut kemungkinan menggabungkan beberapa tanggung jawab berbeda dan melanggar prinsip *Single Responsibility*.

Metrik **DIT (Depth of Inheritance Tree)** dan **NOC (Number of Children)** pada Go diadaptasi melalui mekanisme *struct embedding*. DIT mengukur kedalaman embedding antar struct, sedangkan NOC menghitung jumlah struct lain yang melakukan embedding terhadap suatu struct. Kedua metrik ini membantu mengevaluasi kompleksitas struktur hierarki dan dampak perubahan pada struct yang digunakan secara luas.

Secara keseluruhan, WMC, RFC, LCOM, DIT, dan NOC memberikan gambaran kuantitatif mengenai kualitas desain berbasis objek. Dengan mengadaptasikan konsep OO ke dalam struktur Go, metrik-metrik ini tetap relevan untuk mengidentifikasi *code smell*, meningkatkan maintainability, serta mendukung keputusan refactoring pada aplikasi web berbasis Go.

## 2. Scripts

Bagian ini menjelaskan peran dan cara kerja script yang digunakan untuk menghasilkan laporan metrik OO secara otomatis pada proyek ini. Seluruh proses analisis dilakukan melalui dua script utama, yaitu `oo_metrics.py` sebagai mesin analisis dan `generate_report.py` sebagai pembangkit laporan dalam format Markdown.

### 2.1. oo_metrics.py

Script `oo_metrics.py` berfungsi sebagai **core analyzer** yang melakukan pembacaan dan analisis statis terhadap seluruh file sumber Go (`.go`). Script ini menelusuri direktori proyek, mengabaikan folder yang tidak relevan (seperti `vendor`), kemudian mem-parsing isi file untuk mengekstraksi informasi struktural.

Tahapan utama dalam `oo_metrics.py` meliputi:

1. **Ekstraksi Struct**  
   Script mendeteksi deklarasi `struct` menggunakan regular expression, kemudian menyimpan nama struct serta field-field yang dimilikinya. Informasi ini digunakan sebagai dasar analisis kohesi (LCOM) dan relasi embedding (DIT dan NOC).

2. **Ekstraksi Method**  
   Method diidentifikasi melalui fungsi yang memiliki receiver. Untuk setiap method, script mencatat nama method, struct pemiliknya, serta isi body method untuk analisis lebih lanjut.

3. **Perhitungan WMC (Weighted Methods per Class)**  
   WMC dihitung dengan menjumlahkan nilai kompleksitas siklomatik dari setiap method dalam satu struct. Kompleksitas siklomatik diaproksimasi berdasarkan jumlah struktur pengambilan keputusan seperti `if`, `for`, `switch`, serta operator logika.

4. **Perhitungan RFC (Response For a Class)**  
   RFC ditentukan dengan menghitung jumlah pemanggilan method lain di dalam body method suatu struct. Nilai ini merepresentasikan seberapa kompleks alur eksekusi yang mungkin terjadi saat struct tersebut digunakan.

5. **Perhitungan LCOM (Lack of Cohesion of Methods)**  
   LCOM dihitung dengan membandingkan pasangan method yang berbagi field yang sama dengan pasangan method yang tidak berbagi field. Jika banyak method yang tidak menggunakan field yang sama, maka nilai LCOM meningkat dan menandakan kohesi yang rendah.

6. **Perhitungan DIT dan NOC**  
   Karena Go tidak memiliki inheritance, DIT dan NOC diadaptasi melalui mekanisme *struct embedding*. DIT mengukur kedalaman embedding maksimum, sedangkan NOC menghitung berapa banyak struct lain yang melakukan embedding terhadap suatu struct.

Hasil analisis dari seluruh tahapan ini disimpan dalam berkas `OO_metrics_report.json` sebagai representasi data mentah metrik.

### 2.2. generate_report.py

Script `generate_report.py` bertugas sebagai **report generator** yang mengolah data hasil analisis dari `OO_metrics_report.json` menjadi laporan yang mudah dibaca dalam format Markdown (`OO_metrics_report.md`). Script ini tidak melakukan analisis kode secara langsung, melainkan berfokus pada penyajian data.

Tahapan utama dalam `generate_report.py` meliputi:

1. **Pembacaan Data JSON**  
   Script memuat data metrik per struct dari file JSON, termasuk jumlah method, nilai WMC, RFC, LCOM, DIT, dan NOC.

2. **Penyusunan Tabel Ringkasan**  
   Data metrik disusun ke dalam tabel ringkasan per struct untuk memberikan gambaran menyeluruh mengenai kualitas desain setiap komponen.

3. **Pengurutan dan Identifikasi Hotspot**  
   Script mengurutkan struct berdasarkan nilai WMC, LCOM, dan RFC untuk mengidentifikasi bagian kode yang paling kompleks, paling rendah kohesinya, atau paling tinggi ketergantungannya.

4. **Penyusunan Temuan dan Rekomendasi**  
   Berdasarkan hasil pengurutan, script menghasilkan bagian temuan yang berisi interpretasi umum, seperti indikasi *god struct*, kohesi rendah, atau coupling berlebih, beserta rekomendasi refactoring.

Dengan pemisahan tanggung jawab antara `oo_metrics.py` sebagai analyzer dan `generate_report.py` sebagai report generator, proses evaluasi OO Metrics menjadi terstruktur, mudah diperluas, serta mendukung analisis kualitas desain aplikasi Go secara sistematis.

## 3. Ringkasan per struct
| Struct | #Metode | WMC | RFC | LCOM | DIT | NOC |
|---|---:|---:|---:|---:|---:|---:|
| `Admin` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminApprovalRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminController` | 1 | 3 | 4 | 0 | 0 | 0 |
| `AdminEventApprovalResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminEventsResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminReportedEventDetailResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminReportedEventsResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminResolveReportRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `AdminResolveReportResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Applicant` | 0 | 0 | 0 | 0 | 0 | 0 |
| `CancelEventResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ChangePasswordRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ChangePasswordResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EditProfileSkillRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EditProfileSkillResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Event` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventCarouselItemDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventCarouselResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventController` | 16 | 61 | 26 | 0 | 0 | 0 |
| `EventDetailResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventJoinCheckDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventListResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventSubStatusUpdateResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `EventUserDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ExperienceController` | 3 | 8 | 9 | 0 | 0 | 0 |
| `ExperienceRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ExperienceResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ExperienceService` | 3 | 24 | 10 | 0 | 0 | 0 |
| `HostApplicantApprovalRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `HostApplicantApprovalResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `HostRemoveParticipantRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `HostRemoveParticipantResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `JoinEventResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `LoginRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `LoginResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Participant` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Profile` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ProfileCompletedEventDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ProfileController` | 3 | 12 | 10 | 0 | 0 | 0 |
| `ProfileDetailResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ProfileExperienceDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `RegisterRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `RegisterResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `RegularExperience` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Report` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ReportController` | 4 | 16 | 12 | 0 | 0 | 0 |
| `ReportEventRequestDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `ReportEventResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `Skill` | 0 | 0 | 0 | 0 | 0 | 0 |
| `SkillResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `User` | 0 | 0 | 0 | 0 | 0 | 0 |
| `UserController` | 2 | 9 | 5 | 0 | 0 | 0 |
| `UserData` | 0 | 0 | 0 | 0 | 0 | 0 |
| `UserRepository` | 8 | 9 | 4 | 0 | 0 | 0 |
| `UserService` | 2 | 10 | 9 | 0 | 0 | 0 |
| `YourCreatedEventDetailResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `YourEventResponseDto` | 0 | 0 | 0 | 0 | 0 | 0 |
| `adminRepository` | 1 | 2 | 1 | 0 | 0 | 0 |
| `adminService` | 1 | 4 | 4 | 0 | 0 | 0 |
| `applicantRepository` | 4 | 4 | 2 | 0 | 0 | 0 |
| `eventRepository` | 20 | 57 | 18 | 0 | 0 | 0 |
| `eventService` | 17 | 162 | 47 | 0 | 0 | 0 |
| `experienceRepository` | 5 | 5 | 5 | 0 | 0 | 0 |
| `participantRepository` | 3 | 3 | 2 | 1 | 0 | 0 |
| `profileRepository` | 4 | 4 | 4 | 0 | 0 | 0 |
| `profileService` | 5 | 31 | 15 | 0 | 0 | 0 |
| `reportRepository` | 5 | 19 | 11 | 0 | 0 | 0 |
| `reportService` | 4 | 17 | 10 | 0 | 0 | 0 |
| `skillRepository` | 4 | 7 | 4 | 0 | 0 | 0 |

---
## 4. Struct teratas berdasarkan WMC (kompleksitas) 
| Peringkat | Struct | WMC | #Metode |
|---:|---|---:|---:|
| 1 | `eventService` | 162 | 17 |
| 2 | `EventController` | 61 | 16 |
| 3 | `eventRepository` | 57 | 20 |
| 4 | `profileService` | 31 | 5 |
| 5 | `ExperienceService` | 24 | 3 |
| 6 | `reportRepository` | 19 | 5 |
| 7 | `reportService` | 17 | 4 |
| 8 | `ReportController` | 16 | 4 |
| 9 | `ProfileController` | 12 | 3 |
| 10 | `UserService` | 10 | 2 |

## 5. Struct teratas berdasarkan LCOM (masalah kohesi) 
| Peringkat | Struct | LCOM | #Metode |
|---:|---|---:|---:|
| 1 | `participantRepository` | 1 | 3 |
| 2 | `AdminController` | 0 | 1 |
| 3 | `EventController` | 0 | 16 |
| 4 | `ProfileController` | 0 | 3 |
| 5 | `ExperienceController` | 0 | 3 |
| 6 | `ReportController` | 0 | 4 |
| 7 | `UserController` | 0 | 2 |
| 8 | `AdminApprovalRequestDto` | 0 | 0 |
| 9 | `AdminResolveReportRequestDto` | 0 | 0 |
| 10 | `ChangePasswordRequestDto` | 0 | 0 |

## 6. Struct teratas berdasarkan RFC (pemanggilan) 
| Peringkat | Struct | RFC | #Metode |
|---:|---|---:|---:|
| 1 | `eventService` | 47 | 17 |
| 2 | `EventController` | 26 | 16 |
| 3 | `eventRepository` | 18 | 20 |
| 4 | `profileService` | 15 | 5 |
| 5 | `ReportController` | 12 | 4 |
| 6 | `reportRepository` | 11 | 5 |
| 7 | `ProfileController` | 10 | 3 |
| 8 | `ExperienceService` | 10 | 3 |
| 9 | `reportService` | 10 | 4 |
| 10 | `ExperienceController` | 9 | 3 |

---
## 7. CBO (imports) per paket 
| Paket | #Imports |
|---|---:|
| `cmd` | 12 |
| `internal\app\services` | 12 |
| `internal\app\repositories` | 11 |
| `internal\app\controllers` | 8 |
| `internal\config` | 8 |
| `internal\app\utils` | 7 |
| `internal\app\testutil` | 6 |
| `internal\app\routes` | 3 |
| `internal\app\dtos\response` | 1 |
| `internal\app\models` | 1 |
| `internal\app\dtos\request` | 0 |

---
## 8. Temuan & Rekomendasi 
- **WMC tinggi** menunjukkan cabang yang banyak pertimbangkan memecah fungsi menjadi helper lebih kecil, memindahkan logika ke objek domain, atau menyederhanakan alur kontrol.
- **LCOM tinggi** menunjukkan kohesi rendah metode tidak berbagi field; pertimbangkan memecah struct menjadi tipe-tipe yang lebih kecil berdasarkan tanggung jawab tunggal.
- **RFC tinggi** menunjukkan banyak dependensi/pemanggilan pertimbangkan mengurangi coupling dan menambahkan interface untuk mempermudah pengujian.
