import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Day } from "./day/Day";
import { MenuModal } from "../modals/MenuModal";
import { EventsView } from "./eventsView/EventsView";
import utils from "../../utils/utils";
import "./ticklerFile.scss";
import dayjs from "dayjs";

export const TicklerFile = () => {
  const [currentMonth, setCurrentMonth] = useState(utils.getTicklerMonth());
  const [monthSelected, setMonthSelected] = useState(false);
  const [thisMonth, setThisMonth] = useState(false);

  const {
    monthIndex,
    setMonthIndex,
    onShowModal,
    showDayView,
    selectedTicklerFileEvent,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,
  } = useContext(GlobalContext);

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
      {showDayView && <EventsView />}
      {onShowModal && (
        <MenuModal
          selected={selectedTicklerFileEvent}
          setSelected={setSelectedTicklerFileEvent}
          dispatchCall={dispatchCallTicklerFileEvent}
        />
      )}
    </div>
  );
};
