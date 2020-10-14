import * as React from "react";
import styled from "styled-components";

type StopButtonProps = {
    onClick: Function;
}
export const ButtonStop: React.FC<StopButtonProps> = (props) =>
{
    return (
        <Container onClick={() => props.onClick()}/>
    )
};

const Container = styled.div`
  border-radius: 50%;
  background-image: url("stopIcon.svg");
  background-color: #D75A4A;
  width: 50px;
  height: 50px;
  box-shadow: none;
  transition: box-shadow 0.3s ease-in-out;  
  &:hover {
        box-shadow: 0px 0px 3px 3px hsl(7, 64%, 77%);
        transition: box-shadow 0.3s ease-in-out;
  }
  &:active {
    opacity: 0.8;
  }
`;