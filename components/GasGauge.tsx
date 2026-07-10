'use client';

import type { GasStatus } from '@/lib/useSensorSim';
import { GAS_THRESHOLDS } from '@/lib/useSensorSim';

const START_ANGLE = -220;
const END_ANGLE = 40;
const CX = 150;
const CY = 160;
const R = 118;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(startVal: number, endVal: number) {
  const a0 = START_ANGLE + (startVal / GAS_THRESHOLDS.max) * (END_ANGLE - START_ANGLE);
  const a1 = START_ANGLE + (endVal / GAS_THRESHOLDS.max) * (END_ANGLE - START_ANGLE);
  const p0 = polar(CX, CY, R, a0);
  const p1 = polar(CX, CY, R, a1);
  const largeArc = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 1 ${p1.x} ${p1.y}`;
}

const colorFor: Record<GasStatus, string> = {
  aman: '#35D398',
  siaga: '#F5A623',
  bahaya: '#FF4E3A',
};

export default function GasGauge({ ppm, status }: { ppm: number; status: GasStatus }) {
  const value = Math.min(ppm, GAS_THRESHOLDS.max);
  const needleAngle = START_ANGLE + (value / GAS_THRESHOLDS.max) * (END_ANGLE - START_ANGLE);
  const needleEnd = polar(CX, CY, R - 22, needleAngle);
  const color = colorFor[status];

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 300 210" className={status === 'bahaya' ? 'drop-shadow-[0_0_18px_rgba(255,78,58,0.55)]' : ''}>
        <path d={arcPath(0, GAS_THRESHOLDS.max)} fill="none" stroke="#1B2621" strokeWidth="16" strokeLinecap="round" />
        <path d={arcPath(0, GAS_THRESHOLDS.warn)} fill="none" stroke="#1E4A38" strokeWidth="16" strokeLinecap="round" />
        <path
          d={arcPath(GAS_THRESHOLDS.warn, GAS_THRESHOLDS.danger)}
          fill="none"
          stroke="#5A3E14"
          strokeWidth="16"
        />
        <path d={arcPath(GAS_THRESHOLDS.danger, GAS_THRESHOLDS.max)} fill="none" stroke="#5A211B" strokeWidth="16" />
        <path
          d={arcPath(0, value)}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          style={{ transition: 'all 0.6s ease' }}
        />

        {/* jarum */}
        <line
          x1={CX}
          y1={CY}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: 'all 0.6s ease' }}
        />
        <circle cx={CX} cy={CY} r="6" fill={color} />

        <text x={CX} y={CY - 30} textAnchor="middle" className="fill-ink font-mono font-semibold" fontSize="34">
          {Math.round(ppm)}
        </text>
        <text x={CX} y={CY - 8} textAnchor="middle" className="fill-muted font-mono" fontSize="11" letterSpacing="2">
          PPM GAS
        </text>
      </svg>
      <div
        className="mt-1 px-3 py-1 rounded-full text-xs font-mono tracking-wide border"
        style={{ color, borderColor: color + '55', backgroundColor: color + '14' }}
      >
        {status === 'aman' ? 'KADAR AMAN' : status === 'siaga' ? 'MENDEKATI AMBANG' : 'KEBOCORAN TERDETEKSI'}
      </div>
    </div>
  );
}
