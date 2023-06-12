import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeadContent from "./components/HeadContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import InformationPage from "./pages/InformationPage";
import "./styles/index.scss";

const App = () => {
  const navigationLinks = [
    { label: "Home", url: "/" },
    { label: "Dashboard", url: "/dashboard" },
    { label: "Information", url: "/information" },
    { label: "Contact", url: "/contact" },
  ];

  const footerText = `\u00A9 ${new Date().getFullYear()} RiskHorizon. All rights reserved.`;

  return (
    <Router>
      <div>
        <HeadContent
          title="Risk Horizon"
          description="Risk Horizon"
          keywords="cve, epss, vulnerabilities"
        />

        <Header navigation={navigationLinks} />

        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/information" element={<InformationPage />} />
        </Routes>

        <Footer footerText={footerText} />
      </div>
    </Router>
  );
};

export default App;
