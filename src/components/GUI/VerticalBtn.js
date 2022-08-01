import { useEffect, useRef } from "react";

export const VerticalBtn = (props) => {
  const automatsCatRef = useRef();

  useEffect(() => {
    if (props.selectedMenu.toLowerCase() === props.id.toLowerCase()) {
      props.prevSel(automatsCatRef.current);
    }
  }, []);

  return (
    <button
      className={`${props.classesOption} ${props.selected}`}
      onClick={(e) => props.automatOpenHandler(e)}
      ref={automatsCatRef}
      id={props.id}
    >
      {props.children}
    </button>
  );
};
