import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import AdminProductList from '../components/admin/AdminProductList';
import AdminCategoryList from '../components/admin/AdminCategoryList';

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuthContext();
  const [activeTab, setActiveTab] = useState('products');

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header-section">
          <img src="/perfect_symmetry-removebg.png" alt="Perfect Symmetry" className="admin-logo" />
          <h1>Perfect Symmetry Admin Dashboard</h1>
        </div>
        
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
        </div>
        
        <div className="admin-content">
          {activeTab === 'products' && <AdminProductList />}
          {activeTab === 'categories' && <AdminCategoryList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 