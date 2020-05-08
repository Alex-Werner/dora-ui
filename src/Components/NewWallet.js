import React from "react";
import { connect } from "react-redux";
import { Wallet } from "@styled-icons/entypo/Wallet";

import { ActionButton, Form } from "../Styles";
import AccountWizardLoading from "./AccountWizardLoading";
import Mnemonic from "./Mnemonic";

function NewWallet({ mnemonic, confirm }) {
  return !!mnemonic ? (
    <Form onSubmit={e => e.preventDefault() || confirm()}>
      <h2>Your new wallet</h2>
      <p>Your account's wallet has been created successfully.</p>
      <p>
        Below is a collection of words called a <strong>mnemonic</strong>. This{" "}
        <strong>mnemonic</strong> will serve as a backup of this wallet.
      </p>
      <p>
        Write these words down on paper and keep them somewhere safe and secure:
      </p>
      <Mnemonic>{mnemonic}</Mnemonic>
      <ActionButton type="submit">Next</ActionButton>
    </Form>
  ) : (
    <AccountWizardLoading Icon={Wallet}>
      <p>Creating your wallet...</p>
    </AccountWizardLoading>
  );
}

const stateToProps = state => {
  return {
    mnemonic: state.account.current.mnemonic
  };
};

const dispatchToProps = dispatch => {
  return {
    confirm() {
      dispatch({ type: "CONFIRM_NEW_WALLET" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(NewWallet));
