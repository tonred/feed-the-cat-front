import * as React from 'react'
import {Button, Menu, Footer as GFooter, Text, Box} from "grommet";

export function Footer(): JSX.Element {
    return (
        <GFooter background="brand" pad="medium">
            <Box fill>
                <Text textAlign="center">Developed by @Abionics and @get_username</Text>
            </Box>
        </GFooter>
    )
}
