import React from "react";
import { connect } from "react-redux";

import { Form, ActionButton } from "../Styles";
import RadioSet from "./RadioSet";

const accountFromOptions = [
  {
    value: "CREATE",
    label: "Create a new account",
    info: "If you're new to Dash or want to start from a blank slate"
  },
  {
    value: "IMPORT",
    label: "Import an account",
    info: "If you've created a wallet elsewhere and want to use it here"
  }
];

function AccountSetup({ next }) {
  const [accountFrom, setAccountFrom] = React.useState("CREATE");

  return (
    <Form onSubmit={e => e.preventDefault() || next(accountFrom)}>
      <h2>Let's get started</h2>
      <p>
        To be able to interract fully with dapps, you need to setup an account.
      </p>
      <p>
        An account is made up of a <em>wallet</em>, where funds are stored and a{" "}
        <em>username</em> which is used to identify you.
      </p>

      <RadioSet
        name="accountFrom"
        value={accountFrom}
        onChange={setAccountFrom}
        options={accountFromOptions}
      />
      <ActionButton type="submit">Next</ActionButton>
    </Form>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    next(from) {
      dispatch({ type: "SELECT_NEW_ACCOUNT_FROM", payload: from });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountSetup));
