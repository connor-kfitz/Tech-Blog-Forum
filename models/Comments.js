const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postComment: {
      type: DataTypes.STRING,
      allowNullL: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: false,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;