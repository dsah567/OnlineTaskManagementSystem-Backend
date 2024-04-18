import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

const task= asyncHandler (async(req,res)=>{
    if(req.user._id){

        try {
            const tasks = await Task.find({createdBy:req.user._id})
            if(!tasks){
                return res
                    .status(400)
                    .json(new ApiError(400, {}, "User has not created any task"));
            }
    
            return res
                        .status(201)
                        .json(new ApiResponse(201, tasks, "list of task"));
        }
         catch (error) {
            console.log(" task error",error);
            return res
                .status(500)
                .json(new ApiError(500, {}, "Something went wrong"));
            
        }
    }
        
})

const createTask = asyncHandler(async (req,res)=>{
    if(req.user._id){
        const {title} =req.body

        if(!title)
        return res
                .status(400)
                .json(new ApiError(400, {}, "Tittle is required"));

        const existedTask = await Task.findOne({$and: [{title},{createdBy:req.user._id }]});

        if(existedTask){
        return res
                .status(401)
                .json(new ApiError(401, {}, "task already exist"));}

        try {
            const task = await Task.create({ title, createdBy:req.user._id });
            console.log(task);
            return res
                    .status(201)
                    .json(new ApiResponse(201, task, "Task Created"));
            
        } catch (error) {
            console.log("createTask Controller Error",error);
            return res
                .status(500)
                .json(new ApiError(500, {}, "Something went wrong"));   
        }
    }

})

const retrievTaskDetails = asyncHandler(async (req,res)=>{

    if(req.user._id){
        const {title} =req.body
        if(!title)
        return res
                .status(400)
                .json(new ApiError(400, {}, "Tittle is required"));

                try {
                    const task = await Task.findOne({$and: [{title},{createdBy:req.user._id }]})
                    return res
                            .status(201)
                            .json(new ApiResponse(201, task.description, "Details "));
                } catch (error) {
                    console.log(error);
                    return res
                        .status(500)
                        .json(new ApiError(500, {}, "Something went wrong "));
                }

    }

})

const updateTaskDetails = asyncHandler(async (req,res)=>{

    if(req.user._id){
        const {title,details} =req.body

        if(!title || !details)
        return res
                .status(400)
                .json(new ApiError(400, {}, "Details is required"));

        try {
            const task = await Task.findOne({$and: [{title},{createdBy:req.user._id }]});
            task.description=details;
            await task.save()
            return res
                    .status(201)
                    .json(new ApiResponse(201, task, "Details updated"));
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, {}, "Something went wrong while updating details"));
        }


    }

})

const assignTask = asyncHandler(async (req,res)=>{

    if(req.user._id){
        const {title,username} =req.body

        if(!title || !username)
        return res
                .status(400)
                .json(new ApiError(400, {}, "username is required"));

        try {
            const task = await Task.findOne({$and: [{title},{createdBy:req.user._id }]});

            if(!task){
                return res
                .status(401)
                .json(new ApiError(401, {}, "task couldnot be finned"));
            }
            const user = await User.findOne({username})
            if(!user){
                return res
                .status(401)
                .json(new ApiError(401, {}, `${username} doesnot exist`));
            }

            task.assignedTo=user._id;
            task.username=username

            await task.save()
            return res
                    .status(201)
                    .json(new ApiResponse(201, task, "User assigned "));
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, {}, "Something went wrong while assigning user"));
        }


    }

})

const deleteTask = asyncHandler(async (req,res)=>{

    if(req.user._id){
        const {title} =req.body
        if(!title)
        return res
                .status(400)
                .json(new ApiError(400, {}, "Tittle is required"));
        
        try {
            const deletedTask = await Task.findOneAndDelete({$and: [{title},{createdBy:req.user._id }]})
            if (!deletedTask) {
                return res
                        .status(404)
                        .json(new ApiError(400, {}, "Task not found"));
              }
          
              return res
                        .status(200)
                        .json(new ApiResponse(200,{}, "Task deleted successfully"));
            
        } catch (error) {

            return res
                    .status(500)
                    .json(new ApiError(400, {}, "Something went wrong"));
            
        }
    }

})



export {createTask,
        task,
        retrievTaskDetails,
        updateTaskDetails,
        assignTask,
        deleteTask,
        }