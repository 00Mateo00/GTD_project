import React, { useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import "./day.scss";
import GlobalContext from "../../../context/GlobalContext";

export const Day = ({ day }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    setShowDayView,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
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
    setShowEventModal(true);
  }

  const events = dayEvents.map(
    (e, i) =>
      i < 3 && (
        <div
          key={i}
          onClick={() => {
            setSelectedTicklerFileEvent(e);
          }}
          className={`${e.label} day-event`}
        >
          <span>{e.title}</span>
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
