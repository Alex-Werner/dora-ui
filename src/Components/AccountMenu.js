import React from "react";
import { connect } from "react-redux";

function AccountMenu() {
  return "Account display";
}

const stateToProps = state => {
  return {};
};

export default connect(stateToProps)(React.memo(AccountMenu));
