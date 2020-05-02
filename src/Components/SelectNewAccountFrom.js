import React from "react";
import { connect } from "react-redux";
import { Box, Button } from "rebass";

import P from "./P";
import RadioSet from "./RadioSet";

const accountFromOptions = [
  {
    value: "CREATE",
    label: "Create a new account",
    smallText: "If you're new to Dash or want to start from a blank slate"
  },
  {
    value: "IMPORT",
    label: "Import an account",
    smallText: "If you've created a wallet elsewhere and want to use it here"
  }
];

function AccountSetup({ createAccount, importAccount }) {
  const [accountFrom, setAccountFrom] = React.useState("CREATE");

  return (
    <React.Fragment>
      <P>
        To be able to interract fully with dapps, you need to setup an account.
      </P>
      <P>
        An account is made up of a <em>wallet</em>, where funds are stored and a{" "}
        <em>username</em> which is used to identify you.
      </P>

      <RadioSet
        name="accountFrom"
        value={accountFrom}
        onChange={setAccountFrom}
        options={accountFromOptions}
      />
      <Box variant="formRow">
        <Button type="submit" variant="action">
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    createAccount() {
      dispatch({ type: "DO_CREATE_ACCOUNT" });
    },
    importAccount() {
      dispatch({ type: "DO_START_ACCOUNT_IMPORT" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountSetup));
