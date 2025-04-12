import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar({ progress }) {

    const [displayedProgress, setDisplayedProgress] = useState(progress);

    useEffect(() => {
        if (displayedProgress === progress) return;
      
        const timeout = setTimeout(() => {
            setDisplayedProgress(prev => {
              const next = prev < progress ? prev + 1 : prev - 1;
          
              if (Math.abs(next - progress) < 1) {
                return progress;
              }
          
              return next;
            });
        }, 10);         
        return () => clearTimeout(timeout);
    }, [progress, displayedProgress]);
      
    const progressHue = progress / 100 * 190;
    const primaryColor = `hsl(${progressHue}, 100%, 50%)`;
    const pairColor = `hsl(${progressHue + 10}, 100%, 50%)`; 
    
    

    return(
        <div>
            <div className={styles.progressBar} style={{"--progress": `${progress}%`, "--fill-color": `${primaryColor}`, "--pair-color": `${pairColor}`}}>
            <div className={styles.progressFill}>
                <div className={styles.progressText}>{Math.trunc(displayedProgress)}%</div>
            </div>
            </div>
        </div>
        
    );
}

export default ProgressBar;