import React from "react";
import { connect } from "react-redux";

const AccountMenu = React.lazy(() => import("./AccountMenu"));

function Account({ isLoading, selectedAccountId }) {
  return (
    <div className="account">
      <React.Suspense fallback={<span>Loading...</span>}>
        {isLoading ? (
          <span>Loading...</span>
        ) : !!selectedAccountId ? (
          <AccountMenu />
        ) : null}
      </React.Suspense>
    </div>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.account.isLoading,
    selectedAccountId: state.account.selectedAccountId
  };
};

export default connect(stateToProps)(React.memo(Account));
