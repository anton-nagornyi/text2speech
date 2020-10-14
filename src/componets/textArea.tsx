import * as React from "react";
import {usePlayerDataDispatch} from "../context/playerDataContext";
import styled from "styled-components";
import {useAppDataDispatch, useAppState} from "../context/appContext";

export const TextArea = () =>
{
    const appState = useAppState();
    const playerDispatch = usePlayerDataDispatch();
    const appDispatch = useAppDataDispatch();

    if (!appState.showTextInput) return null;

    return (
        <Container>
            <Header><Close onClick={() => appDispatch({...appState, showTextInput: false})}/></Header>
            <Textarea autoFocus={true} onChange={(text) => playerDispatch({textToSay: text.target.value})}/>
        </Container>
    )
};

const Close = styled.div`
    background-image: url("close.png");
    width: 24px;
    height: 20px;
    right: 16px;
    position:absolute;
`;
const Header = styled.div`
    height: 60px;
`;
const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    margin: 32px auto 0 auto;
    width: 66%;
    height: 400px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 5px 24px 4px rgb(160, 160, 160);
    padding: 25px;
`;

const Textarea = styled.textarea`
    border: 0;
    resize: none;
    font-size: 20px;
    line-height: 40px;
    &:focus {
        outline: none;
    }
`;
