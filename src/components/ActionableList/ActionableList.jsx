import React from 'react'
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { MenuModal } from '../modals/MenuModal';
import { ActionableListEventModal } from './ActionableListEventModal';
import './actionableList.scss';

export const ActionableList = () => {

  const {savedActionableTODOS, setSelectedActionableTODO, onShowModal, setOnShowModal, showMenu, setShowMenu} = useContext(GlobalContext)

  const actionables = savedActionableTODOS
    .map((e, i) => {
      return (
        <div
          onClick={() => {
            setSelectedActionableTODO(e);
            setOnShowModal("default");
          }}
          className="actionable-card"
          key={i}
        >
          {showMenu !== i && (
            <>
              <div onClick={()=>{
              }} className="actionable-card__menu">
                <span
                  onClick={(prop) => {
                    prop.stopPropagation();
                    setSelectedActionableTODO(e)
                    setShowMenu(i);
                  }}
                  className="material-icons-outlined"
                >
                  menu
                </span>
              </div>
              <div className="actionable-card__title">
                <div>{e.title}</div>
              </div>
              <div className='actions-wrapper'>
                <h3>ACTIONS:</h3>
                <div className="actions">
                  {e.subtasks.map((e, i) => <p key={i}>- {e}</p>)}
                </div>
              </div>
              
            </>
          )}

          {showMenu === i && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              className="menu-wrapper"
            >
              <div className="menu">
                <header className="header-wrapper">
                  <button onClick={() => setShowMenu(false)}>
                    <span className="material-icons-outlined">arrow_back</span>
                  </button>
                </header>
                <ul className="menu-body">
                  <li>INBOX</li>
                  <li>CALENDAR</li>
                  <li>TICKLER FILE</li>
                  <li onClick={()=>setOnShowModal("DUMPER")}>Dumper</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    })
    .reverse();

  return (
    <div
      onClick={() => {
        setShowMenu(false);
      }}
      className="actionable-wrapper"
    >
      <div className="grid-container">
        {actionables}
        <div className="add-button">
          <div className="button-wrapper">
            <button
              onClick={() => setOnShowModal("default")}
              className="actionable-add-button"
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
      {onShowModal && onShowModal !=="default" && <MenuModal/>}
      {onShowModal === "default" && <ActionableListEventModal/>}
    </div>
  )
}
