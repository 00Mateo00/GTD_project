import React, { useState, useContext, useEffect } from "react";
import { Month } from "./month/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./eventModal/EventModal";
import { DayView } from "./dayView/DayView";
import utils from "../../utils/utils";

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(utils.getMonth());
    const { monthIndex, showEventModal, showDayView} = useContext(GlobalContext);
    useEffect(() => {
      setCurrentMonth(utils.getMonth(monthIndex));
    }, [monthIndex]);

  return (
    <div>
      {showDayView && <DayView />}
      {showEventModal && <EventModal />}
      <div className="app__body-wrapper flex flex-col">
        <div className="body__div flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
};
