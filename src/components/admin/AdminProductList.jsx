import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import ProductForm from './ProductForm';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(
      product => product.categoryId === parseInt(selectedCategory)
    );
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      setLoading(true);
      let savedProduct;

      if (selectedProduct) {
        // Update existing product
        savedProduct = await productService.updateProduct(selectedProduct.id, productData);
        
        // Update products list
        setProducts(products.map(p => 
          p.id === savedProduct.id ? savedProduct : p
        ));
      } else {
        // Create new product
        savedProduct = await productService.createProduct(productData);
        
        // Add to products list
        setProducts([...products, savedProduct]);
      }

      setIsFormVisible(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
      await productService.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-product-list">
      <div className="admin-header">
        <h2>Manage Products</h2>
        <button className="primary" onClick={handleAddProduct}>
          Add New Product
        </button>
      </div>

      <div className="filter-controls">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {isFormVisible ? (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          {getFilteredProducts().length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            <div className="product-table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredProducts().map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{getCategoryName(product.categoryId)}</td>
                      <td>₹{product.price.toFixed(0)}</td>
                      <td>{product.discount > 0 ? `${product.discount}%` : '-'}</td>
                      <td>{product.available ? 'Yes' : 'No'}</td>
                      <td className="action-buttons">
                        <button
                          className="secondary"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="secondary"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProductList; 