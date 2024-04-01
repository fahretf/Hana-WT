const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt22","root","root",{
    host:"mysql-db",
    createDatabaseIfNotExist: true,
    dialect:"mysql"}
    );


sequelize
  //.authenticate()
  .query("CREATE DATABASE IF NOT EXISTS `wt22`")
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports=sequelize;