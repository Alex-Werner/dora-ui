import React from "react";
import { Text } from "rebass";
import { Dash } from "@styled-icons/crypto/Dash";

function DashAmount({ children: amount, ...props }) {
  if (typeof amount !== "number") return amount;
  return (
    <Text as="span" {...props} px={2} color="white" lineHeight={"22px"}>
      <Dash size={props.fontSize || 16} />
      <Text as="span" fontSize={props.fontSize || 15} ml={1}>
        {(amount / 100000000).toFixed(4)}
      </Text>
    </Text>
  );
}

export default React.memo(DashAmount);
