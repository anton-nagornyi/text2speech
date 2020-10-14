import * as React from "react";
import styled from "styled-components";

type PlayButtonProps = {
    onClick: Function;
}
export const ButtonPlay: React.FC<PlayButtonProps> = (props) =>
{
    return (
        <Container onClick={() => props.onClick()}/>
    )
};

const Container = styled.div`
  border-radius: 50%;
  background-image: url("playIcon.svg");
  background-color: #1b7dfa;
  width: 50px;
  height: 50px;
  box-shadow: none;
  transition: box-shadow 0.3s ease-in-out;  
  &:hover {
        box-shadow: 0px 0px 3px 3px hsl(214, 96%, 74%);
        transition: box-shadow 0.3s ease-in-out;
  }
  &:active {
    opacity: 0.8;
  }
`;