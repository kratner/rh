import React, { ReactElement } from "react";
import LogoContainer from "./LogoContainer";

interface NavigationLink {
  label: string;
  url?: string;
  onClick?: () => void;
}

interface HeaderProps {
  navigation: NavigationLink[];
}

const Header = ({ navigation }: HeaderProps): ReactElement => {
  return (
    <header className="header">
      <div>
        <LogoContainer
          alt="Risk Horizon"
          className="logo"
          src="/rh/assets/risk_horizon_logo.svg"
        />
      </div>
      <nav className="navigation">
        <ul>
          {navigation.map((navItem, index) => (
            <li key={index}>
              <a href={navItem.url || "#"} onClick={navItem.onClick}>
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
