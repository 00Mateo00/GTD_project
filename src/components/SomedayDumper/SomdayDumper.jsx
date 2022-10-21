import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { DumperEventModal } from "./DumperEventModal";
import "./somedayDumper.scss";
import { TodoModal } from "./TodoModal";

export const SomdayDumper = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { savedDumperTODO, setSelectedTODO, onShowTodoModal, setOnShowTodoModal } = useContext(GlobalContext);

  const todos = savedDumperTODO
    .map((e, i) => {
      return (
        <div
          onClick={() => {
            setSelectedTODO(e);
            setShowEditor(true);
          }}
          className="TODO-card"
          key={i}
        >
          {showMenu !== i && (
            <>
              <div onClick={()=>{
              }} className="TODO-card__menu">
                <span
                  onClick={(prop) => {
                    prop.stopPropagation();
                    setSelectedTODO(e)
                    setShowMenu(i);
                  }}
                  class="material-icons-outlined"
                >
                  menu
                </span>
              </div>
              <div className="TODO-card__title">
                <div>{e.title}</div>
              </div>
              <div className="TODO-card__description">{e.description}</div>
            </>
          )}

          {showMenu === i && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              className="menu-wrapper"
            >
              <div className="menu">
                <header className="header-wrapper">
                  <button onClick={() => setShowMenu(false)}>
                    <span className="material-icons-outlined">arrow_back</span>
                  </button>
                </header>
                <ul className="menu-body">
                  <li>INBOX</li>
                  <li>CALENDAR</li>
                  <li>TICKLER FILE</li>
                  <li onClick={()=>setOnShowTodoModal("ACTIONABLE LIST")}>ACTIONABLE</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    })
    .reverse();

  return (
    <div
      onClick={() => {
        setShowMenu(false);
        console.log("cliked");
      }}
      className="dumper-wrapper"
    >
      <div className="grid-container">
        {todos}
        <div className="add-button">
          <div className="button-wrapper">
            <button
              onClick={() => setShowEditor(true)}
              className="dumper-add-button"
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
      {onShowTodoModal && <TodoModal/>}
      {showEditor && <DumperEventModal setShowEditor={setShowEditor} />}
    </div>
  );
};
