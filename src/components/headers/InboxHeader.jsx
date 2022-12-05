import dayjs from 'dayjs';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'

export const InboxHeader = () => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setOnShowModal,
    filteredTicklerFileEvents,
    setSelectedTicklerFileEvent,
    dispatchCallTicklerFileEvent,
    handleChecked
  } = useContext(GlobalContext);

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
    <div>{events}</div>
  )
}
