import {User} from "../models/userModel.js";


export const authUser = async (req, res) => {
    const {email, password} = req.body
     try {
        const user = await User.findOne({email})
         if (user && (await user.matchPassword(password))){
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               isAdmin: user.isAdmin,
               token: user.createJWT()
           })
         }else {
             res.status(401)
             throw new Error('Invalid email or password')
         }

     }catch (e) {
         res.status(401).json({message: 'Invalid email or password'})
         console.log(e.message)
     }
}
export const profileUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password')
        res.json(user)
    }catch (e) {
        res.status(404).json({message: 'Invalid data'})
        console.log(e.message)
    }
}
export const registerUser = async (req, res) => {
    const {email, password, name} = req.body
    if (!name || !email || !password){
        throw new Error('please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists){
        throw new Error('Email already in use')
    }
      try {
          const user = new User(req.body)
          await user.save()
          const token = user.createJWT()
          const data = {
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token
          }
          res.json({data})
      }catch (e) {
          res.status(401).json({message: 'Invalid email or password'})
          throw new Error('Invalid email or password')
      }
}
