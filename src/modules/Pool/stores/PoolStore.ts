import {makeAutoObservable} from "mobx";
import {fundingContract} from "@/misc/eth-contracts";
import {error} from "@/utils";
import useRpc from "@/hooks/useRpc";
import {PoolState, PoolData, NFT} from "../types";
import {Contract} from "web3-eth-contract";


export type PoolStoreData = {
    contract?: Contract;
    data?: PoolData;
}

export type PoolStoreState = {
    loading?: boolean;
}

export class PoolStore {

    protected data: PoolStoreData = {}

    protected _state: PoolStoreState = {}

    constructor() {
        makeAutoObservable(this)
    }

    public async fetch(address: string): Promise<void> {
        if (this._state.loading) {
            return
        }

        this.setLoading(true)

        try {
            const contract = fundingContract(address, useRpc);
            const fullInfo = await contract.methods.fullInfo().call();
            const poolData: PoolData = {
                id: 0,
                addr: address,
                title: fullInfo.info.title,
                target: fullInfo.info.target,
                balance: fullInfo.balance,
                finishTime: fullInfo.finishTime,
                state: parseInt(fullInfo.state),
                //
                spender: fullInfo.info.spender,
                collection: fullInfo.collection,
                startTime: fullInfo.startTime,
                description: fullInfo.info.description,
                files: fullInfo.files,
                nfts: fullInfo.nfts,
                reports: fullInfo.reports,
                top1: fullInfo.top1,
                top2: fullInfo.top2,
                top3: fullInfo.top3,
            }
            console.log(poolData)
            this.setData({contract: contract, data: poolData})
        } catch (e) {
            error(e)
        }

        this.setLoading(false)
    }

    protected setData(data: PoolStoreData): void {
        this.data = data;
    }

    protected setLoading(loading: boolean): void {
        this._state.loading = loading
    }

    public get loading(): boolean | undefined {
        return this._state.loading
    }

    public get contract(): Contract | undefined {
        return this.data.contract;
    }

    public get id(): number | undefined {
        return this.data.data?.id;
    }

    public get title(): string | undefined {
        return this.data.data?.title;
    }

    public get description(): string | undefined {
        return this.data.data?.description;
    }

    public get target(): number | undefined {
        return this.data.data?.target;
    }

    public get balance(): number | undefined {
        return this.data.data?.balance;
    }

    public get state(): PoolState | undefined {
        return this.data.data?.state;
    }

    public get spender(): string | undefined {
        return this.data.data?.spender;
    }

    public get startTime(): number | undefined {
        return this.data.data?.startTime;
    }

    public get finishTime(): number | undefined {
        return this.data.data?.finishTime;
    }

    public get nfts(): NFT[] | undefined {
        return this.data.data?.nfts;
    }

    public get collection(): string | undefined {
        return this.data.data?.collection;
    }

    //
    // public get active(): PoolDataSimple[] | undefined {
    //     return this.data.pools?.filter((p) => p.state == PoolState.ACTIVE);
    // }
    //
    // public get finished(): PoolDataSimple[] | undefined {
    //     return this.data.pools?.filter((p) => p.state == PoolState.FINISHED);
    // }
    //
    // public get pending(): PoolDataSimple[] | undefined {
    //     return this.data.pools?.filter((p) => p.state == PoolState.PENDING);
    // }
    //
    // public get totalCount(): number | undefined {
    //     return 0
    //     // return this.data.response?.totalCount
    // }
}