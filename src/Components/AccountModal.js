import React from "react";
import { connect } from "react-redux";

import Modal from "./Modal";

const AccountSetup = React.lazy(() => import("./AccountSetup"));
const AccountCreate = React.lazy(() => import("./AccountCreate"));
const AccountImport = React.lazy(() => import("./AccountImport"));

function AccountModal({
  availableAccounts,
  closeModal,
  isCreating,
  isImporting
}) {
  const component = isCreating ? (
    <AccountCreate />
  ) : isImporting ? (
    <AccountImport />
  ) : Object.keys(availableAccounts).length === 0 ? (
    <AccountSetup />
  ) : null;

  return <Modal onClose={closeModal}>{component}</Modal>;
}

const stateToProps = state => {
  return {
    isCreating: state.account.isCreating,
    isImporting: state.account.isImporting,
    availableAccounts: state.account.availableAccounts
  };
};

const dispatchToProps = dispatch => {
  return {
    closeModal() {
      dispatch({ type: "DO_CLOSE_ACCOUNT_MODAL" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountModal));
