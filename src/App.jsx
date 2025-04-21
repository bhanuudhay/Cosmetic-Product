import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./contexts/ShopContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShopProvider>
          <div className="app">
            <div className="volume-down"></div>
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
