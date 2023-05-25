import React from "react";

const GridContainer = ({ containerDivs }) => {
  return (
    <div className="grid-container">
      {containerDivs.map((div, index) => (
        <div className="child-container" key={index}>
          {div}
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
