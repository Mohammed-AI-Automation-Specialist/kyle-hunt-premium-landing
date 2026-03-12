import Lenis from 'lenis';

export let lenis;

export function initScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing
        direction: 'vertical', 
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Handle scroll progress bar
    const progressBar = document.getElementById('progress-bar');

    lenis.on('scroll', (e) => {
        if(progressBar) {
            const progress = (e.scroll / e.limit) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
