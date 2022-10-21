import React from "react";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import "./todoModal.scss";

export const TodoModal = () => {
  const { onShowTodoModal, setOnShowTodoModal, selectedTODO } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedTODO? selectedTODO.title : "")
  const [description, setDescription] = useState(selectedTODO? selectedTODO.description : "")

  return (
    <div
      onClick={() => setOnShowTodoModal(false)}
      className="todoModal_wrapper"
    >
      <div onClick={(e) => e.stopPropagation()} className="todoModal">
        <header className="todoModal__header">
          <button onClick={() => setOnShowTodoModal(false)}>
            <span className="material-icons-outlined">close</span>
          </button>
        </header>
        <div className="todoModal__body">
          <form>
            <input type="text" name="title" placeholder="Add Title" required value={title}/>
            <input type="text" name="description" placeholder="Add description" required value={description}/>
            {onShowTodoModal === "ACTIONABLE LIST" &&
              <>

              </>
            }

            {onShowTodoModal === "CALENDAR" &&
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
