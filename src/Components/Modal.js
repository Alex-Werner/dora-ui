import React from "react";
import { Box, Button } from "rebass";

function Modal({ children, onClose }) {
  const isVisible = !!children;

  return (
    <Box
      sx={{
        position: "fixed",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
        transition: "opacity 100ms ease-in-out"
      }}
      width={1}
      height="100%"
      minHeight="100vh"
      bg="light.4"
    >
      <Box
        bg="white"
        sx={{
          position: "absolute",
          top: [3, 4],
          transform: `translate(-50%, ${isVisible ? 0 : "-100%"})`,
          left: "50%",
          transition: "transform 300ms ease-in-out"
        }}
        padding={[3, 4]}
        width={[9 / 10, 600]}
        top="50%"
        left="50%"
      >
        <Button variant="ghost" onClick={onClose} />
        <React.Suspense fallback="Loading...">{children}</React.Suspense>
      </Box>
    </Box>
  );
}

export default React.memo(Modal);
