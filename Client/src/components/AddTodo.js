import { useState } from "react";
import AddTodoCss from "../css/AddTodo.css";

const AddTodo = ({ addItem }) => {
  // 사용자 입력을 저장할 객체
  // (id, title, done에 대한 정보를 저장해야해서 객체 형태로!!)
  const [todoItem, setTodoItem] = useState({
    title: "",
  });

  const onButtonClick = () => {
    // props로 받아온 addItem 함수 실행
    if (todoItem.title == "") {
      alert("투두를 작성하세요");
    } else {
      addItem(todoItem); // {title: 'input입력값'}
      setTodoItem({ title: "" }); // input 초기화
    }
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter" && todoItem.title !== "") {
      addItem(todoItem);
      setTodoItem({ title: "" });
    } else if (e.key == "Enter" && todoItem.title == "") {
      alert("투두를 작성하세요");
    }
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onKeyPress={onKeyPress}
        onChange={(e) => setTodoItem({ title: e.target.value })}
      />
      <button onClick={onButtonClick}>ADD</button>
    </div>
  );
};

export default AddTodo;
