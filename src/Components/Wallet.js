import React from "react";
import { connect } from "react-redux";

function Wallet({ isLoading }) {
  return (
    <div className="wallet">
      {isLoading ? "Loading..." : <h2>Wallet Loaded</h2>}
    </div>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.wallet.isLoading
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(Wallet);
