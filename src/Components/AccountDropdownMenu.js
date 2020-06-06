import React from "react";
import { connect } from "react-redux";

import { AccountDropdown, GhostButton } from "../Styles";

function AccountDropdownMenu({ isVisible, manageAccounts, hide }) {
  return (
    <AccountDropdown isVisible={isVisible} onClick={hide}>
      <ul>
        <li>
          <GhostButton onClick={manageAccounts}>Manage Accounts</GhostButton>
        </li>
        <li>
          <GhostButton>Create New Username</GhostButton>
        </li>
        <li>
          <GhostButton>Select Username</GhostButton>
        </li>
      </ul>
      <ul>
        <li>
          <GhostButton>Discard Wallet</GhostButton>
        </li>
      </ul>
    </AccountDropdown>
  );
}

const stateToProps = (state, ownProps) => {
  return {
    isVisible: ownProps.isVisible
  };
};

const dispatchToProps = (dispatch, ownProps) => {
  return {
    manageAccounts() {
      dispatch({ type: "OPEN_ACCOUNT_MANAGEMENT" });
    },
    hide: ownProps.hide
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountDropdownMenu));
