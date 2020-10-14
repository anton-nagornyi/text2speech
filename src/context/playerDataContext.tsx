import * as React from "react"

type Dispatch = (state: State) => void
type State = {textToSay: string}
type PlayerDataProviderProps = {children: React.ReactNode}
const PlayerDataStateContext = React.createContext<State | undefined>(undefined);
const PlayerDataDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const PlayerDataProvider = ({children}: PlayerDataProviderProps) =>
{
    const [state, dispatch] = React.useState<State>({textToSay: ""});

    return (
        <PlayerDataStateContext.Provider value={state}>
            <PlayerDataDispatchContext.Provider value={dispatch}>
                {children}
            </PlayerDataDispatchContext.Provider>
        </PlayerDataStateContext.Provider>
    )
};

const usePlayerDataState = () =>
{
    const context = React.useContext(PlayerDataStateContext);
    if (context === undefined) 
    {
        throw new Error("usePlayerDataState must be used within a PlayerDataProvider")
    }
    return context
};

const usePlayerDataDispatch = () => 
{
    const context = React.useContext(PlayerDataDispatchContext);
    if (context === undefined) 
    {
        throw new Error("usePlayerDataDispatch must be used within a PlayerDataProvider")
    }
    return context
};
export {PlayerDataProvider, usePlayerDataState, usePlayerDataDispatch}