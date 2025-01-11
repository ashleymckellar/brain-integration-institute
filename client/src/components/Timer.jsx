/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from 'react';
import { AssessmentContext } from '../contexts';

export const Timer = ({ seconds, setTime }) => {
    const [time, setLocalTime] = useState(seconds);
    // const [isTimeUp, setIsTimeUp] = useState(false)
    const timerId = useRef();
    const { isTimeUp, setIsTimeUp } = useContext(AssessmentContext);
    const [showTime, setShowTime] = useState(true);

    const convertToHHMMSS = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`;
    };

    const toggleShowTime = () => {
        setShowTime(!showTime);
    };
    useEffect(() => {
        // Initialize time from sessionStorage if available
        const savedTime = sessionStorage.getItem('timeRemaining');
        if (savedTime) {
            setLocalTime(parseInt(savedTime, 10)); // Use the saved time
        } else {
            setLocalTime(seconds); // Fall back to the initial `seconds` prop
        }
    }, [seconds]);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timerId.current);
                    setIsTimeUp(true);
                    return 0;
                }
                const updatedTime = prev - 1;
                // Save the updated time to sessionStorage
                sessionStorage.setItem('timeRemaining', updatedTime);
                return updatedTime;
            });
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [setTime, setIsTimeUp]);

    useEffect(() => {
        setTime(time);
    }, [time, setTime]);

    // console.log(isTimeUp);
    // console.log(time);

    return (
        <div>
            {showTime && (
                 <div className="flex flex-col text-center py-10 gap-2">
                    <h1 className="text-xl">{convertToHHMMSS(time)}</h1>
                    <h1 className="text-xl">Time Remaining</h1>
                </div>
            )}
            {showTime ? (
                <button
                      className="bg-medium-pale-green hover:bg-green-600 mb-10 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
                    onClick={toggleShowTime}
                >
                    Hide Timer
                </button>
            ) : (
                <div className="flex flex-col text-center py-10 gap-2">
                <button
                    className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
                    onClick={toggleShowTime}
                >
                    Show Timer
                </button>
                </div>
            )}
        </div>
    );
};