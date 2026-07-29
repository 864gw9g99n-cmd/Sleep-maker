import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatDuration } from "@/lib/utils";
import { OneTapSleepButton } from "@/components/dashboard/one-tap-sleep-button";
import { SleepChart } from "@/components/dashboard/sleep-chart";

function lastSevenDays(sessions: { startTime: Date; durationMin: number | null }[]) {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const minutes = sessions.filter((s) => s.startTime.toISOString().slice(0, 10) === key).reduce((sum, s) => sum + (s.durationMin ?? 0), 0);
    return { day: date.toLocaleDateString("en", { weekday: "short" }), hours: Number((minutes / 60).toFixed(1)) };
  });
}

export default async function DashboardPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? "" }, include: { sleepSessions: { orderBy: { startTime: "desc" }, take: 30 } } });
  const active = user?.sleepSessions.find((item) => !item.endTime);
  const completed = user?.sleepSessions.filter((item) => item.durationMin) ?? [];
  const recent = completed[0];
  const avg = completed.length ? Math.round(completed.reduce((sum, s) => sum + (s.durationMin ?? 0), 0) / completed.length) : 0;
  return <div className={active ? "bg-black/55 transition-colors" : "transition-colors"}><section className="mx-auto flex max-w-7xl flex-col gap-8 p-5 sm:p-8"><header className="flex items-center justify-between"><div><p className="text-sm uppercase tracking-[.3em] text-sky-300">Sleep Dashboard</p><h1 className="mt-2 text-3xl font-semibold sm:text-5xl">Good evening, {session?.user?.name?.split(" ")[0] ?? "dreamer"}.</h1></div>{session?.user?.image ? <Image src={session.user.image} alt="Profile" width={52} height={52} className="rounded-full border border-white/10" /> : null}</header><div className="grid gap-8 xl:grid-cols-[1fr_1.1fr]"><section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur"><OneTapSleepButton isSleeping={Boolean(active)} /></section><section className="grid gap-4 sm:grid-cols-2"><div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"><p className="text-sm text-slate-400">Most recent cycle</p><p className="mt-4 text-4xl font-semibold">{formatDuration(recent?.durationMin)}</p></div><div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"><p className="text-sm text-slate-400">Average sleep</p><p className="mt-4 text-4xl font-semibold">{formatDuration(avg)}</p></div><div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 sm:col-span-2"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm text-slate-400">Last 7 days</p><h2 className="text-2xl font-semibold">Sleep duration</h2></div></div><SleepChart data={lastSevenDays(completed)} /></div></section></div></section></div>;
}
