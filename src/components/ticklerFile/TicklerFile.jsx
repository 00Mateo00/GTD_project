import React, { useState, useContext, useEffect } from "react";
import { Month } from "./month/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./eventModal/EventModal";
import { EventsView } from "./eventsView/EventsView";
import utils from "../../utils/utils";
import './ticklerFile.scss';

export const TicklerFile = () => {
    const [currentMonth, setCurrentMonth] = useState(utils.getMonth());
    const { monthIndex, showEventModal, showDayView} = useContext(GlobalContext);
    useEffect(() => {
      setCurrentMonth(utils.getMonth(monthIndex));
    }, [monthIndex]);

  return (
    <div className="ticklerFile_wrapper">
      {showDayView && <EventsView />}
      {showEventModal && <EventModal />}
      <div className="app__body-wrapper flex flex-col">
        <div className="body__div flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
};