const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function(sequelize,DataTypes){
    const Prisustvo = sequelize.define("prisustvo",{
        sedmica:Sequelize.INTEGER,
        predavanja:Sequelize.INTEGER,
        vjezbe:Sequelize.INTEGER,
        index:Sequelize.INTEGER,
        nazivPredmeta:Sequelize.STRING
    })
    return Prisustvo;
};