import React from "react";
import { connect } from "react-redux";

function ImportContract() {
  return <h2>Import a Contract</h2>;
}

const stateToProps = state => {
  return {
    apps: state.wallet.apps
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(ImportContract));
