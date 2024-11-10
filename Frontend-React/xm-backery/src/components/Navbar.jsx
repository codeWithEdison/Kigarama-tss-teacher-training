
import { Home, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <style>
        {`
          .navbar {
            background-color: #d97706;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .navbar-brand {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
          }

          .brand-text {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .navbar-links {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .nav-link {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            transition: color 0.3s ease;
          }

          .nav-link:hover {
            color: #fef3c7;
          }

          .register-btn {
            background-color: white;
            color: #d97706;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .register-btn:hover {
            background-color: #fef3c7;
          }

          @media (max-width: 768px) {
            .navbar-links {
              gap: 1rem;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <ShoppingBag color="white" size={24} />
            <span className="brand-text">XM Bakery</span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <a href="/login" className="nav-link">
              <User size={20} />
              <span>Login</span>
            </a>
            <Link to='register' className="register-btn">
              Register
            </Link> 
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;