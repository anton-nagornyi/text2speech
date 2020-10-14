import * as React from "react";
import styled from "styled-components";

type SelectProps = {
    children: Array<HTMLOptionElement>;
}
export const Select: React.FC<SelectProps> = (props) =>
{
    return (
        <div>
            <select>{props.children}</select>
        </div>
    )
};

const Container = styled.div`
   select {
      display: none;
   }
   background-color: DodgerBlue;
   
   &:after {
      position: absolute;
      content: "";
      top: 14px;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: #fff transparent transparent transparent;
   }
`;
