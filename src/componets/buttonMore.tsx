import * as React from "react";
import styled from "styled-components";
import {useAppDataDispatch, useAppState} from "../context/appContext";

type ButtonMoreProps = {
    children: string;
}
export const ButtonMore: React.FC<ButtonMoreProps> = (props) =>
{
    const state = useAppState();
    const dispatch = useAppDataDispatch();
    return (
        <Button className="noselect" onClick={() => dispatch({...state, showTextInput: !state.showTextInput})}>{props.children}<Icon active={state.showTextInput}/></Button>
    )
};

const Button = styled.div`
    padding-right: 16px;
    cursor: pointer;
`;

type IconProps = {
    active: boolean
}
const Icon = styled.div<IconProps>`
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAQAAACWu2SvAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkCg4OEjchuWRwAAAAQElEQVQI14XNQQqAIABE0Xch1yoUGHn/e6iXaFciUX81MPwZPgninaPwFElXQNGl2dk1h01zrnPVMNS3pyz75wI5Igks3rI6PAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMC0xNFQxNDoxODo1NSswMDowMK9b72cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTAtMTRUMTQ6MTg6NTUrMDA6MDDeBlfbAAAAAElFTkSuQmCC) no-repeat;
    width: 12px;
    height: 8px;
    transform: scale(1, ${props => props.active ? -1 : 1});
    margin-left: 8px;
`;
