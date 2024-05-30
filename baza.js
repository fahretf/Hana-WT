const Sequelize = require("sequelize");

const sequelize = new Sequelize("DBWT19",`${process.env.MYSQL_USER}`,`${process.env.MYSQL_PASSWORD}`,{
    host:`${process.env.MYSQL_DB_HOST}`,
    createDatabaseIfNotExist: true,
    dialect:"mysql"}
    );


sequelize
  //.authenticate()
  .query("CREATE DATABASE IF NOT EXISTS `DBWT19`")
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports=sequelize;