'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { HistoryPoint } from '@/lib/useSensorSim';
import { GAS_THRESHOLDS } from '@/lib/useSensorSim';

export default function TrendChart({ data }: { data: HistoryPoint[] }) {
  return (
    <div className="rounded-lg border hairline bg-panel p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono tracking-wide text-muted uppercase">Tren Konsentrasi Gas · 24 titik terakhir</span>
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-warn inline-block" />siaga {GAS_THRESHOLDS.warn}</span>
          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-danger inline-block" />bahaya {GAS_THRESHOLDS.danger}</span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ppmFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#35D398" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#35D398" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" tick={{ fill: '#7C9187', fontSize: 10 }} axisLine={{ stroke: '#233029' }} tickLine={false} />
            <YAxis tick={{ fill: '#7C9187', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, GAS_THRESHOLDS.max]} />
            <Tooltip
              contentStyle={{ background: '#121A17', border: '1px solid #233029', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#7C9187' }}
              itemStyle={{ color: '#EAF2ED' }}
            />
            <ReferenceLine y={GAS_THRESHOLDS.warn} stroke="#F5A623" strokeDasharray="4 4" strokeOpacity={0.6} />
            <ReferenceLine y={GAS_THRESHOLDS.danger} stroke="#FF4E3A" strokeDasharray="4 4" strokeOpacity={0.6} />
            <Area type="monotone" dataKey="ppm" stroke="#35D398" strokeWidth={2} fill="url(#ppmFill)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
