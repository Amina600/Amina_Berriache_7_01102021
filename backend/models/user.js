const db = require ('../database');


db.query('CREATE TABLE IF NOT EXISTS Users (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,pseudo VARCHAR(30),email VARCHAR(255) NOT NULL UNIQUE, password BINARY(60));',
 function(err) {
    if (err) throw err;
    console.log('Users TABLE created');
  
});
