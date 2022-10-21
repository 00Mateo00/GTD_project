import React, { useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";
import "./eventModal.scss";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCallTicklerFileEvent,
    selectedTicklerFileEvent,
    setSelectedTicklerFileEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedTicklerFileEvent ? selectedTicklerFileEvent.title : "");
  const [description, setDescription] = useState(
    selectedTicklerFileEvent ? selectedTicklerFileEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedTicklerFileEvent
      ? labelsClasses.find((lbl) => lbl === selectedTicklerFileEvent.label)
      : labelsClasses[0]
  );

  const [isMouseUp, setIsMouseUp] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  function clear() {
    setShowEventModal(false);
    setSelectedTicklerFileEvent(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ticklerFileEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected? daySelected.valueOf() : dayjs().valueOf(),
      id: selectedTicklerFileEvent ? selectedTicklerFileEvent.id : Date.now(),
    };

    if (selectedTicklerFileEvent) {
      dispatchCallTicklerFileEvent({ type: "update", payload: ticklerFileEvent });
    } else {
      dispatchCallTicklerFileEvent({ type: "push", payload: ticklerFileEvent });
    }
    clear();
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
          <span className="material-icons-outlined">drag_handle</span>
          <div>
            {selectedTicklerFileEvent && (
              <span
                onClick={() => {
                  dispatchCallTicklerFileEvent({ type: "delete", payload: selectedTicklerFileEvent });
                  clear();
                }}
                className="material-icons-outlined cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => clear()}>
              <span className="material-icons-outlined">close</span>
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
            <span className="material-icons-outlined">schedule</span>
            <div className="date-selector">
              {daySelected? daySelected.format("dddd,MMMM,DD") : dayjs().format("dddd,MMMM,DD")}
            </div>
            <span className="material-icons-outlined">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a Description"
              value={description}
              required
              className="description-input"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined">bookmark_border</span>
            <div className="colors-input">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${lblClass} color ${
                    selectedLabel === lblClass && "material-icons-outlined"
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
