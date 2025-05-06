import React, { useState } from 'react';
import { loginUser } from '/Users/emilianogalaviz/Desktop/ingSoftware/gitSoftware/proyectoSoftware/App/BackEnd/api.js';

export default function SignInForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await loginUser(formData.email, formData.password);
      setMessage(response.message);
    } catch (err) {
      setError(err.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
      </div>
      <span>or use your email and password</span>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <a href="#">Forget Your Password?</a>
      <button type="submit">Sign In</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}