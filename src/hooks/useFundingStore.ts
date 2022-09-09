import * as React from 'react'
import {FundingStore} from "@/stores/FundingStore";
import {EvmWalletService} from "@/stores/EvmWalletService";


export function useFundingStore(evmWallet: EvmWalletService): FundingStore {
    const ref = React.useRef<FundingStore>()
    ref.current = ref.current || new FundingStore(evmWallet)
    return ref.current
}