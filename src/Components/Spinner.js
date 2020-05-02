import React from "react";
import { Box } from "rebass";
import styled, { keyframes } from "styled-components";

const ripple = size =>
  keyframes`
        0% {
          top: ${size / 2 - 4}px;
          left: ${size / 2 - 4}px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: ${size - 8}px;
          height: ${size - 8}px;
          opacity: 0;
        }
`;

const animStyle = "1s cubic-bezier(0, 0.2, 0.8, 1) infinite";
const AnimatedWave = styled(Box)`
  animation: ${props => ripple(props.size)} ${animStyle};
`;

function Spinner({ size, color }) {
  const waveStyle = {
    position: "absolute",
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: color || "body",
    borderRadius: "50%",
    opacity: 1
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        position: "relative",
        width: size,
        height: size,
        marginLeft: `${size / 8}px`,
        marginBottom: 3
      }}
    >
      <AnimatedWave size={size} sx={waveStyle} />
      <AnimatedWave
        size={size}
        sx={{ ...waveStyle, animationDelay: "-0.5s!important" }}
      />
    </Box>
  );
}

export default React.memo(Spinner);
