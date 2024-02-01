import {
  TextContent,
  ListsArr,
  CompleteBtn,
  DeleteBtn,
  BtnSet,
} from "../style/todoCardStyle";

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
    <ListsArr key={item.id}>
      <TextContent isDone={item.isDone}>
        <h4>{item.title}</h4>
        <p>{item.detail}</p>
        <p>{date}까지</p>
      </TextContent>

      <BtnSet>
        <DeleteBtn onClick={() => clickRemoveButtonHandler(item.id)}>
          삭제
        </DeleteBtn>

        <CompleteBtn onClick={() => checkTodo(item.id)}>
          {item.isDone ? "취소" : "완료"}
          {/* //삼항연산자로 취소 ,완료 text로 표시 */}
        </CompleteBtn>
      </BtnSet>
    </ListsArr>
  );
};

export default List;
