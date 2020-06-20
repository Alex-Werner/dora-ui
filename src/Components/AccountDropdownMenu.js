import React from "react";
import { connect } from "react-redux";

import { AccountDropdown, GhostButton, MenuIcon, Help } from "../Styles";
import DashAmount from "./DashAmount";
import IdentityCredit from "./IdentityCredit";

function AccountDropdownMenu({
  isVisible,
  manageAccounts,
  hide,
  send,
  receive,
  available,
  confirmed,
  unconfirmed,
  identityBalance
}) {
  return (
    <AccountDropdown isVisible={isVisible} onClick={hide}>
      <h5>Dash Balance</h5>
      <DashAmount unconfirmed={unconfirmed}>{confirmed}</DashAmount>
      <h5>Platform Credits</h5>
      <IdentityCredit>{identityBalance}</IdentityCredit>
      {/*<ul>
        <li>
          <GhostButton onClick={send}>Send</GhostButton>
        </li>
        <li>
          <GhostButton onClick={receive}>Receive</GhostButton>
        </li>
        {available.length > 1 && (
          <li onClick={transfer}>Transfer Between Accounts</li>
        )}
      </ul>*/}
      <h5>Wallet Management</h5>
      <ul>
        <li>
          <GhostButton onClick={manageAccounts}>
            Manage Accounts <MenuIcon />
          </GhostButton>
        </li>
        <li>
          <GhostButton>
            View Backup Phrase <MenuIcon />
          </GhostButton>
        </li>
        <li>
          <GhostButton>
            Discard Wallet <MenuIcon />
          </GhostButton>
        </li>
      </ul>
    </AccountDropdown>
  );
}

const stateToProps = (state, ownProps) => {
  const balance = state.account.balances[state.account.selected];
  return {
    isVisible: ownProps.isVisible,
    accounts: state.account.available,
    confirmed: balance ? balance.confirmed : 0,
    unconfirmed: balance ? balance.unconfirmed : 0,
    identityBalance: state.identity.balanceById[state.identity.id] || 0
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
