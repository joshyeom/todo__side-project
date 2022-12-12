const Todo = (props) => {
  const { todo } = props;
  const { id, title, done } = todo;
  return (
    <>
      <input type="checkbox" value={id} id={id} defaultChecked={done} />
      <label htmlFor={id}>{title}</label>
    </>
  );
};

export default Todo;
