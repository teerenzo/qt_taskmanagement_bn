import Task from '../models/task.js';
import sequelize from '../config/db.js';
export const createTaskService = async (task) => {
    try {
        const newTask = await Task.create(task);
        return newTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getTasksService = async (user_id) => {
    try {
        const tasks = await Task.findAll({ where: { user_id } });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getTaskService = async (id) => {
    try {
        const task = await Task.findOne({ where: { id } });
        if(task){
            return task;

        }else{
            throw new Error("Task not found");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateTaskService = async (id, data) => {
    try {
        const task = await Task.update(data, { where: { id } });
        if(task){
            return await Task.findOne({where:{id}});
        }else{
         throw new Error("Task not found");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteTaskService = async (id) => {
    try {
        const task = await Task.destroy({ where: { id } });
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

// pagination
export const getTasksByPageService = async (user_id, page, limit) => {
    try {
        const tasks = await Task.findAll({ where: { user_id }, limit, offset: page * limit });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

// sorting
export const getTasksBySortService = async (user_id, sort) => {
    try {
        const tasks = await Task.findAll({ where: { user_id:user_id }, order: [[`${sort}`]] });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

// filtering based on any field
export const getTasksByFilterService = async (user_id, field, value) => {
    try {
        const tasks = await Task.findAll({ where: { user_id, [field]: value } });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

// statistics
export const getTasksByStatusService = async (user_id) => {
    try {
        const tasks = await Task.findAll({ where: { id:user_id }, attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']], group: ['status'] });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

// mark task as complete
export const completeTask=async(id)=>{
    try {

        const task = await Task.findOne({where:{id}})
        if(task){
            //update
           const update= await Task.update({status:task.status==="completed"?"pending":"completed"},{where:{id}})
           return await Task.findOne({where:{id}})
        }else{
            throw new Error("Task not found")
        }
        
    } catch (error) {
        throw error;
        
    }
}

