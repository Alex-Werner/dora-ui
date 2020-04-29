import React from "react";
import { connect } from "react-redux";
import { Input } from "@rebass/forms";
import { Box } from "rebass";

function URL() {
  return (
    <Box flex="1 0 200px" maxWidth={1000} order={[3, 0]} mt={[2, 0]}>
      <Input type="text" value="dora.dash" variant="lightOnDark" />
    </Box>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(React.memo(URL));
