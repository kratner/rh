import React, { useState, useEffect } from "react";
import ChartHeading from "./components/ChartHeading";
import BarChart from "./components/d3/BarChart";
import ColumnChart from "./components/d3/ColumnChart";
import HeadContent from "./components/HeadContent";
import Dashboard from "./components/Dashboard";
import { getRandomCoordinate } from "./utils/utils";
import "./styles/index.scss";

const App = () => {
  const [epss_data, setEPSSData] = useState(null);
  const [top25_epss_data, setTop25EPSSData] = useState(null);
  const [top10_epss_data, setTop10EPSSData] = useState(null);
  const [top15_epss_data, setTop15EPSSData] = useState(null);

  const [isEPSSDataLoaded, setEPSSIsDataLoaded] = useState(false);

  const chartPadding = 100;

  const handleEPSSDataLoaded = (data) => {
    const parsedData = data.data.map((item) => {
      const { cve, epss, percentile, date } = item;
      const { lat, lng } = getRandomCoordinate();
      // return { cve, epss, percentile, date, lat, lng };
      return { cve, epss, percentile, date, lat, lng };
    });
    const transformedData = parsedData.map((item) => {
      return {
        ...item,
        cve: item.cve.slice(-5),
      };
    });
    // Sort the data by percentile in descending order
    const sortedData = [...transformedData].sort(
      (a, b) => b.percentile - a.percentile
    );
    // Get the top 25 values based on percentile
    const topData = (amt) => sortedData.slice(0, amt);

    setEPSSData(parsedData);
    setTop25EPSSData(topData(25)); // Set the filtered data
    setTop10EPSSData(topData(10));
    setTop15EPSSData(topData(15));
    setEPSSIsDataLoaded(true);
  };

  useEffect(() => {
    // Fetch the data only once during initialization
    fetch(process.env.PUBLIC_URL + "/data/epss_data.json")
      .then((response) => response.json())
      .then((data) => handleEPSSDataLoaded(data));
  }, []);

  // const Panel1 = () =>
  //   isEPSSDataLoaded && (
  //     <div className="col-md-6 col-12">
  //       <GlobeComponent data={epss_data} globeImageUrl={globeImageURLs[1]} />
  //     </div>
  //   );

  const handlePanel1ColumnClick = (data) => {
    // debugger;
  };

  const handlePanel1ColumnMouseOver = (data) => {
    // debugger;
  };

  const handlePanel3BarClick = (data) => {
    // debugger;
  };

  const handlePanel3BarMouseOver = (data) => {
    // debugger;
  };

  const Panel1 = () =>
    isEPSSDataLoaded && (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart
          data={top10_epss_data}
          padding={chartPadding}
          onColumnClick={handlePanel1ColumnClick}
          onColumnMouseOver={handlePanel1ColumnMouseOver}
          // barFillColor="green"
        />
      </div>
    );
  const Panel2 = () =>
    isEPSSDataLoaded && (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart data={top10_epss_data} padding={chartPadding} />
      </div>
    );
  const Panel3 = () =>
    isEPSSDataLoaded && (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <BarChart
          data={top10_epss_data}
          padding={chartPadding}
          onBarClick={handlePanel3BarClick}
          onBarMouseOver={handlePanel3BarMouseOver}
        />
      </div>
    );
  const Panel4 = () =>
    isEPSSDataLoaded && (
      <div className="col-md-6 col-12 chart-container">
        <ChartHeading title="EPSS Top 25" titleClassName="chart-title" />
        <BarChart
          data={top10_epss_data}
          padding={chartPadding}
          onBarClick={handlePanel3BarClick}
          onBarMouseOver={handlePanel3BarMouseOver}
        />
      </div>
    );
  const Panel5 = () =>
    isEPSSDataLoaded && (
      <div className="col-md-6 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart data={top10_epss_data} padding={chartPadding} />
      </div>
    );

  const navigationLinks = [
    { label: "Home" /* url: "/" */ },
    { label: "Dashboard" /* url: "/dashboard" */ },
    { label: "Information" /* url: "/information" */ },
    { label: "Contact" /* url: "/contact" */ },
  ];

  const footerText = `\u00A9 ${new Date().getFullYear()} RiskHorizon. All rights reserved.`;
  return (
    <div>
      <HeadContent
        title="Risk Horizon"
        description="Risk Horizon"
        keywords="cve, epss, vulnerabilities"
      />

      <Dashboard footerText={footerText} navigation={navigationLinks}>
        <Panel1 />
        <Panel2 />
        <Panel3 />
        <Panel4 />
        <Panel5 />
      </Dashboard>
    </div>
  );
};

export default App;
