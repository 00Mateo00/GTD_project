import React from "react";
import { Route, Router, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import { Inbox } from "./components/inbox/Inbox";
import { Calendar } from "./components/calendar/Calendar";
import { TicklerFile } from "./components/ticklerFile/TicklerFile";
import { ActionableList } from "./components/ActionableList/ActionableList";
import { SomdayDumper } from "./components/SomedayDumper/SomdayDumper";
import { Header } from "./components/headers/Header";

/* TODO:
make the EventModal window dragable */

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/Inbox' element={<Inbox/>}/>
        <Route path='/Calendar' element={<Calendar/>}/>
        <Route path='/Tickler-File' element={<TicklerFile/>}/>
        <Route path='/Actionable-List' element={<ActionableList/>}/>
        <Route path='/Someday-Dumper' element={<SomdayDumper/>}/>
        <Route path='/' element={ <Navigate to="/Inbox" /> }/>
      </Routes>
    </div>
  );
}

export default App;
