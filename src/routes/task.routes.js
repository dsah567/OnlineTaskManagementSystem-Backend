import { Router } from "express";
import {createTask,task, retrievTaskDetails, updateTaskDetails, assignTask, deleteTask} from "../controllers/task.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const taskRouter = Router()

taskRouter.route("/").post(verifyJWT,createTask)
taskRouter.route("/").get(verifyJWT,task)
taskRouter.route("/details").get(verifyJWT,retrievTaskDetails)
taskRouter.route("/details").put(verifyJWT, updateTaskDetails)
taskRouter.route("/assign").put(verifyJWT, assignTask)
taskRouter.route("/").delete(verifyJWT, deleteTask)

export default taskRouter