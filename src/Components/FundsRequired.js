import React from "react";
import { connect } from "react-redux";
import { Heading, Link, Box, Button } from "rebass";

import P from "./P";
import SubHeading from "./SubHeading";
import DashAddress from "./DashAddress";
import TextDropdown from "./TextDropdown";

function FundsRequired({ address }) {
  return (
    <React.Fragment>
      <Heading as="h2">Fund your Wallet</Heading>
      <P>
        To be able to interract fully with the Dash Platform and create a
        username you'll need some Dash in your wallet.
      </P>
      <TextDropdown title="Get some Dash instantly">
        <P>To get some free Dash instantly, follow these steps:</P>
        <Box as="ol" variant="list">
          <Box as="li">
            <Link href="http://faucet.evonet.networks.dash.org" target="_blank">
              Go to the Dash Faucet here
            </Link>
          </Box>
          <Box as="li">
            Copy your wallet address below and paste into the faucet
          </Box>
          <Box as="li">Fill in the verification letters on the Faucet</Box>
          <Box as="li">Click "Get coins". Your balance will update below.</Box>
        </Box>
      </TextDropdown>
      <SubHeading>Your Dash Address</SubHeading>
      <DashAddress>{address}</DashAddress>
      <Box variant="formRow">
        <Button variant="action" disabled={true}>
          Next
        </Button>
      </Box>
    </React.Fragment>
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
