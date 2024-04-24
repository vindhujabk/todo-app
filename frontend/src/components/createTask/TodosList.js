import { useState } from 'react';
import { useTodos,useTodosDispatch } from '../../context/TodosContext';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"


export default function TodosList() {
  const todos = useTodos();
  console.log(todos)

  return (
    
    <div className='flex'>
    <ul className='grow-0'>
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
    </div>
  );
}

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTodosDispatch();
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              todo: {
                ...todo,
                text: e.target.value
              }
            });
          }} 
          className="bg-transparent grow"/>
        
        {<SaveIcon
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={() => setIsEditing(false)}
          className="save-task-btn bg-teal-700 rounded-full border-2 shadow-2xl border-white p-1"
        />}
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.text}
      
        {<EditIcon
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={() => setIsEditing(true)}
          className="edit-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 ml-1"
        />}
      </>
    );
  }
  return (

      <div className='todos-input flex bg-zinc-600 rounded-md my-1 '>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            todo: {
              ...todo,
              done: e.target.checked
            }
          });
        }}
      />
      <label>
      {todoContent}
        <DeleteIcon
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={() => {
          dispatch({
          type: 'deleted',
          id: todo.id
        });
      }}
          className="remove-task-btn bg-red-700 rounded-full border-2 shadow-2xl border-white p-1 self-end ml-1"
        />
      </label>
    </div>
   
  );
}
