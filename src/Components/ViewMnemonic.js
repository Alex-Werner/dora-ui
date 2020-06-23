import React from "react";
import { connect } from "react-redux";

import { wallet } from "../selectors";
import Mnemonic from "./Mnemonic";

function ViewMnemonic({ mnemonic }) {
  return (
    <>
      <h2>Your backup phrase</h2>
      <p>
        If using Dora in a web browser, deleting history or closing your
        Incognito tab will lose your wallet, so it's important to note this.
      </p>
      <p>
        Be sure to write the following words down (in order) and keep them
        somewhere safe and secure.
      </p>
      <Mnemonic>{mnemonic}</Mnemonic>
    </>
  );
}

const stateToProps = state => {
  return {
    mnemonic: wallet(state).get("mnemonic")
  };
};

export default connect(stateToProps)(React.memo(ViewMnemonic));
