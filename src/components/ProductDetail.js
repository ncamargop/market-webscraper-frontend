import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import ProductGraph from "./ProductGraph";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/products/${productId}/`
        );

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError(`Failed to fetch product: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", marginTop: "50px", marginBottom: "20%" }}>
      {/* Product Info Card with Image on the Left and Info on the Right */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Card sx={{ display: "flex", width: "100%" }}>
            {/* Product Image on the Left */}
            <CardMedia
              component="img"
              sx={{ width: 200, height: 200, objectFit: "cover" }}
              image={
                product.image ||
                "https://logodownload.org/wp-content/uploads/2023/05/bandeira-colombia-flag-0.png"
              }
              alt={product.product_name}
            />
            {/* Product Info on the Right */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "20px",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Store: {product.store}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Product Graph Card below the Info */}
      <Grid container spacing={3} justifyContent="center" marginTop={5}>
        <Grid item xs={12}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Product Price Comparison By Store
              </Typography>
              <ProductGraph productName={product.product_name} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
