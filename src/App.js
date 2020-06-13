import React from "react";
import { connect } from "react-redux";

import AccountWizard from "./Components/AccountWizard";
import AccountIncompleteWarning from "./Components/AccountIncompleteWarning";
// import PageCreateApplication from "./Components/PageCreateApplication";
// import PageEditApplications from "./Components/PageEditApplications";
// import DevOnlyCharacterApp from "./Components/DevOnlyCharacterApp";
import { Header, GlobalStyle } from "./Styles";
import Logo from "./Components/Logo";
import URL from "./Components/URL";
import AccountMenu from "./Components/AccountMenu";
import Page from "./Components/Page";
import ExamplePage from "./Components/ExamplePage";

function App({ init }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <GlobalStyle />
      <AccountWizard />
      <Header>
        <Logo />
        <AccountMenu />
      </Header>
      <AccountIncompleteWarning />
      <React.Suspense fallback={"Loading..."}>
        <Page>
          {/* <URL /> */}
          <ExamplePage />
        </Page>
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
