import React, { useEffect } from 'react';
import './ShootingStars.css';

export const ShootingStars = () => {
  useEffect(() => {
    const sky = document.getElementById('starry_sky');
    if (!sky) return;

    // 流れ星を流す処理
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 2) + 2;

      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');

        const size = Math.random() * 2 + 5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        const startTop = 0;
        const startRight = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.2;

        star.style.top = `${startTop}px`;
        star.style.left = `${startRight}px`;
        star.style.animationDuration = `${Math.random() * 1 + 1.5}s`;

        sky.appendChild(star);

        setTimeout(() => {
          sky.removeChild(star);
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <div id="starry_sky"></div>;
};
