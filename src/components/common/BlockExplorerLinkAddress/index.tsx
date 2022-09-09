import {useIntl} from "react-intl";
import {findNetwork, sliceAddress} from "@/utils";
import {NETWORK_ID} from "@/config";
import * as React from "react";

type Props = {
    address: string;
    children?: React.ReactNode | React.ReactNode[] | undefined;

}

export function BlockScanAddressLink({address, children}: Props): JSX.Element {
    const intl = useIntl()
    const explorerUrl = findNetwork(NETWORK_ID, 'evm')?.explorerBaseUrl
    return (
        <a
            href={`${explorerUrl}address/${address}`}
            title={intl.formatMessage({id: 'OPEN_IN_ETHERSCAN'})}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children || sliceAddress(address)}
        </a>
    )
}