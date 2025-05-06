import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Registrar un nuevo usuario
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al registrar usuario.' };
  }
};

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al iniciar sesión.' };
  }
};

// Generar contraseña aleatoria
export const generatePassword = async (length = 12) => {
  try {
    const response = await axios.get(`${API_URL}/generate-password`, { params: { length } });
    return response.data.password;
  } catch (error) {
    throw error.response?.data || { error: 'Error al generar contraseña.' };
  }
};