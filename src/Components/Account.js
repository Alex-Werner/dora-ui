import React from "react";
import { connect } from "react-redux";
import { Box } from "rebass";

const AccountMenu = React.lazy(() => import("./AccountMenu"));

function Account({ isLoading, selectedAccountId }) {
  return (
    <Box flex="0 0 200px" ml={[0, 6]} px={3}>
      <React.Suspense fallback={<span>Loading...</span>}>
        {isLoading ? (
          <span>Loading...</span>
        ) : !!selectedAccountId ? (
          <AccountMenu />
        ) : null}
      </React.Suspense>
    </Box>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.account.isLoading,
    selectedAccountId: state.account.selectedAccountId
  };
};

export default connect(stateToProps)(React.memo(Account));
