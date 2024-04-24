import React from "react";
import moment from "moment";
import "./task.css";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../Axios/axios.js"


function Task({ task, id, todos }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/project/removeProject/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({
        type: "REMOVE_TASK",
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkDone = (id) => {
    try {
      dispatch({
        type: "MARK_DONE",
        id
      });
    } catch (error) {
      console.log("Error occurred while marking task as done:", error);
    }
  };


  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          // onClick={handleMarkDone}
          onChange={() => handleMarkDone(task.id)}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        {/* <p className="task-description">{task.todos[0]}</p> */}
        <div className=" italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
