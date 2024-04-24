import React, { useState } from "react";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";
import AddTodo from "../createTask/AddTodos.js"
import TodosList from '../createTask/TodosList';


function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/project/addProject",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(res)
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "ADD_TASK",
      title,
      description
    });
    setTitle("");
    setDescription("");
  };
 

  return (
    <div className="addContainer md:w-2/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="grow">
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="my-3">
            <label htmlFor="description">Description</label>
            <textarea
              rows={3}
              name="description"
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="todoslist">
            <label htmlFor="todos-list" >Todos</label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <AddTodo/>
                    <TodosList/>
                </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-700 rounded-md text-white px-5 py-1 mt-5"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
