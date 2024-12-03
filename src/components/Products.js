// src/Products.js

import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Use the fetch API to get the data from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => {
        setProducts(data); // Set the data in the state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
