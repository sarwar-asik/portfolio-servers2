import { NextFunction, Request, Response } from 'express'
import { createUserServices } from './users.services'
import { User } from './users.model'

const createUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const data = req.body
    // console.log('hitted', data)
    const result =await createUserServices(data)
    if(result){
        res.status(200).send({
            success:true,
            message:"successfully created",
            data:result
        })
    }
  } catch (error) {
    // res.status(400).send({ status: 'had an error in createUser', error })
    next(error)
  }
}



const getUser = async (req: Request, res: Response) => {
  try {
   const data = await User.find()
   res.send(data)
  } catch (error) {
    res.status(400).send({ status: 'had an error in getUser Controller', error })
  }
}




export default { createUser ,getUser}
