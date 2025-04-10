import { createConfig } from "ponder";
import { erc20Abi, http } from "viem";
// import deployedContracts from "../nextjs/contracts/deployedContracts";
// import scaffoldConfig from "../nextjs/scaffold.config";

// const targetNetwork = scaffoldConfig.targetNetworks[0];

// const networks = {
//   [targetNetwork.name]: {
//     chainId: targetNetwork.id,
//     transport: http(process.env[`PONDER_RPC_URL_${targetNetwork.id}`]),
//   },
// };

// const contractNames = Object.keys(deployedContracts[targetNetwork.id]);

// const contracts = Object.fromEntries(contractNames.map((contractName) => {
//   return [contractName, {
//     network: targetNetwork.name as string,
//     abi: deployedContracts[targetNetwork.id][contractName].abi,
//     address: deployedContracts[targetNetwork.id][contractName].address,
//     startBlock: deployedContracts[targetNetwork.id][contractName].startBlock || 0,
//   }];
// }));

if (!process.env.START_BLOCK_BSC!) {
    throw new Error("Please set the START_BLOCK_BSC environment variable");
}

if (!process.env.START_BLOCK_EDU!) {
    throw new Error("Please set the START_BLOCK_EDU environment variable");
}

export const networks = {
    BSC: {
        chainId: 56,
        transport: http(process.env.PONDER_RPC_URL_56),
        pollingInterval: 3_000,
        maxRequestsPerSecond: 10,
    },
    EDUChain: {
        chainId: 41923,
        transport: http(process.env.PONDER_RPC_URL_41923),
    },
} as const;

export default createConfig({
    networks,
    contracts: {
        EDUCoinBSC: {
            network: "BSC",
            abi: erc20Abi,
            address: "0xBdEAe1cA48894A1759A8374D63925f21f2Ee2639",
            startBlock: Number(process.env.START_BLOCK_BSC),
        },
    },
    blocks: {
        MonitorNativeEDUTransfers: {
            network: "EDUChain",
            interval: 1,
            startBlock: Number(process.env.START_BLOCK_EDU),
            
        },
    },
});
