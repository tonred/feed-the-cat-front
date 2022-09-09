import * as React from 'react'
import {Observer} from 'mobx-react-lite'
import {useIntl} from 'react-intl'
import {Box, Button} from "grommet";
import {Logout} from 'grommet-icons'

import {useEvmWallet} from '@/stores/EvmWalletService'
import {findNetwork, formattedTokenAmount, sliceAddress} from '@/utils'

export function EvmWallet(): JSX.Element | null {
    const intl = useIntl()
    const wallet = useEvmWallet()

    return (
        <Observer>
            {() => {
                const network = findNetwork(wallet.chainId, 'evm')
                return (
                    <>
                        {!wallet.isConnected ? (
                            <Button
                                label={intl.formatMessage({
                                    id: 'WALLET_CONNECT_BTN_TEXT',
                                })}
                                disabled={wallet.isConnecting}
                                aria-disabled={wallet.isConnecting}
                                onClick={wallet.connect}
                            />
                        ) : (
                            <Box direction={"row"}>
                                {wallet.balance !== undefined ? (
                                    <Button
                                        primary
                                        tip={intl.formatMessage({
                                            id: 'WALLET_DISCONNECT_BTN_TEXT',
                                        })}
                                        onClick={wallet.disconnect}
                                        label={sliceAddress(wallet.address) + '   ' + intl.formatMessage({
                                            id: 'WALLET_BALANCE_HINT',
                                        }, {
                                            value: formattedTokenAmount(
                                                wallet.balance,
                                                18,
                                                {
                                                    truncate: 3,
                                                    roundOn: false,
                                                },
                                            ),
                                            currency: network?.currencySymbol || 'ETH',
                                        })}
                                    />
                                ) : (
                                    <Button
                                        onClick={wallet.disconnect}
                                        label={sliceAddress(wallet.address)}
                                    />
                                )}
                            </Box>
                        )}
                    </>
                )
            }}
        </Observer>
    )
}
