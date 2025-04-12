import styles from './Starfield.module.css';

function Starfield() {
  const particles = Array.from({ length: 60 });

  return (
    <div className={styles.starfield}>
      {particles.map((_, i) => {
        const angle = Math.random() * 360;

        // Soft offset from center (like a burst, not a point)
        const offsetRadius = Math.random() * 30;
        const offsetAngle = Math.random() * 2 * Math.PI;
        const offsetX = Math.cos(offsetAngle) * offsetRadius;
        const offsetY = Math.sin(offsetAngle) * offsetRadius;

        // Particle visual style
        const size = 6 + Math.random() * 4;
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * -duration;
        const opacity = 0.1 + Math.random() * 0.4;

        return (
          <div
            key={i}
            className={styles.particleWrapper}
            style={{
              transform: `rotate(${angle}deg) translate(${offsetX}px, ${offsetY}px)`
            }}
          >
            <div
              className={styles.particle}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                filter: `blur(${Math.random() * 1.2}px)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Starfield;
