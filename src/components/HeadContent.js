import React from "react";
import { Helmet } from "react-helmet";

const HeadContent = ({ title, description, keywords, favicon }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
  );
};

export default HeadContent;
