"use client";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { endSleep, startSleep } from "@/app/actions/sleep-actions";
import { useToast } from "@/components/ui/toast";
import { QualityDialog } from "./quality-dialog";

export function OneTapSleepButton({ isSleeping }: { isSleeping: boolean }) {
  const [sleeping, setSleeping] = useState(isSleeping);
  const [pending, startTransition] = useTransition();
  const [ratingSession, setRatingSession] = useState<string | null>(null);
  const toast = useToast();
  const onTap = () => startTransition(async () => {
    try {
      if (sleeping) {
        const result = await endSleep();
        setSleeping(false); setRatingSession(result.sessionId);
        toast({ title: "Good morning", description: `Recorded ${result.durationMin} minutes of sleep.` });
      } else {
        await startSleep(); setSleeping(true);
        toast({ title: "Sleep started", description: "Dim the lights. We'll track the rest." });
      }
    } catch (error) { toast({ title: "Something went wrong", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" }); }
  });
  return <div className="flex flex-col items-center gap-6"><motion.button disabled={pending} onClick={onTap} whileTap={{ scale: .94 }} animate={{ boxShadow: sleeping ? "0 0 120px rgba(14,165,233,.42)" : "0 0 80px rgba(99,102,241,.32)" }} className="relative grid h-72 w-72 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-slate-900 to-black disabled:opacity-70 sm:h-96 sm:w-96"><motion.span aria-hidden animate={sleeping ? { scale: [1, 1.08, 1], opacity: [.55, .9, .55] } : { scale: 1 }} transition={{ duration: 4, repeat: sleeping ? Infinity : 0, ease: "easeInOut" }} className="absolute inset-6 rounded-full bg-indigo-500/10 blur-xl" /><span className="relative flex flex-col items-center gap-4"><span className="rounded-full bg-white/10 p-5">{sleeping ? <Sun className="h-12 w-12 text-sky-200" /> : <Moon className="h-12 w-12 text-indigo-200" />}</span><span className="text-3xl font-semibold">{sleeping ? "Wake Up" : "Going to Sleep"}</span><span className="text-sm text-slate-400">{pending ? "Syncing..." : sleeping ? "Tap when you're awake" : "Tap to start a cycle"}</span></span></motion.button><QualityDialog sessionId={ratingSession} onClose={() => setRatingSession(null)} /></div>;
}
