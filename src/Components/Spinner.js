import React from "react";

import { SpinnerContainer, AnimatedWave } from "../Styles";

function Spinner({ size }) {
  return (
    <SpinnerContainer size={size}>
      <AnimatedWave size={size} />
      <AnimatedWave size={size} />
    </SpinnerContainer>
  );
}

export default React.memo(Spinner);
