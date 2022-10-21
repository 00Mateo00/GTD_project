import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: (bool) => {},
  showDayView: false,
  setShowDayView: (bool) => {},
  isClicked: false,
  setIsClicked: () => {},
  savedCalendarEvents: [],
  dispatchCallEvent: ({type, payload}) => {},
  savedDumperTODO: [],
  dispatchCallDumperTODO: ({type, payload}) => {},
  selectedCalendarEvent: null,
  setSelectedCalendarEvent: () => {},
  selectedTicklerFileEvent: null,
  setSelectedTicklerFileEvent: () => {},
  selectedTODO: null,
  setSelectedTODO: () => {},
  calendarLabels: [],
  setCalendarLabels: ()=>{},
  updateCalendarLabel: () =>{},
  filteredCalendarEvents: [],
  ticklerFileLabel: [],
  setTicklerFileLabel: ()=>{},
  updateTicklerFileLabel: () =>{},
  onShowTodoModal: false,
  setOnShowTodoModal: () =>{},
  resetAll: ()=>{}
});

export default GlobalContext;
