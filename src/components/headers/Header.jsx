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
    resetAll,
    showMenu,
    setShowMenu,
    handleReset,
    setOnShowModal,
    setTicklerFileState,
    showDayView,
    setShowDayView,
    calendarLabels,
    ticklerFileLabels,
    actionableLabels,
    dumperLabels,
  } = useContext(GlobalContext);

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
              <Link to="/Tickler-File">Tickler file</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Actionable-List">Actionable list</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Ideas-Dumper">Ideas dumper</Link>
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
              path="/Calendar"
              element={showDayView && (
              <button
                onClick={() => setShowDayView(false)}
                className={"go-back"}
                alt="go back"
              >
                <span className="material-symbols-outlined">arrow_back</span>
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
            onClick={() => setOnShowModal(window.location.pathname)}
            alt="create_event"
            className="CreateEventButton-button"
          >
            <span className="add material-symbols-outlined">add</span>
          </button>
        </div>
      </>)}
      

      <Routes>
        <Route path="/Calendar" element={<CalendarHeader />} />
        <Route path="/CalendarDayView" element={<CalendarHeader />} />
        <Route path="/Tickler-File" element={<TicklerFileHeader />} />
        <Route path="/Inbox" element={<InboxHeader/>} />
        
      </Routes>

    </header>
  );
};