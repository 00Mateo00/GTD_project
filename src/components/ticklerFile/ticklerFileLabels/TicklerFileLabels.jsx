import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import './ticklerFileLabels.scss';

const TicklerFileLabels = () => {
  const { ticklerFileLabel, updateTicklerFileLabel } = useContext(GlobalContext);
  return (
    <div className="label-wrapper">
      <p >Label</p>
      <div className="list-wrapper">
        {ticklerFileLabel.map(({ label: lbl, checked }, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              checked={checked}
              onChange={()=> updateTicklerFileLabel({label: lbl, checked: !checked})}
            />
            <span className={`checkMark text-${lbl}`}></span>  {lbl}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TicklerFileLabels;
