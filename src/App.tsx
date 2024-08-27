import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StorePage from "./pages/StorePage/StorePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
