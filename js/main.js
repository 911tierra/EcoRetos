// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container')) {
            navbarMenu.classList.remove('active');
        }
    });
});

// ===== Set Active Navigation Link =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Scroll Animation for Elements =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.stat-card, .card, .challenge-card-featured');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// ===== Form Validation (for contact/repository forms) =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// ===== Form Submission Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formId = form.id;
            if (validateForm(formId)) {
                // Show success message
                showNotification('¡Gracias por tu participación! 🌱', 'success');
                form.reset();
            } else {
                showNotification('Por favor, completa todos los campos correctamente.', 'error');
            }
        });
    });
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Counter Animation (for statistics) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(el => {
                    const target = parseInt(el.textContent.replace(/\D/g, ''));
                    if (!isNaN(target)) {
                        animateCounter(el, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        counterObserver.observe(statNumbers[0].closest('.statistics'));
    }
});

// ===== Add Animations to CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Accessibility: Focus Trap in Navigation =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navbarMenu = document.getElementById('navbarMenu');
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            document.getElementById('mobileMenuToggle').focus();
        }
    }
});

// ===== Console Welcome Message =====
console.log('%c🌱 ¡Bienvenido a EcoRetos! 🌍', 'font-size: 20px; color: #2ecc71; font-weight: bold;');
console.log('%cSé parte del cambio ambiental. Juntos podemos hacer una diferencia.', 'font-size: 14px; color: #27ae60;');
