import styled, { createGlobalStyle, keyframes } from "styled-components";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
import { UserAstronaut } from "@styled-icons/fa-solid/UserAstronaut";
import { Qrcode } from "@styled-icons/icomoon/Qrcode";
import { Coins } from "@styled-icons/fa-solid/Coins";
import { Dash } from "@styled-icons/crypto/Dash";
import { BadgeCheck } from "@styled-icons/boxicons-solid/BadgeCheck";
import { Wallet } from "@styled-icons/entypo/Wallet";

export const mobileWidth = 760;
export const mobile = str => `
  @media(max-width: ${mobileWidth}px){
    ${str}
  }
`;

export const fib = n => [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144][n];
export const space = n => fib(n) + "px";
export const margin = space(7);
export const fontSize = n => 11 + fib(n) + "px";
export const colors = {
  text: "#5e6d89",
  white: "#fff",
  link: "#4287f5",
  background: "#f2f7fa",
  primary: "#4287f5",
  muted: "#e8f5ff",
  secondary: "#4257f5",
  accent: "#0cc285",
  highlight: "#2ac78d",
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
  small: "0px 1px 1px 1px rgba(0,0,0,0.05)",
  smallEmpty: "0px 1px 1px 1px rgba(0,0,0,0)",
  large: "0px 5px 5px 2px rgba(0,0,0,0.19)"
};

export const light = n => `rgba(255,255,255,${0.1 + 0.1 * fib(n)})`;
export const dark = n => `rgba(66,135,245,${0.1 * fib(n)})`;
export const modalBg = "rgba(232,245,255,0.90)";

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
  opacity: 1;
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
  transition: height 150ms ease-in-out;
`;

export const DashIcon = styled(Dash)`
  width: ${props => fontSize(props.size)};
  height: ${props => fontSize(props.size)};
