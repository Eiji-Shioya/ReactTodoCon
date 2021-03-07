import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  //可変要素　stateを使う
  //incompleteTodos:変数 ,  setIncompleteTodos処理する関数
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 関数
  // event.target.value 入力された値を取得表示する
  // これをsetTodoTextへ値を渡す
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //addボタンが押された時の処理関数 todoTextの値を表示
  //...incomplteTools : 今の排列を取得
  // [...incompleteTodos,todoText]; incompleteTodosにtodoTextをセット
  const onClickAdd = () => {
    //inputが空の場合
    if (todoText === "") return;
    //値がある場合
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    //reset
    setTodoText("");
  };

  //削除時のボタン動作
  //map indexには０から要素が入る それを受け取りdel
  //splice 指定したindexから1個削除
  //関数setIncompleteTodosを更新
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //incomplte から complteへ
  const onClickComplete = (index) => {
    //indexに従った要素を取得し削除
    const newIncomplteTodos = [...incompleteTodos];
    newIncomplteTodos.splice(index, 1);

    //index番の要素をcompleteTodosへセット、新しい排列をset
    const newComplteTodos = [...completeTodos, incompleteTodos[index]];

    //incomplte削除
    setIncompleteTodos(newIncomplteTodos);
    //complte更新
    setCompleteTodos(newComplteTodos);
  };

  //戻す
  const onClickBack = (index) => {
    //削除
    const newComplteTodos = [...completeTodos];
    newComplteTodos.splice(index, 1);

    const newIncomplteTodos = [...incompleteTodos, completeTodos[index]];

    //complte削除
    setCompleteTodos(newComplteTodos);

    //incomplte更新
    setIncompleteTodos(newIncomplteTodos);
  };

  //表示
  return (
    <>
      <div className="input-area">
        {
          //value={todoText} だけだとstateのからの値がセットされるので
          //入力ができないその為、onchange
        }
        <input
          placeholder="Todo input area"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>Add</button>
      </div>

      <div className="incomplete-area">
        <p className="title">incomplete</p>
        <ul>
          {
            // map の中には usestateない排列要素が入っていく
            // key ループ処理される際の目印 , indexは0から順番に要素が入る
            // 削除でonClickDelete(index)=>だと即時実行されてしまうので、
            // () => onClickDelete(index)としてボタンを押したときにイベント発生 : 関数に引数を渡す
          }
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>complete</button>
                <button onClick={() => onClickDelete(index)}>delete</button>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title">complete</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>return</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
