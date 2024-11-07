/* eslint-disable react/prop-types */
import  { useState } from "react";

const DeleteTooltip = ({ children, text, disabled }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && disabled &&(
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray text-black text-xs font-semibold py-1 px-2 rounded-md opacity-90 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default DeleteTooltip;