`;

export const DashAmount = styled.span`
  color: ${colors.white};
  font-size: ${props => fontSize(props.size)};
  display: block;
  strong {
    padding: 0 ${space(3)};
  }
  small {
    display: block;
      font-weight: normal;
      margin: ${space(4)};
  }
  svg{
    margin-top: -${space(3)};
`;

export const DropdownIcon = styled(ChevronDown)`
  width: ${fontSize(5)};
  height: ${fontSize(5)};
  ${mobile(`
    width: ${fontSize(4)};
    height: ${fontSize(4)};
  `)}
`;

export const MenuIcon = styled(ChevronRight)`
  color: ${colors.white};
`;

export const GoIcon = styled(ChevronRight)``;

export const UserIcon = styled(UserAstronaut)`
  width: ${fontSize(3)};
  height: ${fontSize(3)};
`;

export const AccountMenu = styled.div`
  flex: 0 0 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > a {
    position: relative;
    margin: 0 ${space(6)};
    outline: none;
    cursor: pointer;
    color: ${colors.white};
    background: ${props => (props.isActive ? colors.secondary : "transparent")};
    transition: background 150ms ease-in-out;
    text-decoration: none;
    font-size: ${fontSize(5)};
    font-weight: bold;
    padding: ${space(5)} ${space(7)} ${space(5)} ${space(5)};
    ${mobile(`
      padding-right: ${space(6)};
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
    transform: translate(0, -50%);
  }
`;

export const DisplayName = styled.span`
  display: block;
  margin: 0 0 ${space(1)} 0;
  font-size: ${fontSize(2)};
  font-weight: bold;
`;

export const AccountDropdown = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  pointer-events: ${props => (props.isVisible ? "all" : "none")};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 150ms ease-in-out;
  overflow: hidden;
  background: ${colors.secondary};
  box-shadow: ${shadows.large};
  width: 200px;
  font-weight: normal;
  ul {
    list-style: none;
    padding: 0 0 ${space(3)} 0;
    background: ${light(0)};
    margin: -${space(6)} 0 ${space(3)} 0;
  }
  h5 {
    margin: ${space(6)} 0 ${space(6)} 0;
    font-weight: normal;
    text-transform: uppercase;
    font-size: ${fontSize(0)};
    color: ${light(4)};
    border-bottom: 1px dashed ${light(2)};
    padding: ${space(3)};
  }
  h5:first-child {
    margin-top: ${space(5)};
  }
  ${GhostButton} {
    text-align: left;
    width: 100%;
    padding: ${space(6)} ${space(5)};
    color: ${colors.white};
    font-size: ${fontSize(2)};
    border-bottom: 1px solid ${light(1)};
    position: relative;
    transition: background 150ms ease-in-out;
    &:hover {
      background: ${dark(1)};
      color: #fff;
    }
  }
  ${DashAmount} {
    text-align: center;
  }
  ${MenuIcon} {
    top: ${space(6)};
    right: ${space(5)};
    width: ${fontSize(2)};
    height: ${fontSize(2)};
  }
`;

export const CreditIcon = styled(Coins)`
  width: ${fontSize(4)};
  height: ${fontSize(4)};
`;

export const IdentityCreditDisplay = styled.span`
  text-align: center;
  display: block;
  color: ${colors.white};
  strong {
    padding: 0 ${space(3)};
  }
  font-size: ${fontSize(4)};
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
  transition: opacity 150ms ease-in-out;
  cursor: pointer;
  width: 100vw;
  height: 100vh;
  background: ${modalBg};
  z-index: 9;
`;

export const ModalContent = styled.div`
  background: ${colors.white};
  position: fixed;
  cursor: default;
  z-index: 10;
  top: ${space(7)};
  left: 50%;
  transform: translate(-50%, ${props => (props.isVisible ? 0 : "-100%")});
  transition: all 300ms ease-in-out;
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
  padding: ${space(6)} ${space(6)};
  font-size: ${fontSize(5)};
  cursor: pointer;
  outline: "none";
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: ${borderRadius};
  border: none;
  box-shadow: ${shadows.small};
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

export const MnemonicList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: ${margin} 0 0 0;
  padding: 0;
  li {
    background: ${colors.muted};
    padding: ${space(4)} 0;
    flex: 0 0 30%;
    text-align: center;
    border: 1px dashed ${dark(2)};
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
  + input {
    margin-top: ${space(4)};
  }
  background: ${props => (props.checked ? colors.muted : colors.white)};
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

const InlineEllipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const InlineEllipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const InlineEllipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const LoadingInlineContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 13px;
  transform: scale(${props => props.scale});

  div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    &:nth-child(1) {
      left: 8px;
      animation: ${InlineEllipsis1} 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: ${InlineEllipsis2} 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: ${InlineEllipsis2} 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: ${InlineEllipsis3} 0.6s infinite;
    }
  }
`;

export const UsernameList = styled.ul`
  margin: ${margin} 0 0 0;
  padding: 0;
  list-style: none;
  li {
    margin: ${space(6)} 0 0 0;
  }
  button {
    width: 100%;
    text-align: left;
    padding: ${space(4)};
    border: 1px solid ${colors.muted};
    border-bottom-width: 2px;
    color: ${colors.primary};
    font-weight: bold;
    font-size: ${fontSize(5)};
    &:hover,
    &:active,
    &:focus {
      border-top-width: 2px;
      border-bottom-width: 1px;
      background: ${colors.primary};
      border-color: ${colors.secondary};
      color: ${colors.white};
      svg,
      span {
        color: ${colors.white};
      }
    }
    transition: all 150ms ease-in-out;
    position: relative;
  }

  ${GoIcon} {
    position: absolute;
    right: ${space(4)};
    top: 50%;
    transform: translate(0, -50%);
    color: ${colors.primary};
    width: ${fontSize(6)};
    height: ${fontSize(6)};
  }
  ${IdentityCreditDisplay} {
    ${mobile(`
      display: none;
    `)}
    color: ${colors.text};
    display: inline-block;
    text-align: left;
    margin-left: ${space(7)};
  }
`;

export const LoadingPayment = styled.div`
  margin: ${margin} 0 0 0;
  box-shadow: ${shadows.small};
  text-align: center;
  padding: ${space(5)};
  position: relative;
  overflow: hidden;
  ${LoadingInlineContainer} {
    div {
      background: ${colors.primary};
    }
  }
  p {
    margin: ${space(5)} 0 0 0;
    text-align: center;
  }
`;

export const PaymentTick = styled(BadgeCheck)`
  width: ${fontSize(5)};
  height: ${fontSize(5)};
`;

export const PaymentReceived = styled.div`
  width: 100%;
  height: 100%;
  padding: ${space(5)};
  background: ${colors.primary};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 150ms ease-in-out;
  color: ${colors.white};
  ${DashAmount} {
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 150ms ease-in-out 300ms;
  }
  ${PaymentTick} {
    margin: -${space(2)} ${space(4)} 0 0;
  }
  p {
    margin: 0 0 ${space(5)} 0;
    line-height: ${fontSize(6)};
  }
`;

export const LoadingWizard = styled.div`
  text-align: center;
  p {
    margin: ${margin} 0 0 0;
    font-size: ${fontSize(6)};
  }
  > div {
    position: relative;
    width: ${fontSize(11)};
    min-height: 80px;
    margin: 0 auto;
    svg {
      width: ${fontSize(11)};
      height: ${fontSize(11)};
      opacity: 0.15;
      color: ${colors.primary};
    }
  }
  ${LoadingInlineContainer} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    div {
      background-color: ${colors.primary};
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
