import * as React from 'react'
import {Observer} from 'mobx-react-lite'

import {EvmWallet} from '@/modules/Account'

import './index.css'

export function Wallet(): JSX.Element {
    return (
        <Observer>
            {() => {
                return (
                    <EvmWallet/>
                )

            }}
        </Observer>
    )
}
