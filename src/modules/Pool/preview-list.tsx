import {useEffect, useState} from "react";
import {Box, Paragraph, Spinner, Text} from "grommet";
import {Observer} from 'mobx-react-lite'
import {PoolCard} from "@/components/common/PoolCard";
import {usePools} from "@/hooks/usePools";
import {FUNDING_TOKEN, rootAddress} from "@/config";
import {error, formattedTokenAmount} from "@/utils";
import * as React from "react";
import {useIntl} from "react-intl";
import {PoolDataSimple} from "@/modules/Pool/types";

export default function PoolPreviewList(): JSX.Element {
    const intl = useIntl()

    const poolsStore = usePools();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true)
        poolsStore.fetch(rootAddress).catch((e) => error(e)).then(() => setLoading(false))

    }, [])

    const pools = (pools: PoolDataSimple[] | undefined) => {
        return pools?.map((p) => {
            return (
                <PoolCard
                    key={p.id}
                    address={p.addr}
                    id={p.id}
                    title={p.title}
                    raised={formattedTokenAmount(p.balance, FUNDING_TOKEN.decimals)}
                    needed={formattedTokenAmount(p.target, FUNDING_TOKEN.decimals)}
                    raisedPercentage={(p.balance / p.target) * 100}
                    currency={FUNDING_TOKEN.symbol}
                    endTime={new Date(p.finishTime * 1000)}
                />
            )
        })
    }
    return loading ? (
        <Spinner size="large"/>
    ) : (
        <Observer>
            {() => (
                <>
                    {(poolsStore.active?.length || 0) > 0 && (
                        <Box align="center">
                            <Paragraph>
                                {intl.formatMessage({
                                    id: 'HOME_PAGE_ACTIVE_POOL_LIST_TITLE',
                                })}
                            </Paragraph>
                            <Box
                                justify="center"
                                align="center"
                                direction="row-responsive"
                                gap="medium"
                            >
                                {pools(poolsStore.active)}
                            </Box>
                        </Box>
                    )}

                    {(poolsStore.finished?.length || 0) > 0 && (
                        <Box align="center">
                            <Paragraph>
                                {intl.formatMessage({
                                    id: 'HOME_PAGE_FINISHED_POOL_LIST_TITLE',
                                })}
                            </Paragraph>
                            <Box
                                justify="center"
                                align="center"
                                direction="row-responsive"
                                gap="medium"
                            >
                                {pools(poolsStore.finished)}
                            </Box>
                        </Box>
                    )}

                    {(poolsStore.pending?.length || 0) > 0 && (
                        <Box align="center">
                            <Paragraph>
                                {intl.formatMessage({
                                    id: 'HOME_PAGE_PENDING_POOL_LIST_TITLE',
                                })}
                            </Paragraph>
                            <Box
                                justify="center"
                                align="center"
                                direction="row-responsive"
                                gap="medium"
                            >
                                {pools(poolsStore.pending)}
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Observer>
    )

}
