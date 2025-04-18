import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "~~/app/api/bind-wallet/route";
import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

vi.mock("viem", async () => ({
  isAddress: (addr: string) => addr.startsWith("0x"),
  verifyMessage: vi.fn().mockResolvedValue(true),
}));

describe("POST /api/bind-wallet", () => {
  const userAddress = "0x1234567890123456789012345678901234567890";
  const message = "FlowEDU Wallet Binding\nPublic Key: xyz";
  const signature = "0xsignature";

  beforeEach(async () => {
    await db.insert(walletBindings).values({
      userAddress,
      flowEDUAddress: "0xFlowEDUAddress",
      privateKey: "encryptedPrivKey",
      message: "",
      timestamp: 0,
    });
  });

  it("should bind wallet successfully", async () => {
    const req = {
      json: async () => ({ userAddress, message, signature }),
    } as any;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("should return 400 for invalid address", async () => {
    const req = {
      json: async () => ({ userAddress: "invalid", message, signature }),
    } as any;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toBe("Invalid Address");
  });

  it("should return 400 for invalid signature", async () => {
    vi.mocked(await import("viem")).verifyMessage.mockResolvedValueOnce(false);

    const req = {
      json: async () => ({ userAddress, message, signature }),
    } as any;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toBe("Invalid Signature");
  });

  it("should return 404 if wallet not found", async () => {
    const req = {
      json: async () => ({
        userAddress: "0x0000000000000000000000000000000000000000",
        message,
        signature,
      }),
    } as any;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.message).toBe("Wallet not found");
  });
});
