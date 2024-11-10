// import React from 'react';
import { Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const login  = async(event)=>{
        event.preventDefault(); 
        try{

            const response = await  api.post('/auth/login', {username: email, password:password});
            localStorage.setItem('token', response.data.token);
            setError('');
            console.log(' login response: ', response);
            api.defaults.headers.common['Authorisation']=`Bearer ${response.data.token}`
            console.log('login succesfully'); 
            navigate('/');  
            
            
        } catch(err){
            setError(err.response?.data?.message || 'login failed '); 
        }
      
    }
  return (
    <>
      <style>
        {`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff9e6;
          }

          .login-box {
            background-color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }

          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .login-header h2 {
            color: #d97706;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .login-header p {
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

          .form-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }

          .remember-me {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #666;
          }

          .forgot-password {
            color: #d97706;
            text-decoration: none;
            font-size: 0.875rem;
          }

          .forgot-password:hover {
            text-decoration: underline;
          }

          .login-button {
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

          .login-button:hover {
            background-color: #b45309;
          }

          .register-link {
            text-align: center;
            margin-top: 1rem;
            color: #666;
            font-size: 0.875rem;
          }

          .register-link a {
            color: #d97706;
            text-decoration: none;
          }

          .register-link a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Please sign in to continue</p>
          </div>

          <form onSubmit={login}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input
                  type="text" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
            {error && <p style={{color: 'red', fontSize: '24px'}}>{error}</p>}

            <p className="register-link">
              Do not have an account?{' '}
              <a href="/register">Register here</a>
            </p>
          </form>
        </div>
      </div>
     
    </>
  );
};

export default Login;