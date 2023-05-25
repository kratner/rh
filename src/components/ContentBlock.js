import React from "react";
import styled from "styled-components";

const BlockContainer = styled.div`
  margin-bottom: 2rem;
`;

const ContentBlock = ({ children }) => {
  return <BlockContainer>{children}</BlockContainer>;
};

export default ContentBlock;
