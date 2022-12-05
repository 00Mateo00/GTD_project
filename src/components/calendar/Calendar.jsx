import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { DayView } from "./dayView/DayView";
import utils from "../../utils/utils";
import "./calendar.scss";
import { MenuModal } from "../modals/MenuModal";
import { Day
 } from "./day/Day";
export const Calendar = () => {
  const {
    monthIndex,
    onShowModal,
    showDayView,
    selectedCalendarEvent,
    setSelectedCalendarEvent,
    dispatchCallCalendarEvent,
  } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(utils.getCalendarMonth());
  useEffect(() => {
    setCurrentMonth(utils.getCalendarMonth(monthIndex));
  }, [monthIndex]);

  let numberOfRow = 0;
  const monthTable = currentMonth.map((row, i) => {
    numberOfRow++;
    return (
      <div className="month-table-wrapper flex-1 grid  grid-cols-7" key={i}>
        {row.map((day, idx) => (
          <Day day={day} key={idx} />
        ))}
      </div>
    );
  });

  return (
    <div className="calendar-body__wrapper">
      {showDayView && <DayView />}
      {onShowModal && (
        <MenuModal
          selected={selectedCalendarEvent}
          setSelected={setSelectedCalendarEvent}
          dispatchCall={dispatchCallCalendarEvent}
        />
      )}
      <div className="calendar-body flex flex-col">
        <div className="calendar__div flex flex-1">
          <div className="days-month-wrapper">
            <div className="days-names-wrapper">
              {currentMonth.map((row, i) =>
                row.map(
                  (day, idx) =>
                    i === 1 && (
                      <p key={idx} className="days-names">
                        {day.format("ddd").toUpperCase()}
                      </p>
                    )
                )
              )}
            </div>
            <div
              className={`flex-1 grid  grid-rows-${numberOfRow} month-wrapper`}
            >
              {monthTable}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
