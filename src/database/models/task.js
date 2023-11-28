'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Task.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    atachments: DataTypes.ARRAY,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    assignees: DataTypes.ARRAY,
    projects: DataTypes.ARRAY,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};

// relation between user and task
// user has many task
// task belongs to user
