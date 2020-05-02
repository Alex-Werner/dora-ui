import React from "react";
import { Flex } from "rebass";

function Container(props) {
  return (
    <Flex {...props} px={[2, 4]} width={1} flexWrap="wrap" fontFamily="body" />
  );
}

export default React.memo(Container);
