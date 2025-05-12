export type GenerateKeypairResponse = {
  address: string; // The user's EVM wallet address
  flowEDUAddress: string; // FlowEDU derived wallet address
  isBound: boolean; // Whether this wallet has been signed/bound by user
  message: string;
};
