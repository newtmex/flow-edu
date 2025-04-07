export type GenerateKeypairResponse = {
  address: string; // The user's EVM wallet address
  publicKey: string; // FlowEDU derived wallet publicKey
  isBound: boolean; // Whether this wallet has been signed/bound by user
};
