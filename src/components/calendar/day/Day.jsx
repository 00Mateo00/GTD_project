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
    filteredCalendarEvents,
    setSelectedCalendarEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredCalendarEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    events.sort((a, b) => {
      const first = parseInt(a.time.timeStart.replace(":", ""));
      const second = parseInt(b.time.timeStart.replace(":", ""));
      return first - second;
    });

    setDayEvents(events);
  }, [filteredCalendarEvents, day]);

  function getCurrentDayClassName() {
    // returns a class name if the {day} of this components matches the current date
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current-day"
      : "";
  }

  function handleClick(day) {
    setDaySelected(day);
    setOnShowModal("/Calendar");
  }

  const events = dayEvents.map(
    (e, i) =>
      i < 3 && (
        <div
          key={i}
          onClick={() => {
            setSelectedCalendarEvent(e);
          }}
          className={`${e.label} day-event`}
        >
          <span>{e.time.timeStart}</span> <span>{e.title}</span>
        </div>
      )
  );

  return (
    <div onClick={() => {
      console.log(day)
      handleClick(day)
    }} className="day-wrapper">
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
          {events.length < 4 ? (
            events
          ) : (
            <>
              {events}
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
