import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Stack, InputAdornment } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ search, setSearch }) => {
  const [productOptions, setProductOptions] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/?search=${searchTerm}&latest=true` // Add latest=true to request the latest product
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductOptions(data);
        } else {
          console.error("Response is not an array:", data);
        }
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const debouncedFetchProducts = debounce((searchTerm) => {
    fetchProducts(searchTerm);
  }, 500);

  useEffect(() => {
    if (search.length > 0) {
      debouncedFetchProducts(search);
    } else {
      setProductOptions([]);
    }
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [search]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Stack spacing={2} sx={{ width: 900, margin: "auto", marginTop: "50px" }}>
      <Autocomplete
        freeSolo
        options={productOptions}
        getOptionLabel={(option) => option.product_name || "No name available"}
        onChange={(e, value) => handleProductClick(value?.id)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            sx={{
              backgroundColor: "#333",
              borderRadius: "4px",
              padding: "8px",
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <FastfoodIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
};

export default SearchBar;
