import { useState } from "react";
import Todo from "./components/Todo";

const App = () => {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "My Todo1",
      done: false,
    },
    {
      id: 2,
      title: "My Todo2",
      done: false,
    },
    {
      id: 3,
      title: "My Todo3",
      done: true,
    },
  ]);
  return (
    <div className="App">
      {todoItems.map((todoItem) => {
        return <Todo todo={todoItem} key={todoItem.id}></Todo>;
      })}
    </div>
  );
};

export default App;
