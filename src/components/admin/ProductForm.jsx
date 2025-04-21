import { useState, useEffect } from 'react';
import productService from '../../services/productService';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    manufacturer: '',
    weight: '',
    price: '',
    discount: 0,
    available: true,
    description: '',
    image: '',
    variants: []
  });
  const [variantData, setVariantData] = useState({ size: '', price: '', available: true });
  const [error, setError] = useState('');

  // Load categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
        
        // Set default category if no product is provided
        if (!product && categoriesData.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: categoriesData[0].id }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [product]);

  // Populate form when editing a product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        categoryId: product.categoryId || '',
        manufacturer: product.manufacturer || '',
        weight: product.weight || '',
        price: product.price || '',
        discount: product.discount || 0,
        available: product.available !== undefined ? product.available : true,
        description: product.description || '',
        image: product.image || '',
        variants: product.variants || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleVariantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVariantData({
      ...variantData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addVariant = () => {
    if (!variantData.size || !variantData.price) {
      setError('Please fill in all variant fields');
      return;
    }

    setFormData({
      ...formData,
      variants: [...formData.variants, { ...variantData, price: parseFloat(variantData.price) }]
    });
    
    // Reset variant form
    setVariantData({ size: '', price: '', available: true });
    setError('');
  };

  const removeVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData({
      ...formData,
      variants: updatedVariants
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.categoryId || !formData.price) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Convert values to appropriate types
      const productData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount)
      };

      onSave(productData);
    } catch (err) {
      setError('Error saving product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category *</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer *</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight/Volume *</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="available">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available in Stock
          </label>
        </div>

        <div className="variants-section">
          <h3>Product Variants</h3>
          
          <div className="variants-table-container">
            {formData.variants.length > 0 ? (
              <table className="variants-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.variants.map((variant, index) => (
                    <tr key={index}>
                      <td>{variant.size}</td>
                      <td>${parseFloat(variant.price).toFixed(2)}</td>
                      <td>{variant.available ? 'Yes' : 'No'}</td>
                      <td>
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => removeVariant(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No variants added.</p>
            )}
          </div>

          <div className="add-variant-form">
            <h4>Add New Variant</h4>
            <div className="variant-form-row">
              <div className="form-group">
                <label htmlFor="variantSize">Size</label>
                <input
                  type="text"
                  id="variantSize"
                  name="size"
                  value={variantData.size}
                  onChange={handleVariantChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="variantPrice">Price</label>
                <input
                  type="number"
                  id="variantPrice"
                  name="price"
                  min="0"
                  step="0.01"
                  value={variantData.price}
                  onChange={handleVariantChange}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label htmlFor="variantAvailable">
                  <input
                    type="checkbox"
                    id="variantAvailable"
                    name="available"
                    checked={variantData.available}
                    onChange={handleVariantChange}
                  />
                  Available
                </label>
              </div>
              
              <button
                type="button"
                className="primary"
                onClick={addVariant}
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 