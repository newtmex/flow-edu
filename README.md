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

-   Always use `useBindWallet()` hook → internally calls this API automatically.
-   This API is idempotent — it will return existing wallet if already created.
-   Wallet index is auto-incremented by row count → deterministic & safe.