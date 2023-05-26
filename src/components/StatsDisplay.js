import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const StatsDisplay = ({
    keysPressed,
    accuracy,
    timeRemaining,
    startTime,
    renderTime,
    timerKey
}) => {
    return (
        <div>
            <h2>Keys Pressed: {keysPressed}</h2>
            <h2>Accuracy: {accuracy}%</h2>
            <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={timeRemaining}
                colors
                renderTime={renderTime}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    );
};

export default StatsDisplay;
