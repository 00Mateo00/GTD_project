import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";
import "./inbox.scss";
import { useEffect } from "react";
import { useState } from "react";
import { DayView } from "../calendar/dayView/DayView";

export const Inbox = () => {
  const [dayEvents, setDayEvents] = useState([]);
  const [eventType, setEventType] = useState(false);

  const {
    onShowModal,
    setOnShowModal,
    handleChecked,
    showMenu,
    setShowMenu,

    filteredInboxEvents,
    selectedInboxEvent,
    setSelectedInboxEvent,
    dispatchCallInboxEvent,

    selectedCalendarEvent,
    setSelectedCalendarEvent,
    dispatchCallCalendarEvent,

    filteredTicklerFileEvents,
    selectedTicklerFileEvent,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredTicklerFileEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredTicklerFileEvents]);

  const TicklerEvents = dayEvents
    .sort((a, b) => a.id - b.id)
    .map((e, i) => (
      <div
        key={i}
        onClick={() => {
          setSelectedTicklerFileEvent(e);
          setOnShowModal("/Tickler-File");
        }}
        className={`${e.label} tickler-day-event`}
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

  const InobxTodos = filteredInboxEvents
    .sort((a, b) => b.id - a.id)
    .map((e, i) => (
      <div
        onClick={() => {
          setSelectedInboxEvent(e);
          setOnShowModal("/Inbox");
        }}
        className={`TODO-card` + ` ${e.label}`}
        key={i}
      >
        {showMenu !== i && (
          <>
            <div onClick={() => {}} className="TODO-card__header">
              <button
                onClick={(prop) => {
                  prop.stopPropagation();
                  setSelectedInboxEvent(e);
                  setShowMenu(i);
                }}
                className="TODO-card__menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleChecked(e, dispatchCallInboxEvent);
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
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </header>
              <ul className="menu-body">
                <li onClick={() => setOnShowModal("/Calendar")}>CALENDAR</li>
                <li onClick={() => setOnShowModal("/Tickler-File")}>
                  TICKLER FILE
                </li>
                <li onClick={() => setOnShowModal("/Actionable-List")}>
                  ACTIONABLE
                </li>
                <li onClick={() => setOnShowModal("/Someday-Dumper")}>
                  SOMEDAY / DUMPER
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    ));

  return (
    <div className="inbox-wrapper">
      {onShowModal && (
        <MenuModal
          selected={
            (eventType === "Inbox" && selectedInboxEvent) ||
            (eventType === "Tickler" && selectedTicklerFileEvent) ||
            (eventType === "Calendar" && selectedCalendarEvent)
          }
          setSelected={
            (eventType === "Inbox" && setSelectedInboxEvent) ||
            (eventType === "Tickler" && setSelectedTicklerFileEvent) ||
            (eventType === "Calendar" && setSelectedCalendarEvent)
          }
          dispatchCall={
            (eventType === "Inbox" && dispatchCallInboxEvent) ||
            (eventType === "Tickler" && dispatchCallTicklerFileEvent) ||
            (eventType === "Calendar" && dispatchCallCalendarEvent)
          }
        />
      )}
      <div className="inbox-Tickler" onClick={() => setEventType("Tickler")}>
        {TicklerEvents}
      </div>
      <div className="grid-container">
        <div
          className="calendar-dayView"
          onClick={() => setEventType("Calendar")}
        >
          <DayView />
        </div>
        <div
          className="actionables-container"
          onClick={() => setEventType("Inbox")}
        >
          {InobxTodos}
        </div>
      </div>
    </div>
  );
};
