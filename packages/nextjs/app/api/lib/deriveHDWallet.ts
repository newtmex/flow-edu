import { HDNodeWallet, Wallet } from "ethers";

const MASTER_MNEMONIC = process.env.HD_WALLET_MNEMONIC!;
if (!MASTER_MNEMONIC) {
  throw new Error("HD_WALLET_MNEMONIC is not defined");
}

export function deriveHDWallet(index: number): HDNodeWallet {
  const hdNode = HDNodeWallet.fromPhrase(MASTER_MNEMONIC);
  return hdNode.deriveChild(index);
}
