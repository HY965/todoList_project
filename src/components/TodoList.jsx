import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import List from "./List";
import {
  CardList,
  AddBtn,
  InputTitle,
  HeaderContent,
  InputStyle,
  SortOrder,
  NavSet,
  CardBundle,
} from "../style/todoStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoThunk,
  checkTodoThunk,
  deleteTodoThunk,
  getTodosThunk,
  sortTodos,
} from "../redux/modules/todoSlice";

// 초기값
const TodoList = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // // asc , 오름차순 기본설정
  // useEffect(() => {
  //   // 오름차순 & 내림차순
  //   const sortLists = (order) => {
  //     setLists((prevlists) => {
  //       // 전역변수말고 안에서(지역변수) 해결해야 무한루프 안빠짐
  //       const sortedLists = [...prevlists].sort((a, b) => {
  //         if (order === "asc") {
  //           return new Date(a.deadline) - new Date(b.deadline);
  //         }
  //         return new Date(b.deadline) - new Date(a.deadline);
  //       });
  //       return sortedLists;
  //     });
  //   };
  //   sortLists(sortOrder);
  // }, [sortOrder, setLists]);

  useEffect(() => {
    dispatch(getTodosThunk());
  }, [dispatch]);

  useEffect(() => {
    if (sortOrder === "asc") {
      dispatch(sortTodos("asc"));
      return;
    }
    dispatch(sortTodos("desc"));
  }, [sortOrder, dispatch]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const detailChangeHandler = (event) => {
    setDetail(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setDeadline(event.target.value);
  };

  const sortOrderHandler = (event) => {
    setSortOrder(event.target.value);
  };

  // 추가 버튼 클릭
  const clickAddButtonHandler = (event) => {
    event.preventDefault();
    if (title === "" || detail === "") {
      return alert("필수값을 입력해주세요");
    }

    const nextTodo = {
      id: uuid(),
      title,
      detail,
      deadline,
      isDone: false,
    };
    dispatch(addTodoThunk(nextTodo));
    // setLists((prevList) => [...todos, newLists]);
    // 변경사항이 중간에 씹힐수있다. [가상돔비교 과정]
    // 콜백함수는 순서대로 실행된다. 그래서 무시되는경우가없어진다.(씹힐경우가없어짐)
    setTitle("");
    setDetail("");
    setDeadline("");
  };

  // 완료 & 취소 클릭
  const checkTodo = (id) => {
    // const tempButton = todos.filter((todo) => {
    //   if (todo.id === id) {
    //     todo.isDone = !todo.isDone;
    //   }
    //   return todo;
    // });
    // setLists(tempButton);
    dispatch(checkTodoThunk(id));
  };

  // 삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {
    dispatch(deleteTodoThunk(id));
  };

  return (
    <>
      <div className="container">
        <header>
          <HeaderName>My Todo List</HeaderName>
          <HeaderContent>
            <NavSet>
              <InputTitle>제목</InputTitle>
              <InputStyle
                type="text"
                value={title}
                onChange={titleChangeHandler}
              />
              <InputTitle>내용</InputTitle>
              <InputStyle
                type="text"
                value={detail}
                onChange={detailChangeHandler}
              />
              <InputTitle>마감날짜</InputTitle>
              <InputStyle
                type="date"
                value={deadline}
                onChange={dateChangeHandler}
              />
              <AddBtn type="button" onClick={clickAddButtonHandler}>
                추가하기
              </AddBtn>
            </NavSet>
          </HeaderContent>
        </header>
        <div className="content">
          <SortOrder value={sortOrder} onChange={sortOrderHandler}>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </SortOrder>
          <CardBundle>
            <IsDoneName>🔥Working🔥</IsDoneName>
            <CardList>
              {todos
                .filter((todo) => !todo.isDone)
                .map((todo) => (
                  <List
                    item={todo}
                    key={todo.id}
                    clickRemoveButtonHandler={clickRemoveButtonHandler}
                    checkTodo={checkTodo}
                  />
                ))}
            </CardList>
          </CardBundle>
          <CardBundle>
            <IsDoneName>🍖Done!🍖</IsDoneName>
            <CardList>
              {todos
                .filter((todo) => todo.isDone)
                .map((todo) => (
                  <List
                    item={todo}
                    key={todo.id}
                    clickRemoveButtonHandler={clickRemoveButtonHandler}
                    checkTodo={checkTodo}
                  />
                ))}
            </CardList>
          </CardBundle>
        </div>
      </div>
    </>
  );
};

export default TodoList;

const HeaderName = styled.h2`
  font-size: 30px;
  font-weight: bolder;
  padding: 1.5rem;
`;

const IsDoneName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`;
