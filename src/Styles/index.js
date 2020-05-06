import styled, { createGlobalStyle, keyframes } from "styled-components";

export const mobileWidth = 760;
export const mobile = str => `
  @media(max-width: ${mobileWidth}px){
    ${str}
  }
`;

export const fib = n => [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89][n];
export const space = n => fib(n) + "px";
export const margin = space(7);
export const fontSize = n => 11 + fib(n) + "px";
export const colors = {
  text: "#402d00",
  white: "#fffefa",
  background: "#fffefa",
  primary: "#5c8cbf",
  secondary: "light.5",
  accent: "#fcec35",
  highlight: "#ffeb17",
  dash: "#008DE4",
  error: "#ffb940"
};
export const fonts = {
  body: "'Roboto', sans-serif",
  brand: "'Nova Round', serif"
};

export const borderRadius = "2px";
export const border = color => `1px solid ${color}`;
export const shadows = {
  small: "0 0 4px rgba(0, 0, 0, .125)",
  large: "0 0 24px rgba(0, 0, 0, .125)"
};

export const light = n => `rgba(255,255,255,${0.1 * fib(n)})`;
export const dark = n => `rgba(0,0,0,${0.1 * fib(n)})`;

export const Container = styled.div`
  padding: 0 ${space(6)};
  width: 100%;
`;

export const Header = styled(Container)`
  display: flex;
  flex-wrap: wrap;
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
`;

export const inputStyle = `
  width: 100%;
  padding: ${space(4)} ${space(5)};
  border: ${border(dark(1))};
  border-radius: ${borderRadius};
  font-family: ${fonts.body};
  margin: 0;
  background: ${light(5)};
  &:focus{
    outline: 2px solid ${colors.primary};
    border-color: ${dark(2)};
  }
`;

export const Input = styled.input`
  ${inputStyle};
`;

export const Textarea = styled.textarea`
  ${inputStyle};
`;

export const CheckboxContainer = styled.div`
  position: relative;
  width: ${fontSize(4)};
  height: ${fontSize(4)};
  border: 1px solid ${dark(1)};
  border-radius: 100%;
  input {
    position: absolute;
    opacity: 0;
  }
  span {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border: 3px solid ${light(5)};
    border-radius: 100%;
    background: ${dark(1)};
  }
  input:checked + span {
    background: ${colors.primary};
    border-color: #fff;
  }
`;

export const URLForm = styled.form`
  flex: 0 0 50%;
  max-width: 1000px;
  ${mobile(`
    order: 3;
    flex: 0 0 100%;
    padding-right: ${space(6)};
    padding-bottom: ${space(5)};
    padding-top: ${space(4)};
  `)}

  ${Input} {
    background: ${dark(2)};
    color: ${colors.white};
    font-size: ${fontSize(4)};
  }
`;

export const GhostButton = styled.button`
  background: none;
  border: none;
  font-family: ${fonts.body};
  cursor: pointer;
`;

export const TextDropdownContainer = styled.div`
  margin: ${margin} 0 0 0;
  ${GhostButton} {
    text-decoration: underline;
    color: ${colors.primary};
    padding: 0;
    font-size: ${fontSize(5)};
    font-weight: bold;
    svg {
      margin-right: ${space(4)};
    }
  }
`;

export const TextDropdownContent = styled.div`
  overflow: hidden;
  height: ${props => (props.isVisible ? "auto" : "0px")};
  padding: ${space(5)} 0 0 ${space(5)};
  font-size: ${fontSize(4)};
  transition: height 100ms ease-in-out;
`;

export const AccountMenu = styled.div`
  flex: 0 0 25%;
  text-align: right;
  ${mobile(`
    flex: 0 0 75%;
  `)}
  > ${GhostButton}{
    padding: ${space(6)} ${space(6)};
    outline: none;
    cursor: pointer;
    color: ${colors.white};
    font-size: ${fontSize(4)};
    > span{
      margin-left: ${space(7)};
      svg{
        margin-top:-${space(3)};
      }
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

export const WarningBanner = styled(Container)`
  padding-top: ${space(4)};
  padding-bottom: ${space(4)};
  cursor: pointer;
  background: ${colors.error};
  font-size: ${fontSize(2)};
  &:hover {
    text-decoration: underline;
  }
  ${mobile(`
    strong{
      display: none;
    }
  `)}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? "all" : "none")};
  transition: opacity 100ms ease-in-out;
  cursor: pointer;
  width: 100vw;
  height: 100vh;
  background: ${light(5)};
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  position: fixed;
  cursor: default;
  top: ${space(7)};
  left: 50%;
  transform: translate(-50%, ${props => (props.isVisible ? 0 : "-100%")});
  transition: transform 300ms ease-in-out;
  box-shadow: ${shadows.large};
  border-radius: ${borderRadius};
  padding: ${space(7)};
  width: 600px;
  max-width: 90%;

  > ${GhostButton} {
    position: absolute;
    top: 0;
    right: 0;
    padding: ${space(4)};
  }
