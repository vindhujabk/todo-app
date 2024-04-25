import React from "react";
import moment from "moment";
import "./task.css";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../Axios/axios.js"
import UploadIcon from "@mui/icons-material/Upload";
import Tooltip from "@mui/material/Tooltip";
import { Octokit } from '@octokit/core';
import dotenv from "dotenv"




function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const TOKEN = process.env.REACT_APP_GITHUB_TOKEN
  console.log(TOKEN)

  const octokit = new Octokit({
    auth: 'TOKEN'
  });

  const uploadGist = async (e) => {
    e.preventDefault();
    try {
      await createGist();
    } catch (error) {
      console.log(error);
    }
  };

  async function createGist() {
    try {
      // Make a POST request to create a Gist
      const response = await octokit.request('POST /gists', {
        description: 'Example of a gist', // Description of the Gist
        public: false, // Set to true if you want the Gist to be public
        files: {
          'README.md': {
            content: 'Hello World' // Content of the Gist file
          }
        }
      });
  
      
      console.log('Gist created:', response.data.html_url);
    } catch (error) {
     
      console.error('Error creating Gist:', error);
    }
  }






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
        
        <div className=" italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="remove-task text-sm text-white">

      <Tooltip title="Export as Gist">
      <UploadIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={uploadGist}
          className="upload-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 m-1"
        />
    </Tooltip>
      
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 m-1"
        />
      </div>
    </div>
  );
}

export default Task;
