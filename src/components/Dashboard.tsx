import React, { ReactElement, ReactNode } from "react";
import LogoContainer from "./LogoContainer";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps): ReactElement => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <LogoContainer src="/rh/risk_horizon_logo.svg" style={{ width: "18em" }} />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Information</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Dashboard Panels */}
      <div className="dashboard-panels">
        <div className="row">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Risk Horizon. All rights reserved.
        </div>
        <nav className="footer-links">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;
