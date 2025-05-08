export const externalContracts = {
    56: {
        ProxyOFTV2: {
            address: "0x67fb304001aD03C282266B965b51E97Aa54A2FAB",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_token",
                            type: "address",
                        },
                        {
                            internalType: "uint8",
                            name: "_sharedDecimals",
                            type: "uint8",
                        },
                        {
                            internalType: "address",
                            name: "_lzEndpoint",
                            type: "address",
                        },
                    ],
                    stateMutability: "nonpayable",
                    type: "constructor",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes32",
                            name: "_hash",
                            type: "bytes32",
                        },
                    ],
                    name: "CallOFTReceivedSuccess",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_reason",
                            type: "bytes",
                        },
                    ],
                    name: "MessageFailed",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "address",
                            name: "_address",
                            type: "address",
                        },
                    ],
                    name: "NonContractAddress",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "previousOwner",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "newOwner",
                            type: "address",
                        },
                    ],
                    name: "OwnershipTransferred",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "_to",
                            type: "address",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                    ],
                    name: "ReceiveFromChain",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes32",
                            name: "_payloadHash",
                            type: "bytes32",
                        },
                    ],
                    name: "RetryMessageSuccess",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                    ],
                    name: "SendToChain",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_type",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_minDstGas",
                            type: "uint256",
                        },
                    ],
                    name: "SetMinDstGas",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "address",
                            name: "precrime",
                            type: "address",
                        },
                    ],
                    name: "SetPrecrime",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_path",
                            type: "bytes",
                        },
                    ],
                    name: "SetTrustedRemote",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_remoteAddress",
                            type: "bytes",
                        },
                    ],
                    name: "SetTrustedRemoteAddress",
                    type: "event",
                },
                {
                    inputs: [],
                    name: "DEFAULT_PAYLOAD_SIZE_LIMIT",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "NO_EXTRA_GAS",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "PT_SEND",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "PT_SEND_AND_CALL",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes32",
                            name: "_from",
                            type: "bytes32",
                        },
                        {
                            internalType: "address",
                            name: "_to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint256",
                            name: "_gasForCall",
                            type: "uint256",
                        },
                    ],
                    name: "callOnOFTReceived",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "circulatingSupply",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
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
                    name: "creditedPackets",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_dstGasForCall",
                            type: "uint64",
                        },
                        { internalType: "bool", name: "_useZro", type: "bool" },
                        {
                            internalType: "bytes",
                            name: "_adapterParams",
                            type: "bytes",
                        },
                    ],
                    name: "estimateSendAndCallFee",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "nativeFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "zroFee",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        { internalType: "bool", name: "_useZro", type: "bool" },
                        {
                            internalType: "bytes",
                            name: "_adapterParams",
                            type: "bytes",
                        },
                    ],
                    name: "estimateSendFee",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "nativeFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "zroFee",
                            type: "uint256",
                        },
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
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                    ],
                    name: "forceResumeReceive",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_chainId",
                            type: "uint16",
                        },
                        { internalType: "address", name: "", type: "address" },
                        {
                            internalType: "uint256",
                            name: "_configType",
                            type: "uint256",
                        },
                    ],
                    name: "getConfig",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                    ],
                    name: "getTrustedRemoteAddress",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                    ],
                    name: "isTrustedRemote",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "lzEndpoint",
                    outputs: [
                        {
                            internalType: "contract ILayerZeroEndpoint",
                            name: "",
                            type: "address",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
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
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                    ],
                    name: "nonblockingLzReceive",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "outboundAmount",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "owner",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "uint16", name: "", type: "uint16" },
                    ],
                    name: "payloadSizeLimitLookup",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "precrime",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "renounceOwnership",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                    ],
                    name: "retryMessage",
                    outputs: [],
                    stateMutability: "payable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_dstGasForCall",
                            type: "uint64",
                        },
                        {
                            components: [
                                {
                                    internalType: "address payable",
                                    name: "refundAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "zroPaymentAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "bytes",
                                    name: "adapterParams",
                                    type: "bytes",
                                },
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
                        {
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            components: [
                                {
                                    internalType: "address payable",
                                    name: "refundAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "zroPaymentAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "bytes",
                                    name: "adapterParams",
                                    type: "bytes",
                                },
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
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_chainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_configType",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_config",
                            type: "bytes",
                        },
                    ],
                    name: "setConfig",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_packetType",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_minGas",
                            type: "uint256",
                        },
                    ],
                    name: "setMinDstGas",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_size",
                            type: "uint256",
                        },
                    ],
                    name: "setPayloadSizeLimit",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_precrime",
                            type: "address",
                        },
                    ],
                    name: "setPrecrime",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                    ],
                    name: "setReceiveVersion",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                    ],
                    name: "setSendVersion",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        { internalType: "bytes", name: "_path", type: "bytes" },
                    ],
                    name: "setTrustedRemote",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_remoteAddress",
                            type: "bytes",
                        },
                    ],
                    name: "setTrustedRemoteAddress",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "sharedDecimals",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes4",
                            name: "interfaceId",
                            type: "bytes4",
                        },
                    ],
                    name: "supportsInterface",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "token",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "newOwner",
                            type: "address",
                        },
                    ],
                    name: "transferOwnership",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "uint16", name: "", type: "uint16" },
                    ],
                    name: "trustedRemoteLookup",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
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
                        {
                            internalType: "uint256",
                            name: "requested",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "current",
                            type: "uint256",
                        },
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
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "arbBlockNumber",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "arbChainID",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "arbOSVersion",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "getStorageGasAvailable",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
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
                        {
                            internalType: "address",
                            name: "sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "unused",
                            type: "address",
                        },
                    ],
                    name: "mapL1SenderContractAddressToL2Alias",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "pure",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "myCallersAddressWithoutAliasing",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "sendMerkleTreeState",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "size",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes32",
                            name: "root",
                            type: "bytes32",
                        },
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
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
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
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "payable",
                    type: "function",
                },
            ],
        },
    },
    42161: {
        ERC20Outbox: {
            address: "0x6339965Cb3002f5c746895e4eD895bd775dbfdf9",
            abi: [
                { inputs: [], name: "AlreadyInit", type: "error" },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "index",
                            type: "uint256",
                        },
                    ],
                    name: "AlreadySpent",
                    type: "error",
                },
                { inputs: [], name: "BadPostUpgradeInit", type: "error" },
                { inputs: [], name: "BridgeCallFailed", type: "error" },
                { inputs: [], name: "HadZeroInit", type: "error" },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "actualLength",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "maxProofLength",
                            type: "uint256",
                        },
                    ],
                    name: "MerkleProofTooLong",
                    type: "error",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "owner",
                            type: "address",
                        },
                    ],
                    name: "NotOwner",
                    type: "error",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "rollup",
                            type: "address",
                        },
                    ],
                    name: "NotRollup",
                    type: "error",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "index",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "maxIndex",
                            type: "uint256",
                        },
                    ],
                    name: "PathNotMinimal",
                    type: "error",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "proofLength",
                            type: "uint256",
                        },
                    ],
                    name: "ProofTooLong",
                    type: "error",
                },
                { inputs: [], name: "RollupNotChanged", type: "error" },
                { inputs: [], name: "SimulationOnlyEntrypoint", type: "error" },
                {
                    inputs: [
                        {
                            internalType: "bytes32",
                            name: "root",
                            type: "bytes32",
                        },
                    ],
                    name: "UnknownRoot",
                    type: "error",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "l2Sender",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "uint256",
                            name: "zero",
                            type: "uint256",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "transactionIndex",
                            type: "uint256",
                        },
                    ],
                    name: "OutBoxTransactionExecuted",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "bytes32",
                            name: "outputRoot",
                            type: "bytes32",
                        },
                        {
                            indexed: true,
                            internalType: "bytes32",
                            name: "l2BlockHash",
                            type: "bytes32",
                        },
                    ],
                    name: "SendRootUpdated",
                    type: "event",
                },
                {
                    inputs: [],
                    name: "OUTBOX_VERSION",
                    outputs: [
                        { internalType: "uint128", name: "", type: "uint128" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "bridge",
                    outputs: [
                        {
                            internalType: "contract IBridge",
                            name: "",
                            type: "address",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "l2Sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Timestamp",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "calculateItemHash",
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "pure",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes32[]",
                            name: "proof",
                            type: "bytes32[]",
                        },
                        {
                            internalType: "uint256",
                            name: "path",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes32",
                            name: "item",
                            type: "bytes32",
                        },
                    ],
                    name: "calculateMerkleRoot",
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "pure",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes32[]",
                            name: "proof",
                            type: "bytes32[]",
                        },
                        {
                            internalType: "uint256",
                            name: "index",
                            type: "uint256",
                        },
                        {
                            internalType: "address",
                            name: "l2Sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Timestamp",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "executeTransaction",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "index",
                            type: "uint256",
                        },
                        {
                            internalType: "address",
                            name: "l2Sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Timestamp",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "executeTransactionSimulation",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "contract IBridge",
                            name: "_bridge",
                            type: "address",
                        },
                    ],
                    name: "initialize",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "index",
                            type: "uint256",
                        },
                    ],
                    name: "isSpent",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1BatchNum",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "pure",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1Block",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1EthBlock",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1OutputId",
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1Sender",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1Timestamp",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "l2ToL1WithdrawalAmount",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "postUpgradeInit",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "rollup",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    name: "roots",
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    name: "spent",
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "updateRollupAddress",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes32",
                            name: "root",
                            type: "bytes32",
                        },
                        {
                            internalType: "bytes32",
                            name: "l2BlockHash",
                            type: "bytes32",
                        },
                    ],
                    name: "updateSendRoot",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
        },
        ERC20Inbox: {
            address: "0x590044e628ea1B9C10a86738Cf7a7eeF52D031B8",
            abi: [
                {
                    type: "constructor",
                    inputs: [
                        {
                            name: "_maxDataSize",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "allowListEnabled",
                    inputs: [],
                    outputs: [{ name: "", type: "bool", internalType: "bool" }],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "bridge",
                    inputs: [],
                    outputs: [
                        {
                            name: "",
                            type: "address",
                            internalType: "contract IBridge",
                        },
                    ],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "calculateRetryableSubmissionFee",
                    inputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "pure",
                },
                {
                    type: "function",
                    name: "createRetryableTicket",
                    inputs: [
                        {
                            name: "to",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "l2CallValue",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxSubmissionCost",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "excessFeeRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "callValueRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "gasLimit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxFeePerGas",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "tokenTotalFeeAmount",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        { name: "data", type: "bytes", internalType: "bytes" },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "depositERC20",
                    inputs: [
                        {
                            name: "amount",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "getProxyAdmin",
                    inputs: [],
                    outputs: [
                        { name: "", type: "address", internalType: "address" },
                    ],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "initialize",
                    inputs: [
                        {
                            name: "_bridge",
                            type: "address",
                            internalType: "contract IBridge",
                        },
                        {
                            name: "_sequencerInbox",
                            type: "address",
                            internalType: "contract ISequencerInbox",
                        },
                    ],
                    outputs: [],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "isAllowed",
                    inputs: [
                        { name: "", type: "address", internalType: "address" },
                    ],
                    outputs: [{ name: "", type: "bool", internalType: "bool" }],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "maxDataSize",
                    inputs: [],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "pause",
                    inputs: [],
                    outputs: [],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "paused",
                    inputs: [],
                    outputs: [{ name: "", type: "bool", internalType: "bool" }],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "sendContractTransaction",
                    inputs: [
                        {
                            name: "gasLimit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxFeePerGas",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "to",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "value",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        { name: "data", type: "bytes", internalType: "bytes" },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "sendL2Message",
                    inputs: [
                        {
                            name: "messageData",
                            type: "bytes",
                            internalType: "bytes",
                        },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "sendL2MessageFromOrigin",
                    inputs: [
                        {
                            name: "messageData",
                            type: "bytes",
                            internalType: "bytes",
                        },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "sendUnsignedTransaction",
                    inputs: [
                        {
                            name: "gasLimit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxFeePerGas",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "nonce",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "to",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "value",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        { name: "data", type: "bytes", internalType: "bytes" },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "sequencerInbox",
                    inputs: [],
                    outputs: [
                        {
                            name: "",
                            type: "address",
                            internalType: "contract ISequencerInbox",
                        },
                    ],
                    stateMutability: "view",
                },
                {
                    type: "function",
                    name: "setAllowList",
                    inputs: [
                        {
                            name: "user",
                            type: "address[]",
                            internalType: "address[]",
                        },
                        { name: "val", type: "bool[]", internalType: "bool[]" },
                    ],
                    outputs: [],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "setAllowListEnabled",
                    inputs: [
                        {
                            name: "_allowListEnabled",
                            type: "bool",
                            internalType: "bool",
                        },
                    ],
                    outputs: [],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "unpause",
                    inputs: [],
                    outputs: [],
                    stateMutability: "nonpayable",
                },
                {
                    type: "function",
                    name: "unsafeCreateRetryableTicket",
                    inputs: [
                        {
                            name: "to",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "l2CallValue",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxSubmissionCost",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "excessFeeRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "callValueRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "gasLimit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxFeePerGas",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "tokenTotalFeeAmount",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        { name: "data", type: "bytes", internalType: "bytes" },
                    ],
                    outputs: [
                        { name: "", type: "uint256", internalType: "uint256" },
                    ],
                    stateMutability: "nonpayable",
                },
                {
                    type: "event",
                    name: "AllowListAddressSet",
                    inputs: [
                        {
                            name: "user",
                            type: "address",
                            indexed: true,
                            internalType: "address",
                        },
                        {
                            name: "val",
                            type: "bool",
                            indexed: false,
                            internalType: "bool",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "AllowListEnabledUpdated",
                    inputs: [
                        {
                            name: "isEnabled",
                            type: "bool",
                            indexed: false,
                            internalType: "bool",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "InboxMessageDelivered",
                    inputs: [
                        {
                            name: "messageNum",
                            type: "uint256",
                            indexed: true,
                            internalType: "uint256",
                        },
                        {
                            name: "data",
                            type: "bytes",
                            indexed: false,
                            internalType: "bytes",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "InboxMessageDeliveredFromOrigin",
                    inputs: [
                        {
                            name: "messageNum",
                            type: "uint256",
                            indexed: true,
                            internalType: "uint256",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "Initialized",
                    inputs: [
                        {
                            name: "version",
                            type: "uint8",
                            indexed: false,
                            internalType: "uint8",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "Paused",
                    inputs: [
                        {
                            name: "account",
                            type: "address",
                            indexed: false,
                            internalType: "address",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "event",
                    name: "Unpaused",
                    inputs: [
                        {
                            name: "account",
                            type: "address",
                            indexed: false,
                            internalType: "address",
                        },
                    ],
                    anonymous: false,
                },
                {
                    type: "error",
                    name: "AmountTooLarge",
                    inputs: [
                        {
                            name: "amount",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                },
                {
                    type: "error",
                    name: "DataTooLarge",
                    inputs: [
                        {
                            name: "dataLength",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxDataLength",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                },
                { type: "error", name: "GasLimitTooLarge", inputs: [] },
                {
                    type: "error",
                    name: "InsufficientSubmissionCost",
                    inputs: [
                        {
                            name: "expected",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "actual",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                },
                {
                    type: "error",
                    name: "InsufficientValue",
                    inputs: [
                        {
                            name: "expected",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "actual",
                            type: "uint256",
                            internalType: "uint256",
                        },
                    ],
                },
                { type: "error", name: "L1Forked", inputs: [] },
                {
                    type: "error",
                    name: "NotAllowedOrigin",
                    inputs: [
                        {
                            name: "origin",
                            type: "address",
                            internalType: "address",
                        },
                    ],
                },
                { type: "error", name: "NotCodelessOrigin", inputs: [] },
                {
                    type: "error",
                    name: "NotRollupOrOwner",
                    inputs: [
                        {
                            name: "sender",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "rollup",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "owner",
                            type: "address",
                            internalType: "address",
                        },
                    ],
                },
                {
                    type: "error",
                    name: "RetryableData",
                    inputs: [
                        {
                            name: "from",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "to",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "l2CallValue",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "deposit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxSubmissionCost",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "excessFeeRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "callValueRefundAddress",
                            type: "address",
                            internalType: "address",
                        },
                        {
                            name: "gasLimit",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        {
                            name: "maxFeePerGas",
                            type: "uint256",
                            internalType: "uint256",
                        },
                        { name: "data", type: "bytes", internalType: "bytes" },
                    ],
                },
            ],
        },
        EDUOFTV2: {
            address: "0xf8173a39c56a554837C4C7f104153A005D284D11",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "string",
                            name: "_name",
                            type: "string",
                        },
                        {
                            internalType: "string",
                            name: "_symbol",
                            type: "string",
                        },
                        {
                            internalType: "uint8",
                            name: "_sharedDecimals",
                            type: "uint8",
                        },
                        {
                            internalType: "address",
                            name: "_lzEndpoint",
                            type: "address",
                        },
                    ],
                    stateMutability: "nonpayable",
                    type: "constructor",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "owner",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "spender",
                            type: "address",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                    ],
                    name: "Approval",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes32",
                            name: "_hash",
                            type: "bytes32",
                        },
                    ],
                    name: "CallOFTReceivedSuccess",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_reason",
                            type: "bytes",
                        },
                    ],
                    name: "MessageFailed",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "address",
                            name: "_address",
                            type: "address",
                        },
                    ],
                    name: "NonContractAddress",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "previousOwner",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "newOwner",
                            type: "address",
                        },
                    ],
                    name: "OwnershipTransferred",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "_to",
                            type: "address",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                    ],
                    name: "ReceiveFromChain",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            indexed: false,
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            indexed: false,
                            internalType: "bytes32",
                            name: "_payloadHash",
                            type: "bytes32",
                        },
                    ],
                    name: "RetryMessageSuccess",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                    ],
                    name: "SendToChain",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_type",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "_minDstGas",
                            type: "uint256",
                        },
                    ],
                    name: "SetMinDstGas",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "address",
                            name: "precrime",
                            type: "address",
                        },
                    ],
                    name: "SetPrecrime",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_path",
                            type: "bytes",
                        },
                    ],
                    name: "SetTrustedRemote",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: false,
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            indexed: false,
                            internalType: "bytes",
                            name: "_remoteAddress",
                            type: "bytes",
                        },
                    ],
                    name: "SetTrustedRemoteAddress",
                    type: "event",
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "from",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                    ],
                    name: "Transfer",
                    type: "event",
                },
                {
                    inputs: [],
                    name: "DEFAULT_PAYLOAD_SIZE_LIMIT",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "NO_EXTRA_GAS",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "PT_SEND",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "PT_SEND_AND_CALL",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "owner",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "spender",
                            type: "address",
                        },
                    ],
                    name: "allowance",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "spender",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256",
                        },
                    ],
                    name: "approve",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "account",
                            type: "address",
                        },
                    ],
                    name: "balanceOf",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes32",
                            name: "_from",
                            type: "bytes32",
                        },
                        {
                            internalType: "address",
                            name: "_to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint256",
                            name: "_gasForCall",
                            type: "uint256",
                        },
                    ],
                    name: "callOnOFTReceived",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "circulatingSupply",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
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
                    name: "creditedPackets",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "decimals",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "spender",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "subtractedValue",
                            type: "uint256",
                        },
                    ],
                    name: "decreaseAllowance",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_dstGasForCall",
                            type: "uint64",
                        },
                        { internalType: "bool", name: "_useZro", type: "bool" },
                        {
                            internalType: "bytes",
                            name: "_adapterParams",
                            type: "bytes",
                        },
                    ],
                    name: "estimateSendAndCallFee",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "nativeFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "zroFee",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        { internalType: "bool", name: "_useZro", type: "bool" },
                        {
                            internalType: "bytes",
                            name: "_adapterParams",
                            type: "bytes",
                        },
                    ],
                    name: "estimateSendFee",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "nativeFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "zroFee",
                            type: "uint256",
                        },
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
                    outputs: [
                        { internalType: "bytes32", name: "", type: "bytes32" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                    ],
                    name: "forceResumeReceive",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_chainId",
                            type: "uint16",
                        },
                        { internalType: "address", name: "", type: "address" },
                        {
                            internalType: "uint256",
                            name: "_configType",
                            type: "uint256",
                        },
                    ],
                    name: "getConfig",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                    ],
                    name: "getTrustedRemoteAddress",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "spender",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "addedValue",
                            type: "uint256",
                        },
                    ],
                    name: "increaseAllowance",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                    ],
                    name: "isTrustedRemote",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "lzEndpoint",
                    outputs: [
                        {
                            internalType: "contract ILayerZeroEndpoint",
                            name: "",
                            type: "address",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
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
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "name",
                    outputs: [
                        { internalType: "string", name: "", type: "string" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                    ],
                    name: "nonblockingLzReceive",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "owner",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "uint16", name: "", type: "uint16" },
                    ],
                    name: "payloadSizeLimitLookup",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "precrime",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "renounceOwnership",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_srcChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_srcAddress",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                    ],
                    name: "retryMessage",
                    outputs: [],
                    stateMutability: "payable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_payload",
                            type: "bytes",
                        },
                        {
                            internalType: "uint64",
                            name: "_dstGasForCall",
                            type: "uint64",
                        },
                        {
                            components: [
                                {
                                    internalType: "address payable",
                                    name: "refundAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "zroPaymentAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "bytes",
                                    name: "adapterParams",
                                    type: "bytes",
                                },
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
                        {
                            internalType: "address",
                            name: "_from",
                            type: "address",
                        },
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes32",
                            name: "_toAddress",
                            type: "bytes32",
                        },
                        {
                            internalType: "uint256",
                            name: "_amount",
                            type: "uint256",
                        },
                        {
                            components: [
                                {
                                    internalType: "address payable",
                                    name: "refundAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "address",
                                    name: "zroPaymentAddress",
                                    type: "address",
                                },
                                {
                                    internalType: "bytes",
                                    name: "adapterParams",
                                    type: "bytes",
                                },
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
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_chainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_configType",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "_config",
                            type: "bytes",
                        },
                    ],
                    name: "setConfig",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint16",
                            name: "_packetType",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_minGas",
                            type: "uint256",
                        },
                    ],
                    name: "setMinDstGas",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_dstChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "uint256",
                            name: "_size",
                            type: "uint256",
                        },
                    ],
                    name: "setPayloadSizeLimit",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_precrime",
                            type: "address",
                        },
                    ],
                    name: "setPrecrime",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                    ],
                    name: "setReceiveVersion",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_version",
                            type: "uint16",
                        },
                    ],
                    name: "setSendVersion",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        { internalType: "bytes", name: "_path", type: "bytes" },
                    ],
                    name: "setTrustedRemote",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_remoteChainId",
                            type: "uint16",
                        },
                        {
                            internalType: "bytes",
                            name: "_remoteAddress",
                            type: "bytes",
                        },
                    ],
                    name: "setTrustedRemoteAddress",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "sharedDecimals",
                    outputs: [
                        { internalType: "uint8", name: "", type: "uint8" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes4",
                            name: "interfaceId",
                            type: "bytes4",
                        },
                    ],
                    name: "supportsInterface",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "symbol",
                    outputs: [
                        { internalType: "string", name: "", type: "string" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "token",
                    outputs: [
                        { internalType: "address", name: "", type: "address" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "totalSupply",
                    outputs: [
                        { internalType: "uint256", name: "", type: "uint256" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256",
                        },
                    ],
                    name: "transfer",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "from",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256",
                        },
                    ],
                    name: "transferFrom",
                    outputs: [{ internalType: "bool", name: "", type: "bool" }],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "newOwner",
                            type: "address",
                        },
                    ],
                    name: "transferOwnership",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        { internalType: "uint16", name: "", type: "uint16" },
                    ],
                    name: "trustedRemoteLookup",
                    outputs: [
                        { internalType: "bytes", name: "", type: "bytes" },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
            ],
        },
        NodeInterface: {
            address: "0x00000000000000000000000000000000000000C8",
            abi: [
                {
                    inputs: [
                        {
                            internalType: "uint64",
                            name: "size",
                            type: "uint64",
                        },
                        {
                            internalType: "uint64",
                            name: "leaf",
                            type: "uint64",
                        },
                    ],
                    name: "constructOutboxProof",
                    outputs: [
                        {
                            internalType: "bytes32",
                            name: "send",
                            type: "bytes32",
                        },
                        {
                            internalType: "bytes32",
                            name: "root",
                            type: "bytes32",
                        },
                        {
                            internalType: "bytes32[]",
                            name: "proof",
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
                            name: "sender",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "deposit",
                            type: "uint256",
                        },
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "l2CallValue",
                            type: "uint256",
                        },
                        {
                            internalType: "address",
                            name: "excessFeeRefundAddress",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "callValueRefundAddress",
                            type: "address",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "estimateRetryableTicket",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint64",
                            name: "blockNum",
                            type: "uint64",
                        },
                    ],
                    name: "findBatchContainingBlock",
                    outputs: [
                        {
                            internalType: "uint64",
                            name: "batch",
                            type: "uint64",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "bool",
                            name: "contractCreation",
                            type: "bool",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "gasEstimateComponents",
                    outputs: [
                        {
                            internalType: "uint64",
                            name: "gasEstimate",
                            type: "uint64",
                        },
                        {
                            internalType: "uint64",
                            name: "gasEstimateForL1",
                            type: "uint64",
                        },
                        {
                            internalType: "uint256",
                            name: "baseFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1BaseFeeEstimate",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "payable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            internalType: "bool",
                            name: "contractCreation",
                            type: "bool",
                        },
                        { internalType: "bytes", name: "data", type: "bytes" },
                    ],
                    name: "gasEstimateL1Component",
                    outputs: [
                        {
                            internalType: "uint64",
                            name: "gasEstimateForL1",
                            type: "uint64",
                        },
                        {
                            internalType: "uint256",
                            name: "baseFee",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1BaseFeeEstimate",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "payable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "bytes32",
                            name: "blockHash",
                            type: "bytes32",
                        },
                    ],
                    name: "getL1Confirmations",
                    outputs: [
                        {
                            internalType: "uint64",
                            name: "confirmations",
                            type: "uint64",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "batchNum",
                            type: "uint256",
                        },
                        {
                            internalType: "uint64",
                            name: "index",
                            type: "uint64",
                        },
                    ],
                    name: "legacyLookupMessageBatchProof",
                    outputs: [
                        {
                            internalType: "bytes32[]",
                            name: "proof",
                            type: "bytes32[]",
                        },
                        {
                            internalType: "uint256",
                            name: "path",
                            type: "uint256",
                        },
                        {
                            internalType: "address",
                            name: "l2Sender",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "l1Dest",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "l2Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "l1Block",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "timestamp",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256",
                        },
                        {
                            internalType: "bytes",
                            name: "calldataForL1",
                            type: "bytes",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "nitroGenesisBlock",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "number",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "pure",
                    type: "function",
                },
            ],
        },
    },
} as const;
