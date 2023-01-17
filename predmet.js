const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        predmet: Sequelize.STRING,
        brojPredavanjaSedmicno:Sequelize.INTEGER,
        brojVjezbiSedmicno:Sequelize.INTEGER
    })
    return Predmet;
};