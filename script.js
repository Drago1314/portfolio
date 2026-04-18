// ===============================
// Portfolio Website - Main Script
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initNavbar();
    initTypingAnimation();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initContactForm();
    initSmoothScroll();
});

// ===============================
// Background Particles
// ===============================
function initParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        const colors = ['#7c3aed', '#a855f7', '#06b6d4', '#ec4899'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

// ===============================
// Cursor Glow Effect
// ===============================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) {
        if (glow) glow.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ===============================
// Navigation
// ===============================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
}

// ===============================
// Typing Animation
// ===============================
function initTypingAnimation() {
    const typedText = document.getElementById('typedText');
    if (!typedText) return;

    const strings = [
        'Cybersecurity Enthusiast',
        'Blockchain Developer',
        'Ethical Hacker',
        'IoT Engineer'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const current = strings[stringIndex];

        if (isDeleting) {
            typedText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1200);
}

// ===============================
// Scroll Reveal
// ===============================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-image-card, .about-content, .skill-card, .project-card, .contact-info, .contact-form, .timeline, .certifications'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===============================
// Skill Progress Bars
// ===============================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===============================
// Animated Counters
// ===============================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }
}

// ===============================
// Contact Form
// ===============================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalContent = submitBtn.innerHTML;

        // Show sending state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Sent! ✓</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                form.reset();
            }, 2500);
        }, 1500);
    });
}

// ===============================
// Smooth Scroll
// ===============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
