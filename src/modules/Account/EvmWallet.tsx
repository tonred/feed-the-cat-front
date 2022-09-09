import * as React from 'react'
import {observer, Observer} from 'mobx-react-lite'
import {useIntl} from 'react-intl'
import {Box, Button} from "grommet";

import {useEvmWallet} from '@/stores/EvmWalletService'
import {findNetwork, formattedTokenAmount, sliceAddress} from '@/utils'
import {WrongNetworkError} from "@/modules/Account/WrongNetwork";
import {NETWORK_ID} from "@/config";

function EvmWalletA(): JSX.Element | null {
    const intl = useIntl()
    const wallet = useEvmWallet()
    const network = findNetwork(NETWORK_ID, 'evm')!
    const wrongNetwork = (
        wallet.isReady
        && network !== undefined
        && network.chainId !== wallet.chainId
    )
    if (wrongNetwork) {
        return (
            <Observer>
                {() => {
                    return (
                        <WrongNetworkError
                            network={network}
                            wallet={wallet}/>
                    )
                }}
            </Observer>)
    }

    return (
        <Observer>
            {() => {
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

export const EvmWallet = observer(EvmWalletA)
