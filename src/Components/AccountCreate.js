import React from "react";
import { connect } from "react-redux";

function AccountCreate({ newWallet, save }) {
  return (
    <div className="create-account">
      {!!newWallet ? (
        <React.Fragment>
          <p>Your account's wallet has been created successfully.</p>
          <p>
            Wallets are used to store your Dash funds. Below is a collection of
            words called a <strong>mnemonic</strong>. With this{" "}
            <strong>mnemonic</strong> you'll be able to access your Dash funds
            from anywhere.
          </p>
          <p>
            Ensure you write this mnemonic down on paper and keep it somewhere
            safe and secure:
          </p>
          <p className="mnemonic">{newWallet.mnemonic}</p>
          <button onClick={save}>Save this wallet</button>
        </React.Fragment>
      ) : (
        <span>Creating account wallet...</span>
      )}
    </div>
  );
}

const stateToProps = state => {
  return {
    newWallet: state.account.newWallet
  };
};

const dispatchToProps = dispatch => {
  return {
    save() {
      dispatch({ type: "DO_SAVE_NEW_ACCOUNT" });
      dispatch({ type: "DO_SELECT_ACCOUNT" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountCreate));
