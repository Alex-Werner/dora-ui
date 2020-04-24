import React from "react";

function Modal({ children }) {
  const isVisible = !!children;

  return (
    <div className={`modal${isVisible ? "" : " modal-hide"}`}>
      <div className="modal-overlay" />
      <div className="modal-content">
        <React.Suspense fallback="Loading...">{children}</React.Suspense>
      </div>
    </div>
  );
}

export default React.memo(Modal);
