import React from "react";
import { connect } from "react-redux";

import { Form, ActionButton } from "../Styles";
import RadioSet from "./RadioSet";

const accountFromOptions = [
  {
    value: "CREATE",
    label: "Create a new wallet",
    info: "If you're new to Dash or want to start from a blank slate"
  },
  {
    value: "IMPORT",
    label: "Import a wallet",
    info: "If you've created a wallet elsewhere and want to use it here"
  }
];

function AccountSetup({ next }) {
  const [accountFrom, setAccountFrom] = React.useState("CREATE");

  return (
    <Form onSubmit={e => e.preventDefault() || next(accountFrom)}>
      <h2>Let's get started</h2>
      <p>To interract with the Dash Platform, you need a wallet.</p>

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
      dispatch({ type: "SELECT_WIZARD_TYPE", payload: from });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountSetup));
