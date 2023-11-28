import Router from 'express';
import { registerUser,loginUser,editProfile,editPassword } from '../controllers/userController.js';
import validateSchema from '../middlewares/validationSchema.js';
import userSchema from '../utils/validation/userSchema.js';
import protect from "../middlewares/protectRoute.js";
import loginSchema from '../utils/validation/loginSchema.js';
import changePasswordSchema from '../utils/validation/changePasswordSchema.js';

const routes= Router();


routes.post('/register',validateSchema(userSchema), registerUser);
routes.post('/login',validateSchema(loginSchema),loginUser)
routes.put('/edit',protect,editProfile)
routes.put('/change-password',protect,validateSchema(changePasswordSchema),editPassword)

export default routes;
