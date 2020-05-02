import React from "react";
import { connect } from "react-redux";
import { AlertCircle } from "@styled-icons/evaicons-solid/AlertCircle";
import { Text } from "rebass";

import Container from "./Container";

function AccountIncompleteWarning({ isIncomplete, showWizard }) {
  return isIncomplete ? (
    <Container
      py={1}
      sx={{
        cursor: "pointer",
        ":hover": {
          textDecoration: "underline"
        }
      }}
      lineHeight={1}
      bg="error"
      color="dark.4"
      alignItems="center"
      onClick={showWizard}
    >
      <AlertCircle size={18} />
      <Text ml={2} fontSize={1}>
        Your account is not fully setup.
        <Text as="span" display={["none", "inline"]}>
          Complete setup to get the most of Dora.
        </Text>
      </Text>
    </Container>
  ) : null;
}

const stateToProps = state => {
  return {
    isIncomplete: !state.account.current.username
  };
};

const dispatchToProps = dispatch => {
  return {
    showWizard() {
      dispatch({ type: "DO_SHOW_WIZARD" });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountIncompleteWarning));
