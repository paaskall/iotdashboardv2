import type { ReactNode } from 'react';

export default function SensorCard({
  label,
  value,
  unit,
  sub,
  icon,
  tone = 'default',
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  icon: ReactNode;
  tone?: 'default' | 'ok' | 'warn' | 'danger';
}) {
  const toneColor = {
    default: 'text-data',
    ok: 'text-ok',
    warn: 'text-warn',
    danger: 'text-danger',
  }[tone];

  return (
    <div className="rounded-lg border hairline bg-panel p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono tracking-wide text-muted uppercase">{label}</span>
        <span className={toneColor}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display font-bold text-2xl tabular">{value}</span>
        {unit && <span className="text-muted text-xs font-mono">{unit}</span>}
      </div>
      {sub && <span className="text-[11px] text-muted font-mono">{sub}</span>}
    </div>
  );
}
