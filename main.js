// ===== Portfolio JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    initParticles();
    initThemeToggle();
    initNavbar();
    initScrollTop();
    initSkillBars();
    initFormValidation();
    initScrollAnimations();
    initMobileMenu();
    initCounterAnimation();
    initProjectFilter();
    initSmoothScroll();
    initNavbarVisibility();
    initTypingEffect();
});

// ===== Particules Animées =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.width = (4 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ===== Toggle Thème =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Vérifier le thème sauvegardé
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ===== Gestion de la visibilité de la navbar =====
function initNavbarVisibility() {
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('.header');
    
    if (!navbar || !header) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        // La navbar devient visible quand on a dépassé 80% du header
        if (scrollPosition > headerHeight * 0.8) {
            navbar.classList.add('visible');
            navbar.classList.remove('hidden');
        } else {
            navbar.classList.remove('visible');
            navbar.classList.add('hidden');
        }
        
        // Ajouter l'effet scrolled quand on a complètement dépassé le header
        if (scrollPosition > headerHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Navigation =====
function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mise à jour du lien actif au scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });
    
    // Initial check
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Scroll Top =====
function initScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
}

// ===== Barres de Compétences =====
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.dataset.percentage;
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = percentage + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

// ===== Validation Formulaire =====
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Réinitialiser les erreurs
        document.querySelectorAll('.form-error').forEach(err => err.textContent = '');
        
        if (!name.value.trim()) {
            showError(name, 'Le nom est requis');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Email invalide');
            isValid = false;
        }
        
        if (!subject.value.trim()) {
            showError(subject, 'Le sujet est requis');
            isValid = false;
        }
        
        if (!message.value.trim() || message.value.length < 10) {
            showError(message, 'Message trop court (min 10 caractères)');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Animation de chargement
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.classList.remove('loading');
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message envoyé avec succès ! Je vous répondrai bientôt.';
        form.reset();
        
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.form-error');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
    input.style.borderColor = 'var(--danger-color)';
    
    input.addEventListener('input', function() {
        input.style.borderColor = '';
        if (errorSpan) errorSpan.textContent = '';
    }, { once: true });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Animations au Scroll =====
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(el => observer.observe(el));
}

// ===== Menu Mobile =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer au clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Animation Compteurs =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 30);
}

// ===== Filtrage Projets =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Mettre à jour les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les cartes
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ajouter le scroll au clic sur l'indicateur de défilement
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerOffset = 80;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== Typing Effect =====
function initTypingEffect() {
    const titleElement = document.getElementById('typingTitle');
    if (!titleElement) return;
    
    const titles = ['Développeur Web', 'Designer UI/UX', 'Créateur d\'expériences'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// ===== Gestion du redimensionnement =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        updateActiveNavLink();
    }, 250);
});

// ===== Gestion du chargement des images =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== Détection du support des préférences de réduction de mouvement =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ===== Gestion des erreurs globales =====
window.addEventListener('error', function(e) {
    console.error('Erreur détectée:', e.error);
    // Ici vous pourriez ajouter un système de logging
});

// ===== Performance Observer =====
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn(`Tâche longue détectée: ${entry.duration}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
}