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

// Obtener datos del usuario
export const getUserData = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/user`, { params: { email } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al obtener datos del usuario.' };
  }
};

// Actualizar el número de teléfono del usuario

export const updateUserInfo = async (email, username, phone_number) => {
  try {
    const response = await axios.put(`${API_URL}/user/update`, { email, username, phone_number });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al actualizar la información del usuario.' };
  }
};