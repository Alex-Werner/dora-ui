import React from "react";
import { connect } from "react-redux";

import DashAmount from "./DashAmount";

function AccountMenu({ balance }) {
  return (
    <p>
      Balance: <DashAmount>{balance}</DashAmount>
    </p>
  );
}

const stateToProps = state => {
  return {
    balance: state.account.account.balance
  };
};

export default connect(stateToProps)(React.memo(AccountMenu));
