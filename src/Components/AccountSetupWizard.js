import React from "react";
import { connect } from "react-redux";

import accountStatus from "../selectors/accountStatus";
import Modal from "./Modal";

const SelectNewAccountFrom = React.lazy(() => import("./SelectNewAccountFrom"));
// const AccountCreate = React.lazy(() => import("./AccountCreate"));
// const AccountImport = React.lazy(() => import("./AccountImport"));
// const AccountAddFunds = React.lazy(() => import("./AccountAddFunds"));
// const AccountCreateUsername = React.lazy(() =>
//   import("./AccountCreateUsername")
// );

const modalContentByStatus = {
  HIDDEN: {
    Component: null,
    ProgressComponent: null,
    title: null
  },
  SELECT_NEW_ACCOUNT_FROM: {
    Component: SelectNewAccountFrom,
    ProgressComponent: null,
    title: "Let's get started"
  }
};

function AccountModal({ status, closeModal }) {
  const { Component, title, ProgressComponent } = modalContentByStatus[status];
  const content = Component ? (
    <React.Fragment>
      <Component />
      {ProgressComponent && <ProgressComponent />}
    </React.Fragment>
  ) : null;

  return (
    <Modal onClose={closeModal} title={title}>
      {content}
    </Modal>
  );
}

const stateToProps = state => {
  return {
    status: accountStatus(state)
  };
};

const dispatchToProps = dispatch => {
  return {
    closeModal() {
      dispatch({ type: "DO_HIDE_WIZARD" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(AccountModal));
