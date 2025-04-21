import { Link, useNavigate } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";

const HomePage = () => {
  const { selectCategoryByName } = useShopContext();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    selectCategoryByName(categoryName);
    navigate("/shop");
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="welcome-section">
          <div className="main-brand">
            <img
              src="/perfect symmetry.png"
              alt="Perfect Symmetry"
              className="main-logo"
            />
          </div>
          <h1>Welcome to Perfect Symmetry</h1>
          <p className="welcome-text">
            Your one-stop destination for premium cosmetic products. Discover
            our wide range of skincare, makeup, hair care, fragrances, and more.
          </p>
        </div>

        <div className="categories-showcase">
          <h2>Explore Our Categories</h2>
          <div className="category-cards">
            <div className="category-card card">
              <img
                src="/skincare.jpg"
                style={{ width: "200px", height: "160px" }}
              />

              <h3>Skincare</h3>
              <p>Discover premium skincare products for all skin types.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Skincare")}
              >
                Explore Skincare
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/makeup.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Makeup</h3>
              <p>Find the perfect makeup products for your beauty routine.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Makeup")}
              >
                Explore Makeup
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/haircare.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Hair Care</h3>
              <p>Nourish your hair with our premium hair care products.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Hair Care")}
              >
                Explore Hair Care
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/frag.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Fragrances</h3>
              <p>Discover enchanting fragrances for every occasion.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Fragrances")}
              >
                Explore Fragrances
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/bath.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Bath & Body</h3>
              <p>Pamper yourself with luxurious bath and body products.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Bath & Body")}
              >
                Explore Bath & Body
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/mengr.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Men's Grooming</h3>
              <p>Quality grooming products designed specifically for men.</p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Men's Grooming")}
              >
                Explore Men's Grooming
              </button>
            </div>
            <div className="category-card card">
              <img
                src="/ayur.jpg"
                style={{ width: "200px", height: "160px" }}
              />
              <h3>Ayurvedic</h3>
              <p>
                Traditional ayurvedic beauty products with natural ingredients.
              </p>
              <button
                className="cta-button"
                onClick={() => handleCategoryClick("Ayurvedic")}
              >
                Explore Ayurvedic
              </button>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Start Shopping Now</h2>
          <p>
            Browse our complete collection of products and find your favorites.
          </p>
          <Link to="/shop" className="primary-btn">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
