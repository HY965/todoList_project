import {
  TextContent,
  ListsArr,
  CompleteBtn,
  DeleteBtn,
  BtnSet,
  CardText,
  CardName,
} from "../style/todoCardStyle";
import { Link } from "react-router-dom";

const List = ({ todo, clickRemoveButtonHandler, checkTodo }) => {
  const { title, detail, isDone, id } = todo;

  //date
  const newDate = new Date(todo.deadline).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <ListsArr>
      <TextContent $isDone={isDone}>
        {/* <Link to={`/${id}`} /> */}
        <CardName>{title}</CardName>
        <CardText>{detail}</CardText>
        <CardText>{newDate}까지</CardText>
      </TextContent>

      <BtnSet>
        <DeleteBtn onClick={() => clickRemoveButtonHandler(id)}>삭제</DeleteBtn>

        <CompleteBtn onClick={() => checkTodo(id)}>
          {todo.isDone ? "취소" : "완료"}
          {/* //삼항연산자로 취소 ,완료 text로 표시 */}
        </CompleteBtn>
      </BtnSet>
    </ListsArr>
  );
};

export default List;
