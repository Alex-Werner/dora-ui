import React from "react";
import { Box } from "rebass";
import Spinner from "./Spinner";

function AccountWizardLoading({ children, Icon }) {
  return (
    <Box sx={{ textAlign: "center", position: "relative" }}>
      <Spinner size={80} />
      <Box
        sx={{ position: "absolute", top: 20, left: 0, opacity: 0.4 }}
        width={1}
      >
        {Icon && <Icon size={40} />}
      </Box>
      {children}
    </Box>
  );
}

export default React.memo(AccountWizardLoading);
