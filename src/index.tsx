import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from '@/App';
import {LocalizationProvider} from "@/context/Localization";
import "@/styles/index.css"
import "@/styles/font.css"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LocalizationProvider>
                <App/>
            </LocalizationProvider>
        </BrowserRouter>
    </React.StrictMode>
);