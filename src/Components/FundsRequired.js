import React from "react";
import { connect } from "react-redux";

import { OrderedList, ActionButton } from "../Styles";
import DashAddress from "./DashAddress";
import TextDropdown from "./TextDropdown";

function FundsRequired({ address }) {
  return (
    <>
      <h2>Fund your Wallet</h2>
      <p>
        To be able to interract fully with the Dash Platform and create a
        username you'll need some Dash in your wallet.
      </p>
      <TextDropdown title="Get some Dash instantly">
        <p>To get some free Dash instantly, follow these steps:</p>
        <OrderedList>
          <li>
            <a
              href="http://faucet.evonet.networks.dash.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to the Dash Faucet here
            </a>
          </li>
          <li>Copy your wallet address below and paste into the faucet</li>
          <li>Fill in the verification letters on the Faucet</li>
          <li>Click "Get coins". Your balance will update below.</li>
        </OrderedList>
      </TextDropdown>
      <h3>Your Dash Address</h3>
      <DashAddress>{address}</DashAddress>
      <ActionButton disabled={true}>Next</ActionButton>
    </>
  );
}

const stateToProps = state => {
  return {
    address: state.account.current.address
  };
};

const dispatchToProps = dispatch => {};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(FundsRequired));
