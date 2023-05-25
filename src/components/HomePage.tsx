import React from "react";

import styled from "styled-components";

interface BlockContainerProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  // background-color: #000;
  color: #fff;
`;

const Header = styled.div`
`;

const FixedHeader = styled.div`
  padding: 0em 1.5em;
`;

const Footer = styled.div`
  bottom: 0;
  z-index: 5;
  padding: 1em;
`


const Content = styled.div`
  // width: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`;

const BlockContainer = styled.div`
  margin-bottom: 2rem;
`;

// const ContentBlock = ({ children }) => {
//   return <BlockContainer>{children}</BlockContainer>;
// };

const ContentBlock: React.FC<BlockContainerProps> = ({ children}) => {
  return <BlockContainer>{children}</BlockContainer>;
}


interface HomePageProps {
  fixedHeader?: React.ReactNode[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  contentBlocks?: React.ReactNode[];
  footerText?: string;
  contentContainerClassName?: string;
}

const HomePage: React.FC<HomePageProps> = ({
  fixedHeader,
  title,
  subtitle,
  buttonText,
  contentBlocks,
  footerText,
  contentContainerClassName
}) => {
  return (
    <Container>
      {fixedHeader && <FixedHeader>
      </FixedHeader>}
      <Header>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}</Header>
        {buttonText && <Button>{buttonText}</Button>}
      <Content className={contentContainerClassName}>
        {contentBlocks?.map((block, index) => (
          <ContentBlock key={index}>{block}</ContentBlock>
        ))}
      </Content>
      <Footer>
        {footerText && <div>{footerText}</div>}
      </Footer>
    </Container>
  );
};

export default HomePage;
