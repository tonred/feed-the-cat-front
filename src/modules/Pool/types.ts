export enum PoolState {
    PENDING,
    ACTIVE,
    EXPIRED ,
    FINISHED ,
}

export type File = {
    url: string;
    description: string;
}

export type NFT = {
    0?: number;
    1?: number;
    minAmount: number;
    minCount: number;
    onlyTop1: boolean;  // only for certain fundings
    onlyTop2: boolean;  // only for certain fundings
    onlyTop3: boolean;  // only for certain fundings
    special: boolean;  // only for global achievements
}

export type PoolDataSimple = {
    id: number;
    addr: string;
    title: string;
    target: number;
    balance: number;
    finishTime: number;
    state: PoolState;
}

export interface PoolData extends PoolDataSimple {
    spender: string;
    collection: string;
    startTime: number;
    description: string;
    files: File[];
    nfts: NFT[];
    reports: File[];
    top1: Rating;
    top2: Rating;
    top3: Rating;
}

export interface Rating {
    donator: string;
    amount: number;
}