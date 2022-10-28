import React, { useContext } from "react";
import { Routes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./labels.scss";

export const Labels = ({ labels, updateLabel, setState }) => {
  const {
    calendarLabels,
    ticklerFileLabels,
    actionableLabels,
    dumperLabels,
    updateCalendarLabel,
    updateTicklerFileLabel,
    updateActionableLabels,
    updateDumperLabels,

    setCalendarState,
    setTicklerFileState,
    setActionableState,
    setDumperState,
  } = useContext(GlobalContext);

  switch (window.location.pathname) {
    case "/Calendar":
      labels = calendarLabels;
      updateLabel = updateCalendarLabel;
      setState = setCalendarState;
      break;
    case "/Tickler-File":
      labels = ticklerFileLabels;
      updateLabel = updateTicklerFileLabel;
      setState = setTicklerFileState;
      break;
    case "/Actionable-List":
      labels = actionableLabels;
      updateLabel = updateActionableLabels;
      setState = setActionableState;

      break;

    case "/Someday-Dumper":
      labels = dumperLabels;
      updateLabel = updateDumperLabels;
      setState = setDumperState;

    default:
      break;
  }

  return (
    <div className="label-wrapper">
      <p>Label</p>
      <div className="list-wrapper">
        {labels.map(({ label: lbl, checked }, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => updateLabel({ label: lbl, checked: !checked })}
            />
            <span className={`checkMark text-${lbl}`}></span> {lbl}
          </label>
        ))}
        <div>
          <button onClick={() => setState(false)}>All</button>
          <button onClick={() => setState(1)}>Done</button>
          <button onClick={() => setState(0)}>Due</button>
          <button onClick={() => setState(2)}>Missed</button>
        </div>
      </div>
    </div>
  );
};
