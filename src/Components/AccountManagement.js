import React from "react";
import { connect } from "react-redux";

import { AccountList, ActionButton } from "../Styles";

function AccountManagement({ accounts, selected, select, create, hide }) {
  console.log(accounts);
  return (
    <>
      <h2>Account Management</h2>
      <p>
        Select an account to use from the options below. Hit the "Create New"
        button to add a fresh account.
      </p>
      <AccountList>
        {accounts.map((account, i) => {
          return (
            <li
              key={i}
              selected={selected === i}
              onClick={e => select(i) || hide()}
            >
              <strong>{account.selectedName || "(anonymous)"}</strong>
              <small>
                {account.names
                  .filter(n => n.name !== account.selectedName)
                  .map(n => n.name)
                  .join(", ")}
              </small>
            </li>
          );
        })}
      </AccountList>
      <ActionButton ownRow={true} onClick={e => create() || hide()}>
        Create New
      </ActionButton>
    </>
  );
}

const stateToProps = state => {
  return {
    selected: state.account.selected,
    accounts: state.account.available
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
