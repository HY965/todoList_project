import React, { useState } from "react";
import "./reset.css";
import "./App.css";
import List from "./components/List";

// 초기값
const App = () => {
  const [lists, setLists] = useState([
    {
      id: 0,
      title: "리액트 입문정복",
      detail: "리액트 입문강의 3회 완강",
      isDone: false,
    },
    {
      id: 1,
      title: "자바스크립트 공부",
      detail: "JS문법 1주차 복습하기",
      isDone: false,
    },
    {
      id: 2,
      title: "2시부터 6시까지 집중공부",
      detail: "할때까지 가보자구!!",
      isDone: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const detailChangeHandler = (event) => {
    setDetail(event.target.value);
  };

  // 추가 버튼 클릭
  const clickAddButtonHandler = (event) => {
    const newLists = {
      id: lists.length + 1,
      title,
      detail,
      isDone: false,
    };
    if (title === "" || detail === "") return;
    setLists([...lists, newLists]);
    event.preventDefault();
    setTitle("");
    setDetail("");
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
    console.log(tempButton);
  };

  // 삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {
    const newLists = lists.filter((lists) => lists.id !== id);
    setLists(newLists);
  };

  return (
    <div className="container">
      <header>
        <h2>My Todo List</h2>
        <div className="header-content">
          <form className="add-list">
            <p>제목</p>
            <input
              className="input-Style"
              type="text"
              value={title}
              onChange={titleChangeHandler}
            />
            <p>내용</p>
            <input
              className="input-Style"
              type="text"
              value={detail}
              onChange={detailChangeHandler}
            />
            <button
              type="button"
              className="add-btn"
              onClick={clickAddButtonHandler}
            >
              추가하기
            </button>
          </form>
        </div>
      </header>
      <div className="content">
        <div className="working-add">
          <h3>🔥Working🔥</h3>
          <div className="list-arr">
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
          </div>
        </div>
        <div className="done-add">
          <h3>🍖Done!🍖</h3>
          <div className="list-arr">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
