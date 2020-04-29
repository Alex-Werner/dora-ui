import React from "react";
import { connect } from "react-redux";

function AccountSetup({ createAccount, importAccount }) {
  return (
    <div className="account-setup">
      <h2>Let's get started</h2>
      <p>To use Dora, you need to create a Dash account.</p>
      <button onClick={createAccount}>Setup a new account</button>
      <button onClick={importAccount}>Import account from a Dash wallet</button>
    </div>
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
