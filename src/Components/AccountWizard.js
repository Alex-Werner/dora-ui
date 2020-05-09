import React from "react";
import { connect } from "react-redux";

import accountStatus from "../selectors/accountStatus";
import AccountWizardLoading from "./AccountWizardLoading";
import Modal from "./Modal";

const SelectWizardType = React.lazy(() => import("./SelectWizardType"));
const ConfirmMnemonic = React.lazy(() => import("./ConfirmMnemonic"));
const FundsRequired = React.lazy(() => import("./FundsRequired"));
const CreateUsername = React.lazy(() => import("./CreateUsername"));
// const AccountCreate = React.lazy(() => import("./AccountCreate"));
// const AccountImport = React.lazy(() => import("./AccountImport"));
// const AccountAddFunds = React.lazy(() => import("./AccountAddFunds"));

const modalContentByStatus = {
  HIDDEN: {
    Component: null
  },
  SELECT_WIZARD_TYPE: {
    Component: SelectWizardType
  },
  CONFIRM_MNEMONIC: {
    Component: ConfirmMnemonic
  },
  FUNDS_REQUIRED: {
    Component: FundsRequired
  },
  USERNAME_REQUIRED: {
    Component: CreateUsername
  },
  LOADING: {
    Component: AccountWizardLoading
  }
};

function AccountModal({ status, closeModal }) {
  const { Component, ProgressComponent } = modalContentByStatus[status];
  const content = Component ? (
    <React.Suspense fallback={<AccountWizardLoading />}>
      <Component />
      {ProgressComponent && <ProgressComponent />}
    </React.Suspense>
  ) : null;

  return <Modal close={closeModal}>{content}</Modal>;
}

const stateToProps = state => {
  return {
    status: accountStatus(state)
  };
};

const dispatchToProps = dispatch => {
  return {
    closeModal() {
      dispatch({ type: "HIDE_WIZARD" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountModal));
