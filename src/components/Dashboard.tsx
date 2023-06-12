import React, { ReactElement, ReactNode } from "react";
import LogoContainer from "./LogoContainer";

interface NavigationLink {
  label: string;
  url?: string;
  onClick?: () => void;
}

interface DashboardPanelComponents {
  children: ReactNode;
  footerText: string;
  navigation: NavigationLink[];
}

const Dashboard = ({
  children,
  footerText,
  navigation,
}: DashboardPanelComponents): ReactElement => {
  return (
    <div className="dashboard">
      {/* Header */}
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

      {/* Dashboard Panels */}
      <div className="dashboard-panels">
        <div className="row">{children}</div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="copyright">{footerText}</div>
        <nav className="footer-links">
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Disclaimer</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;
