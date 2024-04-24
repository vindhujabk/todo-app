import { useState } from "react";
import { useTodosDispatch } from "../../context/TodosContext";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from 'uuid';

export default function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useTodosDispatch();

  return (
    <>
      <div className="add-input flex grow-1 bg-zinc-600 rounded-md justify-between">
        <input
          placeholder="Add Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}

          className="bg-transparent grow"
        />
        {/* <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button> */}
        <AddIcon
          style={{ fontSize: 24, cursor: "pointer" }}
          size="sm"
          onClick={() => {
            setText("");
            dispatch({
              type: "added",
              // id: nextId++,
id:uuidv4(),
              text: text,
            });
          }}
          className="add-task-btn bg-zinc-600 rounded-full border-2 shadow-2xl border-white p-1 "
        />
        
      </div>
    </>
  );
}

