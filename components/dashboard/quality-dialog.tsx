"use client";
import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { rateSleep } from "@/app/actions/sleep-actions";
import { useToast } from "@/components/ui/toast";

export function QualityDialog({ sessionId, onClose }: { sessionId: string | null; onClose: () => void }) {
  const [pending, startTransition] = useTransition();
  const toast = useToast();
  const rate = (quality: number) => startTransition(async () => { if (!sessionId) return; try { await rateSleep({ sessionId, quality }); toast({ title: "Rating saved", description: "Your recovery score was updated." }); onClose(); } catch { toast({ title: "Could not save rating", variant: "destructive" }); } });
  return <AnimatePresence>{sessionId ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-6 backdrop-blur"><motion.div initial={{ scale: .92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92, y: 24 }} className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950 p-6 text-center"><h2 className="text-2xl font-semibold">How do you feel?</h2><p className="mt-2 text-sm text-slate-400">Rate the quality of this sleep cycle.</p><div className="mt-6 flex justify-center gap-2">{[1,2,3,4,5].map((value) => <button disabled={pending} key={value} onClick={() => rate(value)} className="rounded-xl p-2 text-yellow-300 transition hover:bg-white/10"><Star className="h-9 w-9 fill-current" /></button>)}</div></motion.div></motion.div> : null}</AnimatePresence>;
}
