import { HDNodeWallet } from "ethers";

const MASTER_MNEMONIC = process.env.HD_WALLET_MNEMONIC!;

export function deriveHDWallet(index: number): HDNodeWallet {
  const hdNode = HDNodeWallet.fromPhrase(MASTER_MNEMONIC);
  return hdNode.deriveChild(index);
}
