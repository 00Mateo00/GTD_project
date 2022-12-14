import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useEffect } from 'react'

export const InboxHeader = () => {

    const [todaysDate, setTodaysDate] = useState(dayjs().format("ddd DD MMMM YYYY"))

    function onFocus() {
        console.log("onFocus");
        setTodaysDate(dayjs().format("ddd DD MMMM YYYY"))
        if (parseInt(dayjs().format("HH"))<23) {
            console.log("smaller than 23");
            return
        }

        console.log("greater than 23");
        setTimeout(() => {
            setTodaysDate(dayjs().format("ddd DD MMMM YYYY"))
        }, (3601-(parseInt(dayjs().format("mm")))*60 )*1000 );
      }
    
      function onBlur() {
      }

    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        onFocus();
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
      }, []);
    
  return (
    <>  
        <div className='inbox-date'>{todaysDate}</div>
    </>
  )
}
