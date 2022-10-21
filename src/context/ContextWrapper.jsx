import React, { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useMemo } from "react";

function reducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((e) => (e.id === payload.id ? payload : e));
    case "delete":
      return state.filter((e) => e.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents(name) {
  const storageEvents = localStorage.getItem(name);
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(null);
  const [showDayView, setShowDayView] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState(null);
  const [selectedTicklerFileEvent, setSelectedTicklerFileEvent] = useState(null);
  const [selectedTODO, setSelectedTODO] = useState(null);
  const [calendarLabels, setCalendarLabels] = useState([]);
  const [ticklerFileLabel, setTicklerFileLabel] = useState([]);
  const [onShowTodoModal, setOnShowTodoModal] = useState(false);


  function resetAll() {
    setDaySelected(false)
    setShowDayView(false)
    setShowEventModal(false)
    setSelectedCalendarEvent(false)
    setSelectedTicklerFileEvent(false)
    setSelectedTODO(false)
    setOnShowTodoModal(false)
  }

  const [savedCalendarEvents, dispatchCallEvent] = useReducer(
    reducer,
    [],
    ()=>initEvents("savedCalendarEvents")
  );

  const [savedTicklerFileEvents, dispatchCallTicklerFileEvent] = useReducer(
    reducer,
    [],
    ()=>initEvents("savedTicklerFileEvents")
  );

  const [savedDumperTODO, dispatchCallDumperTODO] = useReducer(
    reducer,
    [],
    ()=>initEvents("savedDumperTODO")
  );

  const filteredCalendarEvents = useMemo(() => {
    return savedCalendarEvents.filter((e) =>
      calendarLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredTicklerFileEvents = useMemo(() => {
    return savedTicklerFileEvents.filter((e) =>
      ticklerFileLabel
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "savedDumperTODO",
      JSON.stringify(savedDumperTODO)
    );
  }, [savedDumperTODO]);

  useEffect(() => {
    localStorage.setItem(
      "savedTicklerFileEvents",
      JSON.stringify(savedTicklerFileEvents)
    );
  }, [savedTicklerFileEvents]);


  useEffect(() => {
    localStorage.setItem(
      "savedCalendarEvents",
      JSON.stringify(savedCalendarEvents)
    );
  }, [savedCalendarEvents]);



  useEffect(() => {
    setCalendarLabels((prevLabels) => {
      return [...new Set(savedCalendarEvents.map((i) => i.label))].map(
        (label) => {
          const currentLabel = prevLabels.find((i) => i.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedCalendarEvents]);

  useEffect(() => {
    setTicklerFileLabel((prevLabels) => {
      return [...new Set(savedTicklerFileEvents.map((i) => i.label))].map(
        (label) => {
          const currentLabel = prevLabels.find((i) => i.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedTicklerFileEvents]);


  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  function updateCalendarLabel(label) {
    setCalendarLabels(calendarLabels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  function updateTicklerFileLabel(label) {
    setTicklerFileLabel(ticklerFileLabel.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showDayView,
        setShowDayView,
        showEventModal,
        setShowEventModal,
        savedCalendarEvents,
        dispatchCallEvent,
        savedTicklerFileEvents,
        dispatchCallTicklerFileEvent,
        savedDumperTODO,
        dispatchCallDumperTODO,
        selectedCalendarEvent,
        setSelectedCalendarEvent,
        selectedTicklerFileEvent,
        setSelectedTicklerFileEvent,
        selectedTODO,
        setSelectedTODO,
        calendarLabels,
        setCalendarLabels,
        updateCalendarLabel,
        filteredCalendarEvents,
        filteredTicklerFileEvents,
        ticklerFileLabel,
        setTicklerFileLabel,
        updateTicklerFileLabel,
        onShowTodoModal,
        setOnShowTodoModal,
        resetAll
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
