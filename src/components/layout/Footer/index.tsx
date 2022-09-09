import * as React from 'react'
import {Button, Menu, Footer as GFooter, Text} from "grommet";

export function Footer(): JSX.Element {
    return (
        <GFooter background="brand" pad="medium">
            <Text>Copyright</Text>
        </GFooter>
    )
}
