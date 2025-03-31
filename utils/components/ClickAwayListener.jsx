import React, { useEffect, useRef, forwardRef } from 'react';

const ClickAwayListener = forwardRef(({ onClickAway, children }, ref) => {
  const localRef = useRef(null);
  const targetRef = ref || localRef; // Use ref if provided, otherwise use localRef

  useEffect(() => {
    const handleClickAway = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        onClickAway(event);
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [onClickAway]);

  return <div ref={targetRef}>{children}</div>;
});

export default ClickAwayListener;
