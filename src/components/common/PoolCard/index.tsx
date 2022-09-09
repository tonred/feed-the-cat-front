import * as React from 'react'
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Clock, Meter, Stack, Tag, Text} from "grommet";
import {useMemo} from "react";
import moment from "moment";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

type Props = {
    address: string;
    id: number;
    title: string;
    raised: string;
    needed: string;
    raisedPercentage: number;
    currency: string;
    endTime: Date;
    tags?: string[];
}

export function PoolCard({
                             address,
                             id,
                             title,
                             raised,
                             needed,
                             raisedPercentage,
                             currency,
                             endTime,
                             tags
                         }: Props): JSX.Element {
    const intl = useIntl()
    const navigate = useNavigate();
    const diff = useMemo(() => moment.duration(endTime.getTime() - new Date().getTime()), [endTime])
    const diffDays = diff.asDays();
    let clock;
    if (diffDays < 0) {
        clock = <Text>{intl.formatMessage({id: 'FINISHED_POOL'})}</Text>;
    } else if (diffDays > 1) {
        clock = <Text>{intl.formatMessage({id: 'POOL_N_DAYS_LEFT'}, {days: diffDays.toFixed(0)})}</Text>;
    } else {
        clock = <Clock type="digital" run="backward" time={diff.toISOString()}/>
    }
    return (
        <Card height="small" width="medium" background="light-1"
              onClick={() => navigate(`/pool/${address}`,)}>
            <CardHeader pad="medium">
                <Box direction="row" justify="between" align="center" flex="grow">
                    <Box direction="row" align="center">
                        <Text size="small">{intl.formatMessage({id: 'POOL_CARD_TITLE'}, {poolId: id})}</Text>
                        <Text weight="bold">{title}</Text>
                    </Box>
                    {clock}
                </Box>
            </CardHeader>
            <CardBody pad="small">

            </CardBody>
            <CardFooter pad={{horizontal: "small"}} background="light-2">
                <Box>
                    <Box
                        pad={{top: "small", left: "small", right: "small"}}
                        direction="row"
                        justify="between"
                        align="center"
                        flex="grow"
                    >
                        <Text size="small">
                            {intl.formatMessage({id: 'POOL_CARD_RAISED'}, {amount: raised})}
                            <Text size="xsmall"> {currency}</Text>
                        </Text>
                        <Text size="small">
                            {intl.formatMessage({id: 'POOL_CARD_NEEDED'}, {amount: needed})}
                            <Text size="xsmall"> {currency}</Text>
                        </Text>
                    </Box>
                    <Box align="center" pad="small">
                        <Stack anchor="center">
                            <Meter
                                type="bar"
                                background="light-4"
                                values={[{value: raisedPercentage}]}
                            />
                            <Box direction="row" align="center" pad={{bottom: 'xsmall'}}>
                                <Text size="xlarge" weight="bold">
                                    {raisedPercentage.toFixed(2)}
                                </Text>
                                <Text size="small">%</Text>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </CardFooter>
        </Card>
    )
}