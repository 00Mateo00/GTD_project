import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Day } from "./day/Day";
import EventModal from "./eventModal/EventModal";
import { EventsView } from "./eventsView/EventsView";
import utils from "../../utils/utils";
import "./ticklerFile.scss";
import dayjs from "dayjs";

export const TicklerFile = () => {
  const [currentMonth, setCurrentMonth] = useState(utils.getTicklerMonth());
  const [monthSelected, setMonthSelected] = useState(false);
  const [thisMonth, setThisMonth] = useState(false);
  const { monthIndex, setMonthIndex, showEventModal, showDayView } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(utils.getTicklerMonth(monthIndex));
    setThisMonth(
      dayjs().format("YYYY") === dayjs().month(monthIndex).format("YYYY")
    );
  }, [monthIndex]);

  function handleMonthIndex(i) {
    const year =
      dayjs().format("YYYY") - dayjs().month(monthIndex).format("YYYY");
    setMonthIndex(i - 12 * year);
  }

  return (
    <div className="ticklerFile_wrapper">
      {showDayView && <EventsView />}
      {showEventModal && <EventModal />}
      <div className="ticklerFile__body-wrapper">
        <div className="ticklerFile_months-wrapper">
          {Array(12)
            .fill(null)
            .map((e, i) => (
              <div
                key={i}
                onClick={() => setMonthSelected(i)}
                className={
                  `month month-${i}` +
                  `${thisMonth && dayjs().month() === i ? " thisMonth" : ""}` +
                  `${monthSelected === i ? " monthSelected" : ""}`
                }
              >
                <button onClick={() => handleMonthIndex(i)}>
                  {dayjs().month(i).format("MMMM")}
                </button>
              </div>
            ))}
        </div>
        <div className="ticklerFile_days-wrapper">
          {currentMonth.map((day, i) => (
            <Day day={day} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
