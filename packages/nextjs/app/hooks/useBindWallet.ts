import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAccount, useSignMessage } from "wagmi";
import { GenerateKeypairResponse } from "~~/types/wallet";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBindWallet() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SWR fetch on mount
  const {
    data: displayPubKey,
    mutate,
    isLoading: isFetching,
  } = useSWR<GenerateKeypairResponse>(isConnected && address ? `/api/generate-keypair/${address}` : null, fetcher);
  useEffect(() => {
    if (displayPubKey?.isBound) setSuccess(true);
  }, [displayPubKey]);

  const bind = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);
    const timestamp = Date.now();

    try {
      const keyRes = await fetch(`/api/generate-keypair/${address}`);
      if (!keyRes.ok) throw new Error("Failed to generate keypair");

      const { flowEDUAddress: publicKey, isBound }: GenerateKeypairResponse = await keyRes.json();
      if (isBound) {
        setSuccess(true);
        return;
      }

      const message = `FlowEDU Wallet Binding\nPublic Key: ${publicKey}`;
      const signature = await signMessageAsync({ message });

      const res = await fetch("/api/bind-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: address, publicKey, signature, timestamp, message }),
      });

      const result = await res.json();
      if (!result.success) throw new Error("Binding failed");

      await mutate();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bind,
    isLoading,
    isFetching,
    success,
    error,
    displayPubKey,
  };
}
