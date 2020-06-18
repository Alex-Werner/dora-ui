import React from "react";

import { Help } from "../Styles";
import Tooltip from "./Tooltip";

function HelpInfo({ children }) {
  return (
    <Tooltip content={children}>
      <Help>i</Help>
    </Tooltip>
  );
}

export default React.memo(HelpInfo);
