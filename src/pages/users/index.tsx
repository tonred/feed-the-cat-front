import * as React from 'react'
import {useIntl} from 'react-intl'

export default function Page(): JSX.Element {
    const intl = useIntl()

    return (
        <h1>
            {intl.formatMessage({
                id: 'HELLO',
            })}
        </h1>
    )
}