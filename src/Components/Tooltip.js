import React from "react";

import { useWindowClick } from "../hooks";
import { TooltipTrigger, TooltipContent } from "../Styles";

function Tooltip({ children, content }) {
  const [coords, setCoords] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const triggerRef = React.useRef();
  const contentRef = React.useRef();
  useWindowClick(() => setIsVisible(false));

  React.useEffect(() => {
    if (!isVisible) return setCoords(null);

    const triggerCoords = triggerRef.current.getBoundingClientRect();
    const contentCoords = contentRef.current.getBoundingClientRect();
    setCoords(calcCoords(triggerCoords, contentCoords));
  }, [isVisible]);

  return (
    <>
      <TooltipTrigger
        ref={triggerRef}
        isVisible={isVisible}
        onClick={e => e.stopPropagation() || setIsVisible(!isVisible)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        ref={contentRef}
        isVisible={isVisible}
        style={coords}
        onClick={e => e.stopPropagation()}
      >
        {content}
      </TooltipContent>
    </>
  );
}

function calcCoords(triggerCoords, contentCoords) {
  console.log(triggerCoords, contentCoords);
  return undefined;
}

export default React.memo(Tooltip);
