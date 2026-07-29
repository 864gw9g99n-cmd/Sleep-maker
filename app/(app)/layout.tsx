import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppNav } from "@/components/dashboard/nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/");
  return <div><AppNav /><main className="min-h-screen pb-28 lg:ml-72 lg:pb-0">{children}</main></div>;
}
