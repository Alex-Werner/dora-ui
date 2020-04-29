import React from "react";
import { connect } from "react-redux";

import Address from "./Address";

function AccountAddFunds({ address }) {
  return (
    <div className="account-add-funds">
      <h2>Let's add some Dash</h2>
      <p>
        To be able to fully interract with the Dash Platform, you will need some
        funds in your account.
      </p>
      <p>
        To add some Dash,{" "}
        <a
          href="http://faucet.evonet.networks.dash.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          go to the Dash faucet here
        </a>{" "}
        and paste in the address below:
      </p>
      <Address address={address} />
    </div>
  );
}

const stateToProps = state => {
  return {
    address: state.account.account.address
  };
};

export default connect(stateToProps)(React.memo(AccountAddFunds));
