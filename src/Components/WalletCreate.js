import React from 'react';
import {connect} from 'react-redux';

function WalletCreate(props){
  const [name, setName] = React.useState('');
  if(!props.mnemonic) return null;

  return(
    <form onSubmit={e => e.preventDefault() || props.saveWallet(name)} className="wallet-create">
      <p>Please write down the following words to backup your wallet:</p>
      <p className="mnemonic">{props.mnemonic}</p>
      <div className="form-row">
        <label htmlFor="name">Wallet Name</label>
        <input type="text" value={name} placeholder="e.g. My First Wallet" onChange={e => setName(e.target.value)} />
      </div>
      <button type="submit" disabled={!name}>Save New Wallet</button>
    </form>
  );
}

const stateToProps = state => {
  console.log(state.wallet);
  return{
    mnemonic: state.wallet.selected && state.wallet.selected.mnemonic
  };
};

const dispatchToProps = dispatch => {
  return{
    saveWallet(name){
      dispatch({type: 'WALLET_SAVE_REQUESTED', payload: name});
    }
  };
};

export default connect(stateToProps, dispatchToProps)(WalletCreate);
