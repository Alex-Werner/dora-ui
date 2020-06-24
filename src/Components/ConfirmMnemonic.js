import React from "react";
import { connect } from "react-redux";
import { Wallet } from "@styled-icons/entypo/Wallet";

import { wallet, account } from "../selectors";
import { ActionButton, Form } from "../Styles";
import AccountWizardLoading from "./AccountWizardLoading";
import Mnemonic from "./Mnemonic";

function NewWallet({ isLoading, mnemonic, confirm }) {
  return !isLoading ? (
    <Form onSubmit={e => e.preventDefault() || confirm()}>
      <h2>Your new wallet</h2>
      <p>Your wallet has been created successfully.</p>
      <p>
        The 12 words below can be used to recover your wallet. Write these words
        down on paper and keep them somewhere safe and secure:
      </p>
      <Mnemonic>{mnemonic}</Mnemonic>
      <ActionButton type="submit">Next</ActionButton>
    </Form>
  ) : (
    <AccountWizardLoading Icon={Wallet}>
      Creating your wallet...
    </AccountWizardLoading>
  );
}

const stateToProps = state => {
  return {
    mnemonic: wallet(state).get("mnemonic"),
    isLoading:
      state.getIn(["loading", "account"]) && !account(state).get("address")
  };
};

const dispatchToProps = dispatch => {
  return {
    confirm() {
      dispatch({ type: "CONFIRM_MNEMONIC" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(NewWallet));
