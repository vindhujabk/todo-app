function taskReducer(tasks, action) {
    console.log("taskreducer");
    switch (action.type) {
        
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    title: action.title,
                    description: action.description,
                    completed: false
                }
            ]
        }
        case "SET_TASK": {
            return action.payload
        }
        case "REMOVE_TASK": {
            return tasks.filter(task => task.id !== action.id);
        }
        case "MARK_DONE": {
            return tasks.map(task => {
                if (task.id === action.id) {
                    console.log(typeof(task.id),typeof(action.id))
                    return {
                        ...task,
                        completed: !task.completed
                    };
                }
                return task;
            });
        }
        
        case "UPDATE_TASK": {
            return tasks.map(task => {
              if (task.id === action.id) {
                return {
                  ...task,
                  title: action.title,
                  description: action.description,
                  todos: action.todos
                };
              }
              return task;
            });
          }
          
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}

export default taskReducer;