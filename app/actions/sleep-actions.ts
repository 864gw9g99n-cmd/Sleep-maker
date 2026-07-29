"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function currentUserId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User profile not found.");
  return user.id;
}

export async function startSleep() {
  const userId = await currentUserId();
  const active = await prisma.sleepSession.findFirst({ where: { userId, endTime: null } });
  if (active) return { ok: true, sessionId: active.id };
  const session = await prisma.sleepSession.create({ data: { userId, startTime: new Date() } });
  revalidatePath("/dashboard");
  return { ok: true, sessionId: session.id };
}

export async function endSleep() {
  const userId = await currentUserId();
  const active = await prisma.sleepSession.findFirst({ where: { userId, endTime: null }, orderBy: { startTime: "desc" } });
  if (!active) throw new Error("No active sleep session found.");
  const endTime = new Date();
  const durationMin = Math.max(1, Math.round((endTime.getTime() - active.startTime.getTime()) / 60000));
  await prisma.sleepSession.update({ where: { id: active.id }, data: { endTime, durationMin } });
  revalidatePath("/dashboard");
  return { ok: true, sessionId: active.id, durationMin };
}

const qualitySchema = z.object({ sessionId: z.string().cuid(), quality: z.number().int().min(1).max(5) });
export async function rateSleep(input: z.infer<typeof qualitySchema>) {
  const userId = await currentUserId();
  const { sessionId, quality } = qualitySchema.parse(input);
  await prisma.sleepSession.update({ where: { id: sessionId, userId }, data: { quality } });
  revalidatePath("/dashboard");
  return { ok: true };
}
