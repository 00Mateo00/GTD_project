import React, { useContext } from "react";
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

    case "/Calendar/DayView":
      labels = calendarLabels;
      updateLabel = updateCalendarLabel;
      setState = setCalendarState;
      break;

    case "/Tickler":
      labels = ticklerFileLabels;
      updateLabel = updateTicklerFileLabel;
      setState = setTicklerFileState;
      break;

    case "/Actionables":
      labels = actionableLabels;
      updateLabel = updateActionableLabels;
      setState = setActionableState;

      break;

    case "/Dumper":
      labels = dumperLabels;
      updateLabel = updateDumperLabels;
      setState = setDumperState;
      break;

    case "/Inbox":
      const unfilteredLabels = [...calendarLabels, ...ticklerFileLabels, ...actionableLabels];
      const mergedMap = new Map();

      unfilteredLabels.forEach((lbl) => {
        mergedMap.set(lbl.label, lbl);
      });

      labels = [...mergedMap.values()];
      console.log(labels);

      updateLabel = (payload) => {
        updateCalendarLabel(payload);
        updateTicklerFileLabel(payload);
        updateActionableLabels(payload);
      };
      setState = (state) => {
        setTicklerFileState(state);
        setActionableState(state);
      };
      break;

    default:
      labels = [];
      updateLabel = () => {};
      setState = () => {};
      break;
  }

  return (
    <div className="label-wrapper">
      <div className="list-wrapper">
        {window.location.pathname !== "/Calendar" && window.location.pathname !== "/Calendar/DayView" && (
          <>
            <div className="state-filter">
              <button onClick={() => setState(false)}>Todos</button>
              <button onClick={() => setState(1)}>listos</button>
              <button onClick={() => setState(0)}>Pendientes</button>
            </div>
          </>
        )}
        {labels.map(({ label: lbl, checked }, idx) => (
          <label key={idx}>
            <input type="checkbox" checked={checked} onChange={() => updateLabel({ label: lbl, checked: !checked })} />
            <span className={`checkMark text-${lbl}`}></span> {lbl}
          </label>
        ))}
      </div>
    </div>
  );
};
