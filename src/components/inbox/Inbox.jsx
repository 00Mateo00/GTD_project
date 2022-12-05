

export const Inbox = () => {
  const {
    savedActionableTODOS,
    savedCalendarEvents,
    savedTicklerFileEvents
  } = useContext(GlobalContext)
  return (
    <div className="inbox-wrapper">
      <button onClick={()=>console.log(dayjs().valueOf())}>test</button>
      <div className="grid-container">
        {savedCalendarEvents.map((e,i)=>{
          <>
            
          </>
        })}

        {savedTicklerFileEvents.map((e)=>{
          <></>
        })}

        {savedActionableTODOS.map((e,i)=>
          <>
            <div key={i} className="inbox-card">
              <div className="inbox-card__title">
                  <div>{e.title}</div>
                </div>
                <div className="actions-wrapper">
                  <h3>ACTIONS:</h3>
                  <div className="actions">
                    {e.subtasks.map((e, i) => (
                      <p key={i}>- {e.action}</p>
                    ))}
                  </div>
                </div>
            </div>
          </>
        )}
        <div className="button-wrapper">
          <button className="inbox-add-button">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};
