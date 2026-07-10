'use client';

import { useEffect, useRef, useState } from 'react';

export type GasStatus = 'aman' | 'siaga' | 'bahaya';

export interface HistoryPoint {
  t: string;
  ppm: number;
}

export interface EventLogItem {
  id: number;
  time: string;
  label: string;
  level: GasStatus;
}

export interface SensorState {
  gasPpm: number;
  gasStatus: GasStatus;
  coPpm: number;
  temperature: number;
  humidity: number;
  doorOpen: boolean;
  motion: boolean;
  history: HistoryPoint[];
  events: EventLogItem[];
  uptimeSec: number;
}

const GAS_WARN = 400; // ppm — ambang siaga (LPG/metana dummy)
const GAS_DANGER = 700; // ppm — ambang bahaya

function classify(ppm: number): GasStatus {
  if (ppm >= GAS_DANGER) return 'bahaya';
  if (ppm >= GAS_WARN) return 'siaga';
  return 'aman';
}

function timeLabel() {
  const d = new Date();
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export const GAS_THRESHOLDS = { warn: GAS_WARN, danger: GAS_DANGER, max: 1000 };

export function useSensorSim() {
  const [state, setState] = useState<SensorState>(() => ({
    gasPpm: 120,
    gasStatus: 'aman',
    coPpm: 4,
    temperature: 28.4,
    humidity: 58,
    doorOpen: false,
    motion: false,
    history: Array.from({ length: 24 }).map((_, i) => ({ t: `${i}`, ppm: 100 + Math.random() * 40 })),
    events: [
      { id: 1, time: timeLabel(), label: 'Sistem monitoring dimulai', level: 'aman' },
    ],
    uptimeSec: 0,
  }));

  const spikeUntil = useRef(0);
  const eventId = useRef(2);
  const prevStatus = useRef<GasStatus>('aman');

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const now = Date.now();

        // Sesekali picu simulasi lonjakan kebocoran gas secara acak
        if (now > spikeUntil.current && Math.random() < 0.045) {
          spikeUntil.current = now + (4000 + Math.random() * 5000);
        }
        const isSpiking = now < spikeUntil.current;

        const drift = (Math.random() - 0.5) * 18;
        const pull = isSpiking ? 14 : (110 - prev.gasPpm) * 0.06;
        const nextPpm = clamp(prev.gasPpm + drift + pull, 60, 980);
        const status = classify(nextPpm);

        const nextTemp = clamp(prev.temperature + (Math.random() - 0.5) * 0.3, 24, 34);
        const nextHum = clamp(prev.humidity + (Math.random() - 0.5) * 1.2, 40, 75);
        const nextCo = clamp(prev.coPpm + (Math.random() - 0.5) * 0.8 + (isSpiking ? 0.6 : 0), 0, 45);
        const motion = Math.random() < 0.08 ? !prev.motion : prev.motion;
        const doorOpen = Math.random() < 0.02 ? !prev.doorOpen : prev.doorOpen;

        const history = [...prev.history.slice(1), { t: timeLabel(), ppm: nextPpm }];

        let events = prev.events;
        if (status !== prevStatus.current) {
          const label =
            status === 'bahaya'
              ? 'ALARM — Konsentrasi gas melewati ambang bahaya'
              : status === 'siaga'
              ? 'Peringatan — Konsentrasi gas mendekati ambang batas'
              : 'Kondisi kembali normal';
          events = [{ id: eventId.current++, time: timeLabel(), label, level: status }, ...prev.events].slice(0, 8);
          prevStatus.current = status;
        }

        return {
          gasPpm: nextPpm,
          gasStatus: status,
          coPpm: nextCo,
          temperature: nextTemp,
          humidity: nextHum,
          doorOpen,
          motion,
          history,
          events,
          uptimeSec: prev.uptimeSec + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}
