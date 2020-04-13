import React from 'react';
import {connect} from 'react-redux';

import './App.css';
import Wallet from './Components/Wallet';

function App({init}) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
	<div className="container">
      <Wallet />
	</div>
  );
}

const stateToProps = state => ({});
const dispatchToProps = dispatch => {
  return{
    init(){
      dispatch({type: 'INIT'});
    }
  };
};

export default connect(stateToProps, dispatchToProps)(App);
