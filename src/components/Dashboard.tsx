import React, { ReactElement, ReactNode } from "react";

interface DashboardPanelComponents {
  children: ReactNode;
}

const Dashboard = ({
  children,
}: DashboardPanelComponents): ReactElement => {
  return (
    <div className="dashboard">

      {/* Dashboard Panels */}
      <div className="dashboard-panels">
        <div className="row">{children}</div>
      </div>

    </div>
  );
};

export default Dashboard;
