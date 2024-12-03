import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const ProductGraph = ({ productName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/product-summary/${productName}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [productName]);

  const dataset = data.map((entry) => {
    console.log("Mapping entry:", Date(entry.date));
    return {
      date: new Date(entry.date),
      Carulla: entry.Carulla || 0,
      D1: entry.D1 || 0,
      Exito: entry.Exito || 0,
      Rappi: entry.Rappi || 0,
    };
  });

  return (
    <div>
      {dataset.length > 0 ? (
        <LineChart
          width={800}
          height={400}
          dataset={dataset}
          xAxis={[
            {
              id: "Days",
              dataKey: "date",
              scaleType: "time",
              valueFormatter: (date) =>
                new Date(date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                }),
            },
          ]}
          series={[
            { dataKey: "Carulla", label: "Carulla", color: "green" },
            { dataKey: "D1", label: "D1", color: "red" },
            { dataKey: "Exito", label: "Exito", color: "yellow" },
            { dataKey: "Rappi", label: "Rappi", color: "pink" },
          ]}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ProductGraph;
