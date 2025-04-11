import React from 'react';

function ProgressBar({ progress }) {
 
    const hue = (progress / 100) * 180;
    const hsl = `hsl(${hue}, 100%, 50%)`;
    let pairColor = "#000";

    if (progress > 75) {
        pairColor = "#6c5ce7";
    } else if (progress > 50) {
        pairColor = "#00cec9";
    } else if (progress > 25) {
        pairColor = "#ff9f43";
    } else {
        pairColor = "#ff6b6b";
    }
    
    

    return(
        <div>
            <div className="progress-bar" style={{"--progress": `${progress}%`, "--fill-color": `${hsl}`, "--pair-color": `${pairColor}`}}>
            <div className="progress-fill">
                <div className="progress-text">{Math.trunc(progress)}%</div>
            </div>
            </div>
        </div>
        
    );
}

export default ProgressBar;