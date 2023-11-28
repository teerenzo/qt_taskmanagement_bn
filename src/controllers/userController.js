import { register,login,editUserProfile,changePassword, fetchUser} from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashpassword.js";

export const registerUser = async (req, res) => {

    const { firstName, lastName, userName, email, phoneNumber,address, dob, password } = req.body;
    try {
        const newUser = await register({ firstName, lastName, userName, email, phoneNumber,address, dob, password: hashPassword(password) });
        delete newUser.dataValues.password;
        res.status(201).json({
            message: "User registered successfully",
            data: {
                token: generateToken(newUser.id),
                user: newUser,
            },
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// login

export const loginUser = async (req,res)=>{
    console.log(req.body)
    const {email,password}= req.body;
    try {
        
    const user = await login({email})
    

    if(user){
        const isMatch=comparePassword(password,user.password)
        if(isMatch){
            delete user.dataValues.password;

            res.status(200).json({
                token: generateToken(user.id),
                user
            })
        }else{
            res.status(401).json({
                message:"wrong credentials"
            })
        }
    }


        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editProfile = async (req,res)=>{

    const user_id = req.user.id;
    const {
      firstName,
      lastName,
      userName,
      address,
      email,
      phoneNumber,
      dob,
    } = req.body;

    try {

        const user = await editUserProfile({user_id,firstName,lastName,userName,address,email,phoneNumber,dob})

    if(user)
        res.status(200).json({
         message:"Data updated successfully",
        })

        
        
    } catch (error) {
    res.status(409).json({ message: error.message });
        
    }

}


// editPassword

export const editPassword = async (req,res)=>{

    const user_id = req.user.id;
    const {
      password,
      newPassword,
    } = req.body;

    try {

        const user = await changePassword({user_id,oldPassword:password,newPassword:hashPassword(newPassword)})

    if(user)
       console.log(user)
        res.status(200).json({
         message:"Password updated successfully",
        })

        
        
    } catch (error) {
    res.status(409).json({ message: error.message });
        
    }

}

export const getAllUsers=async (req,res)=>{
    try {
        const users = await fetchUser()
        if (users)
          res.status(200).json({
            message: "Users fetched successfully",
            users
          })
      } catch (error) {
        res.status(409).json({ message: error.message });
  
      }
}


