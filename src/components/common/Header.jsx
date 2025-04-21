import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, isAdmin, logout } = useAuthContext();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src="/perfect_symmetry-removebg.png" alt="Perfect Symmetry" className="brand-logo" />
              <span className="brand-name">Perfect Symmetry</span>
            </Link>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              {isAuthenticated && isAdmin && (
                <li>
                  <Link to="/admin">Admin Dashboard</Link>
                </li>
              )}
              {isAuthenticated ? (
                <li>
                  <button onClick={logout} className="secondary">Logout</button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Admin Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 