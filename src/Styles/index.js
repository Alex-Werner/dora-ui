import styled, { createGlobalStyle } from "styled-components";

export const mobileWidth = 760;
export const mobile = str => `
  @media(max-width: ${mobileWidth}){
    ${str}
  }
`;

export const fib = n => [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89][n];
export const space = n => fib(n) + "px";
export const fontSize = n => 11 + fib(n) + "px";
export const colors = {
  text: "#402d00",
  white: "#fffefa",
  background: "#fffefa",
  primary: "#5c8cbf",
  secondary: "light.5",
  accent: "#fcec35",
  highlight: "#ffeb17",
  muted: "dark.0",
  dash: "#008DE4",
  error: "#ffb940"
};
export const fonts = {
  body: "'Roboto', sans-serif",
  brand: "'Nova Round', serif"
};

export const borderRadius = "2px";
export const border = color => `1px solid ${color}`;

export const light = n => `rgba(255,255,255,${0.1 * fib(n)})`;
export const dark = n => `rgba(0,0,0,${0.1 * fib(n)})`;

export const Container = styled.div`
  padding: 0 ${space(6)};
  width: 100%;
`;

export const Header = styled(Container)`
  display: flex;
  background: ${colors.primary};
  padding-right: 0;
  align-items: center;
  justify-content: space-between;
  color: ${colors.white};
`;

export const Logo = styled.h1`
  flex: 0 0 25%;
  font-size: ${fontSize(7)};
  font-family: ${fonts.brand};
  font-weight: normal;
  margin: 0;
  ${mobile(`
    font-size: ${fontSize(6)};
  `)}
`;

export const inputStyle = `
  width: 100%;
  padding: ${space(4)} ${space(5)};
  border: ${border(dark(1))};
  border-radius: ${borderRadius};
  font-family: ${fonts.body};
`;

export const Input = styled.input`
  ${inputStyle};
`;

export const URLForm = styled.form`
  flex: 0 0 50%;
  max-width: 1000px;
  ${mobile(`
    order: 3;
    flex: 0 0 100%;
  `)}

  ${Input} {
    background: ${dark(2)};
    color: ${colors.white};
  }
`;

export const GhostButton = styled.button`
  background: none;
  border: none;
  font-family: ${fonts.body};
`;

export const AccountMenu = styled.div`
  flex: 0 0 25%;
  text-align: right;
  ${mobile(`
    flex: 0 0 75%;
  `)}
  > ${GhostButton}{
    padding: ${space(5)} ${space(6)};
    outline: none;
    cursor: pointer;
    color: ${colors.white};
    font-size: ${fontSize(5)};
    > span{
      margin-left: ${space(7)};
    }
    &:focus{
      background: ${dark(1)};
    }
  }
`;

export const DashAmount = styled.span`
  color: ${colors.white};
  font-size: ${fontSize(4)};
  span {
    padding-left: ${space(4)};
  }
`;

export const GlobalStyle = createGlobalStyle`
  body{
    background: ${colors.background};
    color: ${colors.text};
    padding: 0;
    margin: 0;
    line-height: 1;
    font-family: ${fonts.body};
    font-size: ${fontSize(3)};
  }
  *{
    box-sizing: border-box;
  }
`;
