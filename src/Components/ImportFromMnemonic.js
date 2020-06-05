import React from "react";
import { connect } from "react-redux";

import {
  Form,
  Textarea,
  Label,
  FieldInfo,
  ActionButton,
  FieldError
} from "../Styles";

function ImportFromMnemonic({ isLoading, importWallet, error }) {
  const [mnemonic, setMnemonic] = React.useState("");

  return (
    <Form onSubmit={e => e.preventDefault() || importWallet(mnemonic)}>
      <h2>Import an existing wallet</h2>
      <p>
        Enter your 12-word mnemonic below to import your wallet and Dash
        Platform data.
      </p>
      <Label htmlFor="mnemonic">Enter a Mnemonic</Label>
      <Textarea
        id="mnemonic"
        name="mnemonic"
        rows={3}
        value={mnemonic}
        onChange={e => setMnemonic(e.target.value)}
      />
      {error && (
        <FieldError>That mnemonic was incorrect. Please try again.</FieldError>
      )}
      <ActionButton type="submit">Import</ActionButton>
    </Form>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.loading.importMnemonic,
    error: state.error.WALLET_IMPORT_FAILED
  };
};

const dispatchToProps = dispatch => {
  return {
    importWallet(mnemonic) {
      dispatch({ type: "IMPORT_WALLET", payload: mnemonic });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(ImportFromMnemonic));
