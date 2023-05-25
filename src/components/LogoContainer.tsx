import React, { CSSProperties } from "react";

type LogoContainerProps = {
  alt: string;
  src: string;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
};

const LogoContainer: React.FC<LogoContainerProps> = ({ alt, src, width, height, className, style }) => {
  const logoStyle: CSSProperties = {
    width,
    height,
    ...style, // Merge additional styles with width and height
  };

  return <img src={src} alt={alt} className={className} style={logoStyle} />;
};

export default LogoContainer;
