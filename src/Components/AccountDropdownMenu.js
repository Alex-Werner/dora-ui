import React from "react";
import { connect } from "react-redux";

import { AccountDropdown, GhostButton } from "../Styles";

function AccountDropdownMenu({
  isVisible,
  manageAccounts,
  hide,
  send,
  receive,
  available
}) {
  return (
    <AccountDropdown isVisible={isVisible} onClick={hide}>
      <ul>
        <li>
          <GhostButton onClick={send}>Send</GhostButton>
        </li>
        <li>
          <GhostButton onClick={receive}>Receive</GhostButton>
        </li>
        {/* {available.length > 1 && ( */}
        {/*   <li onClick={transfer}>Transfer Between Accounts</li> */}
        {/* )} */}
      </ul>
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
    isVisible: ownProps.isVisible,
    accounts: state.account.available
  };
};

const dispatchToProps = (dispatch, ownProps) => {
  return {
    manageAccounts() {
      dispatch({ type: "OPEN_ACCOUNT_MANAGEMENT" });
    },
    send() {
      dispatch({ type: "OPEN_SEND" });
    },
    receive() {
      dispatch({ type: "OPEN_RECEIVE" });
    },
    hide: ownProps.hide
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountDropdownMenu));
