import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./calendar.scss";
import { CalendarHeader } from "./CalendarHeader";
import { Labels } from "./Labels";
import { TicklerFileHeader } from "./TicklerFileHeader";

export const Header = () => {
  const {
    resetAll,
    showMenu,
    setShowMenu,
    handleReset,
    setOnShowModal,
    setTicklerFileState,
    showDayView,
    setShowDayView 
  } = useContext(GlobalContext);

  return (
    <header className="header">
      <div
        onClick={() =>
          showMenu === "mainMenu" ? setShowMenu(false) : setShowMenu("mainMenu")
        }
        className="menu-wrapper"
      >
        <button className="menu-button">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <ul
          className={`list-wrapper${showMenu === "mainMenu" ? " onShow" : ""}`}
        >
          <li onClick={resetAll}>
            <Link to="/">inbox</Link>
          </li>
          <li onClick={resetAll}>
            <Link to="/Calendar">Calendar</Link>
          </li>
          <li onClick={resetAll}>
            <Link to="/Tickler-File">tickler file</Link>
          </li>
          <li onClick={resetAll}>
            <Link to="/Actionable-List">Actionable list</Link>
          </li>
          <li onClick={resetAll}>
            <Link to="/Someday-Dumper">Someday / dumper</Link>
          </li>
        </ul>
      </div>

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
          onClick={() => setOnShowModal(true)}
          alt="create_event"
          className="CreateEventButton-button shadow-md hover:shadow-2xl" //tailwind
        >
          <span className="add material-symbols-outlined">add</span>
          <span className="create">Create</span>
        </button>
      </div>
      <Routes>
        <Route path="/Calendar" element={<CalendarHeader />} />
        <Route path="/Tickler-File" element={<TicklerFileHeader />} />
      </Routes>

      {window.location.pathname!=="/"&&<Labels/>}
    </header>
  );
};
