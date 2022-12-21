import React, { useContext, useEffect, useState, useRef } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./dayView.scss";
import { MenuModal } from "../../modals/MenuModal";

export const DayView = () => {
  const {
    onShowModal,
    selectedCalendarEvent,
    setSelectedCalendarEvent,
    dispatchCallCalendarEvent,
    daySelected,
    setOnShowModal,
    filteredCalendarEvents,
  } = useContext(GlobalContext);

  let intervalID = null;

  function setTime() {
    setHoursPointer(dayjs().hour() * 60);
    setMinutesPointer(dayjs().minute());
  }

  // this whole function make sure that the line will move every time the minute changes
  function onFocus() {
    ref.current?.scrollIntoView({ behavior: "smooth" }); // this focus the line when onFocus
    setTime();
    setTimeout(() => {
      setTime();
      intervalID = setInterval(setTime, 60000);
    }, (60 - parseInt(dayjs().format("ss"))) * 1000);
  }

  function onBlur() {
    clearInterval(intervalID);
  }

  //detect changes on tab focus
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    onFocus();
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const ref = useRef(null);

  const [dayEvents, setDayEvents] = useState([]);

  const [hoursPointer, setHoursPointer] = useState(dayjs().hour() * 60);
  const [minutesPointer, setMinutesPointer] = useState(dayjs().minute());
  const [hourClicked, setHourClicked] = useState(0);

  useEffect(() => {
    const events = filteredCalendarEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredCalendarEvents, daySelected]);

  const hoursArray = [...Array(24).keys()];

  const styles = {
    gridRowStart: hoursPointer + minutesPointer,
  };

  function position(time) {
    const tempHour = parseInt(time.split(":")[0]) * 4;
    const tempMinute = parseInt(time.split(":")[1]) / 15;
    return (
      tempHour +
      (tempMinute - Math.floor(tempMinute) - 0.5 > 0
        ? Math.floor(tempMinute) + 2
        : Math.floor(tempMinute) + 1)
    );
  }

  return (
    <>
      {onShowModal && (
        <MenuModal
          selected={selectedCalendarEvent}
          setSelected={setSelectedCalendarEvent}
          dispatchCall={dispatchCallCalendarEvent}
          hourClicked={hourClicked}
        />
      )}
      <div className="times-wrapper">
        <div className="aside-hours-wrapper">
          <div className="aside-hours hours-grid">
            {hoursArray.map((e, i) => i < 23 && <div key={i}>{i + 1}</div>)}
          </div>
        </div>
        <div className="time-table hours-grid">
          {hoursArray.map((e, i) => (
            <div
              onClick={() => {
                setHourClicked(i);
                setOnShowModal("/Calendar");
              }}
              className={`hour-block number-${i}`}
              key={i}
            ></div>
          ))}
          <div className="time-line-wrapper on-top-displays">
            <div className="line line-pointer" style={styles} ref={ref}></div>
          </div>
          <div className="events-wrapper on-top-displays">
            {dayEvents.map((e, i) => {
              const styles = {
                gridRowStart: position(e.time.timeStart),
                gridRowEnd: position(e.time.timeEnd),
              };
              return (
                <div
                  style={styles}
                  key={i}
                  onClick={() => {
                    setSelectedCalendarEvent(e);
                    setOnShowModal("/Calendar");
                  }}
                  className={`${e.label} day-event`}
                >
                  <div className="info">
                    <div>
                      <h3>{e.title}</h3>
                    </div>
                    <div>
                      <p>{e.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
