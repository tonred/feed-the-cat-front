import WalletConnectProvider from '@walletconnect/web3-provider'
import {action, computed, makeAutoObservable, makeObservable} from 'mobx'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import type {ICoreOptions} from 'web3modal'
import BigNumber from 'bignumber.js'

import {BaseStore} from './BaseStore'
import type {NetworkShape, WalletNativeCoin} from '@/types'
import {throwException} from "@/utils";
import {debug, error, log} from "@/utils";
import {FUNDING_TOKEN, NETWORK_ID, networks, rootAddress} from "@/config";
import {findNetwork} from "@/utils";
import {Contract} from "web3-eth-contract";
import {EvmWalletService} from "@/stores/EvmWalletService";
import {erc20TokenContract} from "@/misc/eth-contracts";
import useRpc from "@/hooks/useRpc";
import {EthAbi} from "@/misc/abi";


export type FundingStoreState = {
    isPending: boolean;
}

export class FundingStore {
    protected state: FundingStoreState = {isPending: false}

    constructor(
        protected readonly evmWallet: EvmWalletService,
    ) {

        makeAutoObservable(this)


        // this.init().catch(reason => {
        //     error(reason)
        // })
    }

    protected setPending(value: boolean): void {
        this.state.isPending = value
    }

    public get isPending(): boolean {
        return this.state.isPending
    }

    public async donate(amount: number, funding: string): Promise<void> {
        if (!this.evmWallet.address || this.isPending) return
        this.setPending(true)
        const needApprove = await this.needApprove(amount, funding);
        if (needApprove === undefined) return
        if (needApprove) {
            if (await this.approveAmount(amount, funding)) {
                await this._donate(amount, funding)
            }
        } else {
            await this._donate(amount, funding)
        }
        this.setPending(false)
    }

    protected async _donate(amount: number, funding: string): Promise<void> {
        let tries = 0

        const send = async (transactionType?: string) => {
            if (
                tries >= 2
                || this.evmWallet.address === undefined
                || this.evmWallet.web3 === undefined
            ) {
                return
            }

            try {
                tries += 1

                let r

                const fundingContract = new this.evmWallet.web3.eth.Contract(EthAbi.Funding, funding)

                r = fundingContract.methods.donateDefault(amount)

                if (r !== undefined) {
                    const gas = await r.estimateGas({
                        from: this.evmWallet.address,
                        type: transactionType,
                    })
                    await r.send({
                        from: this.evmWallet.address,
                        type: transactionType,
                        gas,
                    })
                }
            } catch (e: any) {
                if (
                    /eip-1559/g.test(e.message.toLocaleString())
                    && transactionType !== undefined && transactionType !== '0x0'
                ) {
                    error('Donation error. Try with transaction type 0x0', e)
                    await send('0x0')
                } else {
                    error('Donation error', e)
                }
            }
        }

        await send(findNetwork(NETWORK_ID, 'evm')!.transactionType)
    }

    protected async needApprove(amount: number, dest: string): Promise<boolean | undefined> {
        try {
            const allowance = await erc20TokenContract(FUNDING_TOKEN.address, useRpc)
                .methods.allowance(
                    this.evmWallet.address,
                    dest,
                )
                .call()

            const approvalDelta = new BigNumber(allowance).minus(amount)
            return approvalDelta.lt(0);

        } catch (e) {
            error('Check allowance error', e)
        } finally {
        }
    }

    protected async approveAmount(amount: number, dest: string): Promise<boolean> {
        let tries = 0

        const send = async (transactionType?: string): Promise<boolean> => {
            if (
                tries >= 2
                || this.evmWallet.web3 === undefined
            ) {
                return false
            }

            try {
                tries += 1

                let r

                const tokenContract = new this.evmWallet.web3.eth.Contract(EthAbi.ERC20, FUNDING_TOKEN.address)


                r = tokenContract.methods.approve(dest, amount)

                if (r !== undefined) {
                    const gas = await r.estimateGas({
                        from: this.evmWallet.address,
                        type: transactionType,
                    })
                    await r.send({
                        from: this.evmWallet.address,
                        type: transactionType,
                        gas,
                    })
                    return true
                }
            } catch (e: any) {
                if (
                    /eip-1559/g.test(e.message.toLowerCase())
                    && transactionType !== undefined && transactionType !== '0x0'
                ) {
                    error('Approve error. Try with transaction type 0x0', e)
                    return await send('0x0')
                } else {
                    error('Approve error', e)
                }
            }
            return false
        }

        return await send(findNetwork(NETWORK_ID, 'evm')!.transactionType)
    }


}
