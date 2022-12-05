import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./somedayDumper.scss";
import { MenuModal } from "../modals/MenuModal";

export const SomdayDumper = () => {
  const {
    filteredDumperTODOS,
    selectedDumperTODO,
    setSelectedDumperTODO,
    dispatchCallDumperTODO,
    onShowModal,
    setOnShowModal,
    showMenu,
    setShowMenu,
    handleChecked,
  } = useContext(GlobalContext);


  const todos = filteredDumperTODOS.sort((a, b) =>  b.id-a.id).map((e, i) => (
    <div
      onClick={() => {
        setSelectedDumperTODO(e);
        setOnShowModal("/Someday-Dumper");
      }}
      className={`TODO-card`+` ${e.label}`} 
      key={i}
    >
      {showMenu !== i && (
        <>
          <div onClick={() => {}} className="TODO-card__header">
            <button
              onClick={(prop) => {
                prop.stopPropagation();
                setSelectedDumperTODO(e);
                setShowMenu(i);
              }}
              className="TODO-card__menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleChecked(e, dispatchCallDumperTODO);
              }}
              className="TODO-card__check"
            >
              <span className="material-symbols-outlined">
                {e.checked === 0
                  ? "check_box_outline_blank"
                  : "select_check_box"}
              </span>
            </button>
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
                <span className="material-symbols-outlined">
                  arrow_back
                </span>
              </button>
            </header>
            <ul className="menu-body">
              <li onClick={() => setOnShowModal("/inbox")}>INBOX</li>
              <li onClick={() => setOnShowModal("/Calendar")}>CALENDAR</li>
              <li onClick={() => setOnShowModal("/Tickler-File")}>
                TICKLER FILE
              </li>
              <li onClick={() => setOnShowModal("/Actionable-List")}>
                ACTIONABLE
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  ))

  return (
    <div
      onClick={() => {
        setShowMenu(false);
      }}
      className="dumper-wrapper"
    >
      <div className="grid-container-wrapper">
        {todos}
        <div className="add-button">
          <div className="button-wrapper">
            <button
              onClick={() => {
                setOnShowModal("/Someday-Dumper");
              }}
              className="dumper-add-button"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
      {onShowModal && (
        <MenuModal
          selected={selectedDumperTODO}
          setSelected={setSelectedDumperTODO}
          dispatchCall={dispatchCallDumperTODO}
        />
      )}
    </div>
  );
};
