import * as React from 'react'
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Text} from "grommet";
import {useIntl} from "react-intl";
import {formattedAmount} from "@/utils";
import {FUNDING_TOKEN} from "@/config";

type Props = {
    id: number;
    title: string;
    global: boolean;
    minAmount: number;
    minCount: number;
    src: string;
}

export function NftCard({
                            id,
                            title,
                            global,
                            minAmount,
                            minCount,
                            src,
                        }: Props): JSX.Element {
    const intl = useIntl()
    return (
        <Card height="medium" width="medium" background="light-1">
            <CardHeader pad="small" justify="center">
                <Text weight="bold">{title}</Text>
            </CardHeader>
            <CardBody pad="small">
                <img height="100%" src={src} alt="nft"/>
            </CardBody>
            <CardFooter pad="small" background="light-2">
                <Text>
                    {minAmount !== 0
                        ? intl.formatMessage({id: 'NFT_CARD_REWARD_AMOUNT_TEXT'}, {
                            value: formattedAmount(minAmount, FUNDING_TOKEN.decimals),
                            currency: FUNDING_TOKEN.symbol
                        })
                        : intl.formatMessage({id: 'NFT_CARD_REWARD_COUNT_TEXT'}, {value: minCount})
                    }
                </Text>
            </CardFooter>
        </Card>
    )
}