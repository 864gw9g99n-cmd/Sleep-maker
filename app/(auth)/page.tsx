import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { continueWithGoogle } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Moon, Sparkles } from "lucide-react";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  return <main className="flex min-h-screen items-center justify-center p-6"><section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 text-center shadow-2xl backdrop-blur"><div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 shadow-glow"><Moon className="h-10 w-10 text-indigo-300" /></div><div className="mb-8 space-y-3"><p className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-[.28em] text-sky-200"><Sparkles className="h-3 w-3" /> Sleep Maker</p><h1 className="text-4xl font-semibold tracking-tight">Track sleep in one beautiful tap.</h1><p className="text-slate-400">Private, effortless sleep sessions with premium dark analytics.</p></div><form action={continueWithGoogle}><Button size="lg" className="w-full bg-white text-slate-950 hover:bg-slate-200">Continue with Google</Button></form></section></main>;
}
