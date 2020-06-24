import React from "react";
import { connect } from "react-redux";

import { accountList } from "../selectors";
import {
  SelectableList,
  SelectableItem,
  ActionButton,
  GhostButton,
  GoIcon
} from "../Styles";
import DashAmount from "./DashAmount";

function AccountManagement({ accounts, select, create, hide }) {
  console.log(accounts);
  return (
    <>
      <h2>Account Management</h2>
      <p>
        Select an account to use from the options below. Hit the "Create New"
        button to add a fresh account.
      </p>
      <SelectableList>
        {accounts.map(account => {
          return (
            <SelectableItem
              isSelected={account.isSelected}
              key={account.index}
              onClick={e => select(account.index) || hide()}
            >
              <GhostButton onClick={e => select(account.index) || hide()}>
                Account {account.index + 1}
                <DashAmount size={3}>{account.balance}</DashAmount>
                <small>
                  {account.names.length
                    ? account.names.join(", ")
                    : "(anonymous)"}
                </small>
                <GoIcon />
              </GhostButton>
            </SelectableItem>
          );
        })}
      </SelectableList>
      <ActionButton ownRow={true} onClick={e => create() || hide()}>
        Create New
      </ActionButton>
    </>
  );
}

const stateToProps = state => {
  return {
    accounts: accountList(state)
  };
};

const dispatchToProps = dispatch => {
  return {
    select(index) {
      dispatch({ type: "SELECT_ACCOUNT", payload: index });
    },
    create() {
      dispatch({ type: "CREATE_ACCOUNT" });
    },
    hide() {
      dispatch({ type: "CLOSE_ACCOUNT_MANAGEMENT" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountManagement));
