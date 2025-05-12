const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // To parse JSON request bodies
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GalaSQL3304',
  database: 'FACELOGIN'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Route to register a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists.' });
        }
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error hashing the password.' });
  }
});

// Route to log in a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Find the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = results[0];

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  });
});

// Ruta para obtener los datos del usuario
// Ruta para obtener los datos del usuario
app.get('/user', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const query = 'SELECT username, email, phone_number FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log del error
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = results[0];
    res.status(200).json(user);
  });
});

// Ruta para actualizar el número de teléfono del usuario

app.put('/user/update', (req, res) => {
  const { email, username, phone_number } = req.body;

  if (!email || !username || !phone_number) {
    return res.status(400).json({ error: 'Email, username, and phone number are required.' });
  }

  const query = 'UPDATE users SET username = ?, phone_number = ? WHERE email = ?';
  db.query(query, [username, phone_number, email], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User information updated successfully.' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});