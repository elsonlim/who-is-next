import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Timer.css";

export const convertTimeToString = (num) => {
  return (num < 10 ? "0" : "") + num;
};

export const getMins = (time) => {
  const mins = Math.floor(time / 60);
  const minsInString = convertTimeToString(mins);
  return minsInString;
};
export const getSeconds = (time) => {
  const seconds = Math.ceil(time % 60);
  const secInString = convertTimeToString(seconds);
  return secInString;
};

const Counter = ({ timeLeft, setTimeLeft, disabled = false }) => {
  const handleMinsChange = (ev) => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    if (isNaN(inputtedValue)) return;
    const seconds = timeLeft % 60;
    const mins = Number(inputtedValue) * 60;
    setTimeLeft(mins + seconds);
  };

  const handleSecondsChange = (ev) => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    if (isNaN(inputtedValue)) return;
    const mins = getMins(timeLeft);
    const seconds = Math.min(Number(inputtedValue), 59);
    setTimeLeft(mins + seconds);
  };

  const onClickPlus = () => {
    const oneMin = 60;
    setTimeLeft(timeLeft + oneMin);
  };

  const onClickMinus = () => {
    if (timeLeft >= 60) {
      setTimeLeft(timeLeft - 60);
    } else {
      setTimeLeft(0);
    }
  };

  return (
    <>
      {!disabled && (
        <span className="timer--set--icon" onClick={onClickMinus}>
          -
        </span>
      )}
      <input
        type="text"
        className="timer--set--text"
        disabled={disabled}
        maxLength={2}
        value={getMins(timeLeft)}
        aria-label="mins"
        onChange={handleMinsChange}
      />
      :
      <input
        type="text"
        className="timer--set--text"
        disabled={disabled}
        maxLength={2}
        value={getSeconds(timeLeft)}
        aria-label="seconds"
        onChange={handleSecondsChange}
      />
      {!disabled && (
        <span className="timer--set--icon" onClick={onClickPlus}>
          +
        </span>
      )}
    </>
  );
};

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [originalTimeLeft, setOriginalTimeLeft] = useState(0);

  const reset = () => {
    setTimeLeft(originalTimeLeft);
    console.log("reset", intervalId);
    clearInterval(intervalId);
    setIsCountingDown(false);
  };

  const startTimer = () => {
    const future = new Date(new Date().getTime() + timeLeft * 1000);
    const originalTimeLeft = timeLeft;
    const intervalId = setInterval(function () {
      const now = new Date();
      const distance = future - now;
      console.log("distance", distance);
      const seconds = Math.ceil(distance / 1000);
      console.log("seconds", seconds);
      setTimeLeft(seconds);

      if (seconds <= 0) {
        reset();
        clearInterval(intervalId);
      }
    }, 100);
    console.log(intervalId);
    setIntervalId(intervalId);
    setOriginalTimeLeft(originalTimeLeft);
  };

  return (
    <div>
      <div className="timer--set">
        <Counter
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          disabled={isCountingDown}
        />

        <div className="timer--control">
          <span
            className="timer--set--icon"
            onClick={() => {
              setIsCountingDown(true);
              startTimer();
            }}
          >
            {"\u25B6"}
          </span>
        </div>
      </div>
    </div>
  );
};
