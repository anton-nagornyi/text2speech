import * as React from "react";

type AppContextType = {
    more: boolean
}
export const AppContext = React.createContext<AppContextType>({more: false});

type PlayerContextType = {
    textToSay: string,
    setTextTosay: (text: string) => void
}
export const PlayerContext = React.createContext<PlayerContextType>({textToSay: "", setTextTosay: () => {}});