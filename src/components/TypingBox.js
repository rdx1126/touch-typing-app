import React from "react";

const TypingBox = ({ value, onChange, onTimeUp, isFinished, onStart }) => {
    return (
        <div>
            {isFinished == true ? (
                ""
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    autoFocus
                />
            )}
            {isFinished == true ? (
                ""
            ) : (
                <button onClick={onTimeUp}>Finish</button>
            )}
        </div>
    );
};

export default TypingBox;
