import { useState } from "react";

const Todo = ({ item, deleteItem }) => {
  // console.log(item); // { id: 1, title: 'todo1', done: false, }
  const { id, title, done } = item;
  const [todoDone, setTodoDone] = useState("");
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);
  const [line, setLine] = useState("");

  const checkboxHandler = () => {
    if (line == "" && todoDone == true) {
      setLine({ textDecoration: "line-through" });
      setTodoDone(false);
    } else {
      setLine("");
      setTodoDone(true);
    }
  };

  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
    console.log(todoItem);
  };

  const editEventHander = (e) =>
    setTodoItem({ id: todoItem.id, title: e.target.value, done: false });

  const readOnlyHandler = () => {
    setReadOnly(false);
  };

  const onReadOnlyTrue = (e) => {
    if (e.key == "Enter") {
      setReadOnly(true);
    }
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        defaultChecked={done}
        onClick={checkboxHandler}
      />
      <input
        // style={}
        readOnly={readOnly}
        onClick={readOnlyHandler}
        value={todoItem.title}
        onChange={editEventHander}
        onKeyPress={onReadOnlyTrue}
      />
      <button onClick={onDeleteBtnClick}>DELETE</button>
    </div>
  );
};

export default Todo;
