import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/AddTodo.css";

const AddTodo = ({ addItem }) => {
  // 사용자 입력을 저장할 객체
  // (id, title, done에 대한 정보를 저장해야해서 객체 형태로!!)
  const [todoItem, setTodoItem] = useState({
    title: "",
  });

  const onButtonClick = () => {
    // props로 받아온 addItem 함수 실행
    if (todoItem.title.trim().length === 0) {
    } else {
      addItem(todoItem); // {title: 'input입력값'}
      setTodoItem({ title: "" }); // input 초기화
    }
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter" && todoItem.title.trim().length === 0) {
      return;
    } else if (e.key == "Enter" && todoItem.title.trim().length !== 0) {
      addItem(todoItem);
      setTodoItem({ title: "" });
    }
  };

  return (
    <div className="AddTodo">
      <input
        autoFocus
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onKeyPress={onKeyPress}
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      <button onClick={onButtonClick}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddTodo;
