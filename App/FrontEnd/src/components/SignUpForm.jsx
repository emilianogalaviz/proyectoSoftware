import React, { useState } from 'react';
import { registerUser } from '/Users/emilianogalaviz/Desktop/ingSoftware/gitSoftware/proyectoSoftware/App/BackEnd/api.js'; // Importa la función de registro desde api.js

export default function SignUpForm({ onGeneratePassword }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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
      const response = await registerUser(formData.username, formData.email, formData.password);
      setMessage(response.message);
    } catch (err) {
      setError(err.error || 'Error al registrar usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
      </div>

      <span>or use your email for registration</span>
      <input
        type="text"
        name="username"
        placeholder="Name"
        value={formData.username}
        onChange={handleChange}
      />
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

      <button type="submit">Sign Up</button>

      {/* Botón estilo texto como en la imagen */}
      <button
        type="button"
        onClick={onGeneratePassword}
        className="plain-link"
      >
        Generate Password!
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}