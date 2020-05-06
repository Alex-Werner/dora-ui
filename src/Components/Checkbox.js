import React from "react";

import { CheckboxContainer } from "../Styles";

function Checkbox(props) {
  return (
    <CheckboxContainer>
      <input {...props} />
      <span />
    </CheckboxContainer>
  );
}

export default React.memo(Checkbox);
