import React from "react";
import { connect } from "react-redux";

import "./App.css";
import Wallet from "./Components/Wallet";
// import PageCreateApplication from "./Components/PageCreateApplication";
// import PageEditApplications from "./Components/PageEditApplications";
// import DevOnlyCharacterApp from "./Components/DevOnlyCharacterApp";

function App({ init, isReady }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="container">
      <Wallet />
      <React.Suspense fallback={"Loading..."}>
        {/* <PageCreateApplication /> */}
        {/* <PageEditApplications /> */}
        {/* {isReady && <DevOnlyCharacterApp />} */}
      </React.Suspense>
    </div>
  );
}

const stateToProps = state => {
  return {
    isReady: !!state.wallet.currentWalletId
  };
};

const dispatchToProps = dispatch => {
  return {
    init() {
      dispatch({ type: "INIT" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(App));
