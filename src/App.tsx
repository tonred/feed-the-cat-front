import React, {useEffect} from 'react';
import {Box, Image, Grommet, Main} from 'grommet';
import {IntlProvider} from "react-intl";
import {
    Routes,
    Route,
} from "react-router-dom";
import {findNetwork, noop} from "@/utils";
import {LocalizationContext} from "@/context/Localization";
import theme from "@/styles/theme";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import Home from "@/pages/home";
import User from "@/pages/user";
import Pool from "@/pages/pools/item";
import Users from "@/pages/users";
import Pools from "@/pages/pools";
import {NETWORK_ID, rootAddress} from "@/config";
import {rootContract} from "@/misc/eth-contracts";
import {usePools} from "@/hooks/usePools";
import {usePool} from "@/hooks/usePool";


function App() {
    const localization = React.useContext(LocalizationContext)
    // useEffect(() => {
    //     // poolsStore.fetch(rootAddress)
    //     // console.log(rootContract(rootAddress, network.rpcUrl).methods.fundingsStatuses().call().then((r: any) => console.log(r)))
    //     // console.log(rootContract(rootAddress, network.rpcUrl).getPastEvents('NewFunding', {
    //     //     fromBlock: 0,
    //     //     toBlock: 'latest'
    //     // }).then((r: any) => console.log(r)))
    // }, [])
    return (
        <IntlProvider
            key="intl"
            defaultLocale="en"
            locale={localization.locale}
            messages={localization.messages}
            onError={noop}
        >
            <Grommet theme={theme}>
                <Header/>
                <Box pad="large" align="center">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="users" element={<Users/>}/>
                        <Route path="pools" element={<Pools/>}/>
                        <Route path="user" element={<User/>}>
                            <Route path=":userAddress" element={<User/>}/>
                        </Route>
                        <Route path="pool" element={<Pool/>}>
                            <Route path=":poolId" element={<Pool/>}/>
                        </Route>
                    </Routes>
                </Box>
                <Footer/>
            </Grommet>
        </IntlProvider>
    );
}

export default App;
