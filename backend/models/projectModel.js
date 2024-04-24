import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const projectInstance = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    completed: { type: Boolean, required: true },
    todos: [todoSchema],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("Project", projectInstance);
export default projectModel;
