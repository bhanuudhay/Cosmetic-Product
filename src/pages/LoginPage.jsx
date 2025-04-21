import Login from '../components/admin/Login';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="container">
        <div className="login-header">
          <img src="/perfect_symmetry-removebg.png" alt="Perfect Symmetry" className="login-logo" />
          <h2>Perfect Symmetry Admin Login</h2>
        </div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage; 