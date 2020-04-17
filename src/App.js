import React from "react";
import { connect } from "react-redux";

import "./App.css";
import Wallet from "./Components/Wallet";
import PageCreateApplication from "./Components/PageCreateApplication";
import PageEditApplications from "./Components/PageEditApplications";

function App({ init }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="container">
      <Wallet />
      <React.Suspense fallback={"Loading..."}>
        {/*<PageCreateApplication />*/}
        <PageEditApplications />
      </React.Suspense>
    </div>
  );
}

const stateToProps = state => {
  return {
    isReady: !!state.wallet.selected
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
