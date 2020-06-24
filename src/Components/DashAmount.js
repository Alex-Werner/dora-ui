import React from "react";

import { DashAmount, DashIcon } from "../Styles";

const satsToDash = n => n / 100000000;
const format = n =>
  satsToDash(n).toLocaleString(undefined, {
    maximumSignificantDigits: 8,
    minimumSignificantDigits: 5
  });

function DashAmountComponent({ children: amount, size = 4, unconfirmed = 0 }) {
  if (typeof amount !== "number") return amount;
  return (
    <DashAmount size={size}>
      <DashIcon size={size - 1} />
      <strong title={`${satsToDash(amount)} DASH`}>{format(amount)}</strong>
      {unconfirmed > 0 && <small>+ {format(unconfirmed)} unconfirmed</small>}
    </DashAmount>
  );
}

export default React.memo(DashAmountComponent);
