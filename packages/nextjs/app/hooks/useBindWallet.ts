import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export function useBindWallet() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [displayPubKey, setDisplayPubKey] = useState<string>();

  const bind = async () => {
    setIsLoading(true);
    const timestamp = Date.now();

    try {
      // Generate pubKey
      //   const keyRes = await fetch("/api/generate-keypair");
      //   const { publicKey, privateKey } = await keyRes.json();

      const publicKey = "jhjkhnn";

      const message = `Bind public key to FlowEDU wallet\nPublic Key: ${publicKey}\nTimestamp: ${timestamp}`;
      const signature = await signMessageAsync({ message });

      console.log({ signature });

      //   Store binding information
      //   const res = await fetch("/api/bind-wallet", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ userAddress: address, publicKey, signature, timestamp }),
      //   });

      //   const data = await res.json();
      //   if (data.success) setSuccess(true);
      setSuccess(true);
      setDisplayPubKey(publicKey);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { bind, isLoading, success, displayPubKey };
}
