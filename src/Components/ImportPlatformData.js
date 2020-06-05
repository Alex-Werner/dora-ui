import React from "react";
import { connect } from "react-redux";

import { Form, ActionButton } from "../Styles";

function ImportPlatformData({ run, isLoading }) {
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Form onSubmit={e => e.preventDefault() || run()}>
      <h2>Import Platform Data</h2>
      <p>
        To complete your wallet import, we need to find all the Dash Platform
        data associated with your wallet.
      </p>
      <p>
        This search can take anything from one second to a few minutes,
        depending on how much you've used the Dash Platform before.
      </p>
      <ActionButton type="submit">Import Platform Data</ActionButton>
    </Form>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.loading.platformImport
  };
};

const dispatchToProps = dispatch => {
  return {
    run() {
      dispatch({ type: "IMPORT_PLATFORM_DATA" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(ImportPlatformData));
