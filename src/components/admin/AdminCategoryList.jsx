import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import CategoryForm from './CategoryForm';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormVisible(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsFormVisible(true);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      setLoading(true);
      let savedCategory;

      if (selectedCategory) {
        // Update existing category
        savedCategory = await productService.updateCategory(selectedCategory.id, categoryData);
        
        // Update categories list
        setCategories(categories.map(c => 
          c.id === savedCategory.id ? savedCategory : c
        ));
      } else {
        // Create new category
        savedCategory = await productService.createCategory(categoryData);
        
        // Add to categories list
        setCategories([...categories, savedCategory]);
      }

      setIsFormVisible(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? This will also delete all products in this category!')) {
      return;
    }

    try {
      setLoading(true);
      await productService.deleteCategory(categoryId);
      setCategories(categories.filter(c => c.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return <div className="loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-category-list">
      <div className="admin-header">
        <h2>Manage Categories</h2>
        <button className="primary" onClick={handleAddCategory}>
          Add New Category
        </button>
      </div>

      {isFormVisible ? (
        <CategoryForm
          category={selectedCategory}
          onSave={handleSaveCategory}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          {categories.length === 0 ? (
            <p className="no-categories">No categories found.</p>
          ) : (
            <div className="category-table-container">
              <table className="category-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td className="action-buttons">
                        <button
                          className="secondary"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="secondary"
                          onClick={() => handleDeleteCategory(category.id)}
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

export default AdminCategoryList; 