# Ruang Kontrol — Dashboard IoT Dummy (Sensor Kebocoran Gas)

Dashboard monitoring IoT dummy berbasis Next.js 14 + Tailwind CSS. Semua data sensor (gas, CO, suhu, kelembapan, pintu, gerak) disimulasikan secara acak di sisi klien (lihat `lib/useSensorSim.ts`) — tidak ada backend/API asli, cocok untuk demo atau titik awal sebelum dihubungkan ke perangkat IoT sungguhan.

## Fitur
- **Gauge radial** konsentrasi gas (ppm) dengan 3 zona: aman / siaga / bahaya, lengkap animasi alarm saat melewati ambang bahaya.
- Kartu sensor pendukung: suhu, kelembapan, kadar CO, status pintu, deteksi gerak, status katup solenoid otomatis.
- Grafik tren konsentrasi gas 24 titik terakhir (Recharts).
- Log kejadian/alarm otomatis saat status berubah.
- Simulasi lonjakan kebocoran gas acak setiap beberapa saat agar dashboard terasa "hidup".

## Menjalankan secara lokal
```bash
npm install
npm run dev
```
Buka http://localhost:3000

## Mengubah ambang batas gas
Edit `GAS_WARN` dan `GAS_DANGER` di `lib/useSensorSim.ts` (satuan ppm dummy).

## Menghubungkan ke sensor asli
Ganti isi hook `useSensorSim` dengan pemanggilan API/websocket ke backend IoT Anda (mis. MQTT broker → REST endpoint, atau Firebase Realtime Database), sambil mempertahankan bentuk data (`SensorState`) yang sama supaya seluruh komponen UI tidak perlu diubah.

## Deploy ke Vercel

**Opsi A — via Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel        # ikuti prompt, pilih "Next.js" (terdeteksi otomatis)
vercel --prod # deploy ke production
```

**Opsi B — via GitHub + Dashboard Vercel**
1. Push folder ini ke repository GitHub baru.
2. Buka https://vercel.com/new, import repository tersebut.
3. Framework Preset akan otomatis terdeteksi sebagai **Next.js** — biarkan default (Build Command: `next build`, Output: default).
4. Klik **Deploy**. Tidak ada environment variable yang diperlukan karena semua data adalah dummy.

Setelah deploy, Vercel akan memberi URL publik (`https://nama-project.vercel.app`).
