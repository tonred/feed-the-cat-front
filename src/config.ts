import {NetworkShape, RewardNft, Token} from "./types";

export const NETWORK_ID = '137';

export const rootAddress = "0xd4FA89528eeE80a6F5c0AEDE34d26e324F23c0E5";

export const FUNDING_TOKEN: Token<string> = {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
    symbol: "USDT",
}

export const networks: NetworkShape[] = [
    {
        chainId: '137',
        currencySymbol: 'MATIC',
        explorerBaseUrl: 'https://polygonscan.com/',
        id: 'evm-137',
        label: 'Polygon',
        name: 'Polygon',
        rpcUrl: 'https://polygon-rpc.com',
        transactionType: '0x0',
        type: 'evm',
    },
    {
        chainId: '31337',
        currencySymbol: 'ETH',
        explorerBaseUrl: 'https://polygonscan.com/',
        id: 'evm-31337',
        label: 'Local',
        name: 'Local',
        rpcUrl: 'http://localhost:8545/',
        transactionType: '0x0',
        type: 'evm',
    }
];
export const rewardsNftGlobal: RewardNft[] = [];

export const rewardsNft: Record<number, RewardNft[]> = {
    0: [
        {
            id: 0,
            name: 'Pleading Cat',
            image: 'https://bafkreict6wnuozr4ypktyshzxkxg3tkeb3pktv7qakpc3lrcwzl2xiu36a.ipfs.nftstorage.link/'
        },
        {
            id: 1,
            name: 'Fishercat',
            image: 'https://bafkreihm6fluxdt3tbysipycfzxxw5c7ykyll6f2pkmn47wvkjgkgz7jc4.ipfs.nftstorage.link/'
        },

    ]
}
