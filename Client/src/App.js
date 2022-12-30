import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import "./sass/App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todoItems, setTodoItems] = useState([]);
  const todoId = useRef(4);

  useEffect(() => {
    const getTodos = async () => {
      let response = await axios.get("http://localhost:8000/todos");
      setTodoItems(response.data);
    };
    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트(App)은 AddTodo 컴포넌트 접근 가능
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당 함수를 AddTodo props로 넘겨야 함
  const addItem = async (newItem) => {
    // axios.post(url, data)

    // [Before]
    // // newItem - {id: xx, title: xx, done: false}
    // newItem.id = todoId.current++; // key를 위한 id 설정
    // newItem.done = false; // done 초기화
    // // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    // setTodoItems([...todoItems, newItem]); // setTodoItems(todoItems.concat(newItem))

    // [After]
    const response = await axios.post("http://localhost:8000/todo", newItem);
    // console.log(response.data);
    // 기존 아이템: ...todoItems
    // 새로운 아이템: response.data
    setTodoItems([...todoItems, response.data]);
  };

  // 전체 Todo 리스트(todoItems)는 App 컴포넌트에서 관리하고 있으므로
  // deleteItem() 함수는 App 컴포넌트에 작성해야 함
  const deleteItem = async (targetItem) => {
    // [Before]
    // let newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    // setTodoItems(newTodoItems);

    // [After]
    // console.log(targetItem); // {id:x, title: xx, done: x}
    await axios.delete(`http://localhost:8000/todo/${targetItem.id}`);
    let newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  const updateItem = async (targetItem) => {
    console.log(targetItem);
    // axios.patch(url, data)
    await axios.patch(
      `http://localhost:8000/todo/${targetItem.id}`,
      targetItem
    );
  };

  const colorUnite = [
    ["linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)", "#a18cd1"],
    ["linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)", "#fad0c4"],
    ["linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)", "#ffecd2"],
    [
      "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
      "#ff8177",
    ],
    [
      "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
      "#ff9a9e",
    ],
    ["linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "#f6d365"],
    ["linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)", "#fbc2eb"],
    [
      "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
      "#fdcbf1",
    ],
    ["linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)", "#a1c4fd"],
    ["linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)", "#d4fc79"],
    ["linear-gradient(to top, #a8edea 0%, #fed6e3 100%)", "#a8edea"],
    ["linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", "#f5f7fa"],
    ["linear-gradient(to top, #fddb92 0%, #d1fdff 100%)", "#fddb92"],
    ["linear-gradient(to top, #96fbc4 0%, #f9f586 100%)", "#96fbc4"],
    [
      "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)",
      "#eea2a2",
    ],
    ["linear-gradient(to top, #ff0844 0%, #ffb199 100%)", "#ff0844"],
    ["linear-gradient(to right, #f83600 0%, #f9d423 100%)", " #f83600"],
    ["linear-gradient(to top, #e8198b 0%, #c7eafd 100%)", "#e8198b"],
    [
      "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)",
      "#d5dee7",
    ],
  ];

  const [BGColor, setBGColor] = useState({
    backgroundImage: colorUnite[parseInt(colorUnite.length * Math.random())],
  });

  const setBg = () => {
    setBGColor({
      backgroundImage: colorUnite[parseInt(colorUnite.length * Math.random())],
    });
    document.body.style.background = `${BGColor.backgroundImage[0]}`;
  };

  document.body.style.background = `${BGColor.backgroundImage[0]}`;
  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      <div className="left-todos">🚀 {todoItems.length} Todos</div>
      <div className="todo-list">
        {todoItems.length > 0 ? (
          todoItems.map((item) => {
            // console.log(item); // {id: 1, title: 'My Todo1', done: false}
            return (
              <Todo
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            );
          })
        ) : (
          <p className="empty-todos">Add your Todos🔥</p>
        )}
      </div>
      <button className="change-bg" onClick={setBg}>
        <FontAwesomeIcon icon={faRedoAlt} />
      </button>
    </div>
  );
};

export default App;
