import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import TicklerFileLabels from "../ticklerFile/ticklerFileLabels/TicklerFileLabels";
import { useEffect } from "react";

export const TicklerFileHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    setOnShowModal,
    showDayView,
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
      : setMonthIndex(monthIndex - 12);
  }

  function handleNext() {
    showDayView
      ? setDaySelected(dayjs(daySelected).add(1, "day"))
      : setMonthIndex(monthIndex + 12);
  }
  return (
    <>
      <div className="buttons">
        <button
          onClick={handleReset}
          className="header__button shadow-md hover:shadow-2xl"
        >
          Today
        </button>
        <button
          onClick={() => setOnShowModal(true)}
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
            {showDayView? dayjs(daySelected).format( "DD"): dayjs(new Date(dayjs().year(), monthIndex)).format( "YYYY")}
          </div>

          <button onClick={handleNext}>
            <span className="arrow material-icons-outlined">chevron_right</span>
          </button>
        </div>
        <h2>
          {showDayView && daySelected.format( "MMMM YYYY")}
        </h2>
      </div>
      <TicklerFileLabels />
    </>
  );
};
