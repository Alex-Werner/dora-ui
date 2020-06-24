import React from "react";
import { connect } from "react-redux";

import { account, wallet } from "../selectors";
import { OrderedList } from "../Styles";
import DashAddress from "./DashAddress";
import TextDropdown from "./TextDropdown";
import AwaitPayment from "./AwaitPayment";

function FundsRequired({ address }) {
  return (
    <div>
      <h2>Fund your Wallet</h2>
      <p>
        To be able to interract fully with the Dash Platform and create a
        username you'll need some Dash in your wallet.
      </p>
      <h3>Get Dash instantly</h3>
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
        <li>
          Follow the instructions on the Faucet, inputting your Dash Address
        </li>
        <li>Your balance will update below</li>
      </OrderedList>

      <h3>Your Dash Address</h3>
      <DashAddress>{address}</DashAddress>
      <AwaitPayment />
    </div>
  );
}

const stateToProps = state => {
  return {
    address: account(state).get("address")
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(FundsRequired));
