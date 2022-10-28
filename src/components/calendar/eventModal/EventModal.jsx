import React, { useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./eventModal.scss";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const {
    setOnShowModal,
    daySelected,
    dispatchCallCalendarEvent,
    selectedCalendarEvent,
    setSelectedCalendarEvent,
    savedCalendarEvents,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedCalendarEvent ? selectedCalendarEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedCalendarEvent ? selectedCalendarEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedCalendarEvent
      ? labelsClasses.find((lbl) => lbl === selectedCalendarEvent.label)
      : labelsClasses[0]
  );
  const [timeStart, setTimeStart] = useState(
    selectedCalendarEvent ? selectedCalendarEvent.time.timeStart : "00:00"
  );
  const [timeEnd, setTimeEnd] = useState(
    selectedCalendarEvent ? selectedCalendarEvent.time.timeEnd : "00:00"
  );
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [inputError, setInputError] = useState(false);

  function clear() {
    setOnShowModal(false);
    setSelectedCalendarEvent(null);
  }

  function handleTimeForm(number) {
    const formated = number.match(/\d/g).toString().replace(/,/g, "");
    let hour = formated;
    let minute = 0;
    if (formated.length > 1) {
      if (formated.slice(0, 2) < 24) {
        hour = formated.slice(0, 2);
      } else {
        return;
      }
      console.log(hour);
      if (formated.length > 2) {
        if (formated.slice(2) < 60) {
          minute =
            formated.slice(2).length < 2
              ? `${formated.slice(2)}0`
              : formated.slice(2);
        } else {
          return;
        }
      }
    }

    return `${dayjs().hour(hour).format("HH")}:${dayjs()
      .minute(minute)
      .format("mm")}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected ? daySelected.valueOf() : dayjs().valueOf(),
      time: { timeStart, timeEnd },
      id: selectedCalendarEvent ? selectedCalendarEvent.id : Date.now(),
    };

    if (!timeStart || !timeEnd) {
      setInputError(
        "hours must be smaller than 24 and minutes smaller than 60"
      );
      return;
    }

    const thisTimeStart = parseInt(
      timeStart.match(/\d/g).toString().replace(/,/g, "")
    );
    const thisTimeEnd = parseInt(
      timeEnd.match(/\d/g).toString().replace(/,/g, "")
    );

    if (thisTimeStart > thisTimeEnd || thisTimeStart === thisTimeEnd) {
      setInputError("starting time must be smaller than ending time");
      return;
    }

    let available = savedCalendarEvents.every((i) => {
      if (
        i.day !== calendarEvent.day ||
        (selectedCalendarEvent && i.id === selectedCalendarEvent.id)
      ) {
        return true;
      }

      const savedTimeStart = parseInt(
        i.time.timeStart.match(/\d/g).toString().replace(/,/g, "")
      );
      const savedTimeEnd = parseInt(
        i.time.timeEnd.match(/\d/g).toString().replace(/,/g, "")
      );

      return (
        (thisTimeStart < savedTimeStart && thisTimeEnd < savedTimeStart) ||
        thisTimeStart > savedTimeEnd
      );
    });

    if (!available) {
      setInputError("there is another appointment at this time");
    } else {
      if (selectedCalendarEvent) {
        dispatchCallCalendarEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCallCalendarEvent({ type: "push", payload: calendarEvent });
      }
      setInputError(false);
      clear();
    }
  }

  return (
    <div
      onMouseDown={(e) => {
        setIsMouseDown(true);
      }}
      onMouseUp={(e) => {
        setIsMouseUp(true);
      }}
      onClick={() => {
        if (isMouseUp && isMouseDown) {
          clear();
        } else {
          setIsMouseDown(false);
          setIsMouseUp(false);
        }
      }}
      className="EventModal-wrapper"
    >
      <form
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
        className="EventModal-wrapper__form shadow-2xl w-1/4" // tailwind
      >
        <header className="form__header">
          <span className="material-symbols-outlined">drag_handle</span>
          <div>
            {selectedCalendarEvent && (
              <span
                onClick={() => {
                  dispatchCallCalendarEvent({
                    type: "delete",
                    payload: selectedCalendarEvent,
                  });
                  clear();
                }}
                className="material-symbols-outlined cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={clear}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </header>
        <div className="form__body">
          <div className="body-wrapper">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-symbols-outlined">schedule</span>
            <div className="date-selector">
              {daySelected
                ? daySelected.format("dddd,MMMM,DD")
                : dayjs().format("dddd,MMMM,DD")}
              <div className="time" onClick={() => setInputError(false)}>
                <input
                  type="text"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  onBlur={(e) => {
                    const formated = handleTimeForm(e.target.value);
                    setTimeStart(formated);
                  }}
                ></input>
                -
                <input
                  type="text"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  onBlur={(e) => {
                    const formated = handleTimeForm(e.target.value);
                    setTimeEnd(formated);
                  }}
                ></input>
              </div>
              {inputError && <p className="error">{inputError}</p>}
            </div>
            <span className="material-symbols-outlined">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a Description"
              value={description}
              required
              className="description-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-symbols-outlined">bookmark_border</span>
            <div className="colors-input">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${lblClass} color ${
                    selectedLabel === lblClass && "material-symbols-outlined"
                  }`}
                >
                  {selectedLabel === lblClass && "check"}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer>
          <button onClick={handleSubmit} type="submit">
            save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
