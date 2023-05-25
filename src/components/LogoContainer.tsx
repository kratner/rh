import React, { CSSProperties } from "react";

type LogoContainerProps = {
  src: string;
  width?: string;
  height?: string;
  style?: CSSProperties;
};

const LogoContainer: React.FC<LogoContainerProps> = ({ src, width, height, style }) => {
  const logoStyle: CSSProperties = {
    width,
    height,
    ...style, // Merge additional styles with width and height
  };

  return <img src={src} alt="Logo" style={logoStyle} />;
};

export default LogoContainer;
