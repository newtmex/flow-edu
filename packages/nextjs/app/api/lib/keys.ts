import { createCipheriv, randomBytes, scryptSync } from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET!;
if (!ENCRYPTION_SECRET) {
  throw new Error("ENCRYPTION_SECRET is not defined");
}
const IV_LENGTH = 16;

export function encryptPrivateKey(privateKey: string): string {
  const iv = randomBytes(IV_LENGTH);
  const key = scryptSync(ENCRYPTION_SECRET, "salt", 32);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(privateKey, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}
