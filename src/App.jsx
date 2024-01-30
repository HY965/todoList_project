import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./reset.css";
import "./App.css";
import List from "./components/List";

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
  const [sortOrder, setSortOrder] = useState("asc");

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
    <div className="container">
      <header>
        <h2>My Todo List</h2>
        <div className="header-content">
          <form className="add-list">
            <p className="input-title">제목</p>
            <input
              className="input-Style"
              type="text"
              value={title}
              onChange={titleChangeHandler}
            />
            <p className="input-detail">내용</p>
            <input
              className="input-Style"
              type="text"
              value={detail}
              onChange={detailChangeHandler}
            />
            <p className="input-detail">마감날짜</p>
            <input
              className="input-Style"
              type="date"
              value={deadline}
              onChange={dateChangeHandler}
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
        <select
          value={sortOrder}
          onChange={sortOrderHandler}
          className="sort-order"
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
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
