import { Router } from 'express'
import authRoute from './authRoute.js'
import taskRoute from './taskRoute.js'
import { getAllUsers } from '../controllers/userController.js';


const route = Router();

route.use('/auth', authRoute);
route.use('/tasks', taskRoute);
route.get('/users', getAllUsers);


export default route;


