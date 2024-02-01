import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./reset.css";
import "./App.css";
import List from "./components/List";
import Globastyle from "./style/GlobaStyle";
import {
  CardList,
  AddBtn,
  InputTitle,
  HeaderContent,
  InputStyle,
  SortOrder,
  NavSet,
  CardBundle,
} from "./style/todoStyle";

// 초기값
const App = () => {
  const [lists, setLists] = useState([
    {
      id: uuid(),
      title: "리액트 입문정복",
      detail: "리액트 입문강의 3회 완강",
      deadline: "2024-01-10",
      isDone: false,
    },
    {
      id: uuid(),
      title: "자바스크립트 공부",
      detail: "JS문법 1주차 복습하기",
      deadline: "2024-02-01",
      isDone: false,
    },
    {
      id: uuid(),
      title: "2시부터 6시까지 집중공부",
      detail: "할때까지 가보자구!!",
      deadline: "2024-03-01",
      isDone: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc , 오름차순 기본설정

  useEffect(() => {
    // 오름차순 & 내림차순
    const sortLists = (order) => {
      setLists((prevlists) => {
        // 전역변수말고 안에서(지역변수) 해결해야 무한루프 안빠짐
        const sortedLists = [...prevlists].sort((a, b) => {
          if (order === "asc") {
            return new Date(a.deadline) - new Date(b.deadline);
          }
          return new Date(b.deadline) - new Date(a.deadline);
        });
        return sortedLists;
      });
    };
    sortLists(sortOrder);
    // console.log(sortOrder);
  }, [sortOrder]);

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
    if (title === "" || detail === "") return;
    const newLists = {
      id: uuid(),
      title,
      detail,
      deadline,
      isDone: false,
    };
    setLists((prevList) => [...lists, newLists]);
    // 변경사항이 중간에 씹힐수있다. [가상돔비교 과정]
    // 콜백함수는 순서대로 실행된다. 그래서 무시되는경우가없어진다.(씹힐경우가없어짐)
    setTitle("");
    setDetail("");
    setDeadline("");
    // event.target.reset();
  };

  // 완료 & 취소 클릭
  const checkTodo = (id) => {
    const tempButton = lists.filter((lists) => {
      if (lists.id === id) {
        lists.isDone = !lists.isDone;
      }
      return lists;
    });
    setLists(tempButton);
  };

  // 삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {
    const newLists = lists.filter((lists) => lists.id !== id);
    setLists(newLists);
  };

  return (
    <>
      <Globastyle />
      <div className="container">
        <header>
          <h2>My Todo List</h2>
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
            <h3>🔥Working🔥</h3>
            <CardList>
              {lists
                .filter((list) => !list.isDone)
                .map((item) => (
                  <List
                    item={item}
                    key={item.id}
                    clickRemoveButtonHandler={clickRemoveButtonHandler}
                    checkTodo={checkTodo}
                  />
                ))}
            </CardList>
          </CardBundle>
          <CardBundle>
            <h3>🍖Done!🍖</h3>
            <CardList>
              {lists
                .filter((list) => list.isDone)
                .map((item) => (
                  <List
                    item={item}
                    key={item.id}
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

export default App;
