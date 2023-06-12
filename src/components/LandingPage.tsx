import React from "react";
import "./LandingPage.scss";

interface PanelProps {
  title: string;
  content: string;
  background: string;
}

interface ParallaxBackgroundProps {
  imageUrl: string;
  speed: number;
}

interface LandingPageProps {
  panels: PanelProps[];
  parallaxBackgrounds: ParallaxBackgroundProps[];
}

const LandingPage: React.FC<LandingPageProps> = ({
  panels,
  parallaxBackgrounds,
}) => {
  return (
    <div className="landing-page">
      {panels.map((panel, index) => (
        <div
          key={index}
          className="landing-panel"
          style={{ background: panel.background }}
        >
          <h2>{panel.title}</h2>
          <p>{panel.content}</p>
        </div>
      ))}
      {parallaxBackgrounds.map((background, index) => (
        <div
          key={index}
          className="parallax-background"
          style={{
            backgroundImage: `url(${background.imageUrl})`,
            backgroundPositionY: `-${window.pageYOffset *
              background.speed}px`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default LandingPage;
