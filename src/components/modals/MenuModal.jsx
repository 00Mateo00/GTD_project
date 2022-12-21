import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./menuModal.scss";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export const MenuModal = ({
  selected,
  setSelected,
  dispatchCall,
  hourClicked = { timeStart: "00:00", timeEnd: "00:00" },
}) => {
  const {
    daySelected,
    onShowModal,
    savedCalendarEvents,
    setOnShowModal,
    dispatchCallInboxEvent,
    dispatchCallCalendarEvent,
    dispatchCallTicklerFileEvent,
    dispatchCallActionableTODO,
    dispatchCallDumperTODO,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selected ? selected.title : "");
  const [description, setDescription] = useState(
    selected ? selected.description : ""
  );
  const [date, setDate] = useState(selected ? selected.day : dayjs());

  const [selectedLabel, setSelectedLabel] = useState(
    selected
      ? labelsClasses.find((lbl) => lbl === selected.label)
      : labelsClasses[0]
  );

  const hoursTemp = () => {
    return selected && selected.time
      ? { timeStart: selected.time.timeStart, timeEnd: selected.time.timeEnd }
      : {
          timeStart: handleTimeForm(`${hourClicked}`),
          timeEnd: handleTimeForm(`${hourClicked + 1}`),
        };
  };

  const [hours, setHours] = useState(hoursTemp);

  const [subTasks, setSubTasks] = useState(
    selected && selected.subtasks
      ? selected.subtasks
      : [{ action: "", checked: 0, id: 0 }]
  );

  const [error, setError] = useState(false);

  const [isMouseUp, setIsMouseUp] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  function clear() {
    setOnShowModal(false);
    setSelected(false);
    setError(false);
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

  function handleSubmit() {
    let tempError = error;
    const EVENT = {
      title,
      description,
      label: selectedLabel,
      id: selected ? selected.id : Date.now(),
      origin: onShowModal,
      checked: 0,
      day: daySelected.valueOf(),
      time: hours,
      subtasks: subTasks,
    };

    switch (onShowModal) {
      case "/Inbox":
        dispatchCallInboxEvent({
          type:
            selected && window.location.pathname === onShowModal
              ? "update"
              : "push",
          payload: EVENT,
        });
        break;
      case "/Calendar":
        EVENT.day = daySelected.valueOf();
        EVENT.time = hours;
        if (!hours.timeStart || !hours.timeEnd) {
          tempError =
            "hours must be smaller than 24 and minutes smaller than 60";
          setError(tempError);
          return;
        }

        const thisTimeStart = parseInt(
          hours.timeStart.match(/\d/g).toString().replace(/,/g, "")
        );
        const thisTimeEnd = parseInt(
          hours.timeEnd.match(/\d/g).toString().replace(/,/g, "")
        );

        if (thisTimeStart > thisTimeEnd || thisTimeStart === thisTimeEnd) {
          tempError = "starting time must be smaller than ending time";
          setError(tempError);
          return;
        }

        let available = savedCalendarEvents.every((i) => {
          if (i.day !== EVENT.day || (selected && i.id === selected.id)) {
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
          tempError = "there is another appointment at this time";
          setError(tempError);
        } else {
          if (window.location.pathname === "/Inbox" || window.location.pathname === "/Calendar/DayView")
            tempError = window.location.pathname;
          dispatchCallCalendarEvent({
            type:
              selected &&
              (window.location.pathname === onShowModal ||
                window.location.pathname === tempError)
                ? "update"
                : "push",
            payload: EVENT,
          });
        }

        break;
      case "/Tickler-File":
        EVENT.day = daySelected.valueOf();
        if (window.location.pathname === "/Inbox")
          tempError = window.location.pathname;
        dispatchCallTicklerFileEvent({
          type:
            selected &&
            (window.location.pathname === onShowModal ||
              window.location.pathname === tempError)
              ? "update"
              : "push",
          payload: EVENT,
        });
        break;
      case "/Actionable-List":
        EVENT.subtasks = subTasks.filter((e) => Boolean(e.action));
        if (EVENT.subtasks.length < 1) {
          tempError = "there should be at least 1 action";
          setError(tempError);
        } else {
          dispatchCallActionableTODO({
            type:
              selected && window.location.pathname === onShowModal
                ? "update"
                : "push",
            payload: EVENT,
          });
        }
        break;
      case "/Ideas-Dumper":
        dispatchCallDumperTODO({
          type:
            selected && window.location.pathname === onShowModal
              ? "update"
              : "push",
          payload: EVENT,
        });
        break;
      default:
        break;
    }

    if (!tempError) {
      if (window.location.pathname != onShowModal) {
        selected &&
          dispatchCall({
            type: "delete",
            payload: selected,
          });
      }
      clear();
    } else if (tempError === "/Inbox" || tempError === "/Calendar/DayView") {
      clear();
    }
  }

  return (
    <div
      onClick={() => {
        setOnShowModal(false);
        setSelected(false);
      }}
      className="menuModal_wrapper"
    >
      <div onClick={(e) => e.stopPropagation()} className="menuModal">
        <form>
          <header className="menuModal__header">
            <span className="material-symbols-outlined">drag_handle</span>
            <div>
              {selected && (
                <button
                  type="button"
                  onClick={() => {
                    dispatchCall({
                      type: "delete",
                      payload: selected,
                    });
                    clear();
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}

              <button type="button" onClick={clear}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>

          <div className="menuModal__body">
            <div className="body-wrapper">
              <input
                type="text"
                name="title"
                required
                placeholder="Add Title"
                value={title}
                className="title-input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Add a description"
                className="description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>

              {onShowModal === "/Calendar" && (
                <>
                  <div className="date-selector">
                    <input
                      type="date"
                      value={daySelected.format("YYYY-MM-DD")}
                      onChange={(e) => setDate(dayjs(e.target.value).valueOf())}
                    />
                    <div className="time" onClick={() => setError(false)}>
                      <input
                        type="text"
                        value={hours.timeStart}
                        onChange={(e) =>
                          setHours({
                            timeStart: e.target.value,
                            timeEnd: hours.timeEnd,
                          })
                        }
                        onBlur={(e) => {
                          const formated = handleTimeForm(e.target.value);
                          setHours({
                            timeStart: formated,
                            timeEnd: hours.timeEnd,
                          });
                        }}
                      ></input>
                      -
                      <input
                        type="text"
                        value={hours.timeEnd}
                        onChange={(e) =>
                          setHours({
                            timeStart: hours.timeStart,
                            timeEnd: e.target.value,
                          })
                        }
                        onBlur={(e) => {
                          const formated = handleTimeForm(e.target.value);
                          setHours({
                            timeStart: hours.timeStart,
                            timeEnd: formated,
                          });
                        }}
                      ></input>
                    </div>
                    {error && <p className="error">{error}</p>}
                  </div>
                </>
              )}

              {onShowModal === "/Tickler-File" && (
                <div className="date-selector">
                  <div className="miniCalendar-section">
                    <input
                      type="date"
                      value={daySelected.format("YYYY-MM-DD")}
                      onChange={(e) => setDate(dayjs(e.target.value).valueOf())}
                    />
                  </div>
                </div>
              )}

              {(onShowModal === "/Actionable-List" ||
                (selected && selected.origin === "/Inbox")) && (
                <div className="actions-wrapper">
                  <h3>Actions:</h3>
                  <div className="actions">
                    <p>{error}</p>
                    {subTasks
                      .sort((a, b) => a.id - b.id)
                      .map((e, i) => {
                        return (
                          <div key={i} className="input-wrapper">
                            <input
                              type="text"
                              required={i === 0 ? true : false}
                              className="action"
                              value={subTasks[i].action}
                              onChange={(e) =>
                                setSubTasks([
                                  ...subTasks.map((el, indx) =>
                                    indx === i
                                      ? {
                                          action: e.target.value,
                                          checked: 0,
                                          id: el.id,
                                        }
                                      : el
                                  ),
                                ])
                              }
                              onBlur={() => setError(false)}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                subTasks.length > 1
                                  ? setSubTasks([
                                      ...subTasks.filter(
                                        (el, indx) => indx !== i
                                      ),
                                    ])
                                  : setError(
                                      "there should be at least 1 action"
                                    );
                              }}
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    <div className="add-action-wrapper">
                      <button
                        type="button"
                        onClick={() => {
                          setSubTasks([
                            ...subTasks,
                            { action: "", checked: 0, id: dayjs().valueOf() },
                          ]);
                        }}
                        className="add-action"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

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

              <footer>
                <button onClick={handleSubmit} type="button">
                  save
                </button>
              </footer>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
