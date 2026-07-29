"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export type ToastMessage = { id: string; title: string; description?: string; variant?: "default" | "destructive" };
const ToastContext = React.createContext<(toast: Omit<ToastMessage, "id">) => void>(() => undefined);
export function useToast() { return React.useContext(ToastContext); }
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);
  const toast = React.useCallback((message: Omit<ToastMessage, "id">) => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, ...message }]);
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4200);
  }, []);
  return <ToastContext.Provider value={toast}><ToastPrimitives.Provider swipeDirection="right">{children}{toasts.map((t) => <ToastPrimitives.Root key={t.id} className={cn("fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur", t.variant === "destructive" && "border-red-500/30") }><ToastPrimitives.Title className="font-semibold">{t.title}</ToastPrimitives.Title>{t.description ? <ToastPrimitives.Description className="mt-1 text-sm text-slate-300">{t.description}</ToastPrimitives.Description> : null}</ToastPrimitives.Root>)}<ToastPrimitives.Viewport /></ToastPrimitives.Provider></ToastContext.Provider>;
}
