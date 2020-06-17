import styled, { createGlobalStyle, keyframes } from "styled-components";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Qrcode } from "@styled-icons/icomoon/Qrcode";

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
  text: "#5e6d89",
  white: "#fff",
  link: "#284db5",
  background: "#f2faf8",
  primary: "#4287f5",
  secondary: "#4257f5",
  accent: "#2ac78d",
  highlight: "#ffeb17",
  dash: "#008DE4",
  error: "#ffb940"
};
export const fonts = {
  body: "'Roboto', sans-serif",
  brand: "'Nova Round', serif"
};

export const borderRadius = "4px";
export const border = color => `1px solid ${color}`;
export const shadows = {
  small: "0 0 4px rgba(0, 0, 0, .125)",
  large: "0 0 24px rgba(0, 0, 0, .125)"
};

export const light = n => `rgba(242, 250, 248,${0.1 * fib(n)})`;
export const dark = n => `rgba(0,0,0,${0.1 * fib(n)})`;

export const Container = styled.div`
  padding: 0 ${space(6)};
  width: 100%;
`;

export const Header = styled(Container)`
  width: 100%;
  display: flex;
  background: ${colors.primary};
  padding-right: 0;
  align-items: center;
  justify-content: space-between;
  color: ${colors.white};
`;

export const PageContainer = styled.div`
  background: ${light(5)};
  padding: ${margin} ${space(6)};
`;

export const Logo = styled.h1`
  flex: 0;
  font-size: ${fontSize(7)};
  font-family: ${fonts.brand};
  font-weight: normal;
  margin: 0;
`;

export const inputFocus = `
  outline: 2px solid ${colors.primary};
  border-color: ${dark(2)};
`;

export const inputStyle = `
  width: 100%;
  padding: ${space(4)} ${space(5)};
  line-height: 1.4;
  border: ${border(dark(1))};
  border-radius: ${borderRadius};
  font-family: ${fonts.body};
  margin: 0;
  background: ${light(2)};
  &:focus{
    ${inputFocus}
  }
`;

export const Input = styled.input`
  ${inputStyle};
`;

export const QrIcon = styled(Qrcode)`
  width: ${fontSize(3)};
  height: ${fontSize(3)};
`;

export const InputGroup = styled.div`
  display: flex;
  ${inputStyle};
  &:focus-within {
    ${inputFocus}
  }
  ${Input} {
    background: none;
    outline: none;
    border: none;
    flex: 1;
  }
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
  width: 50%;
  max-width: 1000px;
  ${mobile(`
    width: 100%;
  `)}
  background: ${colors.primary};
  padding: 0 ${space(6)};
  ${Input} {
    color: ${colors.white};
    padding:0;
    background:transparent;
    border:none;
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
    margin: 0 0 ${margin} 0;
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
  font-size: ${fontSize(4)};
  transition: height 100ms ease-in-out;
`;

export const DashAmount = styled.span`
  color: ${colors.white};
  font-size: ${fontSize(4)};
  span {
    padding-left: ${space(4)};
  }
`;

export const DropdownIcon = styled(ChevronDown)`
  width: ${fontSize(5)};
  height: ${fontSize(5)};
  ${mobile(`
    width: ${fontSize(4)};
    height: ${fontSize(4)};
  `)}
`;

export const AccountMenu = styled.div`
  flex: 0;
  text-align: right;
  ${mobile(`
    flex: 0 0 75%;
  `)}
  > a {
    position: relative;
    margin: 0 ${space(6)};
    outline: none;
    cursor: pointer;
    text-align: right;
    color: ${colors.white};
    background: ${props => (props.isActive ? colors.secondary : "transparent")};
    text-decoration: none;
    font-size: ${fontSize(5)};
    font-weight: bold;
    padding: ${space(4)} ${space(7)} ${space(4)} ${space(2)};
    ${mobile(`
      padding: ${space(3)} ${space(6)};
    `)}
    > span {
      svg {
        margin-top: -${space(3)};
      }
    }
  }
  ${DropdownIcon} {
    position: absolute;
    right: -${space(2)};
    top: 50%;
    margin-top: -${space(5)};
  }
`;

export const DisplayName = styled.span`
  display: block;
  margin: 0 0 ${space(1)} 0;
  font-size: ${fontSize(2)};
  font-weight: normal;
  ${mobile(`
    display:none;
  `)}
`;

export const AccountDropdown = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  height: ${props => (props.isVisible ? "auto" : 0)};
  transition: height 100ms ease-in-out;
  overflow: hidden;
  background: ${colors.secondary};
  width: 200px;
  box-shadow: ${shadows.large};
  ul {
    list-style: none;
    padding: ${space(3)} 0;
  }
  ul + ul {
    padding: ${space(4)} 0 0 0;
    margin: ${space(4)} 0 0 0;
    border-top: 1px solid ${dark(1)};
  }
  ${GhostButton} {
    text-align: left;
    width: 100%;
    padding: ${space(4)} ${space(4)};
    color: ${colors.white};
    font-size: ${fontSize(3)};
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
  z-index: 9;
`;

export const ModalContent = styled.div`
  background: #fff;
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

  h2 {
    margin: 0;
  }
  > ${GhostButton} {
    position: absolute;
    top: 0;
    right: 0;
    padding: ${space(4)};
  }
`;

export const Button = styled.button`
  text-transform: uppercase;
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
  color: #fff;
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
  display: block;
  font-weight: bold;
  cursor: pointer;
  font-size: ${fontSize(3)};
  background: ${props => (props.checked ? light(3) : "transparent")};
  + input {
    margin-top: ${space(4)};
  }
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

export const FieldError = styled.span`
  color: ${colors.error};
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
  margin: ${space(5)} 0 0 0;
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
  ${Textarea} {
    padding-right: ${space(7)};
    cursor: pointer;
    ${mobile(`
      font-size: ${fontSize(2)};
    `)}
  }
  &:hover ${Textarea} {
    border-color: ${colors.primary};
  }
  ${GhostButton} {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

export const AccountList = styled.ul`
  margin: ${margin} 0 0 0;
  list-style: none;
  padding: 0;
  li {
    background: ${props => (props.selected ? light(5) : "transparent")};
    margin: ${space(5)} 0 0 0;
    align-items: center;
    padding: ${space(6)};
    box-shadow: ${shadows.small};
    > strong {
      font-size: ${fontSize(4)};
    }
    > small {
      font-size: ${fontSize(1)};
      margin: ${space(4)};
      font-style: italic;
    }
    &:hover {
      background-color: ${light(5)};
    }
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
      margin-top: 0;
    }
  }
  a{
    color: ${colors.link};
  }
  p{
    line-height: 1.4;
  }
  li{
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
