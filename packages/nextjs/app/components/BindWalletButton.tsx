"use client";

import { useState } from "react";
import Link from "next/link";
import { useBindWallet } from "../hooks/useBindWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export function BindWalletButton() {
  const { bind, isLoading, success, error, displayPubKey } = useBindWallet();

  return (
    <div className="space-y-2">
      <button
        onClick={bind}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Binding..." : success && displayPubKey?.isBound ? "Wallet Bound ✅" : "Bind Wallet"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {displayPubKey?.isBound && <WalletAddress address={displayPubKey.address} />}
    </div>
  );
}

export const WalletAddress = ({ address }: { address: string }) => {
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <div className="flex items-center">
      <Link href={`/blockexplorer/transaction/${address}`}>
        {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
      </Link>
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-base-content h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={address as string}
          onCopy={() => {
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 800);
          }}
        >
          <DocumentDuplicateIcon className="ml-1.5 text-xl font-normal h-5 w-5 cursor-pointer" aria-hidden="true" />
        </CopyToClipboard>
      )}
    </div>
  );
};

// 0xBdae8D35EDe5bc5174E805DcBe3F7714d142DAAb
