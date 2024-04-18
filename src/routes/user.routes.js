import { Router } from "express";
import {registerUser,loginUser,logoutUser,isLoggedInUser} from"../controllers/user.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/isloggedin").get(verifyJWT, isLoggedInUser)

export default userRouter