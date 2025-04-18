import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { GenerateKeypairResponse } from "~~/types/wallet";

export function useBindWallet() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayPubKey, setDisplayPubKey] = useState<{ address: string; isBound: boolean }>();

  const bind = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const keyRes = await fetch(`/api/generate-keypair/${address}`);

      if (!keyRes.ok) {
        throw new Error("Failed to generate keypair");
      }

      const { flowEDUAddress: publicKey, isBound, message }: GenerateKeypairResponse = await keyRes.json();

      if (!isBound) {
        if (!message) throw new Error("Binding message not retrieved");

        const signature = await signMessageAsync({ message });

        const res = await fetch("/api/bind-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userAddress: address, publicKey, signature, message }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Failed to bind wallet");
        }
      }

      setDisplayPubKey({
        address: publicKey,
        isBound: true,
      });

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return { bind, isLoading, success, error, displayPubKey };
}