`;

export const Button = styled.button`
  padding: ${space(5)} ${space(6)};
  font-size: ${fontSize(5)};
  cursor: pointer;
  outline: "none";
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: ${borderRadius};
  border-right: 1px solid ${dark(1)};
  border-bottom: 1px solid ${dark(1)};
  border-top: 1px solid ${light(1)};
  border-left: 1px solid ${light(1)};
  outline: none;
  ${props =>
    props.ownRow
      ? `
    margin-top: ${margin};
    float: right;
  `
      : ``}

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  &:hover {
    &:not(:disabled) {
      background: ${colors.highlight};
      color: "black";
    }
  }
  &:active {
    border-left-width: 2px;
    border-top-width: 2px;
    border-bottom-width: 0px;
    border-right-width: 0px;
  }
`;

export const ActionButton = styled(Button)`
  background: ${colors.accent};
  color: ${dark(5)};
`;

export const Form = styled.form`
  > label,
  > button,
  > fieldset {
    margin-top: ${margin};
  }
  ${ActionButton} {
    float: right;
  }
`;

export const ripple = size => keyframes`
  0% {
    top: ${size / 2 - 4}px;
    left: ${size / 2 - 4}px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: ${size - 8}px;
    height: ${size - 8}px;
    opacity: 0;
  }
`;

export const AnimatedWave = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border: 4px solid ${colors.text};
  border-radius: 50%;
  opacity: 1;
  animation: ${props => ripple(props.size)} 1s cubic-bezier(0, 0.2, 0.8, 1)
    infinite;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-left: ${props => props.size / 8}px;
  ${AnimatedWave}:last-child {
    animation-delay: -0.5s !important;
  }
`;

export const ModalLoadingIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  opacity: 0.4;
`;

export const ModalLoading = styled.div`
  text-align: center;
  position: relative;
  p {
    font-size: ${fontSize(6)};
  }
`;

export const MnemonicList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: ${margin} 0 0 0;
  padding: 0;
  li {
    background: ${light(5)};
    padding: ${space(4)} 0;
    flex: 0 0 30%;
    text-align: center;
    border: 1px dashed ${dark(1)};
    &:nth-child(n + 4) {
      margin: ${space(5)} 0 0 0;
    }
  }
`;

export const Label = styled.label`
  font-weight: bold;
  cursor: pointer;
  background: ${props => (props.checked ? light(5) : "transparent")};
  &:hover {
    ${props =>
      props.checked
        ? ``
        : `
      background: ${light(5)};
    `}
  }
`;

export const FieldInfo = styled.small`
  font-size: ${fontSize(2)};
  margin: ${space(2)} 0 0 0;
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  ${Label} {
    margin: ${space(5)} 0 0 0;
    display: flex;
    align-items: center;
    padding: ${space(6)};
    box-shadow: ${shadows.small};
    > span {
      flex: 1;
      margin-left: ${space(5)};
    }
    &:first-child {
      margin: 0;
    }
  }
  ${FieldInfo} {
    font-weight: normal;
    display: block;
  }
  ${CheckboxContainer} {
    flex: 0 0 ${fontSize(4)};
  }
`;

export const listStyles = `
  margin: ${margin} 0 0 ${margin};
  padding: 0;
  list-style-position: outside;
  li{
    margin: ${space(4)} 0 0 0;
  }
`;

export const OrderedList = styled.ol`
  ${listStyles};
`;

export const UnorderedList = styled.ul`
  ${listStyles};
`;

export const DashAddressContainer = styled.div`
  margin: ${space(4)} 0 0 0;
  position: relative;
  > div {
    position: absolute;
    bottom: 100%;
    right: 0;
    padding: ${space(3)};
    background: ${colors.primary};
    border-radius: ${borderRadius} ${borderRadius} 0 0;
    font-size: ${fontSize(2)};
    color: ${colors.white};
  }
  &:hover ${Textarea} {
    cursor: pointer;
    border-color: ${colors.primary};
  }
  ${GhostButton} {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
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
    font-size: ${fontSize(4)};
  }
  *{
    box-sizing: border-box;
  }
  p, h2, h3, h4, h5, ul, ol{
    margin: ${margin} 0 0 0;
    &:first-child{
      margin: 0;
    }
  }
  p{
    line-height: 1.4;
  }
  button, input, textarea{
    font-family: ${fonts.body};
    font-size: ${fontSize(4)};
  }
  h2{
    font-size: ${fontSize(6)};
  }
  h3{
    font-size: ${fontSize(5)};
  }
`;
