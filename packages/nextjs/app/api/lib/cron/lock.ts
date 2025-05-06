// lib/cron/lock.ts
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { jobLocks } from "~~/drizzle/schema";

const JOB_NAME = "processPendingTxs";
const LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export async function acquireLock(): Promise<boolean> {
  const now = new Date();

  try {
    // Try to insert a lock
    await db.insert(jobLocks).values({ job: JOB_NAME, lockedAt: now });
    return true;
  } catch {
    // If already locked, check timeout
    const existing = await db.query.jobLocks.findFirst({
      where: eq(jobLocks.job, JOB_NAME),
    });

    if (existing) {
      const diff = now.getTime() - new Date(existing.lockedAt).getTime();
      if (diff > LOCK_TIMEOUT_MS) {
        // Expired lock — take over
        await db.update(jobLocks).set({ lockedAt: now }).where(eq(jobLocks.job, JOB_NAME));
        return true;
      }
    }

    return false;
  }
}

export async function releaseLock() {
  await db.delete(jobLocks).where(eq(jobLocks.job, JOB_NAME));
}
