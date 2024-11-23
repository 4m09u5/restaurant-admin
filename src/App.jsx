import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Addresses from "./pages/Addresses";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage token={token} setToken={setToken} />} />
        <Route
          path="/dashboard"
          element={<Dashboard token={token} setToken={setToken} />}
        />
        <Route
          path="/restaurant/:restaurantId/addresses"
          element={<Addresses token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
