import React from "react";
import { connect } from "react-redux";

// import AccountSetupWizard from "./Components/AccountSetupWizard";
import AccountIncompleteWarning from "./Components/AccountIncompleteWarning";
// import PageCreateApplication from "./Components/PageCreateApplication";
// import PageEditApplications from "./Components/PageEditApplications";
// import DevOnlyCharacterApp from "./Components/DevOnlyCharacterApp";
import { Header, GlobalStyle } from "./Styles";
import Logo from "./Components/Logo";
import URL from "./Components/URL";
import AccountMenu from "./Components/AccountMenu";

function App({ init }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <GlobalStyle />
      {/* <AccountSetupWizard /> */}
      <Header>
        <Logo />
        <URL />
        <AccountMenu />
      </Header>
      <AccountIncompleteWarning />
      <React.Suspense fallback={"Loading..."}>
        {/* <PageCreateApplication /> */}
        {/* <PageEditApplications /> */}
      </React.Suspense>
    </>
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
