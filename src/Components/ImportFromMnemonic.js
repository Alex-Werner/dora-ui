import React from "react";
import { connect } from "react-redux";
import { Import } from "@styled-icons/boxicons-regular/Import";

import { Form, Textarea, Label, ActionButton, FieldError } from "../Styles";
import AccountWizardLoading from "./AccountWizardLoading";

function ImportFromMnemonic({ isLoading, importWallet, error }) {
  const [mnemonic, setMnemonic] = React.useState("");

  return !isLoading ? (
    <Form onSubmit={e => e.preventDefault() || importWallet(mnemonic)}>
      <h2>Import an existing wallet</h2>
      <p>
        Enter your 12-word backup phrase below to import your wallet and Dash
        Platform data.
      </p>
      <Label htmlFor="mnemonic">Enter a backup phrase</Label>
      <Textarea
        id="mnemonic"
        name="mnemonic"
        rows={3}
        value={mnemonic}
        onChange={e => setMnemonic(e.target.value)}
      />
      {error && (
        <FieldError>
          That backup phrase was incorrect. Please try again.
        </FieldError>
      )}
      <ActionButton type="submit">Import</ActionButton>
    </Form>
  ) : (
    <AccountWizardLoading Icon={Import}>
      Importing your Dash Wallet and Dash Platform data. This may take a few
      minutes.
    </AccountWizardLoading>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.getIn(["loading", "importMnemonic"]),
    error: state.getIn(["error", "walletImport"])
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
