import React, { useState, useContext, useEffect } from "react";
import { Month } from "./month/Month";
import GlobalContext from "../../context/GlobalContext";
import { DayView } from "./dayView/DayView";
import utils from "../../utils/utils";
import './calendar.scss';
import { MenuModal } from "../modals/MenuModal";

export const Calendar = () => {
  const { monthIndex, onShowModal, showDayView, selectedCalendarEvent, setSelectedCalendarEvent, dispatchCallCalendarEvent} = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(utils.getCalendarMonth());
    useEffect(() => {
      setCurrentMonth(utils.getCalendarMonth(monthIndex));
    }, [monthIndex]);

  return (
    <div className="calendar-body__wrapper">
      {showDayView && <DayView />}
      {onShowModal && <MenuModal
          selected={selectedCalendarEvent}
          setSelected={setSelectedCalendarEvent}
          dispatchCall={dispatchCallCalendarEvent}
        />}
      <div className="calendar-body flex flex-col">
        <div className="calendar__div flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
};
