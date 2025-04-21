import { useShopContext } from "../../contexts/ShopContext";

const ProductList = () => {
  const {
    selectedCategory,
    getProductsByCategory,
    openProductModal,
    loading,
    error,
    categories,
  } = useShopContext();

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!selectedCategory) {
    return <div className="product-list">Please select a category.</div>;
  }

  const products = getProductsByCategory(selectedCategory);
  const category = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="product-list">
      <h2>{category?.name || "Products"}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card card"
              onClick={() => openProductModal(product)}
            >
              <div className="product-image">
                {/* In a real app, you'd use actual images */}
                <img
                  src={product.image}
                  style={{ width: "200px", height: "160px" }}
                />

                {product.discount > 0 && (
                  <div className="discount-badge">-{product.discount}%</div>
                )}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">
                  {product.discount > 0 ? (
                    <>
                      <span className="original-price">
                        ₹{product.price.toFixed(0)}
                      </span>
                      <span className="discounted-price">
                        ₹
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          0
                        )}
                      </span>
                    </>
                  ) : (
                    <span>₹{product.price.toFixed(0)}</span>
                  )}
                </div>
                <div className="product-availability">
                  {product.available ? (
                    <span className="in-stock">In Stock</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
