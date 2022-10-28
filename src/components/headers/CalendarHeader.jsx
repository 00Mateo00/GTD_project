import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import CalendarLabels from "../calendar/calendarLabels/CalendarLabels";

export const CalendarHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    setOnShowModal,
    showDayView,
    setShowDayView,
    daySelected,
    setDaySelected,
  } = useContext(GlobalContext);

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );

    showDayView && setDaySelected(dayjs())
  }

  function handlePrev() {
    showDayView
      ? setDaySelected(dayjs(daySelected).subtract(1, "day"))
      : setMonthIndex(monthIndex - 1);
  }

  function handleNext() {
    showDayView
      ? setDaySelected(dayjs(daySelected).add(1, "day"))
      : setMonthIndex(monthIndex + 1);
  }
  return (
    <>
      <div className="navigation-arrows">
        <div className="navigation-arrows__container">
          <button onClick={handlePrev}>
            <span className="arrow material-symbols-outlined">chevron_left</span>
          </button>

          <div className="">
            {showDayView && dayjs(daySelected).format("DD")}
          </div>

          <button onClick={handleNext}>
            <span className="arrow material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <h2>
          {showDayView && dayjs(daySelected).format("dddd MMMM YYYY")}
          {!showDayView &&
            dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
    </>
  );
};
