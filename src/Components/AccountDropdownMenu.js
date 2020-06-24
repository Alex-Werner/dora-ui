import React from "react";
import { connect } from "react-redux";

import { balance, identityBalance } from "../selectors";
import { AccountDropdown, GhostButton, MenuIcon, Help } from "../Styles";
import DashAmount from "./DashAmount";
import IdentityCredit from "./IdentityCredit";

function AccountDropdownMenu({
  isVisible,
  manageAccounts,
  manageIdentities,
  hide,
  send,
  receive,
  confirmed,
  unconfirmed,
  identityBalance,
  discard,
  viewMnemonic
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
          <GhostButton onClick={manageIdentities}>
            Manage Identities <MenuIcon />
          </GhostButton>
        </li>
        <li>
          <GhostButton onClick={viewMnemonic}>
            View Backup Phrase <MenuIcon />
          </GhostButton>
        </li>
        <li>
          <GhostButton onClick={discard}>
            Discard Wallet <MenuIcon />
          </GhostButton>
        </li>
      </ul>
    </AccountDropdown>
  );
}

const stateToProps = (state, ownProps) => {
  return {
    isVisible: ownProps.isVisible,
    confirmed: balance(state).get("confirmed", 0),
    unconfirmed: balance(state).get("unconfirmed", 0),
    identityBalance: identityBalance(state) || 0
  };
};

const dispatchToProps = (dispatch, ownProps) => {
  return {
    manageAccounts() {
      dispatch({ type: "OPEN_ACCOUNT_MANAGEMENT" });
    },
    manageIdentities() {
      dispatch({ type: "SHOW_IDENTITY_MANAGEMENT" });
    },
    send() {
      dispatch({ type: "OPEN_SEND" });
    },
    receive() {
      dispatch({ type: "OPEN_RECEIVE" });
    },
    discard() {
      dispatch({ type: "DISCARD_WALLET" });
    },
    viewMnemonic() {
      dispatch({ type: "VIEW_MNEMONIC" });
    },
    hide: ownProps.hide
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountDropdownMenu));
