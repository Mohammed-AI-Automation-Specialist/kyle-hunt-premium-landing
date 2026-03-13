import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
    // Set GSAP initial states only for transform/blur, not opacity 0 (to avoid invisible text if JS fails)
    gsap.set('.problem-card', { y: 60 });
    gsap.set('.pipeline-node', { x: -40 });
    gsap.set('.result-stat', { y: 40 });
    gsap.set('.final-cta-headline', { clipPath: 'inset(0 0 100% 0)' });

    initHeroAnimation();
    initProblemCards();
    initChaosGraph();
    initSystemsPipeline();
    initResultStats();
    initFinalCTA();
    initTiltCards();
    initMagneticButtons();
    initParticles();
}

/* ── Hero Cinematic Entry ─────────────────────────────────────────── */
function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-headline', {
        duration: 1.2,
        y: 60,
        opacity: 0,
        filter: 'blur(10px)',
    })
    .from('.hero-subheadline', {
        duration: 0.8,
        opacity: 0,
        y: 20
    }, '-=0.6')
    .from('.cta-button', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.hero-video-wrapper', {
        duration: 1.2,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    }, '-=0.4');

    // Pulsing glow on CTA
    gsap.to('#hero-cta', {
        boxShadow: '0 0 35px rgba(62,139,255,0.5)',
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: 'sine.inOut',
        delay: 2
    });
}

/* ── Problem Cards Narrative Scroll ─────────────────────────────────── */
function initProblemCards() {
    gsap.set('.narrative-cards', { opacity: 0, y: 50 });
    
    // Create a pinned timeline for narrative scrolling
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.problem-section',
            start: 'center center',
            end: '+=1200', // How long the pin lasts during scroll
            pin: true,
            scrub: 1, // Smooth scrub effect
            ease: 'power1.inOut'
        }
    });

    // Fade out text, then fade in cards sequentially
    tl.to('.narrative-title', { opacity: 0.1, y: -20, duration: 1 })
      .to('.narrative-subtitle', { opacity: 0, y: -20, duration: 1 }, '<')
      .to('.narrative-cards', { opacity: 1, y: 0, duration: 1.5 }, '-=0.5')
      .to('.problem-card', { opacity: 1, y: 0, duration: 1, stagger: 0.5 }, '<');
}

/* ── Chaos Graph SVG ──────────────────────────────────────────────── */
function initChaosGraph() {
    const container = document.getElementById('chaos-graph');
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    const chaosX = isMobile ? 20 : 10;
    const systemX = isMobile ? 480 : 640;
    const systemFontSize = isMobile ? 18 : 14;

    container.innerHTML = `
        <svg viewBox="0 0 1000 260" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="padding:10px">
            <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#3E8BFF;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D4AF37;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Labels -->
            <text x="${chaosX}" y="35" fill="rgba(255,255,255,0.35)" font-size="16" font-family="Inter">Chaos</text>
            <text x="${systemX}" y="35" fill="#3E8BFF" font-size="${systemFontSize}" font-family="Inter" font-weight="600">Phase: Scaling Systems</text>
            <!-- Chaos Line -->
            <path id="chaos-path" d="M 0,200 Q 80,150 160,220 T 320,140 T 480,190 T 600,100" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
            <!-- System Line -->
            <path id="system-path" d="M 600,100 L 1000,20" fill="none" stroke="url(#blueGrad)" stroke-width="3" stroke-dasharray="600" stroke-dashoffset="600"/>
            <!-- Pivot Point -->
            <circle id="pivot-dot" cx="600" cy="100" r="7" fill="#D4AF37" opacity="0"/>
        </svg>
    `;

    const tl = gsap.timeline({
        scrollTrigger: { trigger: '#chaos-graph', start: 'top 78%' }
    });

    tl.to('#system-path', { duration: 1.6, strokeDashoffset: 0, ease: 'power2.out' })
      .to('#pivot-dot', { duration: 0.4, opacity: 1, ease: 'power2.out' }, '-=1.2')
      .to('#pivot-dot', { duration: 0.5, scale: 1.5, yoyo: true, repeat: 1, transformOrigin: 'center' }, '-=0.8');
}

/* ── Systems Pipeline Nodes ───────────────────────────────────────── */
function initSystemsPipeline() {
    const nodes = gsap.utils.toArray('.pipeline-node');

    nodes.forEach((node, i) => {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: 'top 80%',
                onEnter: () => {
                    node.classList.add('is-active');
                    gsap.to(node, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1 });
                }
            },
        });
    });
}

/* ── Results Counter Animation ────────────────────────────────────── */
function initResultStats() {
    const stats = document.querySelectorAll('.result-stat');

    stats.forEach((statEl, i) => {
        const numEl = statEl.querySelector('.stat-number');
        const target = parseFloat(numEl.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: '.results-grid',
            start: 'top 80%',
            onEnter: () => {
                gsap.to(statEl, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out' });
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.8,
                    delay: i * 0.15 + 0.3,
                    ease: 'power2.out',
                    onUpdate: function () {
                        numEl.textContent = Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });
}

/* ── Final CTA Headline Mask Reveal ───────────────────────────────── */
function initFinalCTA() {
    gsap.to('.final-cta-headline', {
        scrollTrigger: {
            trigger: '.final-cta-section',
            start: 'top 75%'
        },
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    });
}

/* ── 3D Card Tilt on Hover ────────────────────────────────────────── */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured-card')
                ? 'scale(1.02)'
                : '';
        });
    });
}

/* ── Magnetic Button Effect ───────────────────────────────────────── */
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic-btn');

    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.35;
            const dy = (e.clientY - cy) * 0.35;
            gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

/* ── Particle Background ──────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.r = Math.random() * 1.2 + 0.3;
            this.alpha = Math.random() * 0.4 + 0.1;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 210, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    function loop() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
}
