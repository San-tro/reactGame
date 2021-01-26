var DataTypes = require("sequelize").DataTypes;
var _Items = require("./Items");
var _Landscape = require("./Landscape");
var _LeaderBord = require("./LeaderBord");

function initModels(sequelize) {
  var Items = _Items(sequelize, DataTypes);
  var Landscape = _Landscape(sequelize, DataTypes);
  var LeaderBord = _LeaderBord(sequelize, DataTypes);


  return {
    Items,
    Landscape,
    LeaderBord,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
