import mongoose,{Schema} from "mongoose"

const taskSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },{timestamps:true})

export const Task = mongoose.model("task",taskSchema)