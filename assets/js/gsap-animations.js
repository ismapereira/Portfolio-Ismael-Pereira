// GSAP Animations for Ismael Pereira Portfolio
// This file contains all GSAP animations for the portfolio

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Loader Animation
const loader = document.querySelector('.loader');
const loaderContent = document.querySelector('.loader-content');

// Main Timeline for initial page load
const mainTl = gsap.timeline({
    onComplete: () => {
        // Enable scrolling after animation completes
        document.body.classList.remove('no-scroll');
    }
});

// Preloader Animation
function initLoader() {
    const loaderTl = gsap.timeline({
        onComplete: () => {
            // Fade out and remove loader after animation completes
            gsap.to(loader, {
                duration: 0.8,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
    });

    loaderTl
        .to('.loader-progress', {
            width: '100%',
            duration: 1.5,
            ease: "power2.inOut"
        })
        .to('.loader-text', {
            text: {
                value: "100%",
                delimiter: ""
            },
            duration: 1.5,
            ease: "none"
        }, 0)
        .to('.loader-content', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            delay: 0.2
        });
}

// Header Animation
function animateHeader() {
    const header = document.querySelector('header');
    
    gsap.from(header, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });
    
    gsap.from('header nav ul li', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.8
    });
}

// Hero Section Animation
function animateHero() {
    const heroTl = gsap.timeline();
    
    heroTl
        .from('.hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from('.hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")
        .from('.hero-cta', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.2");
    
    // Floating bubbles animation
    gsap.to('.bubble', {
        y: "-100vh",
        duration: random(8, 15),
        opacity: 0,
        scale: 1.2,
        stagger: {
            each: 0.2,
            repeat: -1,
            from: "random"
        },
        ease: "none",
        onComplete: function() {
            this.targets()[0].style.bottom = "-100px";
            this.targets()[0].style.opacity = 0.3;
            this.targets()[0].style.x = `${random(-50, 50)}%`;
            gsap.to(this.targets()[0], {
                y: "-100vh",
                duration: random(8, 15),
                opacity: 0,
                scale: 1.2,
                ease: "none"
            });
        }
    });
}

// About Section Animation
function animateAbout() {
    gsap.from('.about h2', {
        scrollTrigger: {
            trigger: '.about',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.profile-img', {
        scrollTrigger: {
            trigger: '.about-content',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out"
    });
    
    gsap.from('.about-details .detail-item', {
        scrollTrigger: {
            trigger: '.about-details',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
    });
}

// Skills Section Animation
function animateSkills() {
    gsap.from('.skills h2', {
        scrollTrigger: {
            trigger: '.skills',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.skill-item', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
    
    // Animate skill bars when they come into view
    gsap.to('.skill-level-bar', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        width: function(i, target) {
            return target.getAttribute('style').split(':')[1].trim();
        },
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        from: "0%"
    });
    
    // Add hover animations to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 10px 20px rgba(0,95,115,0.2)"
            });
            
            gsap.to(item.querySelector('i'), {
                scale: 1.2,
                color: "var(--color-hover)",
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none"
            });
            
            gsap.to(item.querySelector('i'), {
                scale: 1,
                color: "var(--color-primary)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Projects Section Animation
function animateProjects() {
    gsap.from('.projects h2', {
        scrollTrigger: {
            trigger: '.projects',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // Add hover animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const tl = gsap.timeline({ paused: true });
        
        tl.to(card, {
            y: -20,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "0 20px 30px rgba(0,95,115,0.2)"
        })
        .to(card.querySelector('.project-image img'), {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
        }, 0)
        .to(card.querySelector('h3'), {
            color: "var(--color-hover)",
            duration: 0.3,
            ease: "power2.out"
        }, 0);
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    });
}

// Contact Section Animation
function animateContact() {
    gsap.from('.contact h2', {
        scrollTrigger: {
            trigger: '.contact',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.contact-form .form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    });
    
    gsap.from('.contact-form button', {
        scrollTrigger: {
            trigger: '.contact-form button',
            start: "top 90%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    });
}

// Footer Animation
function animateFooter() {
    gsap.from('footer', {
        scrollTrigger: {
            trigger: 'footer',
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.social-links a', {
        scrollTrigger: {
            trigger: '.social-links',
            start: "top 95%",
            toggleActions: "play none none none"
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
}

// Utility function for random number generation
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Disable scrolling during initial animation
    document.body.classList.add('no-scroll');
    
    // Initialize loader
    initLoader();
    
    // Start main animations after loader
    setTimeout(() => {
        animateHeader();
        animateHero();
        animateAbout();
        animateSkills();
        animateProjects();
        animateContact();
        animateFooter();
        
        // Initialize scroll-to-top button animation
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            gsap.from(backToTopButton, {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                scrollTrigger: {
                    trigger: 'body',
                    start: "top -300",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, 2500); // Start after loader animation completes
    
    // Create bubbles for hero section
    createBubbles();
});

// Create bubbles dynamically
function createBubbles() {
    const heroSection = document.querySelector('.hero');
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-container';
    heroSection.appendChild(bubbleContainer);
    
    // Create multiple bubbles
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size
        const size = random(20, 80);
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        bubble.style.left = `${random(0, 100)}%`;
        bubble.style.bottom = `-${random(0, 100)}px`;
        
        // Random color from the theme
        const colors = [
            'var(--color-primary)',
            'var(--color-secondary)',
            'var(--color-accent)',
            'var(--color-hover)'
        ];
        bubble.style.backgroundColor = colors[Math.floor(random(0, colors.length))];
        
        // Random delay
        bubble.style.animationDelay = `${random(0, 5)}s`;
        
        bubbleContainer.appendChild(bubble);
    }
}

// Mobile menu toggle animation
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        let menuOpen = false;
        const menuTl = gsap.timeline({ paused: true });
        
        menuTl
            .to(mobileMenu, {
                x: 0,
                duration: 0.5,
                ease: "power3.out"
            })
            .from('.mobile-menu ul li', {
                x: 50,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.2");
        
        menuToggle.addEventListener('click', () => {
            if (menuOpen) {
                menuTl.reverse();
            } else {
                menuTl.play();
            }
            menuOpen = !menuOpen;
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuTl.reverse();
                menuOpen = false;
            });
        });
    }
});

// Parallax effect on scroll
function initParallax() {
    gsap.to('.hero-content', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    gsap.to('.profile-img', {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: '.about',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Initialize parallax effects
document.addEventListener('DOMContentLoaded', initParallax);
