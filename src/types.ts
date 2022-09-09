export type WalletNativeCoin = {
    balance?: string;
    decimals: number;
    icon?: string;
    name?: string;
    symbol: string;
}

export interface Token<Addr = unknown> {
    address: Addr;
    decimals: number;
    logoURI?: string;
    name?: string;
    symbol: string;
}

export type NetworkType = 'evm'

export type NetworkShape = {
    badge?: string;
    chainId: string;
    currencySymbol: string;
    disabled?: boolean;
    explorerBaseUrl: string;
    id: string;
    label: string;
    name: string;
    rpcUrl: string;
    tokenType?: string;
    transactionType?: string;
    type: NetworkType;
}

export type RewardNft = {
    id: number;
    name: string;
    image: string;
}
