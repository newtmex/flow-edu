# FlowEDU

> Seamless, automated cross-chain token bridging into EDU Chain.

---

## Tech Stack

| Tech         | Usage                                         |
| ------------ | --------------------------------------------- |
| Next.js 15   | Fullstack Framework (App Router)              |
| Scaffold-ETH | Smart contract integration scaffolding        |
| Ponder       | EVM Indexer                                   |
| Drizzle ORM  | Database ORM (PostgreSQL)                     |
| viem / wagmi | Web3 Interaction (Frontend)                   |
| Ethers.js    | HD Wallet generation                          |
| SWR          | React Data Fetching                           |
| LayerZero    | Cross-chain Token Standard (StandardArbERC20) |

## API Documentation

### Generate & Fetch Wallet Keypair for User

`GET /api/generate-keypair/[address]`

#### Description

Fetches (or generates if not existing) a FlowEDU HD Wallet for a connected user wallet address.

> This route will deterministically generate a new wallet from the project HD Wallet seed phrase and store the encrypted private key in the database.

---

### URL Params

| Param   | Type   | Description                         |
| ------- | ------ | ----------------------------------- |
| address | string | EVM address of user (Metamask, etc) |

---

### Response — 200 OK

```json
{
  "address": "0xUserAddress",
  "flowEDUAddress": "0xFlowEDUAddress",
  "isBound": false
}
```

---

### Response Typescript Typing

```typescript
export type GenerateKeypairResponse = {
  address: string;
  flowEDUAddress: string;
  isBound: boolean;
};
```

---

### Possible Errors

| Status | Message                         | Cause                           |
| ------ | ------------------------------- | ------------------------------- |
| 400    | Invalid Address                 | Address param failed validation |
| 500    | Failed to create wallet binding | DB Insert Failure               |

---

## Notes

- Always use `useBindWallet()` hook → internally calls this API automatically.
- This API is idempotent — it will return existing wallet if already created.
- Wallet index is auto-incremented by row count → deterministic & safe.

# Environment Variables

This project uses environment variables to manage sensitive data like database credentials, wallet mnemonics, and encryption secrets.

All required environment variables are listed in `.env.example`.

---

## Variables

| Key                | Required | Description                                             | Example                             |
| ------------------ | -------- | ------------------------------------------------------- | ----------------------------------- |
| DATABASE_HOST      | Yes      | Postgres database host                                  | localhost                           |
| DATABASE_PORT      | Yes      | Postgres database port                                  | 5431                                |
| DATABASE_NAME      | Yes      | Postgres database name                                  | postgres                            |
| DATABASE_USER      | Yes      | Postgres database user                                  | postgres                            |
| DATABASE_PASSWORD  | Optional | Postgres database password (can be empty for local dev) |                                     |
| HD_WALLET_MNEMONIC | Yes      | Master mnemonic for deriving FlowEDU HD wallets         | "smooth sick tube holiday ..."      |
| ENCRYPTION_SECRET  | Yes      | Secret key used to encrypt private keys in the database | "flowedu-dev-super-secure-key-123!" |

---

## Usage

1. Copy the example file:

```bash
cp .env.example .env
```

2. Fill in your local credentials and secrets.

---

## Notes

- Never commit your real `.env` file to source control.
- The `HD_WALLET_MNEMONIC` should be a valid 12 or 24 word BIP-39 mnemonic.
- The `ENCRYPTION_SECRET` should be a strong random string.
- If your Postgres database does not have a password, leave `DATABASE_PASSWORD` blank.

---

---

## Bind Existing User Wallet to FlowEDU Wallet

`POST /api/bind-wallet`

### Description

Verifies ownership of the user's EVM wallet (e.g., MetaMask) by requiring a signed message.  
Once verified, it binds the user’s EVM wallet to their generated FlowEDU wallet.

> This ensures that only the rightful owner of a wallet can link it to a FlowEDU wallet.

---

### Request Body

| Field       | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| userAddress | string | The user's EVM wallet address (signing address). |
| publicKey   | string | The FlowEDU wallet public key to bind.           |
| signature   | string | Signature proving ownership of `userAddress`.    |
| message     | string | Exact message signed (must include `publicKey`). |

---

### Example Request

```json
{
  "userAddress": "0xUserAddress",
  "publicKey": "0xFlowEDUPublicKey",
  "signature": "0xSignedMessage",
  "message": "FlowEDU Wallet Binding\nPublic Key: 0xFlowEDUPublicKey"
}
```
