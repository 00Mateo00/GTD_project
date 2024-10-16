import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { HfInference } from "@huggingface/inference";
import GlobalContext from "../../context/GlobalContext";
import "./menuModal.scss";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export const MenuModal = ({ selected, setSelected, dispatchCall }) => {
  const {
    hourClicked,
    ModalParams,
    daySelected,
    onShowModal,
    savedCalendarEvents,
    setOnShowModal,
    dispatchCallCalendarEvent,
    dispatchCallTicklerFileEvent,
    dispatchCallActionableTODO,
    dispatchCallDumperTODO,
  } = useContext(GlobalContext);

  const { Inbox, Calendar, Tickler, Actionables, Dumper } = ModalParams.to;
  const { type, from, to } = onShowModal;

  function HandleDate() {
    if (selected) {
      return selected.day ? selected.day : dayjs().valueOf();
    }

    if (daySelected) {
      return daySelected.valueOf();
    }

    if (to === Inbox) {
      return false;
    }
    return dayjs();
  }

  const [title, setTitle] = useState(selected ? selected.title : "");
  const [description, setDescription] = useState(selected ? selected.description : "");
  const [date, setDate] = useState(HandleDate());

  const [selectedLabel, setSelectedLabel] = useState(selected ? labelsClasses.find((lbl) => lbl === selected.label) : labelsClasses[0]);

  const hoursTemp = () => {
    return selected && selected.time
      ? { timeStart: selected.time.timeStart, timeEnd: selected.time.timeEnd }
      : {
          timeStart: handleTimeForm(`${hourClicked}`),
          timeEnd: handleTimeForm(`${hourClicked + 1}`),
        };
  };

  const [hours, setHours] = useState(hoursTemp);

  const [subTasks, setSubTasks] = useState(selected && selected.subtasks ? selected.subtasks : [{ action: "", checked: 0, id: 0 }]);

  const [error, setError] = useState(false);

  async function queryAI() {
    console.log("querying AI");

    const existingSubTasks = subTasks.filter((e) => e.action !== "");
    const isThereAnySubstask = existingSubTasks.length > 0;

    const content = `${title ? "Título de la tarea: " + title : ""} 
${description ? "Descripción de la tarea: " + description : ""} 
${
  isThereAnySubstask
    ? `Pasos ya existentes: 
${existingSubTasks.map((e, i) => i + 1 + ". " + e.action).join("\n")} 
`
    : ""
} 
Esto es una lista de acciones claras y específicas para completar la tarea según el método GTD. Los pasos deben ser simples, ejecutables en poco tiempo y alineados con el avance hacia la finalización de la tarea. No debes generar ningún diálogo ni explicación, solo una lista. IMPORTANTE: todas las respuestas deben estar en español. Los pasos ya existentes deben omitirse y el enfoque debe estar en lo que falta para completar la tarea (máximo 3 pasos nuevos). El formato debe ser:

Ejemplo:
1. [paso número 1]
2. [paso número 2]
3. [paso número 3]
...

`;

    const hf = new HfInference(process.env.REACT_APP_API_KEY);

    const result = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "user", content }],
      max_tokens: 200,
    });

    const answer = result.choices[0].message.content;

    const steps = answer.split("\n").map((paso) => paso.replace(/^\s*\d+\.\s*/, ""));

    const actions = steps.map((e, i) => ({ action: e, checked: 0, id: subTasks.length > 1 ? i + subTasks.length : i + 1 })).slice(0, 3);

    setSubTasks([...subTasks.filter((e) => e.action !== ""), ...actions]);
  }

  function clear() {
    setOnShowModal(false);
    selected !== false && setSelected(false);
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
          minute = formated.slice(2).length < 2 ? `${formated.slice(2)}0` : formated.slice(2);
        } else {
          return;
        }
      }
    }

    return `${dayjs().hour(hour).format("HH")}:${dayjs().minute(minute).format("mm")}`;
  }

  function handleSubmit() {
    let tempError = error;
    const EVENT = {
      title,
      description,
      label: selectedLabel,
      id: selected ? selected.id : Date.now(),
      origin: onShowModal.to,
      checked: 0,
      day: date,
      time: hours,
      subtasks: subTasks,
    };

    switch (to) {
      case Inbox:
        if (!EVENT.day) {
          setError("Debes elegir un día");
          return;
        }
        if (from === to) {
          EVENT.day = false;
        }
        dispatchCallActionableTODO({
          type: type,
          payload: EVENT,
        });
        break;
      case Calendar:
        EVENT.day = date.valueOf();
        EVENT.time = hours;
        if (!hours.timeStart || !hours.timeEnd) {
          tempError = "Las horas no pueden superar las 24h y los minutos no pueden superar los 60m";
          setError(tempError);
          return;
        }

        const thisTimeStart = parseInt(hours.timeStart.match(/\d/g).toString().replace(/,/g, ""));
        const thisTimeEnd = parseInt(hours.timeEnd.match(/\d/g).toString().replace(/,/g, ""));

        if (thisTimeStart > thisTimeEnd || thisTimeStart === thisTimeEnd) {
          tempError = "La hora de inicio debe ser menor que la hora de termino";
          setError(tempError);
          return;
        }

        let available = savedCalendarEvents.every((i) => {
          if (i.day !== EVENT.day || (selected && i.id === selected.id)) {
            return true;
          }

          const savedTimeStart = parseInt(i.time.timeStart.match(/\d/g).toString().replace(/,/g, ""));
          const savedTimeEnd = parseInt(i.time.timeEnd.match(/\d/g).toString().replace(/,/g, ""));

          return (thisTimeStart < savedTimeStart && thisTimeEnd < savedTimeStart) || thisTimeStart > savedTimeEnd;
        });

        if (!available) {
          tempError = "Ya hay una tarea agendada a esta hora";
          setError(tempError);
        } else {
          dispatchCallCalendarEvent({
            type: type,
            payload: EVENT,
          });
        }

        break;
      case Tickler:
        EVENT.day = date.valueOf();
        dispatchCallTicklerFileEvent({
          type: type,
          payload: EVENT,
        });
        break;
      case Actionables:
        EVENT.subtasks = subTasks.filter((e) => Boolean(e.action));
        EVENT.day = false;
        if (EVENT.subtasks.length < 1) {
          tempError = "Debe haber al menos una acción";
          setError(tempError);
        } else {
          dispatchCallActionableTODO({
            type: type,
            payload: EVENT,
          });
        }
        break;
      case Dumper:
        dispatchCallDumperTODO({
          type: type,
          payload: EVENT,
          name: to,
        });
        break;
      default:
        break;
    }
    if (!tempError) {
      if (from != to && to != Inbox) {
        selected &&
          dispatchCall({
            type: "DELETE",
            payload: selected,
          });
      }
      clear();
    }
  }

  const ticklerCardDisplay = () => (
    <div
      className={"card" + ` ${selectedLabel ? selectedLabel : selected.label}` + " card_modal"}
      onClick={(prop) => {
        prop.stopPropagation();
      }}
    >
      <header className="card__header">
        <button className="actionable-card__button">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          {selected && (
            <button
              type="button"
              onClick={() => {
                dispatchCall({
                  type: "DELETE",
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

      <div className="card__title">
        <input type="text" name="title" required placeholder="Titulo" value={title} className="title-input" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="card__description actionables__description">
        <input type="text" placeholder="Descripción" className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="actions-wrapper">
        <div className="actions-title-wrapper">
          <h3>Pasos:</h3>
          <button
            onClick={() => {
              if (title === "" && description === "") return;
              queryAI();
            }}
            className={title === "" && description === "" ? "disabled" : ""}
          >
            AI
          </button>
        </div>
        <div className="actions">
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
                      subTasks.length > 1 ? setSubTasks([...subTasks.filter((el, indx) => indx !== i)]) : setError("Debe haber al menos una acción");
                    }}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              );
            })}
          <div className="add-action-wrapper">
            <button
              type="button"
              onClick={() => {
                setSubTasks([...subTasks, { action: "", checked: 0, id: dayjs().valueOf() }]);
              }}
              className="add-action"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
      <div className="colors-input">
        {labelsClasses.map((lblClass, i) => (
          <span key={i} onClick={() => setSelectedLabel(lblClass)} className={`${lblClass} color ${selectedLabel === lblClass && "material-symbols-outlined"}`}>
            {selectedLabel === lblClass && "check"}
          </span>
        ))}
      </div>

      <footer>
        <button onClick={handleSubmit} type="button">
          Guardar nota
        </button>
      </footer>
    </div>
  );

  const ideasCardDisplay = () => (
    <div
      className={"card" + ` ${selectedLabel ? selectedLabel : selected.label}` + " card_modal"}
      onClick={(prop) => {
        prop.stopPropagation();
      }}
    >
      <header className="card__header">
        <button className="card__menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          {selected && (
            <button
              type="button"
              onClick={() => {
                dispatchCall({
                  type: "DELETE",
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
      <div className="card__title">
        <input type="text" name="title" required placeholder="Titulo" value={title} className="title-input" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="card__description">
        <textarea type="text" placeholder="Descripción" className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="colors-input">
        {labelsClasses.map((lblClass, i) => (
          <span key={i} onClick={() => setSelectedLabel(lblClass)} className={`${lblClass} color ${selectedLabel === lblClass && "material-symbols-outlined"}`}>
            {selectedLabel === lblClass && "check"}
          </span>
        ))}
      </div>
      <footer>
        <button onClick={handleSubmit} type="button">
          Guardar nota
        </button>
      </footer>
    </div>
  );

  function to_name(to, from) {
    if (to === Actionables) {
      console.log("actionables");
      return ticklerCardDisplay();
    }
    if (to === Dumper) {
      console.log("Dumper");
      return ideasCardDisplay();
    }

    return (
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
                      type: "DELETE",
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
              <input type="text" name="title" required placeholder="Titulo" value={title} className="title-input" onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Descripción" className="description-input" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              {error && <p className="error">{error}</p>}

              {to === Inbox && from !== to && (
                <div className="toInboxButtons">
                  <button
                    type="button"
                    onClick={() => {
                      setError(false);
                      setDate(dayjs(dayjs().format("YYYY-MM-DD")).valueOf());
                    }}
                  >
                    today
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError(false);
                      setDate(dayjs(dayjs().format("YYYY-MM-DD")).add(1, "day").valueOf());
                    }}
                  >
                    tomorrow
                  </button>
                </div>
              )}

              {to === Calendar && (
                <>
                  <div className="date-selector">
                    <input type="date" value={dayjs(date.valueOf()).format("YYYY-MM-DD")} onChange={(e) => setDate(dayjs(e.target.value))} />
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
                  </div>
                </>
              )}

              {to === Tickler && (
                <div className="date-selector">
                  <div className="miniCalendar-section">
                    <input type="date" value={dayjs(date.valueOf()).format("YYYY-MM-DD")} onChange={(e) => setDate(dayjs(e.target.value))} />
                  </div>
                </div>
              )}

              <div className="colors-input">
                {labelsClasses.map((lblClass, i) => (
                  <span key={i} onClick={() => setSelectedLabel(lblClass)} className={`${lblClass} color ${selectedLabel === lblClass && "material-symbols-outlined"}`}>
                    {selectedLabel === lblClass && "check"}
                  </span>
                ))}
              </div>

              <footer>
                <button onClick={handleSubmit} type="button">
                  Guardar nota
                </button>
              </footer>
            </div>
          </div>
        </form>
      </div>
    );
  }

  to_name(to, from);

  return (
    <div
      onClick={(prop) => {
        prop.stopPropagation();
        setOnShowModal(false);
        clear();
      }}
      className="menuModal_wrapper"
    >
      {to_name(to, from)}
    </div>
  );
};
