import React, { ReactNode } from "react";

interface ResponsiveGridProps {
  items: ReactNode[];
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ items }) => {
  return (
    <div className="responsive-grid">
      {items.map((item, index) => (
        <div key={index} className="grid-item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default ResponsiveGrid;
