import * as React from 'react'
import {useIntl} from 'react-intl'
import PoolPreviewList from "@/modules/Pool/preview-list";
import {Heading} from "grommet";

export default function Page(): JSX.Element {
    const intl = useIntl()

    return (
        <>
            <Heading textAlign="center">
                {intl.formatMessage({
                    id: 'HOME_PAGE_TITLE',
                })}
            </Heading>

            <PoolPreviewList/>
        </>
    )
}