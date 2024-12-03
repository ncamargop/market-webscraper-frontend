import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart"; // Ensure you're using this for the graph
import { useNavigate } from "react-router-dom";
import "../css/app.css";

const HomeContainer = () => {
  const [products, setProducts] = useState([]);
  const [indexData, setIndexData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for graph data
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const productIds = [69956, 69773, 69400];
        const promises = productIds.map((id) =>
          fetch(`http://127.0.0.1:8000/products/${id}/`).then((response) =>
            response.json()
          )
        );
        const data = await Promise.all(promises);
        setProducts(data);
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    // Fetch graph data
    const fetchGraphData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/index500/");
        if (!response.ok) {
          throw new Error("Failed to fetch graph data");
        }
        const data = await response.json();
        console.log("Fetched Graph Data:", data); // Debug log
        setIndexData(data);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchGraphData();
  }, []);

  // Handle product card click
  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Map the API data for the graph
  const xValues = indexData.map((item) => item.date);
  const yValues = indexData.map((item) => item.unweighted_index);

  const dataset = indexData.map((entry) => {
    return {
      date: new Date(entry.date),
      unweighted_index: entry.unweighted_index,
    };
  });

  return (
    <div className="container">
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              onClick={() => handleCardClick(product.id)}
              sx={{
                cursor: "pointer",
                backgroundColor: "#000d34",
                color: "#fff",
                "&:hover": { backgroundColor: "#001041", scale: "1.05" },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.product_name}
              />
              <CardContent>
                <Typography variant="h6" component="div" color="text.primary">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* GRAPH INDEX */}
      <h4>Index Of Prices Over Time</h4>
      <Box
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Card sx={{ backgroundColor: "#181818", color: "#fff" }}>
          <CardContent>
            <Box sx={{ height: 400 }}>
              {loading ? (
                <Typography>Loading graph...</Typography>
              ) : (
                <LineChart
                  width={800}
                  height={400}
                  dataset={dataset}
                  grid={{ horizontal: true }}
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
                    {
                      dataKey: "unweighted_index",
                      color: "red",
                    },
                  ]}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default HomeContainer;
