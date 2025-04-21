import CategoryList from '../components/shop/CategoryList';
import ProductList from '../components/shop/ProductList';
import ProductDetails from '../components/shop/ProductDetails';
import { useShopContext } from '../contexts/ShopContext';

const ShopPage = () => {
  const { loading, error } = useShopContext();

  if (loading) {
    return (
      <div className="shop-page">
        <div className="container">
          <div className="loading">Loading shop data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-content">
          <div className="categories-section">
            <CategoryList />
          </div>
          <div className="products-section">
            <ProductList />
          </div>
        </div>
        <ProductDetails />
      </div>
    </div>
  );
};

export default ShopPage; 