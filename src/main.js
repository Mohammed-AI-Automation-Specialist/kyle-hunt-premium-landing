import '../styles/main.css';
import { initScroll } from './scroll.js';
import { initAnimations } from './animations.js';
import { initCalculator } from './calculator.js';
import { initNav } from './nav.js';

// Initialize core systems on content load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Smooth Scrolling
    initScroll();

    // 2. Initialize GSAP Animations
    initAnimations();

    // 3. Initialize Calculator Logic
    initCalculator();

    // 4. Nav, Video, Parallax
    initNav();

    // 5. Custom Cursor Logic
    initCustomCursor();
});

function initCustomCursor() {
    const cursor = document.getElementById('cursor-orb');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        // Smoothly follow the mouse
        cursor.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Expand on interactive elements
    const interactives = document.querySelectorAll('a, button, input, .interactive');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
}
