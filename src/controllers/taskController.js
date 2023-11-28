

import validateSchema from "../middlewares/validationSchema.js";
import { createTaskService, getTasksByStatusService, getTasksService,deleteTaskService,getTaskService, updateTaskService,getTasksByPageService, getTasksBySortService,completeTask } from "../services/taskService.js";

export const createTask = async (req, res) => {

    const user_id = req.user.id;
    const { title, description, status, startDate,endDate,projects, priority, assignees } = req.body;
  let attachments = [];
    const files = req.files;

    files.map(file=>attachments.push(file.filename))
    try {
        const task = await createTaskService({ user_id, title, description, status, endDate, priority, assignees:stringToArr(assignees),projects:stringToArr(projects),startDate,attachments:attachments, user_id })
        if (task)
            res.status(200).json({
                message: "Task created successfully",
                task
            })

        } catch (error) {
            res.status(409).json({ message: error.message });

        }
    }

    const stringToArr = (str) => {
      console.log(str)
        return str.replace(/[\[\]']+/g, '').split(',');
    }


  export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, startDate,endDate, priority } = req.body;
    const files = req.files;
    let attachments = [];
    files.map(file=>attachments.push(file.filename))
    try {
      const task = await updateTaskService(id, { title, description, status, endDate, priority,startDate })
      if (task)
        res.status(200).json({
          message: "Task updated successfully",
          task
        })
    } catch (error) {
      res.status(409).json({ message: error.message });

    }
  }


  export const getTasks = async (req, res) => {
    const user_id = req.user.id;
    const { page, limit, status, priority, assignees, projects } = req.query;
    console.log(req.query)
    try {
      const tasks = await getTasksService(user_id)
      if (tasks)
        res.status(200).json({
          message: "Tasks fetched successfully",
          tasks
        })
    } catch (error) {
      res.status(409).json({ message: error.message });

    }
  } 
  
  
  export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await deleteTaskService(id)
      if (task)
        res.status(200).json({
          message: "Task deleted successfully",
          task
        })
    } catch (error) {
      res.status(409).json({ message: error.message });

    }
  }

 export const getTask=async(req,res)=>{
    const {id}=req.params;
    try {
        const task = await getTaskService(id)
        if (task)
          res.status(200).json({
            message: "Task fetched successfully",
            task
          })
      } catch (error) {
        res.status(409).json({ message: error.message });
  
      }
 }


 export const getTasksByPage = async (req,res)=>{  
    const user_id = req.user.id;
    const { page, limit } = req.query;
    try {
        const tasks = await getTasksByPageService(user_id,page,limit)
        if (tasks)
          res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
          })
      } catch (error) {
        res.status(409).json({ message: error.message });
  
      }

 }


 export const getTasksBySort = async (req,res)=>{
    const user_id = req.user.id;
    const { field } = req.query;
    try {
        const tasks = await getTasksBySortService(user_id,field)
        if (tasks)
          res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
          })
      } catch (error) {
        res.status(409).json({ message: error.message });
  
      }
 }

 export const markAsComplete=async(req,res)=>{
   const {id} = req.params
  try {

    const task = await completeTask(id)
     res.status(200).json({
      message:"Completed",
      task
     })
    
  } catch (error) {
    throw error
  }

 }



