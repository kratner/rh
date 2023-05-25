import React from "react";

const LayoutComponent = ({ components, numColumns, componentClassName }) => {
  return (
    <div className={`layout columns-${numColumns}`}>
      {components.map((component, index) => (
        <div className={componentClassName} key={index}>
          {component}
        </div>
      ))}
    </div>
  );
};

export default LayoutComponent;
