import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./day.scss";
import GlobalContext from "../../../context/GlobalContext";
import { Link } from "react-router-dom";

export const Day = ({ day }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    ModalParams,
    setDaySelected,
    setOnShowModal,
    setShowDayView,
    filteredCalendarEvents,
    setSelectedCalendarEvent,
  } = useContext(GlobalContext);

  const {type,to} = ModalParams;
  
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

  const events = dayEvents.map(
    (e, i) =>
      i < 3 && (
        <div
          key={i}
          onClick={(el) => {
            el.stopPropagation()
            setSelectedCalendarEvent(e);
            setOnShowModal({type: type.update, from:to.Calendar, to:to.Calendar});
          }}
          className={`${e.label} day-event`}
        >
        <h3>{e.title}</h3>
        </div>
      )
  );

  return (
    <div onClick={() => {
      setDaySelected(day);
      setOnShowModal({type: type.push, from:to.Calendar, to:to.Calendar});
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
        <Link to="DayView">{day.format("DD")}</Link>
          
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
               <Link to="DayView">...</Link>
                
              </div>
            </>
          )}
        </div>
    </div>
  );
};
