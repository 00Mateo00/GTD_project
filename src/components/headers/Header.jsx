import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./calendar.scss";
import { CalendarHeader } from "./CalendarHeader";
import { TicklerFileHeader } from "./TicklerFileHeader";

export const Header = () => {
  const { resetAll, showMenu, setShowMenu } = useContext(GlobalContext);

  return (
    <header className="header">
      <div onClick={() => showMenu==="mainMenu" ? setShowMenu(false) : setShowMenu("mainMenu")} className="menu-wrapper">
        <button className="menu-button">
          <span className="material-icons-outlined">menu</span>
        </button>
        <ul className={`list-wrapper${showMenu==="mainMenu" ? " onShow" : ""}`}>
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

      <Routes>
        <Route path="/Calendar" element={<CalendarHeader />} />
        <Route path="/Tickler-File" element={<TicklerFileHeader />} />
      </Routes>
    </header>
  );
};
