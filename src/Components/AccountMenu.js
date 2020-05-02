import React from "react";
import { connect } from "react-redux";
import { Box, Text } from "rebass";

import DashAmount from "./DashAmount";

function Account({ account }) {
  const user = {
    username: account.username || "anonymous",
    balance: account.balance || 0,
    isIncomplete: !account.username
  };

  const displayName =
    user.username.length > 10
      ? `${user.username.substring(0, 10)}...`
      : user.username;

  return (
    <Box
      flex={["0 0 75%", "0 0 25%"]}
      color="white"
      textAlign="right"
      position="relative"
      fontSize={2}
      sx={{ position: "relative" }}
    >
      <Text as="strong" fontSize={18} maxWidth="70%">
        {displayName}
      </Text>
      <DashAmount ml={3}>{user.balance}</DashAmount>
    </Box>
  );
}

const stateToProps = state => {
  return {
    account: state.account.current
  };
};

export default connect(stateToProps)(React.memo(Account));
