import React from "react";

import { IdentityCreditDisplay, CreditIcon } from "../Styles";

const format = n => n.toLocaleString();

function IdentityCredit({ children: amount }) {
  return (
    <IdentityCreditDisplay>
      <CreditIcon /> <strong>{format(amount)}</strong> CR
    </IdentityCreditDisplay>
  );
}

export default React.memo(IdentityCredit);
