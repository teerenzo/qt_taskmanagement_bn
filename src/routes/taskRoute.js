import { createTask,getTasks,deleteTask,getTask, updateTask,getTasksByPage, getTasksBySort, markAsComplete} from "../controllers/taskController.js";
import protect from "../middlewares/protectRoute.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { Router } from "express";
import validateTask from "../middlewares/validateTask.js";
const routes = Router();


routes.get("/",protect, getTasks)
routes.get("/page",protect, getTasksByPage)
routes.get("/sort",protect, getTasksBySort)
routes.get("/:id",protect, getTask)
routes.post("/create",protect,uploadMiddleware, createTask);
routes.delete("/delete/:id",protect, deleteTask)
routes.put("/update/:id",protect,uploadMiddleware, updateTask);
routes.put("/complete/:id",protect,markAsComplete)


export default routes;