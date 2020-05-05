import React from "react";
import { connect } from "react-redux";

import { AccountMenu, GhostButton } from "../Styles";
import DashAmount from "./DashAmount";

function Account({ account }) {
  const user = {
    username: account.username || "anonymous",
    balance: account.balance || 0,
    isIncomplete: !account.username
  };

  const displayName =
    user.username.length > 10
      ? `${user.username.substring(0, 10)}...`
      : user.username;

  return (
    <AccountMenu>
      <GhostButton>
        {displayName}
        <DashAmount>{user.balance}</DashAmount>
      </GhostButton>
    </AccountMenu>
  );
}

const stateToProps = state => {
  return {
    account: state.account.current
  };
};

export default connect(stateToProps)(React.memo(Account));
