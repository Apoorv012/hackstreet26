// src/components/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // TARGET DATE: April 4, 2026 12:00 AM
    const targetDate = new Date("Apr 4, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer-wrapper">
      <div className="timer-glass-panel">

        {/* Days (日) */}
        <div className="time-unit">
          <div className="number">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</div>
          <div className="label">
            <span className="kanji">日</span>
            <span className="eng">DAYS</span>
          </div>
        </div>

        <div className="separator">:</div>

        {/* Hours (時) */}
        <div className="time-unit">
          <div className="number">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</div>
          <div className="label">
            <span className="kanji">時</span>
            <span className="eng">HRS</span>
          </div>
        </div>

        <div className="separator">:</div>

        {/* Minutes (分) */}
        <div className="time-unit">
          <div className="number">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</div>
          <div className="label">
            <span className="kanji">分</span>
            <span className="eng">MINS</span>
          </div>
        </div>

        <div className="separator">:</div>

        {/* Seconds (秒) */}
        <div className="time-unit">
          <div className="number red-pulse">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</div>
          <div className="label">
            <span className="kanji">秒</span>
            <span className="eng">SECS</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountdownTimer;