import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./day.scss";
import GlobalContext from "../../../context/GlobalContext";

export const Day = ({ day }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setOnShowModal,
    setShowDayView,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,
    handleChecked
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredTicklerFileEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredTicklerFileEvents, day]);

  function getCurrentDayClassName() {
    // returns a class name if the {day} of this components matches the current date
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current-day"
      : "";
  }

  function handleClick(day) {
    setDaySelected(day);
    setOnShowModal("/Tickler-File");
  }

  const events = dayEvents.sort((a,b)=> a.id - b.id).map(
    (e, i) =>
      i < 3 && (
        <div
          key={i}
          onClick={() => {
            setSelectedTicklerFileEvent(e);
          }}
          className={`${e.label} tickler-day-event`}
        >
          <span>{e.title}</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleChecked(e,dispatchCallTicklerFileEvent);
            }}
            className="tickler-event__check"
          >
            <span className="material-symbols-outlined">
              {e.checked === 0? "check_box_outline_blank" : "select_check_box"}
            </span>
          </button>
        </div>
      )
  );

  return (
    <div onClick={() => handleClick(day)} className="tickler-day-wrapper">
      <header className="day-wrapper__header">
        <p
          onClick={(e) => {
            e.stopPropagation();
            setDaySelected(day);
            setShowDayView(true);
          }}
          className={`days-numbers ${getCurrentDayClassName()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="dayEvents-wrapper">
        {events}
        {events.length > 3 && (
          <>
            <div
              className="more"
              onClick={(e) => {
                e.stopPropagation();
                setDaySelected(day);
                setShowDayView(true);
              }}
            >
              ...
            </div>
          </>
        )}
      </div>
    </div>
  );
};
