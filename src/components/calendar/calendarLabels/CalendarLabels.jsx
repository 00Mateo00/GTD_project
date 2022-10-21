import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import './calendarLabels.scss';

const CalendarLabels = () => {
  const { calendarLabels, updateCalendarLabel } = useContext(GlobalContext);
  return (
    <div className="label-wrapper">
      <p >Label</p>
      <div className="list-wrapper">
        {calendarLabels.map(({ label: lbl, checked }, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              checked={checked}
              onChange={()=> updateCalendarLabel({label: lbl, checked: !checked})}
            />
            <span className={`checkMark text-${lbl}`}></span>  {lbl}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CalendarLabels;
