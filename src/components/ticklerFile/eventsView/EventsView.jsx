import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./eventsView.scss";

export const EventsView = () => {
  const {
    daySelected,
    setShowDayView,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    setShowEventModal
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredTicklerFileEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredTicklerFileEvents, daySelected]);


  return (
    <div onClick={() => setShowDayView(false)} className="eventsView-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="eventsView">
        <header className="form__header">
          <span className="material-icons-outlined">drag_handle</span>
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
                  setShowEventModal(true);
                }}
                className={`${e.label} day-event`}
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
          <div className="addButton-wrapper"><button onClick={()=> setShowEventModal(true)}><span className="material-icons-outlined">add</span></button></div>
        </div>
      </div>
    </div>
  );
};
