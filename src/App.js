import React from "react";
import { connect } from "react-redux";

import "./App.css";
import Account from "./Components/Account";
import AccountModal from "./Components/AccountModal";
// import PageCreateApplication from "./Components/PageCreateApplication";
// import PageEditApplications from "./Components/PageEditApplications";
// import DevOnlyCharacterApp from "./Components/DevOnlyCharacterApp";

function App({ init }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <div id="dora">
      <AccountModal />
      <header>
        <Account />
      </header>
      <div className="container">
        <React.Suspense fallback={"Loading..."}>
          {/* <PageCreateApplication /> */}
          {/* <PageEditApplications /> */}
        </React.Suspense>
      </div>
    </div>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    init() {
      dispatch({ type: "INIT" });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(React.memo(App));
