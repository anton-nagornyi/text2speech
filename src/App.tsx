import React from 'react';
import './App.css';
import {Player} from "./componets/player";
import {PlayerDataProvider} from "./context/playerDataContext";
import {ButtonMore} from "./componets/buttonMore";
import {AppProvider} from "./context/appContext";
import {TextArea} from "./componets/textArea";

export const App = () =>
{
    return (
        <AppProvider>
            <PlayerDataProvider>
                <header>
                    <img className="logo" src="logo.png" alt="eyeControl"/>
                    <Player text={"Hello world"}/>
                    <ButtonMore>More</ButtonMore>
                </header>
                <TextArea/>
            </PlayerDataProvider>
        </AppProvider>
    );
};
