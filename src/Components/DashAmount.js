import React from "react";

import { DashAmount } from "../Styles";
import { Dash } from "@styled-icons/crypto/Dash";

function DashAmountComponent({ children: amount, size = 14 }) {
  console.log(amount);
  if (typeof amount !== "number") return amount;
  return (
    <DashAmount style={{ fontSize: size }}>
      <Dash size={size} />
      <span>{(amount / 100000000).toFixed(4)}</span>
    </DashAmount>
  );
}

export default React.memo(DashAmountComponent);
