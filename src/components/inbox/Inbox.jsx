import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { MenuModal } from "../modals/MenuModal";
import "./inbox.scss";
import { useEffect } from 'react';
import { useState } from 'react';

export const Inbox = () => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setOnShowModal,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,
    handleChecked,
    savedActionableTODOS,
    savedCalendarEvents,
    savedTicklerFileEvents
  } = useContext(GlobalContext)


  useEffect(() => {
    const events = filteredTicklerFileEvents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredTicklerFileEvents]);


  const events = dayEvents.sort((a,b)=> a.id - b.id).map(
    (e, i) =>
      i < 3 && (
        <div
          key={i}
          onClick={() => {
            setSelectedTicklerFileEvent(e);
            setOnShowModal("/Tickler-File");
          }}
          className={`${e.label} tickler-day-event`}
        >
          <span>{e.title}</span>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleChecked(e,dispatchCallTicklerFileEvent);
            }}
            className="tickler-event__check"
          >
            <span className="material-symbols-outlined">
              {e.checked === 0? "check_box_outline_blank" : "select_check_box"}
            </span>
          </button>
        </div>
      )
  );
  return (
    <div className="inbox-wrapper">
      <button onClick={()=>console.log(dayjs().valueOf())}>test</button>
      <div className="grid-container">
        {savedCalendarEvents.map((e,i)=>{
          <>
            
          </>
        })}

        {savedTicklerFileEvents.map((e)=>{
          <></>
        })}

        {savedActionableTODOS.map((e,i)=>
          <>
            <div key={i} className="inbox-card">
              <div className="inbox-card__title">
                  <div>{e.title}</div>
                </div>
                <div className="actions-wrapper">
                  <h3>ACTIONS:</h3>
                  <div className="actions">
                    {e.subtasks.map((e, i) => (
                      <p key={i}>- {e.action}</p>
                    ))}
                  </div>
                </div>
            </div>
          </>
        )}
        <div className="button-wrapper">
          <button className="inbox-add-button">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};
