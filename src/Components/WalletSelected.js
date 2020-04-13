import React from 'react';
import {connect} from 'react-redux';

function WalletSelected(props){

  return(
    <p>Address: {props.address}</p>
  );
}

const stateToProps = state => {
  return{
    address: state.wallet.selected.address,
    mnemonic: state.wallet.selected.mnemonic
  };
};

const dispatchToProps = dispatch => {
  return{};
};

export default connect(stateToProps, dispatchToProps)(WalletSelected);
