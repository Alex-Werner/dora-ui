import React from "react";
import { connect } from "react-redux";

import { identityId, names } from "../selectors";
import { WarningBanner } from "../Styles";

function AccountIncompleteWarning({ isIncomplete, showWizard }) {
  return isIncomplete ? (
    <WarningBanner onClick={showWizard}>
      Your account is not fully setup.
      <strong>Complete setup to get the most out of Dora.</strong>
    </WarningBanner>
  ) : null;
}

const stateToProps = state => {
  return {
    isIncomplete: !identityId(state) && names(state).size === 0
  };
};

const dispatchToProps = dispatch => {
  return {
    showWizard() {
      dispatch({ type: "SHOW_WIZARD" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountIncompleteWarning));
