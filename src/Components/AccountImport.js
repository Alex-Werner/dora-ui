import React from "react";
import { connect } from "react-redux";

function AccountImport() {
  return <p>Import</p>;
}

const stateToProps = state => {
  return {};
};

export default connect(stateToProps)(React.memo(AccountImport));
