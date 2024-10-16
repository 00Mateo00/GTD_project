import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, Route, Routes, useRoutes } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./calendar.scss";
import "./header.scss";
import { CalendarHeader } from "./CalendarHeader";
import { Labels } from "./Labels";
import { TicklerFileHeader } from "./TicklerFileHeader";
import { InboxHeader } from "./InboxHeader";
import dumper from "../../static/icons/dumper.svg";

export const Header = () => {
  const { ModalParams, handleReset, resetAll, showMenu, setShowMenu, setOnShowModal, showDayView, setShowDayView } = useContext(GlobalContext);
  const { push } = ModalParams.type;

  function UrlToModal(path) {
    console.log(path);

    const ListName = path.replace("DayView", "").replaceAll("/", "");
    const to = ModalParams.to.hasOwnProperty(ListName) && ModalParams.to[ListName];

    if (to === "Inbox") {
      setOnShowModal({ type: push, from: "Dumper", to: "Dumper" });
    } else {
      setOnShowModal({ type: push, from: to, to: to });
    }
  }

  const todayButton = (
    <button onClick={handleReset} className="header__button shadow-md hover:shadow-2xl">
      Hoy
    </button>
  );

  return (
    <header className={`header ${window.location.pathname === "/Inbox" ? "InboxHeader" : ""}`}>
      <div onClick={() => (showMenu === "mainMenu" ? setShowMenu(false) : setShowMenu("mainMenu"))} className="menu-wrapper">
        <button className="menu-button">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className={`list-wrapper-menu${showMenu === "mainMenu" ? " onShow" : ""}`}>
          <ul>
            <li onClick={resetAll}>
              <Link to="/Inbox">Inicio</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Calendar">Calendario</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Tickler">recordatorios</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Actionables">Paso a paso</Link>
            </li>
            <li onClick={resetAll}>
              <Link to="/Dumper">Notas rápidas</Link>
            </li>
          </ul>
          <div>
            <h3>filtros</h3>
            <div className="filters-wrapper">
              <Labels />
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="buttons">
          {window.location.pathname !== "/Inbox" && (
            <Routes>
              <Route
                path="/Calendar/DayView"
                element={
                  showDayView && (
                    <button onClick={() => setShowDayView(false)} className={"go-back"} alt="go back">
                      <Link to="/Calendar">
                        <span className="material-symbols-outlined">arrow_back</span>
                      </Link>
                    </button>
                  )
                }
              />

              <Route path="/Calendar" element={todayButton} />
              <Route path="/Tickler" element={todayButton} />
            </Routes>
          )}
          <button
            onClick={() => {
              return UrlToModal(window.location.pathname);
            }}
            alt="create_event"
            className="CreateEventButton-button"
          >
            {window.location.pathname !== "/Inbox" ? <span className="add material-symbols-outlined">add</span> : <img src={dumper} alt="SVG Image" />}
          </button>
        </div>
      </>
      <Routes>
        <Route path="/Calendar/*" element={<CalendarHeader />} />
        <Route path="/Tickler" element={<TicklerFileHeader />} />
        <Route path="/Inbox" element={<InboxHeader />} />
      </Routes>
    </header>
  );
};
