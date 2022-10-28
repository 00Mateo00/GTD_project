import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./actionableListEventModal.scss";

export const ActionableListEventModal = () => {
  const {
    selectedActionableTODO,
    setSelectedActionableTODO,
    dispatchCallActionableTODO,
    setOnShowModal,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedActionableTODO ? selectedActionableTODO.title : ""
  );
  const [description, setDescription] = useState(
    selectedActionableTODO ? selectedActionableTODO.description : ""
  );

  const [subTasks, setSubTasks] = useState(
    selectedActionableTODO ? selectedActionableTODO.subtasks : [""]
  );


  const [error, setError] = useState(false)

  function handleSubmit() {

    const ActionableTODO = {
      title,
      description,
      subtasks: subTasks && subTasks.filter(e=>Boolean(e)),
      id: selectedActionableTODO ? selectedActionableTODO.id : Date.now(),
    };

    if (ActionableTODO.subtasks<1) {
      setError("there should be at least 1 action")
      return
    }

    if (selectedActionableTODO) {
      dispatchCallActionableTODO({ type: "update", payload: ActionableTODO });
    } else {
      dispatchCallActionableTODO({ type: "push", payload: ActionableTODO });
    }

    setOnShowModal(false);
    setSelectedActionableTODO(false);
    setError(false)
  }

  return (
    <div
      onClick={() => {
        setOnShowModal(false);
        setSelectedActionableTODO(false);
      }}
      className="actionableEvent-Wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="actionableEvent"
      >
        <form>
          <header className="actionableEvent__header">
            <span className="material-symbols-outlined">drag_handle</span>
            <div>
              {selectedActionableTODO && (
                <button
                  onClick={() => {
                    dispatchCallActionableTODO({
                      type: "delete",
                      payload: selectedActionableTODO,
                    });
                    setOnShowModal(false);
                    setSelectedActionableTODO(false);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}

              <button
                onClick={() => {
                  setOnShowModal(false);
                  setSelectedActionableTODO(false);
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>

          <div className="actionableEvent_body">
            <input
              type="text"
              name="title"
              required
              placeholder="Add Title"
              value={title}
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="actions-wrapper">
              <h3>Actions:</h3>
              <div className="actions">
                <p>{error}</p>
                {subTasks.map((e, i) => {
                  return (
                    <div className="input-wrapper">
                      <input
                        key={i}
                        type="text"
                        required={i===0?true:false}
                        className="action"
                        value={subTasks[i]}
                        onChange={(e) =>
                          setSubTasks([
                            ...subTasks.map((el, indx) =>
                              indx === i ? e.target.value : el
                            ),
                          ])
                        }

                        onBlur={()=> setError(false)}
                      />
                      <button type="button" onClick={()=>{
                        subTasks.length>1? setSubTasks([
                            ...subTasks.filter((el, indx) =>
                              indx !== i
                            ),
                          ]): setError("there should be at least 1 action")
                      }}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  );
                })}
                <div className="add-action-wrapper">
                  <button type="button"
                    onClick={() => {
                      setSubTasks([...subTasks, ""]);
                    }}
                    className="add-action"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} type="submit">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
