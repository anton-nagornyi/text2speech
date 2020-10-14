import * as React from "react"

type Dispatch = (state: State) => void
type State = {showTextInput: boolean}
type AppProviderProps = {children: React.ReactNode}
const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider = ({children}: AppProviderProps) =>
{
    const [state, dispatch] = React.useState<State>({showTextInput: true});

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
};

const useAppState = () =>
{
    const context = React.useContext(AppStateContext);
    if (context === undefined) 
    {
        throw new Error("useAppState must be used within a PlayerDataProvider")
    }
    return context
};

const useAppDataDispatch = () =>
{
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) 
    {
        throw new Error("useAppDataDispatch must be used within a PlayerDataProvider")
    }
    return context
};
export {AppProvider, useAppState, useAppDataDispatch}