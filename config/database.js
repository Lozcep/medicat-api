require('dotenv').config()
var mongoose = require('mongoose');

const { DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_NAME } = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
let connection;

async function connectDataBase() {
  
    if (connection) return connection;
  
  try {
    await mongoose.connect( mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('conectado')    
    });
    
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error);
    process.exit(1);
  }
  return connection;
}connectDataBase().catch(console.error);

module.exports = connectDataBase;