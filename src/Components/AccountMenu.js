import React from "react";
import { connect } from "react-redux";

import { AccountMenu, GhostButton, DisplayName, DropdownIcon } from "../Styles";
import DashAmount from "./DashAmount";
import AccountDropdownMenu from "./AccountDropdownMenu";

function Account({ username, balance, isLoading }) {
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false);
  const displayName = username
    ? `${username.length > 20 ? `${username.substring(0, 20)}...` : username}`
    : "(anonymous)";

  return (
    <AccountMenu>
      <GhostButton onClick={e => setDropdownIsVisible(!dropdownIsVisible)}>
        <DisplayName>{displayName}</DisplayName>
        <DashAmount>{isLoading ? "Loading..." : balance}</DashAmount>
        <DropdownIcon />
        <AccountDropdownMenu
          hide={e => setDropdownIsVisible(false)}
          isVisible={dropdownIsVisible}
        />
      </GhostButton>
    </AccountMenu>
  );
}

const stateToProps = state => {
  const balance = state.account.balances[state.account.selected];
  return {
    isLoading: state.loading.account,
    username: state.identity.selectedName,
    balance: balance ? balance.total : 0
  };
};

export default connect(stateToProps)(React.memo(Account));
