import * as React from 'react'
import {Button, Menu, Header as GHeader, Box} from "grommet";
import {Home as HomeIcon} from "grommet-icons/icons";
import {Wallet} from "@/components/layout/Wallet";
import {LangSwitcher} from "@/components/layout/LangSwitcher";
import {useNavigate} from "react-router-dom";
// import Media from 'react-media'
// import { Link } from 'react-router-dom'

export function Header(): JSX.Element {
    const navigate = useNavigate();


    return (
        <GHeader sticky={"scrollup"} pad="xsmall">
            <Button
                icon={<img
                    height="64"
                    alt='home'
                    src="/static/cat1_1.svg"
                    //@ts-ignore
                    onMouseOver={event => event.target.src = "/static/cat1_2.svg"}
                    //@ts-ignore
                    onMouseOut={event => event.target.src = "/static/cat1_1.svg"}
                />}
                onClick={() => navigate('/')}
            />
            {/*<Menu label="account" items={[{label: 'logout'}]}/>*/}
            <Box direction="row">
                <Wallet/>
                <LangSwitcher/>

            </Box>
        </GHeader>
    )
}