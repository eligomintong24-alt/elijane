/**
 * Eli Jane Gomintong - Provident Flow Portfolio Engine
 * Author: Antigravity Code Pair
 * Dedicated to visual excellence, premium user interactions, and robust SMM presentation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // SCROLL PROGRESS INDICATOR & HEADER STYLE ON SCROLL
  // ==========================================================================
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.querySelector('.header');

  const handleScroll = () => {
    // Scroll progress bar
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const scrollPercent = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Sticky Header compact styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial execution in case of page refresh mid-scroll


  // ==========================================================================
  // LIGHT & DARK THEME ENGINE
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve previous settings or check system preference
  const savedTheme = localStorage.getItem('eli-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('eli-theme', nextTheme);
  });


  // ==========================================================================
  // MOBILE NAVIGATION CONTROLLER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    // Lock scroll on overlay open
    document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : 'auto';
  };

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileOverlay.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });


  // ==========================================================================
  // PROJECTS CATEGORY FILTER ENGINE
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active classes on button filters
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    });
  });


  // ==========================================================================
  // DYNAMIC LIGHTBOX MODAL PREVIEW ENGINE
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const projectTriggers = document.querySelectorAll('.project-card-trigger');
  
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxGoal = document.getElementById('lightbox-goal');
  const lightboxRole = document.getElementById('lightbox-role');
  const lightboxResults = document.getElementById('lightbox-results');
  const lightboxActionBtn = document.getElementById('lightbox-action-btn');

  // Open Lightbox
  const openLightbox = (card) => {
    const imgEl = card.querySelector('.portfolio-img');
    const title = card.getAttribute('data-title');
    const goal = card.getAttribute('data-goal');
    const role = card.getAttribute('data-role');
    const results = card.getAttribute('data-results');

    // Populate data
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.innerText = title || "Project Overview";
    lightboxGoal.innerText = goal || "Details pending.";
    lightboxRole.innerText = role || "Lead Specialist.";
    lightboxResults.innerText = results || "Delivered operational stability.";

    // Show modal
    lightboxModal.classList.add('show');
    lightboxModal.setAttribute('aria-hidden', 'false');
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const closeLightbox = () => {
    lightboxModal.classList.remove('show');
    lightboxModal.setAttribute('aria-hidden', 'true');
    
    // Restore scrolling
    document.body.style.overflow = '';
  };

  // Add click events to triggers
  projectTriggers.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(card);
    });
  });

  // Close via button click
  lightboxClose.addEventListener('click', closeLightbox);

  // Close via background click
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Close via Escape key
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('show')) {
      closeLightbox();
    }
  });

  // Route lightbox call-to-action to closing the modal before routing
  lightboxActionBtn.addEventListener('click', () => {
    closeLightbox();
  });


  // ==========================================================================
  // INTERSECTION OBSERVER: ANIMATIONS
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in');

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  // Skill Fill Animating Function
  const animateSkillBars = () => {
    const fills = document.querySelectorAll('.graphic-fill');
    fills.forEach(fill => {
      const targetWidth = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 100);
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // If it's the skills section, trigger skill bars progress animation
        if (entry.target.classList.contains('about-skills')) {
          if (!entry.target.classList.contains('skills-animated')) {
            entry.target.classList.add('skills-animated');
            animateSkillBars();
          }
        }

        // Cease observing once triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });


  // ==========================================================================
  // DYNAMIC COMPACT CONTACT FORM VALIDATION & SUCCESS HANDLER
  // ==========================================================================
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const submitBtn = document.getElementById('submit-btn');

  // Input group styling helpers on focus/blur
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    const group = input.closest('.input-group');
    
    // Check validation on blur
    input.addEventListener('blur', () => {
      validateInput(input);
    });

    // Clear validation status on keyup
    input.addEventListener('input', () => {
      if (group.classList.contains('invalid')) {
        validateInput(input);
      }
    });
  });

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInput = (input) => {
    const group = input.closest('.input-group');
    let isValid = true;

    if (input.required && !input.value.trim()) {
      isValid = false;
    } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
      isValid = false;
    }

    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }

    return isValid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;

    // Validate all inputs before submitting
    inputs.forEach(input => {
      const isValid = validateInput(input);
      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Dynamic simulated submit loader state
      const origText = submitBtn.querySelector('span').innerText;
      submitBtn.classList.add('loading');
      submitBtn.querySelector('span').innerText = 'Sending Inquiry...';
      submitBtn.disabled = true;

      // Simulate network request duration
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('span').innerText = origText;
        submitBtn.disabled = false;
        
        // Show success screen overlay with entrance transition
        formSuccess.classList.add('show');
        form.reset();
      }, 1200);
    }
  });

  resetFormBtn.addEventListener('click', () => {
    formSuccess.classList.remove('show');
  });


  // ==========================================================================
  // SYNC ACTIVE NAV LINK WITH SCROLL POSITION
  // ==========================================================================
  const navSections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;

    navSections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 20);
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

});
