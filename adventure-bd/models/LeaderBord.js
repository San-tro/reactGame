const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LeaderBord', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    score: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LeaderBord',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "LeaderBord_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
