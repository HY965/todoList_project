const List = ({ item, clickRemoveButtonHandler, checkTodo }) => {
  //date
  const specificDate = new Date(item.deadline);
  specificDate.toLocaleDateString();
  const date = new Date(item.deadline).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <div className="lists-arr" key={item.id}>
      <div className="text-content">
        <h4>{item.title}</h4>
        <p>{item.detail}</p>
        <p>{date}까지</p>
      </div>

      <div className="button-set">
        <button
          className="delete-btn"
          onClick={() => clickRemoveButtonHandler(item.id)}
        >
          삭제
        </button>

        <button className="complete-btn" onClick={() => checkTodo(item.id)}>
          {item.isDone ? "취소" : "완료"}
          {/* //삼항연산자로 취소 ,완료 text로 표시 */}
        </button>
      </div>
    </div>
  );
};

export default List;
