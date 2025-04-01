// Modern Portfolio GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
  
  // Disable scrolling during initial animation
  document.body.classList.add('no-scroll');
  
  // Initialize animations
  initLoader();
  
  // Delay other animations until after loader
  setTimeout(() => {
    initNavAnimation();
    initHeroAnimation();
    initSectionAnimations();
    initParallaxEffects();
    initHoverAnimations();
    initMobileMenu();
    initBackToTop();
    createFloatingShapes();
    initTextAnimations();
    initProjectCardAnimations();
    initSkillBars();
    initContactFormAnimation();
    initFooterAnimation();
    createFooterParticles();
    
    // Enable scrolling after animations are initialized
    document.body.classList.remove('no-scroll');
  }, 2500);
});

// Loader Animation
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  const loaderTl = gsap.timeline({
    onComplete: () => {
      // Fade out loader
      gsap.to('.loader', {
        duration: 0.8,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          document.querySelector('.loader').style.display = 'none';
        }
      });
    }
  });

  loaderTl
    .to('.loader-progress', {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    })
    .to('.loader-text', {
      text: {
        value: '100%',
        delimiter: ''
      },
      duration: 2,
      ease: 'none'
    }, 0)
    .from('.loader-logo', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.5);
}

// Navigation Animation
function initNavAnimation() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  // Header scroll effect with improved animation
  ScrollTrigger.create({
    start: 'top-=80',
    onEnter: () => {
      gsap.to(header, {
        backgroundColor: 'rgba(2, 12, 27, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
        padding: '15px 0',
        duration: 0.3,
        ease: 'power2.out'
      });
      header.classList.add('scrolled');
    },
    onLeaveBack: () => {
      gsap.to(header, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        boxShadow: 'none',
        padding: '20px 0',
        duration: 0.3,
        ease: 'power2.out'
      });
      header.classList.remove('scrolled');
    }
  });
  
  // Nav items animation with staggered effect
  const navLinks = document.querySelectorAll('.nav-links li');
  if (navLinks.length) {
    gsap.from(navLinks, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    });
  }
  
  // Logo animation with bounce effect
  const logo = document.querySelector('.logo');
  if (logo) {
    gsap.from(logo, {
      x: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }
}

// Hero Section Animation
function initHeroAnimation() {
  const heroElements = {
    greeting: document.querySelector('.hero-greeting'),
    name: document.querySelector('.hero-name'),
    tagline: document.querySelector('.hero-tagline'),
    description: document.querySelector('.hero-description'),
    cta: document.querySelector('.hero-cta')
  };
  
  // Check if hero elements exist
  if (!heroElements.greeting) return;
  
  const heroTl = gsap.timeline();
  
  heroTl
    .from(heroElements.greeting, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from(heroElements.name, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from(heroElements.tagline, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from(heroElements.description, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from(heroElements.cta, {
      y: 20,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.4');
    
  // Add a subtle continuous animation to the CTA button
  if (heroElements.cta) {
    gsap.to(heroElements.cta.querySelector('a'), {
      boxShadow: '0 0 15px rgba(100, 255, 218, 0.5)',
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut'
    });
  }
}

// Text typing animation for specific elements
function initTextAnimations() {
  // Animated typing effect for hero tagline
  const heroTagline = document.querySelector('.hero-tagline');
  if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    
    const typingTl = gsap.timeline({
      delay: 2.5, // Start after hero animation
      scrollTrigger: {
        trigger: heroTagline,
        start: 'top 80%',
        once: true
      }
    });
    
    typingTl.to(heroTagline, {
      duration: 2,
      text: {
        value: originalText,
        delimiter: ''
      },
      ease: 'none'
    });
  }
  
  // Animated section numbers
  const sectionNumbers = document.querySelectorAll('.section-number');
  sectionNumbers.forEach(number => {
    gsap.from(number, {
      scrollTrigger: {
        trigger: number,
        start: 'top 85%',
        once: true
      },
      textShadow: '0 0 20px var(--color-primary)',
      color: 'transparent',
      duration: 1,
      ease: 'power3.out'
    });
  });
}

// Section Animations
function initSectionAnimations() {
  // About Section
  const aboutHeading = document.querySelector('.about .section-heading');
  if (aboutHeading) {
    gsap.from(aboutHeading, {
      scrollTrigger: {
        trigger: aboutHeading,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  const aboutText = document.querySelectorAll('.about-text p');
  if (aboutText.length) {
    gsap.from(aboutText, {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }
  
  const techList = document.querySelectorAll('.tech-list li');
  if (techList.length) {
    gsap.from(techList, {
      scrollTrigger: {
        trigger: '.tech-list',
        start: 'top 85%'
      },
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
  
  const profileWrapper = document.querySelector('.profile-wrapper');
  if (profileWrapper) {
    gsap.from(profileWrapper, {
      scrollTrigger: {
        trigger: profileWrapper,
        start: 'top 80%'
      },
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });
  }
  
  // Skills Section
  const skillsHeading = document.querySelector('.skills .section-heading');
  if (skillsHeading) {
    gsap.from(skillsHeading, {
      scrollTrigger: {
        trigger: skillsHeading,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length) {
    // Primeiro, garantimos que os cards estejam visíveis
    gsap.set(skillCards, { opacity: 1, y: 0 });
    
    // Depois aplicamos a animação
    gsap.from(skillCards, {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });
  }
  
  // Projects Section
  const projectsHeading = document.querySelector('.projects .section-heading');
  if (projectsHeading) {
    gsap.from(projectsHeading, {
      scrollTrigger: {
        trigger: projectsHeading,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  // Contact Section
  const contactHeading = document.querySelector('.contact .section-heading');
  if (contactHeading) {
    gsap.from(contactHeading, {
      scrollTrigger: {
        trigger: contactHeading,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  const contactTitle = document.querySelector('.contact-title');
  if (contactTitle) {
    gsap.from(contactTitle, {
      scrollTrigger: {
        trigger: contactTitle,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  const contactText = document.querySelector('.contact-text');
  if (contactText) {
    gsap.from(contactText, {
      scrollTrigger: {
        trigger: contactText,
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }
}

// Skill bars animation
function initSkillBars() {
  const skillLevelBars = document.querySelectorAll('.skill-level-bar');
  
  if (skillLevelBars.length) {
    // Garantir que as barras estejam visíveis inicialmente com largura 0
    gsap.set(skillLevelBars, { width: '0%', opacity: 1 });
    
    skillLevelBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      
      gsap.to(bar, {
        width: `${level}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          once: true
        }
      });
    });
  }
}

// Project card animations
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    // Initial animation on scroll
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out'
    });
    
    // Hover effect
    const projectImage = card.querySelector('.project-image');
    const projectContent = card.querySelector('.project-content');
    
    if (projectImage && projectContent) {
      card.addEventListener('mouseenter', () => {
        gsap.to(projectImage, {
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(projectContent, {
          y: -5,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(projectImage, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(projectContent, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    }
  });
}

// Contact form animation
function initContactFormAnimation() {
  const formElements = document.querySelectorAll('.contact-form .form-group');
  const submitButton = document.querySelector('.contact-form button[type="submit"]');
  
  if (formElements.length) {
    gsap.from(formElements, {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
  
  if (submitButton) {
    gsap.from(submitButton, {
      scrollTrigger: {
        trigger: submitButton,
        start: 'top 90%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.4
    });
  }
  
  // Add focus animations to form inputs
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 0 2px rgba(100, 255, 218, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  // Parallax for floating shapes in hero section
  const shapes = document.querySelectorAll('.floating-shapes .shape');
  
  if (shapes.length) {
    shapes.forEach(shape => {
      const speedX = random(15, 35);
      const speedY = random(15, 35);
      const rotationSpeed = random(5, 15);
      
      gsap.to(shape, {
        x: `+=${speedX}`,
        y: `+=${speedY}`,
        rotation: random(-rotationSpeed, rotationSpeed),
        duration: random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }
  
  // Parallax for section backgrounds
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    gsap.to(section, {
      backgroundPositionY: `+=${random(50, 100)}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Parallax for profile image
  const profileImg = document.querySelector('.profile-img-container');
  if (profileImg) {
    ScrollTrigger.create({
      trigger: profileImg,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const moveY = self.progress * -30; // Move up as we scroll down
        const rotate = self.progress * 5; // Slight rotation
        
        gsap.set(profileImg, {
          y: moveY,
          rotation: rotate,
          ease: 'none'
        });
      }
    });
  }
  
  // 3D tilt effect for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width - 0.5;
      const yPercent = y / rect.height - 0.5;
      
      gsap.to(card, {
        rotationY: xPercent * 10,
        rotationX: yPercent * -10,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// Hover Animations
function initHoverAnimations() {
  // Nav links hover effect
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const originalColor = window.getComputedStyle(link).color;
    
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: 'var(--color-primary)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: originalColor,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // CTA button hover effect
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
      gsap.to(ctaButton, {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      gsap.to(ctaButton, {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-dark)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }
  
  // Social links hover effect
  const socialLinks = document.querySelectorAll('.social-links a');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -5,
        color: 'var(--color-primary)',
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        y: 0,
        color: 'var(--color-light)',
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
  });
  
  // Project links hover effect
  const projectLinks = document.querySelectorAll('.project-links a');
  
  projectLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -3,
        color: 'var(--color-primary)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        y: 0,
        color: 'var(--color-light)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  
  if (!menuToggle || !mobileMenu) return;
  
  let isOpen = false;
  
  const menuTl = gsap.timeline({ paused: true });
  
  menuTl
    .to(mobileMenu, {
      x: '0%',
      duration: 0.5,
      ease: 'power3.out'
    })
    .from(mobileLinks, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');
  
  menuToggle.addEventListener('click', () => {
    if (isOpen) {
      menuTl.reverse();
      menuToggle.classList.remove('active');
    } else {
      menuTl.play();
      menuToggle.classList.add('active');
    }
    
    isOpen = !isOpen;
  });
  
  // Close mobile menu when clicking on a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuTl.reverse();
      menuToggle.classList.remove('active');
      isOpen = false;
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuTl.reverse();
      menuToggle.classList.remove('active');
      isOpen = false;
    }
  });
  
  // Update mobile menu state on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isOpen) {
      menuTl.reverse();
      menuToggle.classList.remove('active');
      isOpen = false;
    }
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      gsap.to(backToTopBtn, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(backToTopBtn, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
  
  // Scroll to top with animation
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Usando window.scrollTo nativo em vez do GSAP scrollTo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Create floating shapes for hero section
function createFloatingShapes() {
  const floatingShapes = document.querySelector('.floating-shapes');
  
  if (!floatingShapes) return;
  
  // Randomize initial positions of shapes
  const shapes = floatingShapes.querySelectorAll('.shape');
  
  shapes.forEach(shape => {
    const x = random(-20, 20);
    const y = random(-20, 20);
    const rotation = random(-15, 15);
    
    gsap.set(shape, {
      x,
      y,
      rotation
    });
  });
}

// Footer Animation
function initFooterAnimation() {
  // Selecionar elementos
  const footerColumns = document.querySelectorAll('.footer-column');
  const footerBottom = document.querySelector('.footer-bottom');
  const socialLinks = document.querySelectorAll('.footer-social a');
  
  // Verificar se os elementos existem
  if (!footerColumns.length || !footerBottom) {
    console.log("Elementos do footer não encontrados");
    return;
  }
  
  console.log("Inicializando animação do footer");
  
  // Garantir que os links sociais estejam visíveis
  if (socialLinks.length) {
    socialLinks.forEach(link => {
      link.style.opacity = "1";
      const icon = link.querySelector('i');
      if (icon) icon.style.opacity = "1";
    });
  } else {
    console.log("Links sociais não encontrados");
  }
  
  // Animação simples para os elementos do footer
  gsap.from(footerColumns, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.2)',
    delay: 0.3
  });
  
  gsap.from(footerBottom, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.8
  });
  
  // Animação específica para os links sociais
  if (socialLinks.length) {
    gsap.from(socialLinks, {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 1,
      onComplete: () => {
        // Garantir que os ícones permaneçam visíveis após a animação
        socialLinks.forEach(link => {
          link.style.opacity = "1";
        });
      }
    });
  }
}

// Criar partículas para o footer
function createFooterParticles() {
  const footerParticles = document.querySelector('.footer-particles');
  if (!footerParticles) {
    console.log("Container de partículas não encontrado");
    return;
  }
  
  console.log("Criando partículas para o footer");
  
  // Limpar partículas existentes
  footerParticles.innerHTML = '';
  
  // Número de partículas
  const particleCount = 15;
  
  // Criar partículas
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('footer-particle');
    
    // Posição aleatória
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    // Aplicar estilos
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
    
    // Adicionar ao container
    footerParticles.appendChild(particle);
    
    // Animar partícula com CSS para melhor performance
    particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;
  }
}

// Utility function for random number generation
function random(min, max) {
  return Math.random() * (max - min) + min;
}
