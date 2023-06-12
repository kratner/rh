import React, { useState, useEffect } from "react";
import ChartHeading from "../components/ChartHeading";
import BarChart from "../components/d3/BarChart";
import ColumnChart from "../components/d3/ColumnChart";
import Dashboard from "../components/Dashboard";
import { getRandomCoordinate } from "../utils/utils";
import "../styles/index.scss";

interface TransformedDataItem {
  cve: string;
  epss: number;
  percentile: string;
  date: string;
  lat: string;
  lng: string;
}

interface DataItem extends TransformedDataItem {}

const DashboardPage = () => {
  const [epss_data, setEPSSData] = useState<DataItem[] | null>(null);
  const [top25_epss_data, setTop25EPSSData] = useState<DataItem[] | null>(null);
  const [top10_epss_data, setTop10EPSSData] = useState<DataItem[] | null>(null);
  const [top15_epss_data, setTop15EPSSData] = useState<DataItem[] | null>(null);

  const [isEPSSDataLoaded, setEPSSIsDataLoaded] = useState(false);

  const chartPadding = 100;

  const handleEPSSDataLoaded = (data: { data: DataItem[] }) => {
    const parsedData = data.data.map((item) => {
      const { cve, epss, percentile, date } = item;
      const { lat, lng } = getRandomCoordinate();
      return { cve, epss, percentile, date, lat, lng };
    });
    const transformedData = parsedData.map((item) => {
      return {
        ...item,
        cve: item.cve.slice(-5),
        percentile: item.percentile.toString(),
      };
    });
    // Sort the data by percentile in descending order
    const sortedData = [...transformedData].sort(
      (a, b) => parseFloat(b.percentile) - parseFloat(a.percentile)
    );
    // Get the top 25 values based on percentile
    const topData = (amt: number) => sortedData.slice(0, amt);

    setEPSSData(parsedData);
    setTop25EPSSData(topData(25));
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

  const handlePanel1ColumnClick = (data: any) => {
    // ...
  };

  const handlePanel1ColumnMouseOver = (data: any) => {
    // ...
  };

  const handlePanel3BarClick = (data: any) => {
    // ...
  };

  const handlePanel3BarMouseOver = (data: any) => {
    // ...
  };

  const Panel1 = () =>
    isEPSSDataLoaded ? (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart
          data={top10_epss_data?.map((item) => ({
            ...item,
            cve: item.cve.slice(-5),
            percentile: item.percentile,
          })) || []}
          padding={chartPadding}
          onColumnClick={handlePanel1ColumnClick}
          onColumnMouseOver={handlePanel1ColumnMouseOver}
        />
      </div>
    ) : null;

  const Panel2 = () =>
    isEPSSDataLoaded ? (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart
          data={top10_epss_data?.map((item) => ({
            ...item,
            cve: item.cve.slice(-5),
            percentile: item.percentile,
          })) || []}
          padding={chartPadding}
        />
      </div>
    ) : null;

  const Panel3 = () =>
    isEPSSDataLoaded ? (
      <div className="col-md-4 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <BarChart
          data={top10_epss_data?.map((item) => ({
            ...item,
            cve: item.cve.slice(-5),
            percentile: item.percentile,
          })) || []}
          padding={chartPadding}
          onBarClick={handlePanel3BarClick}
          onBarMouseOver={handlePanel3BarMouseOver}
        />
      </div>
    ) : null;

  const Panel4 = () =>
    isEPSSDataLoaded ? (
      <div className="col-md-6 col-12 chart-container">
        <ChartHeading title="EPSS Top 25" titleClassName="chart-title" />
        <BarChart
          data={top10_epss_data?.map((item) => ({
            ...item,
            cve: item.cve.slice(-5),
            percentile: item.percentile,
          })) || []}
          padding={chartPadding}
          onBarClick={handlePanel3BarClick}
          onBarMouseOver={handlePanel3BarMouseOver}
        />
      </div>
    ) : null;

  const Panel5 = () =>
    isEPSSDataLoaded ? (
      <div className="col-md-6 col-12 chart-container">
        <ChartHeading title="EPSS Top 10" titleClassName="chart-title" />
        <ColumnChart
          data={top10_epss_data?.map((item) => ({
            ...item,
            cve: item.cve.slice(-5),
            percentile: item.percentile,
          })) || []}
          padding={chartPadding}
        />
      </div>
    ) : null;

  return (
    <Dashboard>
      <Panel1 />
      <Panel2 />
      <Panel3 />
      <Panel4 />
      <Panel5 />
    </Dashboard>
  );
};

export default DashboardPage;
