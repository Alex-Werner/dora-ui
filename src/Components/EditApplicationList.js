import React from "react";
import { connect } from "react-redux";

function EditApplicationList({ apps, select }) {
  return (
    <ul>
      {Object.keys(apps).map(name => {
        return (
          <li key={name}>
            <a onClick={e => select(name)}>{name}</a>
          </li>
        );
      })}
    </ul>
  );
}

const stateToProps = state => {
  return {
    apps: state.apps.contracts
  };
};

const dispatchToProps = dispatch => {
  return {
    select(name) {
      dispatch({ type: "DO_SELECT_EDIT_APPLICATION", payload: name });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(EditApplicationList));
