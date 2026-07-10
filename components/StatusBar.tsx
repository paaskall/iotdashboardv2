'use client';

import { useEffect, useState } from 'react';
import type { GasStatus } from '@/lib/useSensorSim';

function formatUptime(sec: number) {
  const h = Math.floor(sec / 3600).toString().padStart(2, '0');
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const statusMeta: Record<GasStatus, { label: string; color: string; dot: string }> = {
  aman: { label: 'SISTEM NORMAL', color: 'text-ok', dot: 'bg-ok' },
  siaga: { label: 'SIAGA', color: 'text-warn', dot: 'bg-warn' },
  bahaya: { label: 'BAHAYA — EVAKUASI', color: 'text-danger', dot: 'bg-danger' },
};

export default function StatusBar({ status, uptimeSec }: { status: GasStatus; uptimeSec: number }) {
  const [clock, setClock] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('id-ID'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const meta = statusMeta[status];

  return (
    <div className="flex items-center justify-between border-b hairline px-6 py-4 flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md border hairline flex items-center justify-center text-ok font-display font-bold text-sm">
          RK
        </div>
        <div>
          <div className="font-display font-bold tracking-wide text-sm sm:text-base">RUANG KONTROL</div>
          <div className="text-[11px] text-muted font-mono tracking-wide">MONITORING IoT — GEDUNG A / LT.2</div>
        </div>
      </div>

      <div className="flex items-center gap-6 font-mono text-xs">
        <div className={`flex items-center gap-2 ${meta.color}`}>
          <span className={`h-2 w-2 rounded-full ${meta.dot} ${status === 'bahaya' ? 'animate-pulseAlarm' : ''}`} />
          {meta.label}
        </div>
        <div className="text-muted hidden sm:block">
          UPTIME <span className="text-ink tabular">{formatUptime(uptimeSec)}</span>
        </div>
        <div className="text-muted tabular">{clock}</div>
      </div>
    </div>
  );
}
