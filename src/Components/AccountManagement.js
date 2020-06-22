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
        {Object.keys(accounts).map(index => {
          const account = accounts[index];
          const name = account.selectedName;
          const names = Object.keys(account.identityIdByName);

          return (
            <li
              key={index}
              selected={selected === index}
              onClick={e => select(index) || hide()}
            >
              <strong>{account.selectedName || "(anonymous)"}</strong>
              <small>
                {names.filter(n => n.name !== account.selectedName).join(", ")}
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
    selected: state.getIn(["wallet", "selectedAccount"]),
    accounts: state.getIn(["wallet", "accounts"])
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
