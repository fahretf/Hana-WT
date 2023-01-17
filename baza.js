const Sequelize = require("sequelize");
const student = require('./student.js');
const nastavnik = require('./nastavnik.js');
const predmet = require('./predmet.js');
const prisustvo = require('./prisustvo.js');

const sequelize = new Sequelize("wt22","root","password",{
    host:"localhost",
    dialect:"mysql"}
    );
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//import modela
db.student = require('./student.js') (sequelize);
db.nastavnik = require('./nastavnik.js') (sequelize);
db.predmet = require('./predmet.js') (sequelize);
db.prisustvo = require('./prisustvo.js') (sequelize);

db.student.hasMany(db.prisustvo,{as:'prisustva'});
db.predmet.hasMany(db.prisustvo, {as : 'prisustva'});
db.nastavnik.hasMany(db.predmet, {as: "predmeti"});

db.sequelize.sync();

module.exports=db;