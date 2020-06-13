import React from "react";
import { connect } from "react-redux";

import { AccountDropdown } from "../Styles";

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
          <a onClick={send}>Send</a>
        </li>
        <li>
          <a onClick={receive}>Receive</a>
        </li>
        {/* {available.length > 1 && ( */}
        {/*   <li onClick={transfer}>Transfer Between Accounts</li> */}
        {/* )} */}
      </ul>
      <ul>
        <li>
          <a onClick={manageAccounts}>Manage Accounts</a>
        </li>
        <li>
          <a>Create New Username</a>
        </li>
        <li>
          <a>Select Username</a>
        </li>
      </ul>
      <ul>
        <li>
          <a>Discard Wallet</a>
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
