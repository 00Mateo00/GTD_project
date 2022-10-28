import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./dumperEventModal.scss";

export const DumperEventModal = () => {
  const {
    selectedDumperTODO,
    setSelectedDumperTODO,
    dispatchCallDumperTODO,
    setOnShowModal,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedDumperTODO ? selectedDumperTODO.title : ""
  );
  const [description, setDescription] = useState(
    selectedDumperTODO ? selectedDumperTODO.description : ""
  );

  function handleSubmit() {
    const DumperTODO = {
      title,
      description,
      id: selectedDumperTODO ? selectedDumperTODO.id : Date.now(),
    };

    if (selectedDumperTODO) {
      dispatchCallDumperTODO({ type: "update", payload: DumperTODO });
    } else {
      dispatchCallDumperTODO({ type: "push", payload: DumperTODO });
    }

    setOnShowModal(false);
    setSelectedDumperTODO(false);
  }

  return (
    <div
      onClick={() => {
        setOnShowModal(false);
        setSelectedDumperTODO(false);
      }}
      className="DumperEvent-Wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="DumperEvent"
      >
        <form>
          <header className="DumperEvent__header">
            <span className="material-symbols-outlined">drag_handle</span>
            <div>
              {selectedDumperTODO && (
                <button
                  onClick={() => {
                    dispatchCallDumperTODO({
                      type: "delete",
                      payload: selectedDumperTODO,
                    });
                    setOnShowModal(false);
                    setSelectedDumperTODO(false);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}

              <button
                onClick={() => {
                  setOnShowModal(false);
                  setSelectedDumperTODO(false);
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>

          <div className="DumperEvent_body">
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button onClick={handleSubmit} type="submit">
              {" "}
              save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
