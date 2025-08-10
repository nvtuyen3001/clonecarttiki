import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;