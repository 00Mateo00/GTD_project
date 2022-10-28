import React from "react";
import utils from "../utils/utils";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  onShowModal: false,
  setOnShowModal: (bool) => {},
  showDayView: false,
  setShowDayView: (bool) => {},
  isClicked: false,
  setIsClicked: () => {},

  savedCalendarEvents: [],
  savedTicklerFileEvents: [],
  savedActionableTODOS: [],
  savedDumperTODOS: [],
  dispatchCallCalendarEvent: ({type, payload}) => {},
  dispatchCallTicklerFileEvent: ({type, payload}) => {},
  dispatchCallActionableTODO: ({type, payload}) => {},
  dispatchCallDumperTODO: ({type, payload}) => {},


  selectedCalendarEvent: null,
  selectedTicklerFileEvent: null,
  selectedActionableTODO: null, 
  selectedDumperTODO: null,
  setSelectedCalendarEvent: () => {},
  setSelectedTicklerFileEvent: () => {},
  setSelectedActionableTODO: () => {},
  setSelectedDumperTODO: () => {},

  calendarLabels: [],
  ticklerFileLabels: [],
  dumperLabels: [],
  actionableLabels: [],
  setCalendarLabels: ()=>{},
  setTicklerFileLabels: ()=>{},
  setActionableLabels: ()=>{},
  setDumperLabels: ()=>{},

  updateCalendarLabel: () =>{},
  updateTicklerFileLabel: () =>{},
  updateActionableLabels: () =>{},
  updateDumperLabels: () =>{},

  filteredCalendarEvents: [],
  filteredTicklerFileEvents: [],
  filteredDumperTODOS: [],
  filteredActionableTODOS: [],

  setTicklerFileState: ()=>{},
  setCalendarState: ()=>{},
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
