const fs = require('fs');
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pluna'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database.');

  // JSON 파일 읽기
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    const jsonData = JSON.parse(data);

    const query = `
      INSERT INTO Schedule (user_id, recommendations, schedule)
      VALUES (?, ?, ?)
    `;

    db.query(
      query,
      [
        jsonData.user_id,
        JSON.stringify(jsonData.recommendations),
        JSON.stringify(jsonData.schedule),
        null
      ],
      (err, results) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
        } else {
          console.log('Data inserted successfully:', results);
        }
        db.end();
      }
    );
  });
});
