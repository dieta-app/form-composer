import styled from "styled-components";
import Color from "color";

export const Button = styled.button`
  box-sizing: border-box;
  font-family: ${props => props.theme.font};
  -webkit-font-smoothing: antialiased;
  height: ${props => props.height};
  text-align: center;
  width: ${props => props.width};
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: ${props => props.theme.colors[props.bg]};
  color: ${props => props.theme.colors[props.color]};
  border-width: 0;
  border-radius: 50px;
  &:disabled,
  &[disabled] {
    background-color: ${props => props.theme.colors.MID};
  }
  &:hover:enabled {
    cursor: pointer;
    background-color: ${props =>
      Color(props.theme.colors[props.bg])
        .darken(0.1)
        .rgb()
        .round()
        .string()};
  }
`;

Button.defaultProps = {
  bg: "PRIMARY_LIGHT",
  color: "WHITE",
  height: "40px",
  width: "100%"
};
