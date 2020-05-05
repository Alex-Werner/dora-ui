import React from "react";
import { connect } from "react-redux";
import { Text, Box, Heading, Button } from "rebass";
import { Wallet } from "@styled-icons/entypo/Wallet";

import AccountWizardLoading from "./AccountWizardLoading";
import { P } from "./Element";
import Mnemonic from "./Mnemonic";

function NewWallet({ mnemonic, confirm }) {
  return !!mnemonic ? (
    <form onSubmit={e => e.preventDefault() || confirm()}>
      <Heading as="h2">Your new wallet</Heading>
      <P>Your account's wallet has been created successfully.</P>
      <P>
        Below is a collection of words called a <strong>mnemonic</strong>. This{" "}
        <strong>mnemonic</strong> will serve as a backup of this wallet.
      </P>
      <P>
        Write these words down on paper and keep them somewhere safe and secure:
      </P>
      <Mnemonic>{mnemonic}</Mnemonic>
      <Box variant="formRow">
        <Button variant="action">Next</Button>
      </Box>
    </form>
  ) : (
    <AccountWizardLoading Icon={Wallet}>
      <Text as="p" fontSize={4}>
        Creating your wallet...
      </Text>
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
      dispatch({ type: "DO_CONFIRM_NEW_WALLET" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(NewWallet));
