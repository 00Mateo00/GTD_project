import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";

import "./somdayDumper.scss";

export const SomdayDumper = () => {
  const {
    ModalParams,
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

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (title && titleRef.current) titleRef.current.focus()
    if (description && descriptionRef.current) descriptionRef.current.focus();
  }, [title, description, titleRef, descriptionRef]);

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
      subtasks: e.subtasks,
    };

    dispatchCallDumperTODO({
      type: type.update,
      payload: EVENT,
    });
    clear();
  }

  function clear() {
    setOnEdit(false);
    setTitle(false);
    setDescription(false);
  }

  const cardDisplay = (e, i) => (
    <>
      <div className="card__header">
        <button
          onClick={(prop) => {
            prop.stopPropagation();
            setSelectedDumperTODO(e);
            setShowMenu(i);
          }}
          className="card__menu"
        >
          <span className="material-symbols-outlined">menu</span>
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
              handleChecked(e, dispatchCallDumperTODO);
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
              clear()
              prop.stopPropagation();
              setOnEdit(i);
              setTitle(e.title);
            }}
          >
            {e.title}
          </div>
        )}
      </div>
      <div className="card__description">
        {description && onEdit === i ? (
          <textarea
            ref={descriptionRef}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(prop) => prop.stopPropagation()}
          ></textarea>
        ) : (
          <div
            onClick={(prop) => {
              clear()
              prop.stopPropagation();
              setOnEdit(i);
              setDescription(e.description);
            }}
          >
            {e.description}
          </div>
        )}
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
                type: type.push,
                from: to.Ideas,
                to: to.Actionables,
              })
            }
          >
            ACTIONABLES
          </li>
          <li
            onClick={() =>
              setOnShowModal({
                type: type.push,
                from: to.Ideas,
                to: to.Calendar,
              })
            }
          >
            CALENDAR
          </li>
          <li
            onClick={() =>
              setOnShowModal({
                type: type.push,
                from: to.Ideas,
                to: to.Tickler,
              })
            }
          >
            TICKLER FILE
          </li>
        </ul>
      </div>
    </div>
  );

  const { type, to } = ModalParams;

  const todos = filteredDumperTODOS
    .sort((a, b) => b.id - a.id)
    .sort((a, b) => a.checked - b.checked)
    .map((e, i) => (
      <div
        onClick={(prop) => {
          prop.stopPropagation();
          setSelectedDumperTODO(e);
          setOnShowModal({ type: type.update, from: to.Ideas, to: to.Ideas });
        }}
        className={`card` + ` ${e.label}`}
        key={i}
      >
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
      <div className="grid-container">{todos}</div>
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
