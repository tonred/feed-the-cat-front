import * as React from 'react'
import {LocalizationContext} from "@/context/Localization";
import {storage} from "@/utils";
import {Menu} from "grommet";


export function LangSwitcher(): JSX.Element {
    const language = React.useContext(LocalizationContext)

    const setEnglish = () => {
        storage.set('lang', 'en')
        language.setLocale('en')
    }

    const setUkrainian = () => {
        storage.set('lang', 'ua')
        language.setLocale('ua')
    }

    return (
        <Menu
            label={language.locale.toUpperCase()}
            items={[
                {label: 'English', onClick: () => setEnglish()},
                {label: 'Українська', onClick: () => setUkrainian()},
            ]}
        />
    )
}