import React, { useContext } from "react";
import { Routes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./labels.scss";

export const Labels = ({ labels, updateLabel, setState }) => {
  const {
    inboxLabels,
    calendarLabels,
    ticklerFileLabels,
    actionableLabels,
    dumperLabels,
    updateInboxLabel,
    updateCalendarLabel,
    updateTicklerFileLabel,
    updateActionableLabels,
    updateDumperLabels,

    setInboxState,
    setCalendarState,
    setTicklerFileState,
    setActionableState,
    setDumperState,
  } = useContext(GlobalContext);

  console.log(window.location.pathname);
  switch (window.location.pathname) {
    case "/Inbox":
      labels = inboxLabels;
      updateLabel = updateInboxLabel;
      setState = setInboxState;
      break;

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
        labels = [];
        updateLabel = ()=>{};
        setState = ()=>{};
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
        {window.location.pathname !== "/Calendar" && (
          <>
            <div className="state-filter">
              <button onClick={() => setState(false)}>All</button>
              <button onClick={() => setState(1)}>Done</button>
              <button onClick={() => setState(0)}>Due</button>
              <button onClick={() => setState(2)}>Missed</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
