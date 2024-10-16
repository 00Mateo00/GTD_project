import React, { useEffect, useState } from "react";
import { Route, Router, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.scss";
import { Inbox } from "./components/inbox/Inbox";
import { Calendar } from "./components/calendar/Calendar";
import { TicklerFile } from "./components/ticklerFile/TicklerFile";
import { ActionableList } from "./components/ActionableList/ActionableList";
import { SomdayDumper } from "./components/SomedayDumper/SomdayDumper";
import { Header } from "./components/headers/Header";
import { DayView } from "./components/calendar/dayView/DayView";
import { LoginSignUp } from "./components/Login/LoginSignUp";

function App() {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user_id")));
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}

      <Routes>
        {userId ? (
          <>
            <Route path="/Inbox" element={<Inbox />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/Calendar/DayView" element={<DayView />} />
            <Route path="/Tickler" element={<TicklerFile />} />
            <Route path="/Actionables" element={<ActionableList />} />
            <Route path="/Dumper" element={<SomdayDumper />} />
            <Route path="/" element={<Navigate to="/Inbox" />} />
          </>
        ) : (
          <>{location.pathname !== "/login" && <Route path="/*" element={<Navigate to="/login" />} />}</>
        )}

        <Route path="/login" element={<LoginSignUp setUserId={setUserId} />} />
      </Routes>
    </div>
  );
}

export default App;
