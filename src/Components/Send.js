import React from "react";
import { connect } from "react-redux";
import QrReader from "react-qr-reader";
import validateAddress from "multicoin-address-validator";

import {
  Label,
  GhostButton,
  InputGroup,
  QrIcon,
  Input,
  Form,
  ActionButton
} from "../Styles";
import DashAmount from "./DashAmount";

function Send({ balance, send }) {
  const [amount, setAmount] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [useQr, setUseQr] = React.useState(false);

  const onScan = result => {
    if (!result) return;
    const [address, amount] = result.replace("dash://", "").split("?amount=");
    validateAndSetAddress(address);
    validateAndSetAmount(amount || "0");
    setUseQr(false);
  };

  const validateAndSetAddress = address => {
    const isValid = validateAddress.validate(address, "dash");
    if (isValid) setAddress(address);
  };

  const validateAndSetAmount = str => {
    const amount = parseFloat(str);
    if (`${amount}` !== str) return;

    if (amount < 0) setAmount(0);
    if (amount > balance.confirmed) setAmount(balance.confirmed);
    setAmount(amount);
  };

  return (
    <Form onSubmit={e => e.preventDefault() || send(address, amount)}>
      <h2>Send Dash</h2>
      <Label htmlFor="amount">
        Amount{" "}
        <GhostButton onClick={e => setAmount(balance.confirmed)}>
          <DashAmount>{balance.confirmed}</DashAmount>
        </GhostButton>
      </Label>
      <Input
        type="number"
        id="amount"
        name="amount"
        onChange={e => validateAndSetAmount(e.target.value)}
        value={amount}
      />
      <Label htmlFor="address">Address of recipient</Label>
      <InputGroup>
        <Input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          onFocus={e => setUseQr(false)}
        />
        <button onClick={e => setUseQr(!useQr)}>
          <QrIcon />
        </button>
      </InputGroup>
      {useQr && <QrReader onScan={onScan} style={{ width: "100%" }} />}
      <ActionButton type="submit">Send</ActionButton>
    </Form>
  );
}

const stateToProps = state => {
  return {
    balance: state.account.balances[state.account.selected]
  };
};

const dispatchToProps = dispatch => {
  return {
    send(address, amount) {
      dispatch({ type: "SEND_DASH", payload: { address, amount } });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(Send));
