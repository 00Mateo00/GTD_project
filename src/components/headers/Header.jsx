import React from "react";
import { useContext,  useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./calendar.scss";
import "./header.scss";
import { CalendarHeader } from "./CalendarHeader";
import { Labels } from "./Labels";
import { TicklerFileHeader } from "./TicklerFileHeader";
import { InboxHeader } from "./InboxHeader";

export const Header = () => {
  const {
    ModalParams,
    handleReset,
    resetAll,
    showMenu,
    setShowMenu,
    setOnShowModal,
    setTicklerFileState,
    showDayView,
    setShowDayView,
    calendarLabels,
    ticklerFileLabels,
    actionableLabels,
    dumperLabels,
  } = useContext(GlobalContext);
  const {push} = ModalParams.type;


  function UrlToModal(path) {
    const ListName = path.replace("DayView","").replaceAll("/","")
    console.log(ListName);
    const to =  ModalParams.to.hasOwnProperty(ListName)&&ModalParams.to[ListName]
    setOnShowModal({type:push,from:to, to:to})
  }

  return (
    <header className={`header ${window.location.pathname === "/Inbox"? "InboxHeader":""}`}>
      <div
        onClick={() =>
          showMenu === "mainMenu" ? setShowMenu(false) : setShowMenu("mainMenu")
        }
        className="menu-wrapper"
      >
        <button className="menu-button">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div
          className={`list-wrapper-menu${showMenu === "mainMenu" ? " onShow" : ""}`}
        >
          <ul>
            <li onClick={resetAll}>
              <Link to="/Inbox">Inbox</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Calendar">Calendar</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Tickler">Tickler file</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Actionable">Actionable list</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Ideas">Ideas dumper</Link>
            </li>
          </ul>
          <div>
            <h3>filters</h3>
            <div className="filters-wrapper">
              <Labels/>
            </div>
          </div>
        </div>
      </div>

      {(window.location.pathname!=="/Inbox"&&
      <>
        <div className="buttons">
          <Routes>
            <Route
              path="/Calendar/DayView"
              element={showDayView && (
              <button
                onClick={() => setShowDayView(false)}
                className={"go-back"}
                alt="go back"
              >
                <Link to="/Calendar"><span className="material-symbols-outlined">arrow_back</span></Link>
              </button>
            )}
            />

          </Routes>
          <button
            onClick={handleReset}
            className="header__button shadow-md hover:shadow-2xl"
          >
            Today
          </button>
          <button
            onClick={() => UrlToModal(window.location.pathname)}
            alt="create_event"
            className="CreateEventButton-button"
          >
            <span className="add material-symbols-outlined">add</span>
          </button>
        </div>
      </>)}
      

      <Routes>
        <Route path="/Calendar/*" element={<CalendarHeader />} />
        <Route path="/Tickler-File" element={<TicklerFileHeader />} />
        <Route path="/Inbox" element={<InboxHeader/>} />
        
      </Routes>

    </header>
  );
};