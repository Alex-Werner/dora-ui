import React from "react";
import { Box, Button, Heading } from "rebass";
import { Close } from "@styled-icons/evaicons-solid/Close";

function Modal({ children, onClose, title }) {
  const isVisible = !!children;

  return (
    <Box
      sx={{
        position: "fixed",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
        transition: "opacity 100ms ease-in-out",
        cursor: "pointer"
      }}
      width={1}
      height="100%"
      minHeight="100vh"
      bg="rgba(255, 254, 250, 0.9)"
      onClick={onClose}
    >
      <Box
        onClick={e => e.stopPropagation()}
        bg="white"
        sx={{
          position: "absolute",
          cursor: "default",
          top: [3, 4],
          transform: `translate(-50%, ${isVisible ? 0 : "-100%"})`,
          left: "50%",
          transition: "transform 300ms ease-in-out",
          boxShadow: "large",
          borderRadius: "default"
        }}
        padding={[3, 4]}
        width={[9 / 10, 600]}
        fontFamily="body"
      >
        {title && (
          <Heading as="h2" my={0}>
            {title}
          </Heading>
        )}
        <Button
          variant="ghost"
          onClick={onClose}
          color="black"
          sx={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <Close size={20} />
        </Button>
        <React.Suspense fallback="Loading...">{children}</React.Suspense>
      </Box>
    </Box>
  );
}

export default React.memo(Modal);
