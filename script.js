// Calculate age dynamically
function calculateAge() {
    const birthDate = new Date(2006, 0, 24); // January 24, 2006
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Update age on page load and every day at midnight
function updateAge() {
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Contact form handler
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}`);
                
                // Reset form
                this.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations - reveal elements when scrolled into view
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe education cards, future cards, gallery items
    const elements = document.querySelectorAll(
        '.education-card, .future-card, .gallery-item, .info-card'
    );
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Update age every day at midnight
function scheduleAgeUpdate() {
    updateAge();
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateAge();
        // Update again every 24 hours
        setInterval(updateAge, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAge();
    setupMobileMenu();
    setupContactForm();
    setupSmoothScroll();
    setupScrollAnimations();
    scheduleAgeUpdate();
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
