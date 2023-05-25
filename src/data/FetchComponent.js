import React, { useState, useEffect } from "react";

const FetchComponent = ({ urlStem, ...fetchParams }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlStem, fetchParams);
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [urlStem, fetchParams]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* Render the fetched data */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default FetchComponent;
