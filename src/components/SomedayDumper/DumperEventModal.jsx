import React from "react";
import { useContext } from "react";
import { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./dumperEventModal.scss";

export const DumperEventModal = ({ setShowEditor }) => {
  const { selectedTODO, setSelectedTODO, dispatchCallDumperTODO } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedTODO ? selectedTODO.title : "");
  const [description, setDescription] = useState(
    selectedTODO ? selectedTODO.description : ""
  );

  function handleSubmit() {
    const DumperTODO = {
      title,
      description,
      id: selectedTODO ? selectedTODO.id : Date.now(),
    };

    if (selectedTODO) {
      dispatchCallDumperTODO({ type: "update", payload: DumperTODO });
    } else {
      dispatchCallDumperTODO({ type: "push", payload: DumperTODO });
    }

    setShowEditor(false);
    setSelectedTODO(false);
  }

  return (
    <div onClick={() => setShowEditor(false)} className="DumperEvent-Wrapper">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="DumperEvent"
      >
        <form>
          <header className="DumperEvent__header">
            <span className="material-icons-outlined">drag_handle</span>
            <div>

              <button
                onClick={() => {
                  dispatchCallDumperTODO({ type: "delete", payload: selectedTODO })
                  setShowEditor(false);
                  setSelectedTODO(false);
                }}
              >
                <span className="material-icons-outlined">delete</span>
              </button>

              <button
                onClick={() => {
                  setShowEditor(false);
                  setSelectedTODO(false);
                }}
              >
                <span className="material-icons-outlined">close</span>
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
