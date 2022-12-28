import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";
import "./inbox.scss";
import { useEffect } from "react";
import { useState } from "react";
import { DayView } from "../calendar/dayView/DayView";
import { useRef } from "react";

export const Inbox = () => {
  const {
    ModalParams,
    onShowModal,
    setOnShowModal,
    handleChecked,
    showMenu,
    setShowMenu,

    selectedCalendarEvent,
    setSelectedCalendarEvent,
    dispatchCallCalendarEvent,

    filteredTicklerFileEvents,
    selectedTicklerFileEvent,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,

    filteredActionableTODOS,
    selectedActionableTODO,
    setSelectedActionableTODO,
    dispatchCallActionableTODO,
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

  const [ticklerEventsForToday, setTicklerEventsForToday] = useState([]);
  const [actionablesEventsForToday, setActionablesEventsForToday] = useState(
    []
  );
  
  const [eventType, setEventType] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    ref.current.addEventListener("wheel", handleWheel, { passive: false });
  }, []);

  function handleWheel(e) {
    e.preventDefault();
    if (e.deltaY === 0) return;

    ref.current.scrollTo({
      left: ref.current.scrollLeft + e.deltaY,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const events = filteredTicklerFileEvents
      .filter(
        (e) => dayjs(e.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      )
      .sort((a, b) => b.id - a.id)
      .sort((a, b) => a.checked - b.checked);
    setTicklerEventsForToday(events);
  }, [filteredTicklerFileEvents]);

  useEffect(() => {
    const events = filteredActionableTODOS
      .filter(
        (e) => dayjs(e.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      )
      .sort((a, b) => b.id - a.id)
      .sort((a, b) => a.checked - b.checked);
    setActionablesEventsForToday(events);
  }, [filteredActionableTODOS]);

  const TicklerEvents = ticklerEventsForToday.map((e, i) => (
    <div
      key={i}
      onClick={() => {
        setSelectedTicklerFileEvent(e);
        setOnShowModal({ type: type.update, from: to.Tickler, to: to.Tickler });
      }}
      className={`${e.label} day-event`}
    >
      <span>{e.title}</span>
      <button
        onClick={(event) => {
          event.stopPropagation();
          handleChecked(e, dispatchCallTicklerFileEvent);
        }}
        className="tickler-event__check"
      >
        <span className="material-symbols-outlined">
          {e.checked === 0 ? "check_box_outline_blank" : "select_check_box"}
        </span>
      </button>
    </div>
  ));

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
          onClick={(prop) => {
            setSubTasks(false)
            prop.stopPropagation();
            setSubTasks(e.subtasks);
            setOnEdit(i);
          }}
        >
          {e.subtasks
            .sort((a, b) => a.id - b.id)
            .sort((a, b) => a.checked - b.checked)
            .map((el, j) => (
              <div className="action-wrapper" key={j}>
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


  const ActionableEvents = actionablesEventsForToday.map((e, i) => (
    <div
      onClick={() => {
        setSelectedActionableTODO(e);
        setOnShowModal({
          type: type.update,
          from: to.Actionables,
          to: to.Inbox,
        });
      }}
      className={"card" + ` ${e.label}`}
      key={i}
    >
      {showMenu !== i &&  cardDisplay(e, i)}

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
              <li
                onClick={() =>
                  setOnShowModal({
                    type: type.update,
                    from: to.Inbox,
                    to: to.Inbox,
                  })
                }
              >
                Acionables
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  ));



  return (
    <div className="inbox-wrapper">
      <div
        className="inbox-Tickler"
        ref={ref}
        onClick={() => setEventType("Tickler")}
      >
        {TicklerEvents}
      </div>
      <div className="grid-inbox">
        <div
          className="calendar-dayView"
          onClick={() => setEventType("Calendar")}
        >
          <DayView />
        </div>
        <div
          className="grid-container"
          onClick={() => setEventType("Actionables")}
        >
          {ActionableEvents}
        </div>
      </div>
      {onShowModal && (
        <MenuModal
          selected={
            (eventType === "Actionables" && selectedActionableTODO) ||
            (eventType === "Tickler" && selectedTicklerFileEvent) ||
            (eventType === "Calendar" && selectedCalendarEvent)
          }
          setSelected={
            (eventType === "Actionables" && setSelectedActionableTODO) ||
            (eventType === "Tickler" && setSelectedTicklerFileEvent) ||
            (eventType === "Calendar" && setSelectedCalendarEvent)
          }
          dispatchCall={
            (eventType === "Actionables" && dispatchCallActionableTODO) ||
            (eventType === "Tickler" && dispatchCallTicklerFileEvent) ||
            (eventType === "Calendar" && dispatchCallCalendarEvent)
          }
        />
      )}
    </div>
  );
};
