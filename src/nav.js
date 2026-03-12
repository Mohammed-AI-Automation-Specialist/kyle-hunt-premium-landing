// ─── IMPORTANT: Replace this URL with your actual Calendly link ───────────
const CALENDLY_URL = 'https://calendly.com/growthframeagency/30min';

export function initNav() {
    initStickyNav();
    initHamburger();
    initVideoOverlay();
    initDashboardParallax();
    initCalendlyPopup();
}

/* ── Calendly Popup Intercept ──────────────────────────────────────── */
function initCalendlyPopup() {
    // Find all links that point to the calendly URL
    const ctaBtns = document.querySelectorAll(`a[href*="calendly.com"]`);

    ctaBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Use Calendly's widget if loaded
            if (window.Calendly) {
                Calendly.initPopupWidget({ url: CALENDLY_URL });
            } else {
                // Fallback: open in new tab
                window.open(CALENDLY_URL, '_blank');
            }
        });
    });
}


/* ── Sticky Nav Scroll Effect ─────────────────────────────────────── */
function initStickyNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ── Hamburger Mobile Menu ────────────────────────────────────────── */
function initHamburger() {
    const btn  = document.getElementById('nav-hamburger');
    const menu = document.getElementById('nav-mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        // Animate the three spans into an X
        const spans = btn.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Close menu when any link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            const spans = btn.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
}

/* ── Loom Video Click-to-Reveal ───────────────────────────────────── */
function initVideoOverlay() {
    const overlay = document.getElementById('video-overlay');
    const iframe  = document.getElementById('loom-embed');
    if (!overlay || !iframe) return;

    overlay.addEventListener('click', () => {
        // Reveal the iframe (it already has src and autoplay)
        overlay.classList.add('hidden');
        iframe.style.pointerEvents = 'auto';
    });
}

/* ── Dashboard Parallax on Mouse Move ────────────────────────────── */
function initDashboardParallax() {
    const scene  = document.getElementById('parallax-scene');
    if (!scene) return;

    const layers = scene.querySelectorAll('.parallax-layer');

    scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
        const dy   = (e.clientY - cy) / (rect.height / 2); // -1 to 1

        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed || 0.5);
            const moveX = dx * speed * 25;
            const moveY = dy * speed * 15;
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    scene.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            layer.style.transform = '';
            layer.style.transition = 'transform 0.8s cubic-bezier(0.25,1,0.5,1)';
        });
        setTimeout(() => {
            layers.forEach(l => l.style.transition = '');
        }, 800);
    });

    // Also handle scroll-based parallax
    window.addEventListener('scroll', () => {
        const rect = scene.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed || 0.5);
            const moveY = (progress - 0.5) * speed * -60;
            layer.style.transform = `translateY(${moveY}px)`;
        });
    }, { passive: true });
}
