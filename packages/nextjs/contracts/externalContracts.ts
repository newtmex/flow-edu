/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  56: {
    ProxyOFTV2: {
      address: "0x201263cea08e8f1d6e2fdd1fd2ca44bf6145e2af",
      abi: [
        {
          inputs: [
            { internalType: "address", name: "_token", type: "address" },
            { internalType: "uint8", name: "_sharedDecimals", type: "uint8" },
            { internalType: "address", name: "_lzEndpoint", type: "address" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { indexed: false, internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { indexed: false, internalType: "uint64", name: "_nonce", type: "uint64" },
            { indexed: false, internalType: "bytes32", name: "_hash", type: "bytes32" },
          ],
          name: "CallOFTReceivedSuccess",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { indexed: false, internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { indexed: false, internalType: "uint64", name: "_nonce", type: "uint64" },
            { indexed: false, internalType: "bytes", name: "_payload", type: "bytes" },
            { indexed: false, internalType: "bytes", name: "_reason", type: "bytes" },
          ],
          name: "MessageFailed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "_address", type: "address" }],
          name: "NonContractAddress",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
            { indexed: true, internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { indexed: true, internalType: "address", name: "_to", type: "address" },
            { indexed: false, internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "ReceiveFromChain",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { indexed: false, internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { indexed: false, internalType: "uint64", name: "_nonce", type: "uint64" },
            { indexed: false, internalType: "bytes32", name: "_payloadHash", type: "bytes32" },
          ],
          name: "RetryMessageSuccess",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { indexed: true, internalType: "address", name: "_from", type: "address" },
            { indexed: true, internalType: "bytes32", name: "_toAddress", type: "bytes32" },
            { indexed: false, internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "SendToChain",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { indexed: false, internalType: "uint16", name: "_type", type: "uint16" },
            { indexed: false, internalType: "uint256", name: "_minDstGas", type: "uint256" },
          ],
          name: "SetMinDstGas",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "precrime", type: "address" }],
          name: "SetPrecrime",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint16", name: "_remoteChainId", type: "uint16" },
            { indexed: false, internalType: "bytes", name: "_path", type: "bytes" },
          ],
          name: "SetTrustedRemote",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint16", name: "_remoteChainId", type: "uint16" },
            { indexed: false, internalType: "bytes", name: "_remoteAddress", type: "bytes" },
          ],
          name: "SetTrustedRemoteAddress",
          type: "event",
        },
        {
          inputs: [],
          name: "DEFAULT_PAYLOAD_SIZE_LIMIT",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "NO_EXTRA_GAS",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "PT_SEND",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "PT_SEND_AND_CALL",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { internalType: "uint64", name: "_nonce", type: "uint64" },
            { internalType: "bytes32", name: "_from", type: "bytes32" },
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
            { internalType: "uint256", name: "_gasForCall", type: "uint256" },
          ],
          name: "callOnOFTReceived",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "circulatingSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "", type: "uint16" },
            { internalType: "bytes", name: "", type: "bytes" },
            { internalType: "uint64", name: "", type: "uint64" },
          ],
          name: "creditedPackets",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "bytes32", name: "_toAddress", type: "bytes32" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
            { internalType: "uint64", name: "_dstGasForCall", type: "uint64" },
            { internalType: "bool", name: "_useZro", type: "bool" },
            { internalType: "bytes", name: "_adapterParams", type: "bytes" },
          ],
          name: "estimateSendAndCallFee",
          outputs: [
            { internalType: "uint256", name: "nativeFee", type: "uint256" },
            { internalType: "uint256", name: "zroFee", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "bytes32", name: "_toAddress", type: "bytes32" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "bool", name: "_useZro", type: "bool" },
            { internalType: "bytes", name: "_adapterParams", type: "bytes" },
          ],
          name: "estimateSendFee",
          outputs: [
            { internalType: "uint256", name: "nativeFee", type: "uint256" },
            { internalType: "uint256", name: "zroFee", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "", type: "uint16" },
            { internalType: "bytes", name: "", type: "bytes" },
            { internalType: "uint64", name: "", type: "uint64" },
          ],
          name: "failedMessages",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
          ],
          name: "forceResumeReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_version", type: "uint16" },
            { internalType: "uint16", name: "_chainId", type: "uint16" },
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "_configType", type: "uint256" },
          ],
          name: "getConfig",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint16", name: "_remoteChainId", type: "uint16" }],
          name: "getTrustedRemoteAddress",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
          ],
          name: "isTrustedRemote",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lzEndpoint",
          outputs: [{ internalType: "contract ILayerZeroEndpoint", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { internalType: "uint64", name: "_nonce", type: "uint64" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
          ],
          name: "lzReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "", type: "uint16" },
            { internalType: "uint16", name: "", type: "uint16" },
          ],
          name: "minDstGasLookup",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { internalType: "uint64", name: "_nonce", type: "uint64" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
          ],
          name: "nonblockingLzReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "outboundAmount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint16", name: "", type: "uint16" }],
          name: "payloadSizeLimitLookup",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "precrime",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
          inputs: [
            { internalType: "uint16", name: "_srcChainId", type: "uint16" },
            { internalType: "bytes", name: "_srcAddress", type: "bytes" },
            { internalType: "uint64", name: "_nonce", type: "uint64" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
          ],
          name: "retryMessage",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_from", type: "address" },
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "bytes32", name: "_toAddress", type: "bytes32" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            { internalType: "bytes", name: "_payload", type: "bytes" },
            { internalType: "uint64", name: "_dstGasForCall", type: "uint64" },
            {
              components: [
                { internalType: "address payable", name: "refundAddress", type: "address" },
                { internalType: "address", name: "zroPaymentAddress", type: "address" },
                { internalType: "bytes", name: "adapterParams", type: "bytes" },
              ],
              internalType: "struct ICommonOFT.LzCallParams",
              name: "_callParams",
              type: "tuple",
            },
          ],
          name: "sendAndCall",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_from", type: "address" },
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "bytes32", name: "_toAddress", type: "bytes32" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
            {
              components: [
                { internalType: "address payable", name: "refundAddress", type: "address" },
                { internalType: "address", name: "zroPaymentAddress", type: "address" },
                { internalType: "bytes", name: "adapterParams", type: "bytes" },
              ],
              internalType: "struct ICommonOFT.LzCallParams",
              name: "_callParams",
              type: "tuple",
            },
          ],
          name: "sendFrom",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_version", type: "uint16" },
            { internalType: "uint16", name: "_chainId", type: "uint16" },
            { internalType: "uint256", name: "_configType", type: "uint256" },
            { internalType: "bytes", name: "_config", type: "bytes" },
          ],
          name: "setConfig",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "uint16", name: "_packetType", type: "uint16" },
            { internalType: "uint256", name: "_minGas", type: "uint256" },
          ],
          name: "setMinDstGas",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_dstChainId", type: "uint16" },
            { internalType: "uint256", name: "_size", type: "uint256" },
          ],
          name: "setPayloadSizeLimit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_precrime", type: "address" }],
          name: "setPrecrime",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint16", name: "_version", type: "uint16" }],
          name: "setReceiveVersion",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint16", name: "_version", type: "uint16" }],
          name: "setSendVersion",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_remoteChainId", type: "uint16" },
            { internalType: "bytes", name: "_path", type: "bytes" },
          ],
          name: "setTrustedRemote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint16", name: "_remoteChainId", type: "uint16" },
            { internalType: "bytes", name: "_remoteAddress", type: "bytes" },
          ],
          name: "setTrustedRemoteAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "sharedDecimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint16", name: "", type: "uint16" }],
          name: "trustedRemoteLookup",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
  41923: {
    ArbSys: {
      address: "0x0000000000000000000000000000000000000064",
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "requested", type: "uint256" },
            { internalType: "uint256", name: "current", type: "uint256" },
          ],
          name: "InvalidBlockNumber",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "caller",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "destination",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "uniqueId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "batchNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "indexInBatch",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "arbBlockNum",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "ethBlockNum",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "callvalue",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "L2ToL1Transaction",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "caller",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "destination",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "hash",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "position",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "arbBlockNum",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "ethBlockNum",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "callvalue",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "L2ToL1Tx",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "reserved",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "bytes32",
              name: "hash",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "position",
              type: "uint256",
            },
          ],
          name: "SendMerkleUpdate",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "arbBlockNum",
              type: "uint256",
            },
          ],
          name: "arbBlockHash",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "arbBlockNumber",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "arbChainID",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "arbOSVersion",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getStorageGasAvailable",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "isTopLevelCall",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "address", name: "unused", type: "address" },
          ],
          name: "mapL1SenderContractAddressToL2Alias",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "myCallersAddressWithoutAliasing",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "sendMerkleTreeState",
          outputs: [
            { internalType: "uint256", name: "size", type: "uint256" },
            { internalType: "bytes32", name: "root", type: "bytes32" },
            {
              internalType: "bytes32[]",
              name: "partials",
              type: "bytes32[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "destination",
              type: "address",
            },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "sendTxToL1",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "wasMyCallersAddressAliased",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "destination",
              type: "address",
            },
          ],
          name: "withdrawEth",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "payable",
          type: "function",
        },
      ],
    },
  },
  3: {
    ERC20Outbox: {
      address: "0x6339965Cb3002f5c746895e4eD895bd775dbfdf9",
      abi: [
        { inputs: [], name: "AlreadyInit", type: "error" },
        { inputs: [{ internalType: "uint256", name: "index", type: "uint256" }], name: "AlreadySpent", type: "error" },
        { inputs: [], name: "BadPostUpgradeInit", type: "error" },
        { inputs: [], name: "BridgeCallFailed", type: "error" },
        { inputs: [], name: "HadZeroInit", type: "error" },
        {
          inputs: [
            { internalType: "uint256", name: "actualLength", type: "uint256" },
            { internalType: "uint256", name: "maxProofLength", type: "uint256" },
          ],
          name: "MerkleProofTooLong",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "NotOwner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "address", name: "rollup", type: "address" },
          ],
          name: "NotRollup",
          type: "error",
        },
        {
          inputs: [
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "uint256", name: "maxIndex", type: "uint256" },
          ],
          name: "PathNotMinimal",
          type: "error",
        },
        {
          inputs: [{ internalType: "uint256", name: "proofLength", type: "uint256" }],
          name: "ProofTooLong",
          type: "error",
        },
        { inputs: [], name: "RollupNotChanged", type: "error" },
        { inputs: [], name: "SimulationOnlyEntrypoint", type: "error" },
        { inputs: [{ internalType: "bytes32", name: "root", type: "bytes32" }], name: "UnknownRoot", type: "error" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "address", name: "l2Sender", type: "address" },
            { indexed: true, internalType: "uint256", name: "zero", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "transactionIndex", type: "uint256" },
          ],
          name: "OutBoxTransactionExecuted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "bytes32", name: "outputRoot", type: "bytes32" },
            { indexed: true, internalType: "bytes32", name: "l2BlockHash", type: "bytes32" },
          ],
          name: "SendRootUpdated",
          type: "event",
        },
        {
          inputs: [],
          name: "OUTBOX_VERSION",
          outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "bridge",
          outputs: [{ internalType: "contract IBridge", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "l2Sender", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "l2Block", type: "uint256" },
            { internalType: "uint256", name: "l1Block", type: "uint256" },
            { internalType: "uint256", name: "l2Timestamp", type: "uint256" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "calculateItemHash",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
            { internalType: "uint256", name: "path", type: "uint256" },
            { internalType: "bytes32", name: "item", type: "bytes32" },
          ],
          name: "calculateMerkleRoot",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "address", name: "l2Sender", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "l2Block", type: "uint256" },
            { internalType: "uint256", name: "l1Block", type: "uint256" },
            { internalType: "uint256", name: "l2Timestamp", type: "uint256" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "executeTransaction",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "address", name: "l2Sender", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "l2Block", type: "uint256" },
            { internalType: "uint256", name: "l1Block", type: "uint256" },
            { internalType: "uint256", name: "l2Timestamp", type: "uint256" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "executeTransactionSimulation",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "contract IBridge", name: "_bridge", type: "address" }],
          name: "initialize",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
          name: "isSpent",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1BatchNum",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1Block",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1EthBlock",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1OutputId",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1Sender",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1Timestamp",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "l2ToL1WithdrawalAmount",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        { inputs: [], name: "postUpgradeInit", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
          inputs: [],
          name: "rollup",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          name: "roots",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "spent",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        { inputs: [], name: "updateRollupAddress", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
          inputs: [
            { internalType: "bytes32", name: "root", type: "bytes32" },
            { internalType: "bytes32", name: "l2BlockHash", type: "bytes32" },
          ],
          name: "updateSendRoot",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts;
