import User from '../models/user.js';
import { comparePassword } from '../utils/hashpassword.js';

export const register = async (data)=>{
    try {
        const newUser = await User.create(data);
        if(!newUser){
            throw new Error('Something went wrong');
        }
        return newUser;
    } catch (error) {
        throw error;
    }
}

export const login = async (data)=>{
    try {
        const user = await User.findOne({where:{email:data.email}});
        if(!user){
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const editUserProfile = async (data)=>{

    try {

        const user = User.findOne({where:{id:data.user_id}});
        const id= data.user_id;
        if(!user){
            throw new Error('User not found');
        }
        
        delete data.user_id;

        

        // update
        const updatedUser = await User.update(data,{where:{id}});
        if(updatedUser){
        return updatedUser;
        }else{
            throw new Error("something went wrong")
        }
        
    } catch (error) {
        throw error; 
    }
}

export const changePassword = async (data)=>{
    try {
        const user = await User.findOne({where:{id:data.user_id}});
        if(!user){
            throw new Error('User not found');
        }
        const isMatch = comparePassword(data.oldPassword,user.password);
        if(!isMatch){
            throw new Error('Old password is incorrect');
        }
        const updatedUser = await User.update({password:data.newPassword},{where:{id:data.user_id}});
        if(updatedUser){
            return updatedUser;
        }else{
            throw new Error("something went wrong")
        }
    } catch (error) {
        throw error;
    }
}

export const fetchUser=async()=>{
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

