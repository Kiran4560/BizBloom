import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 text-xs text-slate-300 bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
