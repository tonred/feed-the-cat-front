import {useIntl} from "react-intl";
import {NetworkShape} from "@/types";
import {EvmWalletService} from "@/stores/EvmWalletService";
import {Button} from "grommet";

type Props = {
    className?: string;
    network: NetworkShape;
    wallet: EvmWalletService;
}

export function WrongNetworkError({className, network, wallet}: Props): JSX.Element {
    const intl = useIntl()

    const onChangeNetwork = async () => {
        await wallet.changeNetwork?.(network.chainId)
    }

    return (
        <Button
            primary
            color="status-error"
            onClick={onChangeNetwork}
            label={intl.formatMessage({
                id: 'EVM_WALLET_WRONG_NETWORK_BTN_TEXT',
            })}
        />

    )
}