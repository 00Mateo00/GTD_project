import React from "react";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./menuModal.scss";

export const MenuModal = () => {
  const { onShowModal, setOnShowModal, selectedDumperTODO } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedDumperTODO? selectedDumperTODO.title : "")
  const [description, setDescription] = useState(selectedDumperTODO? selectedDumperTODO.description : "")

  return (
    <div
      onClick={() => setOnShowModal(false)}
      className="todoModal_wrapper"
    >
      <div onClick={(e) => e.stopPropagation()} className="todoModal">
        <header className="todoModal__header">
          <button onClick={() => setOnShowModal(false)}>
            <span className="material-icons-outlined">close</span>
          </button>
        </header>
        <div className="todoModal__body">
          <form>
            <input type="text" name="title" placeholder="Add Title" required value={title}/>
            <input type="text" name="description" placeholder="Add description" required value={description}/>
            {onShowModal === "ACTIONABLE LIST" &&
              <>

              </>
            }

            {onShowModal === "CALENDAR" &&
              <>
            
              </>
            }

          </form>
          
        </div>
        <footer>
          <button type="submit"></button>
        </footer>
      </div>
    </div>
  );
};
