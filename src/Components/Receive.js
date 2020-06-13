import React from "react";
import { connect } from "react-redux";

function Receive() {
  return <h2>Hello world</h2>;
}

const stateToProps = state => {};

const dispatchToProps = dispatch => {};

export default connect(stateToProps, dispatchToProps)(React.memo(Receive));
