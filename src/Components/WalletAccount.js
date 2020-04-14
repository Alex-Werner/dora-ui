import React from "react";
import { connect } from "react-redux";

import Currency from "./Currency";

function WalletSelected({ account }) {
  return (
    <div className="wallet-account">
      <p>
        Balance: <Currency>{account.unconfirmedBalance}</Currency>
      </p>
      <p>Address: {account.address}</p>
    </div>
  );
}

const stateToProps = state => {
  return {
    account: state.wallet.account
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(WalletSelected));
