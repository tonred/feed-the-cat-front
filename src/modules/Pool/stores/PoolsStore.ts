import {makeAutoObservable} from "mobx";
import {rootContract} from "@/misc/eth-contracts";
import {error} from "@/utils";
import useRpc from "@/hooks/useRpc";
import {PoolDataSimple, PoolState} from "../types";


export type PoolsStoreData = {
    pools?: PoolDataSimple[];
}

export type PoolsStoreState = {
    loading?: boolean;
}

export class PoolsStore {

    protected data: PoolsStoreData = {}

    protected state: PoolsStoreState = {}

    constructor() {
        makeAutoObservable(this)

        // this.handleProposals = lastOfCalls(handleProposals)
    }

    public async fetch(address: string): Promise<void> {
        if (this.state.loading) {
            return
        }

        this.setLoading(true)

        try {
            const pools: PoolDataSimple[] = [];
            const rawPools = await rootContract(address, useRpc).methods.fundingsDetails().call()
            for (let pool of rawPools) {
                // const values = event.returnValues;
                pools.push({
                    id: pool.id as number,
                    addr: pool.addr,
                    title: pool.title,
                    target: pool.target,
                    balance: pool.balance,
                    state: parseInt(pool.state),
                    finishTime: pool.finishTime
                })
            }

            this.setData({pools: pools})
        } catch (e) {
            error(e)
        }

        this.setLoading(false)
    }

    protected setData(data: PoolsStoreData): void {
        this.data = data;
    }

    protected setLoading(loading: boolean): void {
        this.state.loading = loading
    }

    public get loading(): boolean | undefined {
        return this.state.loading
    }

    public get pools(): PoolDataSimple[] | undefined {
        return this.data.pools;
    }

    public get active(): PoolDataSimple[] | undefined {
        return this.data.pools?.filter((p) => p.state === PoolState.ACTIVE);
    }

    public get finished(): PoolDataSimple[] | undefined {
        return this.data.pools?.filter((p) => p.state === PoolState.FINISHED);
    }

    public get pending(): PoolDataSimple[] | undefined {
        return this.data.pools?.filter((p) => p.state === PoolState.PENDING);
    }

    public get totalCount(): number | undefined {
        return 0
        // return this.data.response?.totalCount
    }
}