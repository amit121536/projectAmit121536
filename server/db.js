const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'amit',
  password: '123456', 
  database: 'project'
});

db.connect((err) => {
  if (err) throw err;
  console.log('🔌 מחובר ל-MySQL');
});

module.exports = db;
