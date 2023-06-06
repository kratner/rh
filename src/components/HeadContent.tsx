import React from "react";
import { Helmet } from "react-helmet";

interface HeadContentProps {
  title: string;
  description: string;
  keywords: string;
  favicon: string;
}

const HeadContent: React.FC<HeadContentProps> = ({
  title,
  description,
  keywords,
  favicon,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
  );
};

export default HeadContent;
