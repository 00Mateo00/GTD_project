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
      {showMenu !== i && (
        <>
          <div onClick={() => {}} className="card__header">
            <button className="actionable-card__button">
              <span
                onClick={(prop) => {
                  setEventType("Actionables")
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
