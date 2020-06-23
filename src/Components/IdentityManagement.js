import React from "react";
import { connect } from "react-redux";

import { nameList, wallet } from "../selectors";
import { UsernameList, GhostButton, GoIcon, ActionButton } from "../Styles";
import IdentityCredit from "./IdentityCredit";

function IdentityManagement({ names, index, select, createUsername, hide }) {
  console.log(names, index);
  return (
    <>
      <h2>Identity Management</h2>
      <p>
        To interract with the Dash Platform you need an <em>identity</em>. Each
        identity can have one or more <em>usernames</em>.
      </p>
      <p>
        You can select from your list of registered usernames below,
        alternatively you can create a new username with the "Create Username"
        button.
      </p>
      <h3>Select a username</h3>
      <UsernameList>
        {names.map(name => {
          console.log(name);
          return (
            <li>
              <GhostButton onClick={e => select(name.name, index) || hide()}>
                {name.name}
                <IdentityCredit>{name.balance}</IdentityCredit>
                <GoIcon />
              </GhostButton>
            </li>
          );
        })}
      </UsernameList>
      <ActionButton onClick={createUsername} ownRow={true}>
        Create Username
      </ActionButton>
    </>
  );
}

const stateToProps = state => {
  return {
    names: nameList(state),
    index: wallet(state).get("selectedAccount")
  };
};

const dispatchToProps = dispatch => {
  return {
    select(username, index) {
      dispatch({ type: "SELECT_USERNAME", payload: { username, index } });
    },
    createUsername() {
      dispatch({ type: "SHOW_CREATE_USERNAME" });
      dispatch({ type: "HIDE_IDENTITY_MANAGEMENT" });
    },
    hide() {
      dispatch({ type: "HIDE_IDENTITY_MANAGEMENT" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(IdentityManagement));
