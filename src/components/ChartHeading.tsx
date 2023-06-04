import React from 'react';

interface ChartHeadingProps {
  title: string;
  subtitle: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const ChartHeading: React.FC<ChartHeadingProps> = ({
  title,
  subtitle,
  containerClassName,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <div className={containerClassName}>
      <div className={titleClassName}>{title}</div>
      <div className={subtitleClassName}>{subtitle}</div>
    </div>
  );
};

export default ChartHeading;
