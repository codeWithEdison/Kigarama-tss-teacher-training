// import React from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';

const Register = () => {
  return (
    <>
      <style>
        {`
          .register-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff9e6;
            padding: 2rem 1rem;
          }

          .register-box {
            background-color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }

          .register-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .register-header h2 {
            color: #d97706;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .register-header p {
            color: #666;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
          }

          .input-group {
            position: relative;
          }

          .input-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem;
            padding-left: 2.5rem;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
            font-size: 1rem;
          }

          .form-input:focus {
            outline: none;
            border-color: #d97706;
          }

          .terms-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .terms-checkbox span {
            color: #666;
            font-size: 0.875rem;
          }

          .register-button {
            width: 100%;
            padding: 0.75rem;
            background-color: #d97706;
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .register-button:hover {
            background-color: #b45309;
          }

          .login-link {
            text-align: center;
            margin-top: 1rem;
            color: #666;
            font-size: 0.875rem;
          }

          .login-link a {
            color: #d97706;
            text-decoration: none;
          }

          .login-link a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="register-container">
        <div className="register-box">
          <div className="register-header">
            <h2>Create Account</h2>
            <p>Join our bakery community</p>
          </div>

          <form>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <Phone className="input-icon" size={20} />
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <label className="terms-checkbox">
              <input type="checkbox" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button type="submit" className="register-button">
              Create Account
            </button>

            <p className="login-link">
              Already have an account?{' '}
              <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;