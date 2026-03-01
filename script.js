/* ═══════════════════════════════════════════════════
   Calm Routines — Promotional Website Scripts
   ═══════════════════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');

function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


// ── Mobile navigation toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
    });
});


// ── Scroll-reveal animations ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
    }
);

revealElements.forEach(el => revealObserver.observe(el));


// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});


// ── Parallax effect on hero orbs ──
const heroOrbs = document.querySelectorAll('.hero-orb');

function handleParallax() {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;

    if (scrollY < maxScroll) {
        const factor = scrollY / maxScroll;
        heroOrbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.3;
            orb.style.transform = `translateY(${factor * speed * 80}px)`;
        });
    }
}

window.addEventListener('scroll', handleParallax, { passive: true });


// ── FAQ Accordion ──
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all other items
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle clicked item
        item.classList.toggle('open', !isOpen);
        button.setAttribute('aria-expanded', !isOpen);
    });
});


// ── Waitlist Form ──
const waitlistForm = document.getElementById('waitlistForm');
const waitlistEmail = document.getElementById('waitlistEmail');
const waitlistSuccess = document.getElementById('waitlistSuccess');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = waitlistEmail.value.trim();
        if (!email) return;

        // Store email in localStorage as a simple client-side list
        // In production, this would POST to a backend/Mailchimp/etc.
        const existing = JSON.parse(localStorage.getItem('calm_waitlist') || '[]');
        if (!existing.includes(email)) {
            existing.push(email);
            localStorage.setItem('calm_waitlist', JSON.stringify(existing));
        }

        // Show success state
        waitlistEmail.value = '';
        waitlistForm.querySelector('.waitlist-input-group').style.display = 'none';
        waitlistForm.querySelector('.waitlist-disclaimer').style.display = 'none';
        waitlistSuccess.style.display = 'block';

        // Reset after 5 seconds
        setTimeout(() => {
            waitlistForm.querySelector('.waitlist-input-group').style.display = 'flex';
            waitlistForm.querySelector('.waitlist-disclaimer').style.display = 'block';
            waitlistSuccess.style.display = 'none';
        }, 5000);
    });
}


// ── Log a friendly console message ──
console.log(
    '%c🧘 Calm Routines %c— adhdcalmroutines.com',
    'color: #2563eb; font-weight: bold; font-size: 14px;',
    'color: #64748b; font-size: 12px;'
);
