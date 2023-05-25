import React, { useEffect, useState } from "react";

const DataFetcher = ({ urlStem, parameters, localFile, onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localFile) {
          // Read data from a local file
          const response = await fetch(localFile);
          if (!response.ok) {
            throw new Error("Failed to fetch local file.");
          }
          const jsonData = await response.json();
          setData(jsonData);
          setIsLoading(false);
          if (onDataLoaded) {
            onDataLoaded(jsonData);
          }
        } else {
          // Fetch data from a remote URL
          const url = new URL(urlStem);
          Object.keys(parameters).forEach((key) =>
            url.searchParams.append(key, parameters[key])
          );
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Request failed.");
          }
          const jsonData = await response.json();
          setData(jsonData);
          setIsLoading(false);
          if (onDataLoaded) {
            onDataLoaded(jsonData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [urlStem, parameters, localFile, onDataLoaded]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return null;
};

export default DataFetcher;
