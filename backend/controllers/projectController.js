import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const addProject = async (req, res) => {
  const { title, description,todos } = req.body;
  const userId = req.user.id;
  const user = await userModel.find({ _id: userId });

  const newProject = new projectModel({
    title,
    description,
    completed: false,
    userId,
    todos
  });
  newProject
    .save()
    .then(() => {
      return res.status(200).json({ message: "Project added successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

const removeProject = (req, res) => {
  //const { id } = req.body;
  const { id } = req.params
  console.log("id: ", id);
  projectModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Project deleted successfully" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

const getProject = (req, res) => {
  projectModel
    .find({ userId: req.user.id })
    .populate("todos")
    .exec()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};
export {addProject,removeProject, getProject };
