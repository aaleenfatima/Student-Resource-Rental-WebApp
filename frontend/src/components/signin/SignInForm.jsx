"use client";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./SignInPage.module.css";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Both email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This is crucial for sessions
        body: JSON.stringify({
          Email: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Successful login
      console.log('Login successful', data);
      localStorage.setItem('user', JSON.stringify(data.user)); // Optional: store user data
      navigate('/home'); // Navigate to home page

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <section className={styles.signInFormContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Sign In</h2>
        <div className={styles.divider}>
          <span className={styles.dividerText}></span>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email address"
          id="username"
          className={styles.formInput}
          value={formData.username}
          onChange={handleChange}
          required
        />

        <div className={styles.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.formInput}
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/46c49c6ab3714444ac32ad4faea97f64/6bed3c4f87ff30a9dcfd5be82fd95359907b7d1f87e12921bc52b37a75276d24?placeholderIfAbsent=true"
              alt="Toggle password visibility"
            />
          </button>
        </div>

        <div className={styles.formOptions}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Keep me logged in</span>
          </label>
          <button type="button" className={styles.forgotPassword}>
            Forgot password
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          <span>Sign In</span>
          <span className={styles.arrowRight} />
        </button>

        <p className={styles.signUpPrompt}>
          Don't have an account?
          <button 
            type="button" 
            className={styles.signUpLink}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </section>
  );
}