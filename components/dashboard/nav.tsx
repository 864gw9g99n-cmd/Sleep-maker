import { BarChart3, Moon, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";

export function AppNav() {
  return <><aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black/40 p-6 backdrop-blur lg:block"><div className="flex items-center gap-3 text-xl font-semibold"><Moon className="text-indigo-300" /> Sleep Maker</div><nav className="mt-10 space-y-2"><a className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-slate-100" href="/dashboard"><BarChart3 className="h-5 w-5" /> Dashboard</a></nav><form action={logout} className="absolute bottom-6 left-6 right-6"><Button variant="outline" className="w-full"><LogOut className="h-4 w-4" /> Sign out</Button></form></aside><nav className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-around rounded-3xl border border-white/10 bg-slate-950/90 p-3 backdrop-blur lg:hidden"><a className="flex flex-col items-center text-xs text-sky-200" href="/dashboard"><BarChart3 className="h-5 w-5" /> Home</a><form action={logout}><button className="flex flex-col items-center text-xs text-slate-400"><LogOut className="h-5 w-5" /> Exit</button></form></nav></>;
}
