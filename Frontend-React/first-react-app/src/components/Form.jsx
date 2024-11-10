import React from 'react';
import { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const containerStyle = {
    width: '100%',
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
    zIndex: 1,
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid #e1e1e1',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '10px',
  };

  const displaySectionStyle = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(229, 231, 235, 0.5)',
  };

  const textStyle = {
    color: '#374151',
    marginBottom: '12px',
    fontSize: '16px',
    fontWeight: '500',
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
    pointerEvents: 'none',
    borderRadius: '20px',
  };

  const styles = `
    input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
      transform: translateY(-2px);
    }

    input::placeholder {
      color: #9ca3af;
    }

    button:hover {
      background-color: #4338ca;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(79, 70, 229, 0.2);
    }

    button:active {
      transform: translateY(0);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={containerStyle}>
        <div style={gradientOverlayStyle} />
        <form style={formStyle}>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="✨ Enter your name"
            style={inputStyle}
          />
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="✉️ Enter your email"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
        <div style={displaySectionStyle}>
          <p style={textStyle}>👤 Name: {name}</p>
          <p style={textStyle}>📧 Email:  {email}</p>
        </div>
      </div>
    </>
  );
};

export default Form;