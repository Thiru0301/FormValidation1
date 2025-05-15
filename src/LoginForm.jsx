import React, { useState } from 'react';
import './loginform.css';

const AuthForm = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (activeForm === 'register') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (formData.password !== formData.confirmPassword) {0
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSend = { ...formData };
    if (activeForm === 'login') {
      delete dataToSend.name;
      delete dataToSend.confirmPassword;
      
    }

    console.log(`${activeForm} data:`, dataToSend);
    alert(`${activeForm} form submitted successfully!`);
  };
  
  
  


  return (
    <div className="form-container">
      <div className="form-toggle">
        <button
          className={activeForm === 'login' ? 'active' : ''}
          onClick={() => setActiveForm('login')}
        >
          Login
        </button>
        <button
          className={activeForm === 'register' ? 'active' : ''}
          onClick={() => setActiveForm('register')}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {activeForm === 'register' && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {activeForm === 'register' && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <button type="submit" className="submit-btn">
          {activeForm === 'login' ? 'Login' : 'Register'}
        </button>
        
      </form>
    </div>
  );
};

export default AuthForm;
