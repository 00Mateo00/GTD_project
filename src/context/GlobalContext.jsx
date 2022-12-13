import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  onShowModal: false,
  setOnShowModal: (bool) => {},
  showDayView: false,
  setShowDayView: (bool) => {},
  isClicked: false,
  setIsClicked: () => {},

  savedInboxEvents: [],
  savedCalendarEvents: [],
  savedTicklerFileEvents: [],
  savedActionableTODOS: [],
  savedDumperTODOS: [],
  dispatchCallInboxEvent: ({type, payload}) => {},
  dispatchCallCalendarEvent: ({type, payload}) => {},
  dispatchCallTicklerFileEvent: ({type, payload}) => {},
  dispatchCallActionableTODO: ({type, payload}) => {},
  dispatchCallDumperTODO: ({type, payload}) => {},


  selectedInboxEvent: null,
  selectedCalendarEvent: null,
  selectedTicklerFileEvent: null,
  selectedActionableTODO: null, 
  selectedDumperTODO: null,
  setSelectedInboxEvent: () => {},
  setSelectedCalendarEvent: () => {},
  setSelectedTicklerFileEvent: () => {},
  setSelectedActionableTODO: () => {},
  setSelectedDumperTODO: () => {},

  calendarLabels: [],
  inboxLabels: [],
  ticklerFileLabels: [],
  dumperLabels: [],
  actionableLabels: [],
  setCalendarLabels: ()=>{},
  setInboxLabels: ()=>{},
  setTicklerFileLabels: ()=>{},
  setActionableLabels: ()=>{},
  setDumperLabels: ()=>{},

  updateInboxLabel: () =>{},
  updateCalendarLabel: () =>{},
  updateTicklerFileLabel: () =>{},
  updateActionableLabels: () =>{},
  updateDumperLabels: () =>{},

  filteredInboxEvents: [],
  filteredCalendarEvents: [],
  filteredTicklerFileEvents: [],
  filteredDumperTODOS: [],
  filteredActionableTODOS: [],

  setInboxState: ()=>{},
  setCalendarState: ()=>{},
  setTicklerFileState: ()=>{},
  setDumperState: ()=>{},
  setActionableState: ()=>{},
  
  onShowModal: false,
  setOnShowModal: () =>{},
  showMenu: false,
  setShowMenu: () =>{},
  resetAll: ()=>{},
  handleChecked: ()=>{},
});

export default GlobalContext;
