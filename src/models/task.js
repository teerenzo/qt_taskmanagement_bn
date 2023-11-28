import { Sequelize,Model } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Task = sequelize.define('Task', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    // type of list of user
    assignees: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
  defaultValue: [],
    },

    projects: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
     defaultValue: [],
    },
     

    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    priority: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    attachments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    


}
);

Task.belongsTo(User, { foreignKey: 'user_id' });

export default Task;
        

