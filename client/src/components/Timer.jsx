/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'

export const Timer = ({seconds}) => {
    const [time, setTime] = useState(seconds)
    const [isTimeUp, setIsTimeUp] = useState(false)
    const timerId = useRef()

    const convertToHHMMSS = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    useEffect(() => {
        timerId.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId.current);
                    setIsTimeUp(true)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [isTimeUp]);


    return (
        <div className='flex flex-col pb-10'>
            <h1 className='text-xl'>Time Left: {convertToHHMMSS(time)}</h1>
        </div>
    );
};
