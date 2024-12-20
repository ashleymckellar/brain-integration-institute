/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'

export const Timer = ({seconds}) => {
    const [time, setTime] = useState(seconds)
    const [isTimeUp, setIsTimeUp] = useState(false)
    const timerId = useRef()
    useEffect(() => {
        timerId.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId.current);
                    setIsTimeUp(true)
                    // if (onTimeout) onTimeout(); 
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [isTimeUp]);
    return <>
    <h1>Time Left: {time}</h1></>;
    // {time === 0 && (<p>Time is up!</p>)}
  
};
