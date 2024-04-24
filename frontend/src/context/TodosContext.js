import { createContext, useContext, useReducer } from 'react';

const TodosContext = createContext(null);

const TodosDispatchContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    initialTodos
  );

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}

function todosReducer(todos, action) {
  switch (action.type) {
    case 'added': {
      return [...todos, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return todos.map(t => {
        if (t.id === action.todo.id) {
          return action.todo;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return todos.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


const initialTodos = [
  { id: 0, text: 'Todo 1', done: false },
  
];