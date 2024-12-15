const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth'); // Importing the auth.js file

// Create an instance of express
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pluna',
});

// Parse incoming JSON requests
app.use(bodyParser.json());

// Check the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// API to save the schedule
app.post('/submit-schedule', (req, res) => {
  const { user_id, recommendations, schedule } = req.body;

  const query = `
    INSERT INTO Schedule (user_id, recommendations, schedule)
    VALUES (?, ?, ?)
  `;

  db.query(query, [user_id, JSON.stringify(recommendations), JSON.stringify(schedule)], (err, result) => {
    if (err) {
      console.error('Error saving schedule:', err);
      res.status(500).send('Error saving schedule');
    } else {
      res.status(200).send('Schedule saved successfully');
    }
  });
});

// API to fetch the schedule based on user_id
app.get('/get-schedule/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM Schedule WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching schedule data:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    // If no schedule found for the user, return an empty array
    if (results.length === 0) {
      return res.status(404).send('No schedule found for the given user ID');
    }

    // Return the schedule data for the given user_id
    res.json(results);
  });
});

// Use the authRouter for /api paths
app.use('/api', authRouter); // Use authRouter for all /api routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
