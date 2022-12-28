import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";
import "./actionableList.scss";

export const ActionableList = () => {
  const {
    ModalParams,
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

  const { type, to } = ModalParams;

  const tomorrow = dayjs(dayjs().format("YYYY-MM-DD")).add(1, "day").valueOf();
  const today = dayjs(dayjs().format("YYYY-MM-DD")).valueOf();

  function whichDate(e) {
    if (!e.day) return "";
    if (e.day === tomorrow) return "scheduled";
    return "missed";
  }

  //sorts the array into 2 groups, order them and joins them into 1 array then returns it
  function sortCards(array) {
    const temp = array.filter((e) => e.day !== today); // scheduled for today won't pass

    const nonScheduled = temp
      .filter((e) => e.day === false) // filters the falses
      .sort((a, b) => b.id - a.id); // sorts them by time of creation

    const Scheduled = temp
      .filter((e) => e.day !== false) // filters the non-false
      .sort((a, b) => b.day - a.day); // sorts them by scheduled date (tomorrow,yesterday)

    const tempFlat = nonScheduled.concat(Scheduled); //joins them into 1 array

    return tempFlat;
  }

  const cardDisplay = (e, i) => {
    return (
      <>
        <div onClick={() => {}} className="card__header">
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
              {e.checked === 0 ? "check_box_outline_blank" : "select_check_box"}
            </span>
          </button>
        </div>
        <div className="card__title">
          <div>{e.title}</div>
        </div>
        <div className="card__description actionables__description">
          <p>{e.description}</p>
        </div>
        <div className="actions-wrapper">
          <h4>ACTIONS:</h4>
          <div className="actions">
            {e.subtasks
              .sort((a, b) => a.id - b.id)
              .sort((a, b) => a.checked - b.checked)
              .map((el, i) => (
                <button
                  onClick={(prop) => {
                    prop.stopPropagation();
                    handleChecked(e, dispatchCallActionableTODO, i);
                  }}
                  key={i}
                >
                  <p className={`${el.checked === 1 ? "done" : "due"}`}>
                    - {el.action}
                  </p>
                </button>
              ))}
          </div>
        </div>
      </>
    );
  };

  const cardMenuDisplay = (
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
          <li
            onClick={() =>
              setOnShowModal({
                type: type.update,
                from: to.Actionables,
                to: to.Inbox,
              })
            }
          >
            INBOX
          </li>
          <li
            onClick={() =>
              setOnShowModal({
                type: type.push,
                from: to.Actionables,
                to: to.Ideas,
              })
            }
          >
            DUMPER
          </li>
        </ul>
      </div>
    </div>
  );

  //

  const AllActionables = sortCards(filteredActionableTODOS)
    .sort((a, b) => a.checked - b.checked)
    .map((e, i) => (
      <div
        onClick={() => {
          setSelectedActionableTODO(e);
          setOnShowModal({
            type: type.update,
            from: to.Actionables,
            to: to.Actionables,
          });
        }}
        className={"card" + ` ${e.label}` + ` ${whichDate(e)}`}
        key={i}
      >
        {whichDate(e) === "scheduled" && (
          <span className="scheduled__span material-symbols-outlined">schedule</span>
        )}
        {showMenu !== i && cardDisplay(e, i)}

        {showMenu === i && cardMenuDisplay}
      </div>
    ));

  return (
    <div
      onClick={() => {
        setShowMenu(false);
      }}
      className="wrapper"
    >
      <div className="grid-container">{AllActionables}</div>
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
