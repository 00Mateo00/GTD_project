import React from "react";
import { Day } from "../day/Day";
import "./month.scss";

export const Month = ({ month }) => {
  
  let numberOfRow = 0;
  const monthTable = month.map((row, i) => {
    numberOfRow++
    return (
      <>
        <div className="month-table-wrapper flex-1 grid  grid-cols-7" key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} />
          ))}
        </div>
      </>
    );
  });

  return (
    <div className="days-month-wrapper">
      <div className="days-names-wrapper">
        {month.map((row, i) => {
            return(<>
              {row.map((day, idx) => (
                  i === 1 && <p key={idx} className="days-names">{day.format("ddd").toUpperCase()}</p>
              ))}
            </>)
          })}
      </div>
      <div className={`flex-1 grid  grid-rows-${numberOfRow} month-wrapper`}>
        {monthTable}
      </div>
    </div>
    
  );
};
