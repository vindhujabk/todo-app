import React from "react";
import { useNavigate } from 'react-router-dom';
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
import VisibilityIcon from '@mui/icons-material/Visibility';


function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const navigate = useNavigate();


  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN
  });

  async function createGist(projectTitle, projectDescription, todosList) {
    try {
      const todosText = todosList.map(todo => `- ${todo.text}`).join('\n');
  
      const response = await octokit.request('POST /gists', {
        description: projectTitle,
        public: false,
        files: {
          [`${projectTitle}.md`]: {
            content: `# ${projectTitle}\n\n${projectDescription}\n\n## Todos\n${todosText}`
          }
        }
      });
  
      console.log('Gist created:', response.data.html_url);
  
      return {
        url: response.data.html_url,
        content: `# ${projectTitle}\n\n${projectDescription}\n\n## Todos\n${todosText}`
      };
    } catch (error) {
      console.error('Error creating Gist:', error);
      throw error;
    }
  }
  

  function saveGistLocally(projectTitle, content) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const fileName = `${projectTitle}.md`;

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}


  const uploadGist = async (e) => {
    e.preventDefault();
    try {
        const projectTitle = task.title;
        const projectDescription = task.description;
        const todosList = task.todos;
        const gist = await createGist(projectTitle, projectDescription,todosList);

        saveGistLocally(projectTitle, gist.content);
    } catch (error) {
        console.log(error);
    }
};


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
  const handleView = (id) => {
    navigate(`/project/${id}`);
}
  

  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          
          onChange={() => handleMarkDone(task.id)}
           checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        {/* <ul>
    {task.todos.map((todo, index) => (
      <li key={index}>{todo}</li>
    ))}
  </ul> */}
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
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={uploadGist}
          className="upload-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 m-1"
        />
    </Tooltip>
      
        <DeleteIcon
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 m-1"
        />
        
        <VisibilityIcon
        style={{ fontSize: 24, cursor: "pointer" }}
        size="sm"
        onClick={()=>handleView(id)}
        className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 m-1"
        />
      </div>
    </div>
  );
}

export default Task;
