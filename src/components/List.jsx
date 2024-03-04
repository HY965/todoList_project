import { Link, useParams } from "react-router-dom";

import {
  TextContent,
  ListsArr,
  CompleteBtn,
  DeleteBtn,
  BtnSet,
  CardText,
  CardName,
} from "../style/todoCardStyle";

const List = ({ item, clickRemoveButtonHandler, checkTodo }) => {
  // const { listsId } = useParams();
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
      <TextContent $isDone={item.isDone}>
        {/* <Link to={`/${listsId}`} /> */}
        <CardName>{item.title}</CardName>
        <CardText>{item.detail}</CardText>
        <CardText>{date}까지</CardText>
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
