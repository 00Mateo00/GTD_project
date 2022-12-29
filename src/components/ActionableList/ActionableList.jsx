import dayjs from "dayjs";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
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

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [subTasks, setSubTasks] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onEditAction, setOnEditAction] = useState(false);

  useEffect(() => {
    if (title && titleRef.current) titleRef.current.focus();
    if (description && descriptionRef.current) descriptionRef.current.focus();
    if (subTasks && actionRef) actionRef.current.focus();
  }, [title, description, subTasks, titleRef, descriptionRef, actionRef,onEditAction]);

  function clear() {
    setOnEdit(false);
    setTitle(false);
    setDescription(false);
    setOnEditAction(false);
    setSubTasks(false);
  }

  const tomorrow = dayjs(dayjs().format("YYYY-MM-DD")).add(1, "day").valueOf();
  const today = dayjs(dayjs().format("YYYY-MM-DD")).valueOf();

  function whichDate(e) {
    if (!e.day) return "";
    if (e.day === tomorrow) return "scheduled";
    return "missed";
  }

  function handleSubmit(e) {
    const EVENT = {
      title: title ? title : e.title,
      description: description ? description : e.description,
      label: e.label,
      id: e.id,
      origin: e.origin,
      checked: e.checked,
      day: e.day,
      time: e.time,
      subtasks: subTasks? subTasks : e.subtasks,
    };

    dispatchCallActionableTODO({
      type: type.update,
      payload: EVENT,
    });

    clear();
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

  const cardDisplay = (e, i) => (
    <>
      <div
        className="card__header"
      >
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
        {onEdit === i ? (
          <>
            <div
              className="editOptions-wrapper"
              onClick={(prop) => prop.stopPropagation()}
            >
              <span
                className="Option_save material-symbols-outlined"
                onClick={() => handleSubmit(e)}
              >
                done
              </span>
              <span
                className="Option_close material-symbols-outlined"
                onClick={clear}
              >
                close
              </span>
            </div>
          </>
        ) : (
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleChecked(e, dispatchCallActionableTODO);
            }}
            className="TODO-card__check"
          >
            <span className="material-symbols-outlined">
              {e.checked === 0 ? "check_box_outline_blank" : "select_check_box"}
            </span>
          </button>
        )}
      </div>
      <div className="card__title">
        {title && onEdit === i ? (
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(prop) => prop.stopPropagation()}
          ></input>
        ) : (
          <div
            onClick={(prop) => {
              clear();
              prop.stopPropagation();
              setOnEdit(i);
              setTitle(e.title);
            }}
          >
            {e.title}
          </div>
        )}
      </div>
      <div className="card__description actionables__description">
        {description && onEdit === i ? (
          <input
            ref={descriptionRef}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(prop) => prop.stopPropagation()}
          ></input>
        ) : (
          <div
            onClick={(prop) => {
              clear();
              prop.stopPropagation();
              setOnEdit(i);
              setDescription(e.description);
            }}
          >
            {e.description}
          </div>
        )}
      </div>
      <div className="actions-wrapper">
        <h4>ACTIONS:</h4>
        <div
          className="actions"
        >
          {e.subtasks
            .sort((a, b) => a.id - b.id)
            .sort((a, b) => a.checked - b.checked)
            .map((el, j) => (
              <div className="action-wrapper" key={j} onClick={(prop)=>{
                prop.stopPropagation()
                setSubTasks(e.subtasks);
                setOnEdit(i);
              }}>
                <button
                  onClick={(prop) => {
                    prop.stopPropagation();
                    handleChecked(e, dispatchCallActionableTODO, j);
                  }}
                >
                  <span
                    className={
                      "actionsCheck material-symbols-outlined" +
                      ` ${el.checked === 1 ? "checked" : "unchecked"}`
                    }
                  >
                    {el.checked === 1 ? "check_box" : "check_box_outline_blank"}
                  </span>
                </button>
                <div>
                  {onEditAction === j && onEdit === i ? (
                    <input
                      ref={actionRef}
                      type="text"
                      value={subTasks[j].action}
                      onChange={(event) =>
                        setSubTasks(
                          subTasks.map((el, indx) =>
                            indx === j
                              ? {
                                  action: event.target.value,
                                  checked: el.checked,
                                  id: el.id,
                                }
                              : el
                          )
                        )
                      }
                      onClick={(prop) => prop.stopPropagation()}
                    />
                  ) : (
                    <div
                      className={`${el.checked === 1 ? "done" : "due"}`}
                      onClick={() => {
                        setOnEditAction(j);
                      }}
                    >
                      {el.action}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );

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
          <span className="scheduled__span material-symbols-outlined">
            schedule
          </span>
        )}
        {showMenu !== i && cardDisplay(e, i)}

        {showMenu === i && cardMenuDisplay}
      </div>
    ));

  return (
    <div
      onClick={() => {
        setShowMenu(false);
        clear();
      }}
      className="wrapper"
    >
      <div className="scroll-wrapper">
        <div className="grid-container">{AllActionables}</div>
      </div>
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
