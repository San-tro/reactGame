const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Landscape', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    x: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    y: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ' interaction': {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Landscape',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Landscape_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
