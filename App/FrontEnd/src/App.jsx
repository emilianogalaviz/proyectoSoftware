import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './components/Dashboard'; // Importar Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;