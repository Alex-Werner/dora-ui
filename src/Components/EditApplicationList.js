import React from "react";
import { connect } from "react-redux";

function EditApplicationList() {}

const stateToProps = state => {
  return {
    apps: state.apps.contracts
  };
};
