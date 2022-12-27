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

  const {type,to} = ModalParams;

  const [ticklerEventsForToday, setTicklerEventsForToday] = useState([]);
  const [actionablesEventsForToday, setActionablesEventsForToday] = useState([])
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
        setOnShowModal({type:type.update, from:to.Tickler, to: to.Tickler});
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
      key={i}
      onClick={() => {
        setSelectedTicklerFileEvent(e);
        setOnShowModal({type:type.update, from:to.Actionables, to: to.Actionables});
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

  return (
    <div className="inbox-wrapper">
      {onShowModal && (
        <MenuModal
          selected={
            (eventType === "Tickler" && selectedTicklerFileEvent) ||
            (eventType === "Calendar" && selectedCalendarEvent)
          }
          setSelected={
            (eventType === "Tickler" && setSelectedTicklerFileEvent) ||
            (eventType === "Calendar" && setSelectedCalendarEvent)
          }
          dispatchCall={
            (eventType === "Tickler" && dispatchCallTicklerFileEvent) ||
            (eventType === "Calendar" && dispatchCallCalendarEvent)
          }
        />
      )}
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
        <div className="grid-container" onClick={() => setEventType("Inbox")}>
          
        </div>
      </div>
    </div>
  );
};


