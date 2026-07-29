"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { day: string; hours: number };
export function SleepChart({ data }: { data: Point[] }) {
  return <div className="h-72 w-full"><ResponsiveContainer><BarChart data={data}><CartesianGrid stroke="rgba(148,163,184,.12)" vertical={false} /><XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#94a3b8" /><YAxis tickFormatter={(v) => `${v}h`} tickLine={false} axisLine={false} stroke="#94a3b8" /><Tooltip cursor={{ fill: "rgba(99,102,241,.08)" }} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16 }} /><Bar dataKey="hours" radius={[12, 12, 4, 4]} fill="url(#sleepGradient)" /><defs><linearGradient id="sleepGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs></BarChart></ResponsiveContainer></div>;
}
