import React, { ReactElement } from "react";

interface ComponentProps {
  Component: React.ComponentType;
  width: string;
}

interface MultiColumnLayoutProps {
  components: ComponentProps[];
}

const MultiColumnLayout = ({ components }: MultiColumnLayoutProps): ReactElement => {
  return (
    <div className="container">
      <div className="row">
        {components.map(({ Component, width }, index) => (
          <div className={`col-md-${width}`} key={index}>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiColumnLayout;
