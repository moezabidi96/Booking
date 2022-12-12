import React from "react";
import "./options.css";
const Options = ({
  decOptionHandler,
  incOptionHandler,
  options,
  initialOptionsState,
}) => {
  return (
    <div className="options">
      <div className="optionItems">
        <span className="optionItem">Adult</span>
        <div>
          <button
            disabled={options.adult <= initialOptionsState.adult}
            className="optionCounterButton"
            onClick={() => decOptionHandler("adult")}
          >
            -
          </button>
          <span className="optionCounterNumber">{options.adult}</span>
          <button
            className="optionCounterButton"
            onClick={() => incOptionHandler("adult")}
          >
            +
          </button>
        </div>
      </div>
      <div className="optionItems">
        <span className="optionItem">Children</span>
        <div>
          <button
            disabled={options.children <= initialOptionsState.children}
            className="optionCounterButton"
            onClick={() => decOptionHandler("children")}
          >
            -
          </button>
          <span className="optionCounterNumber">{options.children}</span>
          <button
            className="optionCounterButton"
            onClick={() => incOptionHandler("children")}
          >
            +
          </button>
        </div>
      </div>
      <div className="optionItems">
        <span className="optionItem">Room</span>
        <div>
          <button
            disabled={options.room <= initialOptionsState.room}
            className="optionCounterButton"
            onClick={() => decOptionHandler("room")}
          >
            -
          </button>
          <span className="optionCounterNumber">{options.room}</span>
          <button
            className="optionCounterButton"
            onClick={() => incOptionHandler("room")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
