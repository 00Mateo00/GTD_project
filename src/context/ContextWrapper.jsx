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

  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState(null);
  const [selectedTicklerFileEvent, setSelectedTicklerFileEvent] = useState(null);
  const [selectedDumperTODO, setSelectedDumperTODO] = useState(null);
  const [selectedActionableTODO, setSelectedActionableTODO] = useState(null);

  const [calendarLabels, setCalendarLabels] = useState([]);
  const [ticklerFileLabels, setTicklerFileLabels] = useState([]);
  const [dumperLabels, setDumperLabels] = useState([]);
  const [actionableLabels, setActionableLabels] = useState([]);
  
  const [onShowModal, setOnShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function resetAll() {
    setDaySelected(false);
    setShowDayView(false);
    setOnShowModal(false);
    setSelectedCalendarEvent(false);
    setSelectedTicklerFileEvent(false);
    setSelectedDumperTODO(false);
    setOnShowModal(false);
    setShowMenu(false);
  }



  const [savedCalendarEvents, dispatchCallCalendarEvent] = useReducer(reducer, [], () =>
    initEvents("savedCalendarEvents")
  );

  const [savedTicklerFileEvents, dispatchCallTicklerFileEvent] = useReducer(
    reducer,
    [],
    () => initEvents("savedTicklerFileEvents")
  );

  const [savedDumperTODOS, dispatchCallDumperTODO] = useReducer(
    reducer,
    [],
    () => initEvents("savedDumperTODOS")
  );

  const [savedActionableTODOS, dispatchCallActionableTODO] = useReducer(
    reducer,
    [],
    () => initEvents("savedActionableTODOS")
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
      ticklerFileLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredDumperTODOS = useMemo(() => {
    return savedDumperTODOS.filter((e) =>
      dumperLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredActionableTODOS = useMemo(() => {
    return savedActionableTODOS.filter((e) =>
      actionableLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });



  useEffect(() => {
    localStorage.setItem(
      "savedCalendarEvents",
      JSON.stringify(savedCalendarEvents)
    );
  }, [savedCalendarEvents]);

  useEffect(() => {
    localStorage.setItem(
      "savedTicklerFileEvents",
      JSON.stringify(savedTicklerFileEvents)
    );
  }, [savedTicklerFileEvents]);

  useEffect(() => {
    localStorage.setItem(
      "savedDumperTODOS", 
      JSON.stringify(savedDumperTODOS)
      );
  }, [savedDumperTODOS]);

  useEffect(() => {
    localStorage.setItem(
      "savedActionableTODOS", 
      JSON.stringify(savedActionableTODOS)
      );
  }, [savedActionableTODOS]);

  

  

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
    setTicklerFileLabels((prevLabels) => {
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
    setDumperLabels((prevLabels) => {
      return [...new Set(savedDumperTODOS.map((i) => i.label))].map((label) => {
        const currentLabel = prevLabels.find((i) => i.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedDumperTODOS]);

  useEffect(() => {
    setActionableLabels((prevLabels) => {
      return [...new Set(savedActionableTODOS.map((i) => i.label))].map(
        (label) => {
          const currentLabel = prevLabels.find((i) => i.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedActionableTODOS]);



  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);


  function updateCalendarLabel(label) {
    setCalendarLabels(
      calendarLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  function updateTicklerFileLabel(label) {
    setTicklerFileLabels(
      ticklerFileLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  function updateDumperLabels(label) {
    setDumperLabels(
      dumperLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
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
        onShowModal,
        setOnShowModal,
        savedCalendarEvents,
        dispatchCallCalendarEvent,
        savedTicklerFileEvents,
        dispatchCallTicklerFileEvent,
        savedDumperTODOS,
        dispatchCallDumperTODO,
        savedActionableTODOS,
        dispatchCallActionableTODO,
        selectedCalendarEvent,
        setSelectedCalendarEvent,
        selectedTicklerFileEvent,
        setSelectedTicklerFileEvent,
        selectedDumperTODO,
        setSelectedDumperTODO,
        selectedActionableTODO, 
        setSelectedActionableTODO,
        calendarLabels,
        setCalendarLabels,
        updateCalendarLabel,
        filteredCalendarEvents,
        filteredTicklerFileEvents,
        ticklerFileLabels,
        setTicklerFileLabels,
        updateTicklerFileLabel,
        onShowModal,
        setOnShowModal,
        showMenu,
        setShowMenu,
        resetAll,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
