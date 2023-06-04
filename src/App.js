import React, { useState, useEffect } from "react";
import GlobeComponent from "./components/Globe";
import ChartHeading from "./components/ChartHeading";
import BarChart from "./components/d3/BarChart";
import RadarScreen from "./components/webgl/RadarScreen";
import ColumnChart from "./components/d3/ColumnChart";
import HeadContent from "./components/HeadContent";
import Dashboard from "./components/Dashboard";
import { getRandomCoordinate } from "./utils/utils";
import "./styles/index.scss";

// const globeComponentData = [
//   { lat: 40.7117244, lng: -74.0707383, label: "New York" },
//   { lat: 51.5074, lng: -0.1278, label: "London" },
//   { lat: -33.865143, lng: 151.2099, label: "Sydney" },
// ];

const globeImageURLs = [
  "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  "//unpkg.com/three-globe/example/img/earth-night.jpg",
];

// const CVE_API_URL_STEM = "https://services.nvd.nist.gov/rest/json/cves/2.0";

// const EPSS_API_URL_STEM = "https://api.first.org/data/v1/epss";
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

  const footerText = `\u00A9 ${new Date().getFullYear()} RiskHorizon. All rights reserved.`;
  return (
    <div>
      <HeadContent
        title="Risk Horizon"
        description="Risk Horizon"
        keywords="cve, epss, vulnerabilities"
      />
      {/* <HomePage
        subtitle="Exploit Prediction Scoring System (EPSS)"
        // subtitle="https://www.first.org"
        // buttonText="Contact Us"
        contentBlocks={contentBlocks}
        contentContainerClassName="content-block-container"
        // footerText="5/15/2023"
      /> */}

      <Dashboard footerText={footerText}>
        <Panel1 />
        <Panel2 />
        <Panel3 />
        <Panel4 />
        <Panel5 />
      </Dashboard>
      {/* <Spheres data={epss_data} /> */}

      {/* <h3>National Institute of Standards and Technology (NIST)</h3>
      <h4>National Vulnerabilities Database</h4>
      <h4>https://nvd.nist.gov</h4>
      <DataFetcher
        // urlStem={CVE_API_URL_STEM}
        // parameters={{ resultsPerPage: "20", startIndex: "0" }}
        // parameters={{ envelope: true, pretty: true, offset: 0 }}
        localFile={process.env.PUBLIC_URL + "/data/cve_data.json"}
        onDataLoaded={handleCVEDataLoaded}
      />
      {CVEBulletedList} */}
      {/* <Spheres data={epss_data} />
      <BarChart data={epss_data} /> */}
      {/* <h3>Exploit Prediction Scoring System (EPSS)</h3>
      <h4>https://www.first.org</h4> */}
      {/* <DataFetcher
        localFile={process.env.PUBLIC_URL + "/data/epss_data.json"}
        onDataLoaded={handleEPSSDataLoaded}
      /> */}
      {/* {EPSSBulletedList} */}
    </div>
  );
};

export default App;
