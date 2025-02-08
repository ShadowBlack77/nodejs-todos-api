import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;