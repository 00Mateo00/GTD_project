import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import CalendarLabels from "../calendar/calendarLabels/CalendarLabels";

export const CalendarHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    setShowEventModal,
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
      <div className="buttons">
        {showDayView && (
          <button
            onClick={() => setShowDayView(false)}
            className={"go-back"}
            alt="go back"
          >
            <span class="material-icons-outlined">arrow_back</span>
          </button>
        )}
        <button
          onClick={handleReset}
          className="header__button shadow-md hover:shadow-2xl"
        >
          Today
        </button>
        <button
          onClick={() => setShowEventModal(true)}
          alt="create_event"
          className="CreateEventButton-button shadow-md hover:shadow-2xl" //tailwind
        >
          <span className="add material-icons-outlined">add</span>
          <span className="create">Create</span>
        </button>
      </div>

      <div className="navigation-arrows">
        <div className="navigation-arrows__container">
          <button onClick={handlePrev}>
            <span className="arrow material-icons-outlined">chevron_left</span>
          </button>

          <div className="">
            {showDayView && dayjs(daySelected).format("DD")}
          </div>

          <button onClick={handleNext}>
            <span className="arrow material-icons-outlined">chevron_right</span>
          </button>
        </div>
        <h2>
          {showDayView && dayjs(daySelected).format("dddd MMMM YYYY")}
          {!showDayView &&
            dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <CalendarLabels />
    </>
  );
};
