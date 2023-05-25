import React, { useState, useEffect } from "react";
import GlobeComponent from "./components/Globe";
import HeadContent from "./components/HeadContent";
import HomePage from "./components/HomePage";
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

  const [isEPSSDataLoaded, setEPSSIsDataLoaded] = useState(false);

  const handleEPSSDataLoaded = (data) => {
    const parsedData = data.data.map((item) => {
      const { cve, epss, percentile, date } = item;
      const { lat, lng } = getRandomCoordinate();
      return { cve, epss, percentile, date, lat, lng };
    });
    setEPSSData(parsedData);
    setEPSSIsDataLoaded(true);
  };

  useEffect(() => {
    // Fetch the data only once during initialization
    fetch(process.env.PUBLIC_URL + "/data/epss_data.json")
      .then((response) => response.json())
      .then((data) => handleEPSSDataLoaded(data));
  }, []);

  const layoutComponents = [
    // {
    //   component: isEPSSDataLoaded && (
    //     <GlobeComponent data={epss_data} globeImageUrl={globeImageURLs[1]} />
    //   ),
    //   width: 6,
    // },
    { component: <div>Component 1</div>, width: 6 },
    { component: <div>Component 2</div>, width: 6 },
  ];

  // const contentBlocks = [<MultiColumnLayout components={layoutComponents} />];

  const contentBlocks = [
    isEPSSDataLoaded && (
      <GlobeComponent data={epss_data} globeImageUrl={globeImageURLs[1]} />
    ),
  ];

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
      <Dashboard />
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
