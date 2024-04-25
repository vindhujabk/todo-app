import React, { useState, useEffect } from "react";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import TokenContext from "../context/TokenContext.js";
import axios from "../Axios/axios.js";
import { useNavigate } from "react-router-dom";

function UpdateTask({ projectId }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectDetails();
  });

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/project/getProject/${projectId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const project = response.data.project;
      setTitle(project.title);
      setDescription(project.description);
      setTodos(project.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/project/updateProject/${projectId}`,
        { title, description, todos },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(res);
      
      dispatch({
        type: "UPDATE_TASK",
        id: projectId,
        title,
        description,
        todos,
      });
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoChange = (index, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = value;
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, ""]);
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
            <label htmlFor="todos-list">Todos</label>
            {todos.map((todo, index) => (
              <input
                key={index}
                type="text"
                value={todo}
                onChange={(e) => handleTodoChange(index, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            ))}
            <button
              type="button"
              onClick={handleAddTodo}
              className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Add Todo
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-700 rounded-md text-white px-5 py-1 mt-5"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;
