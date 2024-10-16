import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import dayjs from "dayjs";
export const TicklerHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const currentYear = dayjs(new Date(dayjs().year(), monthIndex)).year();

  function handlePrev() {
    setMonthIndex(monthIndex - 12);
  }

  function handleNext() {
    setMonthIndex(monthIndex + 12);
  }
  return (
    <>
      <div className="navigation-arrows">
        <div className="navigation-arrows__container">
          <button onClick={handlePrev}>
            <span className="arrow material-symbols-outlined">chevron_left</span>
          </button>
          <h2>{currentYear}</h2>

          <button onClick={handleNext}>
            <span className="arrow material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </>
  );
};
