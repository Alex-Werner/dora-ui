import React from "react";
import { connect } from "react-redux";

const WalletCreate = React.lazy(() => import("./WalletCreate"));
const WalletAccount = React.lazy(() => import("./WalletAccount"));
const WalletSelector = React.lazy(() => import("./WalletSelector"));

function Wallet({ isLoading, isCreating, currentWalletId, requestWallet }) {
  if (isLoading) return <div className="wallet">Loading...</div>;

  return (
    <div className="wallet">
      <React.Suspense fallback={<span>Loading...</span>}>
        <WalletSelector />

        {!isCreating && <button onClick={requestWallet}>Create New</button>}

        {isCreating && <WalletCreate />}

        {!isCreating && !!currentWalletId && <WalletAccount />}
      </React.Suspense>
    </div>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.wallet.isLoading,
    isCreating: !!state.wallet.newWallet,
    currentWalletId: state.wallet.currentWalletId
  };
};

const dispatchToProps = dispatch => {
  return {
    requestWallet() {
      dispatch({ type: "DO_WALLET_CREATE" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(Wallet));
