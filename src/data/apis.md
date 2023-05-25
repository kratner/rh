https://nvd.nist.gov/developers/vulnerabilities
JSON Feed:
https://services.nvd.nist.gov/rest/json/cves/2.0



// const CVE_API_URL_STEM = "https://services.nvd.nist.gov/rest/json/cves/2.0";

// const EPSS_API_URL_STEM = "https://api.first.org/data/v1/epss";

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



 // const [CVEBulletedList, setCVEBulletedList] = useState(null);

  // const handleCVEDataLoaded = (data) => {
  //   const parsedData = [];

  //   // Assuming the data is an array of objects, you can iterate over it
  //   data.vulnerabilities.forEach((item, index) => {
  //     // Extract the relevant properties from each item and push them to the parsedData array
  //     const title = item.cve.id;
  //     const description = item.cve.descriptions[0].value;
  //     const baseSeverity = item.cve.metrics.cvssMetricV2
  //       ? item.cve.metrics.cvssMetricV2[0]?.baseSeverity
  //       : undefined;
  //     const type = item.cve.metrics.cvssMetricV2
  //       ? item.cve.metrics.cvssMetricV2[0]?.type
  //       : undefined;
  //     const impactScore = item.cve.metrics.cvssMetricV2
  //       ? item.cve.metrics.cvssMetricV2[0]?.impactScore
  //       : undefined;
  //     parsedData.push({
  //       title,
  //       description,
  //       baseSeverity,
  //       type,
  //       impactScore,
  //       id: index,
  //     });
  //   });

  //   // Render the bulleted list
  //   const listItems = parsedData.map((item, index) => (
  //     <li key={item.title}>
  //       <strong>{item.title}</strong>: {item.description}
  //       <br />
  //       <strong>Impact Score</strong>: {item.impactScore}
  //       <br />
  //       <strong>Base Severity</strong>: {item.baseSeverity}
  //       <br />
  //       <strong>Type</strong>: {item.type}
  //     </li>
  //   ));

  //   setCVEBulletedList(<ul key="cve-data">{listItems}</ul>);
  // };