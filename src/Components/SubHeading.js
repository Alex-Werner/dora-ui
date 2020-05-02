import React from "react";
import { Heading } from "rebass";

function SubHeading({ children, ...props }) {
  return (
    <Heading as="h4" {...props} fontSize={2} mt={4}>
      {children}
    </Heading>
  );
}

export default React.memo(SubHeading);
