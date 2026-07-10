import type { EventLogItem } from '@/lib/useSensorSim';

const dotColor = { aman: 'bg-ok', siaga: 'bg-warn', bahaya: 'bg-danger' } as const;
const textColor = { aman: 'text-ok', siaga: 'text-warn', bahaya: 'text-danger' } as const;

export default function EventLog({ events }: { events: EventLogItem[] }) {
  return (
    <div className="rounded-lg border hairline bg-panel p-4">
      <span className="text-[11px] font-mono tracking-wide text-muted uppercase">Log Kejadian</span>
      <ul className="mt-3 flex flex-col gap-3 max-h-48 overflow-y-auto pr-1">
        {events.map((ev) => (
          <li key={ev.id} className="flex items-start gap-3 text-xs font-mono">
            <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${dotColor[ev.level]}`} />
            <div className="flex flex-col">
              <span className={textColor[ev.level]}>{ev.label}</span>
              <span className="text-muted text-[10px]">{ev.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
