import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Labels } from "./Labels";

export const TicklerFileHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    setOnShowModal,
    showDayView,
    daySelected,
    setDaySelected,
    setTicklerFileState
  } = useContext(GlobalContext);

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );

    showDayView && setDaySelected(dayjs());
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


      <div className="navigation-arrows">
        <div className="navigation-arrows__container">
          <button onClick={handlePrev}>
            <span className="arrow material-symbols-outlined">
              chevron_left
            </span>
          </button>

          <div className="">
            {showDayView
              ? dayjs(daySelected).format("DD")
              : dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
          </div>

          <button onClick={handleNext}>
            <span className="arrow material-symbols-outlined">
              chevron_right
            </span>
          </button>
        </div>
        <h2>{showDayView && daySelected.format("MMMM YYYY")}</h2>
      </div>
      

    </>
  );
};
