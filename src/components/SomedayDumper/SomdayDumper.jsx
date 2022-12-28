import React from "react";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";

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

  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  function handleEdit() {}

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
      </div>
      <div
        className="card__title"
        onClick={() => {
          setOnEdit(i);
          setTitle(e.title);
        }}
      >
        {title && onEdit === i ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        ) : (
          <div>{e.title}</div>
        )}
      </div>
      <div
        className="card__description"
        onClick={() => {
          setOnEdit(i);
          setDescription(e.description);
        }}
      >
        {description && onEdit === i ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        ) : (
          <div>{e.description}</div>
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
        onClick={() => {
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
