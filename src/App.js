import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ProductDetail from "./components/ProductDetail";
import HomeContainer from "./components/HomeContainer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/app.css";

const App = () => {
  const [search, setSearch] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <h1>PRICE TRACKER</h1>
      <h2>+7500 products</h2>
      <Router>
        <>
          <Container>
            <SearchBar search={search} setSearch={setSearch} />
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/products/:productId/" element={<ProductDetail />} />
            </Routes>
          </Container>
        </>
      </Router>
    </ThemeProvider>
  );
};

export default App;
