import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visiable, setVisable] = useState(false);

  const toggleVisible = () => setVisable(!visiable);
  const hiddenChildren = { display: visiable ? "none" : "" };
  const displayChildren = { display: visiable ? "" : "none" };

  useImperativeHandle(refs, () => {
    return { toggleVisible };
  });

  return (
    <div>
      <div style={displayChildren}>
        {props.children}
        <button onClick={() => toggleVisible()}>cancel</button>
      </div>
      <div style={hiddenChildren}>
        <button onClick={() => toggleVisible()}>{props.info}</button>
      </div>
    </div>
  );
});

export default Togglable;
