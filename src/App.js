import React, { useState, useEffect } from 'react';
import TypingBox from './components/TypingBox';
import KeysDisplay from './components/KeysDisplay';
import StatsDisplay from './components/StatsDisplay';

const App = () => {
  const [targetKey, setTargetKey] = useState('');
  const [userInput, setUserInput] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setTargetKey(generateRandomKey());
    setStartTime(Date.now());
  }, []);

  const generateRandomKey = () => {
    const keys = 'asdfjkl;';
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    if (input === targetKey) {
      setKeysPressed(keysPressed + 1);
      setTargetKey(generateRandomKey());
      setUserInput('');
    }
  };

  const calculateAccuracy = () => {
    const totalChars = keysPressed;
    const incorrectChars = totalChars - accuracy;
    return Math.floor((accuracy / totalChars) * 100);
  };

  const handleTimeUp = () => {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds

    // Calculate accuracy and update state
    const calculatedAccuracy = calculateAccuracy();
    setAccuracy(calculatedAccuracy);

    // Display the results
    alert(`Time's up! You typed ${keysPressed} keys in ${timeElapsed} seconds with ${calculatedAccuracy}% accuracy.`);

    // Reset the state for a new practice session
    setTargetKey(generateRandomKey());
    setUserInput('');
    setKeysPressed(0);
    setAccuracy(100);
    setStartTime(Date.now());
  };

  return (
    <div className="App">
      <h1>Touch Typing Practice</h1>
      <TypingBox value={userInput} onChange={handleInputChange} onTimeUp={handleTimeUp} />
      <KeysDisplay targetKey={targetKey} />
      <StatsDisplay keysPressed={keysPressed} accuracy={accuracy} />
    </div>
  );
};

export default App;
