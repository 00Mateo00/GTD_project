import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";
import "./actionableList.scss";

export const ActionableList = () => {
  const {
    filteredActionableTODOS,
    onShowModal,
    setOnShowModal,
    showMenu,
    setShowMenu,
    selectedActionableTODO,
    setSelectedActionableTODO,
    dispatchCallActionableTODO,
    handleChecked,
  } = useContext(GlobalContext);

  const AllActionables = filteredActionableTODOS
    .sort((a, b) => b.id - a.id)
    .map((e, i) => (
      <div
        onClick={() => {
          setSelectedActionableTODO(e);
          setOnShowModal("/Actionable-List");
        }}
        className={"actionable-card" + ` ${e.label}`}
        key={i}
      >
        {showMenu !== i && (
          <>
            <div onClick={() => {}} className="actionable-card__menu">
              <button className="actionable-card__button">
                <span
                  onClick={(prop) => {
                    prop.stopPropagation();
                    setSelectedActionableTODO(e);
                    setShowMenu(i);
                  }}
                  className="material-symbols-outlined"
                >
                  menu
                </span>
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleChecked(e, dispatchCallActionableTODO);
                }}
                className="actionable-card__check"
              >
                <span className="material-symbols-outlined">
                  {e.checked === 0
                    ? "check_box_outline_blank"
                    : "select_check_box"}
                </span>
              </button>
            </div>
            <div className="actionable-card__title">
              <div>{e.title}</div>
            </div>
            <div className="actions-wrapper">
              <h3>ACTIONS:</h3>
              <div className="actions">
                {e.subtasks.map((el, i) => (
                  <button
                    onClick={(prop) => {
                      prop.stopPropagation();
                      handleChecked(e,dispatchCallActionableTODO,i)
                    }}
                    key={i}
                  >
                    <p className={`${el.checked===1?"done":"due"}`}>- {el.action}</p>
                  </button>
                ))}
              </div>
            </div>
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
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </header>
              <ul className="menu-body">
                <li onClick={() => setOnShowModal("/Inbox")}>INBOX</li>
                <li onClick={() => setOnShowModal("/Calendar")}>CALENDAR</li>
                <li onClick={() => setOnShowModal("/Tickler-File")}>
                  TICKLER FILE
                </li>
                <li onClick={() => setOnShowModal("/Someday-Dumper")}>
                  Dumper
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    ));

  return (
    <div
      onClick={() => {
        setShowMenu(false);
      }}
      className="wrapper"
    >
      <div className="grid-container">
        {AllActionables}
        <div className="add-button">
          <div className="button-wrapper">
            <button
              onClick={() => setOnShowModal("/Actionable-List")}
              className="button"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
      {/* {onShowModal && onShowModal !=="default" && <MenuModal/>} */}
      {onShowModal && (
        <MenuModal
          selected={selectedActionableTODO}
          setSelected={setSelectedActionableTODO}
          dispatchCall={dispatchCallActionableTODO}
        />
      )}
    </div>
  );
};
