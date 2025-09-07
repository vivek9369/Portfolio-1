// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Hero Buttons Functionality
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');

    primaryBtn.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth'
        });
    });

    secondaryBtn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Project Visit Buttons
    const visitBtns = document.querySelectorAll('.visit-btn');
    
    visitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = btn.getAttribute('data-url');
            if (url) {
                // Add click animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'translateY(-2px)';
                    // Open link in new tab
                    window.open(url, '_blank');
                }, 150);
            }
        });
    });

    // Enhanced 3D Project Card Interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const container3D = card.querySelector('.project-3d-container');
        
        card.addEventListener('mouseenter', () => {
            // Enhance 3D animations on hover
            const cube = card.querySelector('.project-cube');
            const sphere = card.querySelector('.project-sphere');
            const pyramid = card.querySelector('.project-pyramid');
            const hexagon = card.querySelector('.project-hexagon');
            
            if (cube) {
                cube.style.animationDuration = '2s';
            }
            if (sphere) {
                const rings = sphere.querySelectorAll('.ring');
                rings.forEach(ring => {
                    ring.style.animationDuration = '1s';
                });
            }
            if (pyramid) {
                pyramid.style.animationDuration = '1.5s';
            }
            if (hexagon) {
                const layers = hexagon.querySelectorAll('.hexagon-layer');
                layers.forEach(layer => {
                    layer.style.animationDuration = '1s';
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset animation speeds
            const cube = card.querySelector('.project-cube');
            const sphere = card.querySelector('.project-sphere');
            const pyramid = card.querySelector('.project-pyramid');
            const hexagon = card.querySelector('.project-hexagon');
            
            if (cube) {
                cube.style.animationDuration = '6s';
            }
            if (sphere) {
                const rings = sphere.querySelectorAll('.ring');
                rings.forEach(ring => {
                    ring.style.animationDuration = '3s';
                });
            }
            if (pyramid) {
                pyramid.style.animationDuration = '4s';
            }
            if (hexagon) {
                const layers = hexagon.querySelectorAll('.hexagon-layer');
                layers.forEach(layer => {
                    layer.style.animationDuration = '3s';
                });
            }
        });

        // 3D mouse tracking effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });

    // Notification System
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
            color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Skill Category Hover Effects
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const icon = category.querySelector('.skill-icon');
            icon.style.transform = 'rotateY(360deg) scale(1.1)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        category.addEventListener('mouseleave', () => {
            const icon = category.querySelector('.skill-icon');
            icon.style.transform = 'rotateY(0deg) scale(1)';
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for stats
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                
                // Special animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-content, .stats, .projects-grid, .skills-grid, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Animate Statistics
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-item h4');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + '+';
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
        });
    }

    // Animate Project Cards
    function animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Particles Background Animation
    createParticles();

    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Smooth reveal animations for hero section
    const heroElements = document.querySelectorAll('.title-line, .hero-subtitle, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s ease';
        }, index * 200 + 500);
    });

    // Enhanced floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-30px) scale(1.1) rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) rotateZ(360deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotateZ(0deg)';
        });
    });

    // Dynamic gradient background for cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .profile-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const gradientAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
        });
    });

    // Typing effect for hero title (optional enhancement)
    function createTypingEffect() {
        const titleLines = document.querySelectorAll('.title-line');
        const texts = ['Creative', 'Developer'];
        
        titleLines.forEach((line, index) => {
            const text = texts[index];
            line.textContent = '';
            
            setTimeout(() => {
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    line.textContent += text[charIndex];
                    charIndex++;
                    
                    if (charIndex >= text.length) {
                        clearInterval(typeInterval);
                    }
                }, 100);
            }, index * 1000 + 1000);
        });
    }

    // Performance optimization: Debounce scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update any scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    console.log('Portfolio loaded successfully! 🚀');
});