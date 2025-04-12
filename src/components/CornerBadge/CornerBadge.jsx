import { useState, useEffect } from 'react';
import styles from './CornerBadge.module.css';
import confetti from 'canvas-confetti';


function CornerBadge() {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCollapsed, setIsCollapsed] = useState(false);

    function toggleCollapse() {
        setIsCollapsed(prev => !prev);
      }

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval); // Cleanup
    }, []);

    const formattedTime = currentTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    
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
            {isCollapsed ? (
                <button onClick={toggleCollapse} className={styles.toggleButton}>⯈</button>
            ) : (
                <div className={styles.expandedContainer}>
                    <button onClick={toggleCollapse} className={styles.toggleButton}>⯇</button>
                    <p>
                        <span className={styles.monospace}>⌛{formattedTime}</span>
                        <button onClick={triggerConfettiRain} className={styles.confettiButton}>🎉</button>
                    </p>
                </div>
            )}
        </div>
    );
}

export default CornerBadge;