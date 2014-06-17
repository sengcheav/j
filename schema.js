var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
//query = client.query('CREATE TABLE visits (date date)');
//query = client.query('CREATE TABLE dataa (Id text,Image bytea,Description text)');
//query = client.query('CREATE TABLE imagedatabase (Id text , Image bytea, Description text)');
//query = client.query('CREATE TABLE tasman_table (userid text, imgName text, imagedescription text, imageurl 
//text)');
query = client.query('CREATE TABLE login_database1 (username text , password text)');
query.on('end', function(result) { client.end(); });
