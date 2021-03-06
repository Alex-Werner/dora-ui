import React from "react";
import { Close } from "@styled-icons/evaicons-solid/Close";

import { ModalOverlay, ModalContent, GhostButton } from "../Styles";
import { useWindowKeyup } from "../hooks";

function Modal({ children, close, title }) {
  const isVisible = !!children;
  useWindowKeyup("Escape", close);
  React.useEffect(() => {
    if (isVisible) window.scrollTo(0, 0);
  }, [isVisible]);

  return (
    <ModalOverlay
      onClick={e => console.log("clicked overlay") || close()}
      isVisible={isVisible}
    >
      <ModalContent
        onClick={e => console.log("clicked modal") || e.stopPropagation()}
        isVisible={isVisible}
      >
        {title && <h2>{title}</h2>}
        <GhostButton onClick={close}>
          <Close size={20} />
        </GhostButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default React.memo(Modal);
