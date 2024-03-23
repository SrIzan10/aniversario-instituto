'use client'

import React, { useEffect, useState } from 'react';
import { jetbrainsMonoFont } from "@/util/jetbrainsMonoFont";
import styles from './index.module.css'

export default function Countdown() {
  const eventDate = new Date(1711108800 * 1000);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const func = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
      });
    }

    func();
    const timer = setInterval(() => {
      func()
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={jetbrainsMonoFont.style} className={styles.countdown}>
      {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </div>
  );
}