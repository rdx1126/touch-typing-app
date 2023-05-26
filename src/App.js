import React, { useState, useEffect } from "react";
import TypingBox from "./components/TypingBox";
import KeysDisplay from "./components/KeysDisplay";
import StatsDisplay from "./components/StatsDisplay";
import "./App.css";
import { Typography } from "@material-ui/core";

const App = () => {
    const [targetKey, setTargetKey] = useState("");
    const [userInput, setUserInput] = useState("");
    const [keysPressed, setKeysPressed] = useState(0);
    const [correctKeysPressed, setCorrectKeysPressed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(true);
    const [timerKey, setTimerKey] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(300);

    useEffect(() => {
        setTargetKey(generateRandomKey());
        setStartTime(Date.now());
    }, []);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setTimeRemaining(0);
            setIsFinished(true);
            return (
                <Typography variant="h6" color="error">
                    Time's up!
                </Typography>
            );
        }

        return (
            <>
                <Typography variant="h6" color="primary">
                    {remainingTime} seconds
                </Typography>
            </>
        );
    };

    const generateRandomKey = () => {
        const keys = "asdfjkl;";
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    };

    const handleInputChange = (event) => {
        if (!startTime) {
            setStartTime(Date.now());
        }

        const input = event.target.value;
        setUserInput(input);
        setKeysPressed(keysPressed + 1);

        const calculatedAccuracy = calculateAccuracy();
        setAccuracy(calculatedAccuracy);

        if (input.includes(targetKey)) {
            setTargetKey(generateRandomKey());
            setCorrectKeysPressed(correctKeysPressed + 1);
            setUserInput("");
        }
    };

    const calculateAccuracy = () => {
        const totalKeystrokes = keysPressed;
        const correctKeystrokes = correctKeysPressed;
        return totalKeystrokes > 0
            ? Math.floor((correctKeystrokes / totalKeystrokes) * 100)
            : 100;
    };

    const handleTimeUp = () => {
        const endTime = Date.now();
        const timeElapsed = Math.floor((endTime - startTime) / 1000);

        const calculatedAccuracy = calculateAccuracy();
        setAccuracy(calculatedAccuracy);

        setIsFinished(true);
    };

    const handleRestart = () => {
        setUserInput("");
        setKeysPressed(0);
        setAccuracy(100);
        setCorrectKeysPressed(0);
        setIsFinished(false);
        setTargetKey(generateRandomKey());
        setStartTime(null);
        setTimeRemaining(300);
        setTimerKey(timerKey + 1);
    };

    return (
        <div className="App">
            <h1>Touch Typing Practice</h1>
            <TypingBox
                value={userInput}
                onChange={handleInputChange}
                onTimeUp={handleTimeUp}
                onStart={handleRestart}
                disabled={isFinished}
                isFinished={isFinished}
            />
            <div className="keys-display">
                <KeysDisplay targetKey={targetKey} />
            </div>
            <div className="stats-display">
                {!isFinished ? (
                    <StatsDisplay
                        keysPressed={keysPressed}
                        accuracy={accuracy}
                        timeRemaining={timeRemaining}
                        startTime={startTime}
                        renderTime={renderTime}
                        timerKey={timerKey}
                    />
                ) : (
                    <div>
                        <h2>Practice Finished</h2>
                        <p>Keys Pressed: {keysPressed}</p>
                        <p>Accuracy: {accuracy}%</p>
                        <p>
                            Score: {correctKeysPressed}/{keysPressed}
                        </p>

                        <button onClick={handleRestart}>Start</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
