import gsap from 'gsap';

export function initCalculator() {
    const btn = document.getElementById('calc-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const revenue = parseFloat(document.getElementById('monthly-revenue').value) || 100000;
        const hourlyRate = parseFloat(document.getElementById('founder-hours').value) || 500;
        const wastedHrs = parseFloat(document.getElementById('wasted-hours').value) || 15;

        // Formula: wasted founder time + operational inefficiency (8% of revenue)
        const founderTimeCost = hourlyRate * wastedHrs * 52;
        const operationalLeak = revenue * 12 * 0.08;
        const total = Math.round(founderTimeCost + operationalLeak);

        const resultEl = document.getElementById('calc-result');
        const numEl = document.getElementById('result-number');

        resultEl.classList.remove('hidden');

        // Ripple on button
        btn.style.pointerEvents = 'none';

        // Count up animation
        gsap.fromTo({ val: 0 }, { val: 0 }, {
            val: total,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
                numEl.textContent = Math.round(this.targets()[0].val).toLocaleString();
            },
            onComplete: () => { btn.style.pointerEvents = 'auto'; }
        });

        // Reveal result with slide
        gsap.fromTo(resultEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // Scroll into result
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Button ripple effect
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        ripple.style.cssText = `
            position:absolute; border-radius:50%;
            width:10px; height:10px;
            background:rgba(255,255,255,0.25);
            top:${e.clientY - rect.top}px;
            left:${e.clientX - rect.left}px;
            transform:translate(-50%,-50%) scale(0);
            pointer-events:none;
        `;
        btn.style.position = 'relative';
        btn.appendChild(ripple);
        gsap.to(ripple, {
            scale: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });
    });
}
