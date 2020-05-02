import React from "react";
import { connect } from "react-redux";
import { Box, Button, Heading } from "rebass";

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

function AccountSetup({ next }) {
  const [accountFrom, setAccountFrom] = React.useState("CREATE");

  return (
    <form onSubmit={e => e.preventDefault() || next(accountFrom)}>
      <Heading as="h2">Let's get started</Heading>
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
    </form>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    next(from) {
      dispatch({ type: "DO_SELECT_NEW_ACCOUNT_FROM", payload: from });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountSetup));
