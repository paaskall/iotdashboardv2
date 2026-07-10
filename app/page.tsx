'use client';

import { useSensorSim } from '@/lib/useSensorSim';
import StatusBar from '@/components/StatusBar';
import GasGauge from '@/components/GasGauge';
import SensorCard from '@/components/SensorCard';
import TrendChart from '@/components/TrendChart';
import EventLog from '@/components/EventLog';
import { ThermoIcon, DropletIcon, SkullIcon, DoorIcon, MotionIcon, FlameIcon } from '@/components/icons';

export default function Page() {
  const sim = useSensorSim();
  const isDanger = sim.gasStatus === 'bahaya';

  return (
    <main className="min-h-screen">
      {isDanger && (
        <div className="bg-danger/90 text-bg text-center text-xs font-mono tracking-wider py-1.5 animate-pulseAlarm">
          ⚠ PERINGATAN — KEBOCORAN GAS TERDETEKSI DI GEDUNG A LANTAI 2 — PERIKSA VENTILASI SEGERA
        </div>
      )}

      <StatusBar status={sim.gasStatus} uptimeSec={sim.uptimeSec} />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Kartu utama — sensor kebocoran gas */}
          <div
            className={`rounded-xl border p-6 flex flex-col items-center justify-center bg-panel-2 transition-shadow ${
              isDanger ? 'border-danger shadow-glow-danger' : sim.gasStatus === 'siaga' ? 'border-warn' : 'border-ok/40 shadow-glow'
            }`}
          >
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wide text-muted uppercase">Sensor Utama</span>
              <span className="text-[11px] font-mono text-muted">MQ-2 · SIM01</span>
            </div>
            <GasGauge ppm={sim.gasPpm} status={sim.gasStatus} />
            <p className="mt-3 text-center text-[11px] text-muted font-mono leading-relaxed">
              Sensor deteksi kebocoran gas LPG.
            </p>
          </div>

          {/* Grid sensor pendukung */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
            <SensorCard
              label="Suhu Ruangan"
              value={sim.temperature.toFixed(1)}
              unit="°C"
              sub="DHT22 · Dapur"
              icon={<ThermoIcon />}
            />
            <SensorCard
              label="Kelembapan"
              value={sim.humidity.toFixed(0)}
              unit="%RH"
              sub="DHT22 · Dapur"
              icon={<DropletIcon />}
            />
            <SensorCard
              label="Kadar CO"
              value={sim.coPpm.toFixed(1)}
              unit="ppm"
              sub={sim.coPpm > 30 ? 'Di atas normal' : 'Normal'}
              tone={sim.coPpm > 30 ? 'warn' : 'default'}
              icon={<SkullIcon />}
            />
            <SensorCard
              label="Pintu Utama"
              value={sim.doorOpen ? 'Terbuka' : 'Tertutup'}
              sub="Reed switch · D1"
              tone={sim.doorOpen ? 'warn' : 'ok'}
              icon={<DoorIcon />}
            />
            <SensorCard
              label="Deteksi Gerak"
              value={sim.motion ? 'Terdeteksi' : 'Tidak ada'}
              sub="PIR · Koridor"
              tone={sim.motion ? 'default' : 'ok'}
              icon={<MotionIcon />}
            />
            <SensorCard
              label="Katup Solenoid"
              value={isDanger ? 'Tertutup' : 'Terbuka'}
              sub="Auto shut-off gas"
              tone={isDanger ? 'danger' : 'ok'}
              icon={<FlameIcon />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <TrendChart data={sim.history} />
          <EventLog events={sim.events} />
        </div>

        <footer className="text-center text-[11px] font-mono text-muted pt-4 pb-2">
          Dashboard IoT
        </footer>
      </div>
    </main>
  );
}
