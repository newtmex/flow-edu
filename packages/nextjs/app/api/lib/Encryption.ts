import { createCipheriv, createDecipheriv } from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET!;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV!;
if (!ENCRYPTION_SECRET || !ENCRYPTION_IV) {
  throw new Error("Encryption values is not defined");
}

export default class Encryption {
  constructor(
    private readonly key: Buffer,
    private readonly iv: Buffer,
  ) {}

  encryptPlainText(plaintext: string) {
    const cipher = createCipheriv("aes-256-ctr", this.key, this.iv);

    return Buffer.concat([cipher.update(plaintext), cipher.final()]).toString("hex");
  }

  decryptCipherText(cipherText: string) {
    const decipher = createDecipheriv("aes-256-ctr", this.key, this.iv);

    return Buffer.concat([decipher.update(Buffer.from(cipherText, "hex")), decipher.final()]).toString("utf-8");
  }

  static new() {
    return new Encryption(Buffer.from(ENCRYPTION_SECRET, "base64"), Buffer.from(ENCRYPTION_IV, "base64"));
  }
}
