import React from "react";
import { connect } from "react-redux";

const WalletCreate = React.lazy(() => import('./WalletCreate'));
const WalletSelected = React.lazy(() => import('./WalletSelected'));

function Wallet(props) {
  console.log(props.availableWallets);

  return (
    <div className="wallet">
      <React.Suspense fallback={<span>Loading...</span>}>
        {props.isLoading && 'Loading...'}
        {props.availableWallets.length > 0 && (
          <select onChange={e => props.selectWallet(e.target.value)}>
            <option value="">Select a wallet...</option>
            {props.availableWallets.map(w => {
              return <option value={w.mnemonic}>{w.name}</option>
            })}
          </select>
        )}
        {!props.isCreating && <button onClick={props.requestWallet}>Create New</button>}
        {props.isCreating && <WalletCreate />}
        {!props.isCreating && !!props.selected && <WalletSelected />}
      </React.Suspense>
    </div>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.wallet.isLoading,
    isCreating: state.wallet.isCreating,
    availableWallets: state.wallet.availableWallets,
    selected: state.wallet.selected
  };
};

const dispatchToProps = dispatch => {
  return {
    requestWallet(){
      dispatch({type: 'WALLET_REQUESTED'});
    },
    selectWallet(mnemonic){
      dispatch({type: 'WALLET_SELECTED', payload: mnemonic});
    }
  };
};

export default connect(stateToProps, dispatchToProps)(Wallet);
