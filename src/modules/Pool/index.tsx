import * as React from 'react'
import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate, useParams} from "react-router-dom";
import {isAddress} from "web3-utils"
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Markdown,
    MaskedInput,
    Meter,
    Spinner,
    Stack,
    Tag,
    Text
} from "grommet";
import {usePool} from "@/hooks/usePool";
import {Observer} from 'mobx-react-lite';
import {PoolState} from "@/modules/Pool/types";
import {FUNDING_TOKEN, rewardsNft} from "@/config";
import {formattedTokenAmount} from "@/utils";
import {BlockScanAddressLink} from "@/components/common/BlockExplorerLinkAddress";
import {useEvmWallet} from "@/stores/EvmWalletService";
import {useFundingStore} from "@/hooks/useFundingStore";
import BigNumber from "bignumber.js";
import moment from "moment";
import {NftCard} from "@/components/common/NftCard";
import {PoolStore} from "@/modules/Pool/stores/PoolStore";
import {RewardNft} from "@/types";

export default function Pool(): JSX.Element {
    const intl = useIntl()
    const params = useParams();
    const navigate = useNavigate();
    const poolStore = usePool();
    const evmWallet = useEvmWallet();
    const fundingStore = useFundingStore(evmWallet);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(5);
    const poolId = params.poolId!;
    useEffect(() => {
        if (!isAddress(poolId)) {
            navigate("/", {replace: true});
        }
        setLoading(true)
        poolStore.fetch(poolId).then(() => setLoading(false))

    }, [poolId])

    const nftCards = (poolStore: PoolStore) => {
        if (poolStore.id === undefined) return
        const nftsData: RewardNft[] = rewardsNft[poolStore.id]
        return poolStore.nfts?.map((nft, index) => {
            const nftData = nftsData[index];
            return <NftCard
                key={index}
                global={false}
                id={index}
                title={nftData.name}
                minAmount={nft[0]!}
                minCount={nft[1]!}
                src={nftData.image}
            />
        })
    }
    return loading ? (
        <Spinner size="large"/>
    ) : (
        <Observer>
            {() => (
                <>
                    <Box pad="small" gap="medium" fill>
                        <Box direction="row-responsive" gap="medium">
                            <Box fill>
                                <Card pad="medium" fill background="dark-2" gap="medium">
                                    <CardHeader>
                                        <Box direction="row" justify="between" align="center" flex="grow">
                                            <Text size="xlarge" weight="bold">{poolStore.title}</Text>
                                            <Tag value={PoolState[poolStore.state || 0]}/>
                                        </Box>
                                    </CardHeader>
                                    <CardBody gap="xsmall">
                                        <Text>{intl.formatMessage({id: 'POOL_START_TIME'})}: {
                                            poolStore.startTime ? moment(poolStore.startTime * 1000).format('lll') : ''
                                        }</Text>
                                        <Text>{intl.formatMessage({id: 'POOL_FINISH_TIME'})}: {
                                            poolStore.finishTime ? moment(poolStore.finishTime * 1000).format('lll') : ''
                                        }</Text>
                                    </CardBody>
                                    <CardFooter>
                                        <Text>
                                            {intl.formatMessage({id: "SPENDER_TITLE"})}
                                            <BlockScanAddressLink address={poolStore.spender || ''}/>
                                        </Text>

                                    </CardFooter>
                                </Card>
                            </Box>
                            <Box fill>
                                <Card pad="small" fill background="light-2" gap="medium">
                                    <CardBody>
                                        <Box direction="row" justify="between" align="center" flex="grow">
                                            <Text size="large">
                                                {intl.formatMessage(
                                                    {id: 'POOL_CARD_RAISED'},
                                                    {amount: formattedTokenAmount(poolStore.balance, FUNDING_TOKEN.decimals)}
                                                )}
                                                <Text size="medium"> {FUNDING_TOKEN.symbol}</Text>
                                            </Text>
                                            <Text size="large">
                                                {intl.formatMessage(
                                                    {id: 'POOL_CARD_NEEDED'},
                                                    {amount: formattedTokenAmount(poolStore.target, FUNDING_TOKEN.decimals)}
                                                )}
                                                <Text size="medium"> {FUNDING_TOKEN.symbol}</Text>
                                            </Text>
                                        </Box>
                                        <Box align="center" pad="small">
                                            <Stack anchor="center">
                                                <Meter
                                                    size="large"
                                                    type="bar"
                                                    background="light-4"
                                                    values={[{value: poolStore.target ? (poolStore.balance! / poolStore.target) * 100 : 0}]}
                                                />
                                                <Box direction="row" align="center" pad={{bottom: 'xsmall'}}>
                                                    <Text size="xlarge" weight="bold">
                                                        {(poolStore.target ? (poolStore.balance! / poolStore.target) * 100 : 0).toFixed(2)}
                                                    </Text>
                                                    <Text size="small">%</Text>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </CardBody>
                                    <CardFooter>
                                        <Box fill direction="row-responsive" align="center" gap="small" pad="small">
                                            <MaskedInput
                                                value={amount}
                                                onChange={(event) => {
                                                    setAmount(parseInt(event.target.value || '0'))
                                                }}
                                            />
                                            <Button
                                                size="large"
                                                disabled={poolStore.state !== PoolState.ACTIVE || fundingStore.isPending || amount <= 0}
                                                primary
                                                label={intl.formatMessage({id: "FUNDING_BUTTON_TEXT"})}
                                                onClick={() => fundingStore.donate(new BigNumber(amount).shiftedBy(FUNDING_TOKEN.decimals).toNumber(), poolId)}
                                            />
                                        </Box>
                                    </CardFooter>
                                </Card>
                            </Box>
                        </Box>
                        <Box fill>
                            <Card pad="medium" fill gap="medium" background="brand">
                                <CardHeader>
                                    <Text size="xlarge" weight="bold">
                                        {intl.formatMessage({id: "POOL_PAGE_REWARDS_TITLE"})}
                                    </Text>
                                </CardHeader>

                                <CardBody>
                                    <Box pad="small" gap="large" direction="row-responsive">
                                        {nftCards(poolStore)}
                                    </Box>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box fill>
                            <Card pad="medium" fill gap="medium" background="light-3">
                                <CardHeader>
                                    <Text size="xlarge" weight="bold">
                                        {intl.formatMessage({id: "POOL_PAGE_DESCRIPTION_TITLE"})}
                                    </Text>
                                </CardHeader>
                                <CardBody pad="small">
                                    <Markdown
                                        style={{lineHeight: "1.75em"}}>{poolStore.description || ''}</Markdown>
                                </CardBody>
                            </Card>
                        </Box>
                    </Box>
                </>
            )}
        </Observer>
    )
}