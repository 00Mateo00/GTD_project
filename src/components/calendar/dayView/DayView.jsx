import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./dayView.scss";

export const DayView = () => {
  const {
    daySelected,
    setOnShowModal,
    filteredCalendarEvents,
    setSelectedCalendarEvent,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  const [hoursPointer, setHoursPointer] = useState(dayjs().hour() * 60);
  const [minutesPointer, setMinutesPointer] = useState(dayjs().minute());

  setTimeout(() => {
    setHoursPointer(dayjs().hour() * 60);
    setMinutesPointer(dayjs().minute());
  }, 10000);

  useEffect(() => {
    const events = filteredCalendarEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredCalendarEvents, daySelected]);

  const hours = [...Array(24).keys()];

  const styles = {
    gridRowStart: hoursPointer + minutesPointer,
  };

  function position(time) {
    const tempHour = (parseInt(time.split(":")[0]) * 4);
    const tempMinute = parseInt(time.split(":")[1])/15;
    return tempHour + (((tempMinute - Math.floor(tempMinute)) - 0.5)>0 ? Math.floor(tempMinute)+2 : Math.floor(tempMinute)+1);
    
  }

  return (
    <div className="times-wrapper">
      <div className="aside-hours-wrapper">
        <div className="aside-hours hours-grid">
          {hours.map((e, i) => i < 23 && <div key={i}>{i + 1}</div>)}
        </div>
      </div>
      <div className="time-table hours-grid">
        {hours.map((e, i) => (
          <div className={`hour-block number-${i}`} key={i}></div>
        ))}
        <div
          className="time-line-wrapper on-top-displays"
        >
          <div className="line line-pointer" style={styles}></div>
        </div>
        <div onClick={() => setOnShowModal(true)} className="events-wrapper on-top-displays">
          {dayEvents.map((e, i) => {
            const styles ={
              gridRowStart: position(e.time.timeStart),
              gridRowEnd: position(e.time.timeEnd)
            }
            return (
              <div
                style={styles}
                key={i}
                onClick={() => {
                  setSelectedCalendarEvent(e);
                  setOnShowModal(true);
                }}
                className={`${e.label} day-event`}
              >
                <div className="times">
                  <div>
                    <p>{e.title}</p>
                  </div>
                  <div>{e.time.timeStart}</div>
                </div>
                <div className="info">
                  <p>{e.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
