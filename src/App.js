import React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "emotion-theming";

import AccountMenu from "./Components/AccountMenu";
import AccountSetupWizard from "./Components/AccountSetupWizard";
import Logo from "./Components/Logo";
import URL from "./Components/URL";
// import PageCreateApplication from "./Components/PageCreateApplication";
// import PageEditApplications from "./Components/PageEditApplications";
// import DevOnlyCharacterApp from "./Components/DevOnlyCharacterApp";
import Container from "./Components/Container";

import theme from "./theme";

function App({ init }) {
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AccountSetupWizard />
        <Container
          bg="primary"
          alignItems="center"
          py={[2, 0]}
          justifyContent="space-between"
        >
          <Logo />
          <URL />
          <AccountMenu />
        </Container>
        <div className="container">
          <React.Suspense fallback={"Loading..."}>
            {/* <PageCreateApplication /> */}
            {/* <PageEditApplications /> */}
          </React.Suspense>
        </div>
      </ThemeProvider>
    </React.Fragment>
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
