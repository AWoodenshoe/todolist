import { useState, useEffect } from 'react';
import styles from './CornerBadge.module.css';
import confetti from 'canvas-confetti';
import DigitalClock from "../DigitalClock/DigitalClock.jsx";

function CornerBadge() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    function toggleCollapse() {
        setIsCollapsed(prev => !prev);
      }
    
    function triggerConfettiRain() {

        const duration = 4 * 1000; // 4 seconds
        const end = Date.now() + duration;
      
        const interval = setInterval(() => {
          confetti({
            particleCount: 5,
            angle: 90,
            spread: 55,
            origin: { x: Math.random(), y: 0 },
            ticks: 500
          });
      
          if (Date.now() > end) clearInterval(interval);
        }, 100);
      }
      

    return(
        <div className={`${styles.badgeContainer} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            <button onClick={toggleCollapse} className={styles.toggleButton}>
            <svg
  className={`${styles.arrowIcon} ${!isCollapsed ? styles.rotated : ''}`}
  viewBox="0 0 24 24"
  width="20"
  height="20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9 6l6 6-6 6"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
</button>

            {isCollapsed ? (
                ""
            ) : (
                <div className={styles.expandedContainer}>
                    <DigitalClock />
                    <button onClick={triggerConfettiRain} className={styles.confettiButton}>🎉</button>
                </div>
            )}
        </div>
    );
}

export default CornerBadge;