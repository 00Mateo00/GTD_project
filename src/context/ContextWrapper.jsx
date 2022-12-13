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
  const [daySelected, setDaySelected] = useState(null);
  const [showDayView, setShowDayView] = useState(false);

  const [selectedInboxEvent, setSelectedInboxEvent] = useState(null);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState(null);
  const [selectedTicklerFileEvent, setSelectedTicklerFileEvent] = useState(null);
  const [selectedDumperTODO, setSelectedDumperTODO] = useState(null);
  const [selectedActionableTODO, setSelectedActionableTODO] = useState(null);

  const [inboxLabels, setInboxLabels] = useState([]);
  const [calendarLabels, setCalendarLabels] = useState([]);
  const [ticklerFileLabels, setTicklerFileLabels] = useState([]);
  const [dumperLabels, setDumperLabels] = useState([]);
  const [actionableLabels, setActionableLabels] = useState([]);

  const [inboxState, setInboxState] = useState(false);
  const [calendarState, setCalendarState] = useState(false);
  const [ticklerFileState, setTicklerFileState] = useState(false);
  const [dumperState, setDumperState] = useState(false);
  const [actionableState, setActionableState] = useState(false)
  
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



  const [savedInboxEvents, dispatchCallInboxEvent] = useReducer(reducer, [], () =>
    initEvents("savedInboxEvents")
  );

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


  const filteredInboxEvents = useMemo(() => {
    return savedInboxEvents.filter((e) => e.checked === (inboxState===false? e.checked : inboxState)&&
      inboxLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });


  const filteredCalendarEvents = useMemo(() => {
    return savedCalendarEvents.filter((e) => e.checked === (calendarState===false? e.checked : calendarState)&&
      calendarLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredTicklerFileEvents = useMemo(() => {
    return savedTicklerFileEvents.filter((e) => e.checked === (ticklerFileState===false? e.checked : ticklerFileState)&&
      ticklerFileLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredDumperTODOS = useMemo(() => {
    return savedDumperTODOS.filter((e) =>  e.checked === (dumperState===false? e.checked : dumperState)&&
      dumperLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });

  const filteredActionableTODOS = useMemo(() => {
    return savedActionableTODOS.filter((e) =>  e.checked === (actionableState===false? e.checked : actionableState)&&
      actionableLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(e.label)
    );
  });


  useEffect(() => {
    localStorage.setItem(
      "savedInboxEvents",
      JSON.stringify(savedInboxEvents)
    );
  }, [savedInboxEvents]);


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
    setInboxLabels((prevLabels) => {
      return [...new Set(savedInboxEvents.map((i) => i.label))].map(
        (label) => {
          const currentLabel = prevLabels.find((i) => i.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedInboxEvents]);

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



  function updateInboxLabel(label) {
    setInboxLabels(
      inboxLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

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

  function updateActionableLabels(label) {
    setActionableLabels(
      actionableLabels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  function handleChecked(e,fun,i) {
    if (i!==undefined) {
      e.subtasks[i].checked = e.subtasks[i].checked!==0? 0 : 1;
    }else{
      e.checked = e.checked!==0? 0: 1;
    }
    fun({
      type:"update",
      payload: e,
    })
  }
  

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showDayView,
        setShowDayView,
        onShowModal,
        setOnShowModal,

        savedInboxEvents,
        savedCalendarEvents,
        savedTicklerFileEvents,
        savedActionableTODOS,
        savedDumperTODOS,
        dispatchCallInboxEvent,
        dispatchCallCalendarEvent,
        dispatchCallTicklerFileEvent,
        dispatchCallActionableTODO,
        dispatchCallDumperTODO,

        selectedInboxEvent,
        selectedCalendarEvent,
        selectedTicklerFileEvent,
        selectedActionableTODO, 
        selectedDumperTODO,
        setSelectedInboxEvent,
        setSelectedCalendarEvent,
        setSelectedTicklerFileEvent,
        setSelectedActionableTODO,
        setSelectedDumperTODO,

        inboxLabels,
        calendarLabels,
        ticklerFileLabels,
        actionableLabels,
        dumperLabels,
        setCalendarLabels,
        setTicklerFileLabels,
        setActionableLabels,
        setDumperLabels,

        updateInboxLabel,
        updateCalendarLabel,
        updateTicklerFileLabel,
        updateActionableLabels,
        updateDumperLabels,

        filteredInboxEvents,
        filteredCalendarEvents,
        filteredTicklerFileEvents,
        filteredDumperTODOS,
        filteredActionableTODOS,

        setInboxState,
        setCalendarState,
        setTicklerFileState,
        setActionableState,
        setDumperState,

        onShowModal,
        setOnShowModal,
        showMenu,
        setShowMenu,
        resetAll,
        handleChecked
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
