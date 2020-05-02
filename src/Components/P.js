import React from "react";
import { Text } from "rebass";

function P({ children, ...props }) {
  return (
    <Text variant="p" as="p" {...props}>
      {children}
    </Text>
  );
}

export default React.memo(P);
