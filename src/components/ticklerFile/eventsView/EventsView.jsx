import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./eventsView.scss";

export const EventsView = () => {
  const {
    monthIndex,
    setMonthIndex,
    setDaySelected,
    daySelected,
    setShowDayView,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    setOnShowModal
  } = useContext(GlobalContext);


  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredTicklerFileEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredTicklerFileEvents, daySelected]);

  function handlePrev() {
    setDaySelected(dayjs(daySelected).subtract(1, "day"))
  }

  function handleNext() {
    setDaySelected(dayjs(daySelected).add(1, "day"))
  }


  return (
    <div onClick={() => setShowDayView(false)} className="eventsView-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="eventsView">
        <header className="form__header">
          <span className="material-icons-outlined">drag_handle</span>
          <div className="navigation-arrows">
            <div className="navigation-arrows__container">
              <button onClick={handlePrev}>
                <span className="arrow material-icons-outlined">chevron_left</span>
              </button>

              <div className="">
                {dayjs(daySelected).format( "DD")}
              </div>

              <button onClick={handleNext}>
                <span className="arrow material-icons-outlined">chevron_right</span>
              </button>
            </div>
            <h2>
              {daySelected.format( "MMMM YYYY")}
            </h2>
            </div>
          <div>
            <button onClick={() => setShowDayView(false)}>
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
        </header>
        <div className="eventsView_body">
          {dayEvents.map((e, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setSelectedTicklerFileEvent(e);
                  setOnShowModal(true);
                }}
                className={`${e.label} Tickler-day-event`}
              >
                <div className="times">
                  <div>
                    <p>{e.title}</p>
                  </div>
                </div>
                <div className="info">
                  <p>{e.description}</p>
                </div>
              </div>
            );
          })}
          <div className="addButton-wrapper"><button onClick={()=> setOnShowModal(true)}><span className="material-icons-outlined">add</span></button></div>
        </div>
      </div>
    </div>
  );
};
