import React from "react";
import { connect } from "react-redux";

import { AccountMenu, DisplayName, DropdownIcon } from "../Styles";
import DashAmount from "./DashAmount";
import AccountDropdownMenu from "./AccountDropdownMenu";
import { useWindowClick } from "../hooks";

function Account({ username, balance, isLoading }) {
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false);
  useWindowClick(e => setDropdownIsVisible(false));

  const displayName = username
    ? `${username.length > 20 ? `${username.substring(0, 20)}...` : username}`
    : "(anonymous)";

  return (
    <AccountMenu
      onClick={e => e.stopPropagation()}
      isActive={dropdownIsVisible}
    >
      <a
        href="/user.dora.dash"
        onClick={e =>
          e.preventDefault() ||
          (!isLoading && setDropdownIsVisible(!dropdownIsVisible))
        }
      >
        <DisplayName>{displayName}</DisplayName>
        <DashAmount>{isLoading ? "Loading..." : balance}</DashAmount>
        <DropdownIcon />
        <AccountDropdownMenu
          hide={e => setDropdownIsVisible(false)}
          isVisible={dropdownIsVisible}
        />
      </a>
    </AccountMenu>
  );
}

const stateToProps = state => {
  const balance = state.account.balances[state.account.selected];
  return {
    isLoading: state.loading.account,
    username:
      state.identity.selectedName && state.identity.selectedName.username,
    balance: balance ? balance.total : 0
  };
};

export default connect(stateToProps)(React.memo(Account));
