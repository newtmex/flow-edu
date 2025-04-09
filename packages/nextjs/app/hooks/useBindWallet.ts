import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { GenerateKeypairResponse } from "~~/types/wallet";

export function useBindWallet() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [displayPubKey, setDisplayPubKey] = useState<{ address: string; isBound: boolean }>();

  const bind = async () => {
    setIsLoading(true);
    const timestamp = Date.now();

    try {
      // Generate pubKey
      const keyRes = await fetch("/api/generate-keypair/" + address);
      const { flowEDUAddress: publicKey, isBound }: GenerateKeypairResponse = await keyRes.json();

      if (!isBound) {
        const message = `Bind public key to FlowEDU wallet\nPublic Key: ${publicKey}\nTimestamp: ${timestamp}`;
        const signature = await signMessageAsync({ message });

        // Store binding information
        const res = await fetch("/api/bind-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userAddress: address, publicKey, signature, timestamp, message }),
        });

        const data = await res.json();
        if (data.success) setSuccess(true);
      } else {
        setDisplayPubKey({
          address: publicKey,
          isBound: true,
        });
      }

      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { bind, isLoading, success, displayPubKey };
}
