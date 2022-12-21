import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./eventsView.scss";

export const EventsView = () => {
  const {
    setDaySelected,
    daySelected,
    setShowDayView,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    setOnShowModal,
    dispatchCallTicklerFileEvent,
    handleChecked,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredTicklerFileEvents
      .filter(
        (e) =>
          dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
      )
      .sort((a, b) => b.id - a.id)
      .sort((a, b) => a.checked - b.checked);
    setDayEvents(events);
  }, [filteredTicklerFileEvents, daySelected]);

  function handlePrev() {
    setDaySelected(dayjs(daySelected).subtract(1, "day"));
  }

  function handleNext() {
    setDaySelected(dayjs(daySelected).add(1, "day"));
  }

  return (
    <div onClick={() => setShowDayView(false)} className="eventsView-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="eventsView">
        <header className="form__header">
          <span className="material-symbols-outlined">drag_handle</span>
          <div className="navigation-arrows">
            <div className="navigation-arrows__container">
              <button onClick={handlePrev}>
                <span className="arrow material-symbols-outlined">
                  chevron_left
                </span>
              </button>

              <div className="">{dayjs(daySelected).format("DD")}</div>

              <button onClick={handleNext}>
                <span className="arrow material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            </div>
            <h2>{daySelected.format("MMMM YYYY")}</h2>
          </div>
          <div>
            <button onClick={() => setShowDayView(false)}>
              <span className="material-symbols-outlined">close</span>
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
                  setOnShowModal("/Tickler-File");
                }}
                className={`${e.label} card`}
              >
                <div className="card__header">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleChecked(e, dispatchCallTicklerFileEvent);
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
                  <p>{e.title}</p>
                </div>
                <div className="card__description">
                  <p>{e.description}</p>
                </div>
              </div>
            );
          })}
          <div className="addButton-wrapper">
            <button onClick={() => setOnShowModal("/Tickler-File")}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
