import React from "react";
import { connect } from "react-redux";

function WalletCreate({ newWallet, saveWallet }) {
  const [name, setName] = React.useState("");

  return (
    <form
      onSubmit={e => e.preventDefault() || saveWallet(name)}
      className="wallet-create"
    >
      <p>Please write down the following words to backup your wallet:</p>
      <p className="mnemonic">{newWallet.mnemonic}</p>
      <div className="form-row">
        <label htmlFor="name">Wallet Name</label>
        <input
          type="text"
          value={name}
          placeholder="e.g. My First Wallet"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!name}>
        Save New Wallet
      </button>
    </form>
  );
}

const stateToProps = state => {
  return {
    newWallet: state.wallet.newWallet
  };
};

const dispatchToProps = dispatch => {
  return {
    saveWallet(name) {
      dispatch({ type: "DO_WALLET_SAVE", payload: name });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(WalletCreate);
