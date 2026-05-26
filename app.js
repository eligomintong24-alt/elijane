/**
 * Aura Creative Portfolio Engine
 * Author: Antigravity Code Pair
 * Dedicated to visual excellence and premium user interactions.
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
  const savedTheme = localStorage.getItem('aura-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aura-theme', nextTheme);
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
  // PORTFOLIO FILTER ENGINE
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
  // INTERSECTION OBSERVER: ANIMATIONS & COUNTERS
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in');

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // Stat Counter Increment Animation Function
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isPlus = el.innerText.includes('+');
    const isPercent = el.innerText.includes('%');
    const isK = el.innerText.includes('K+');
    
    let current = 0;
    const duration = 1500; // 1.5s
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const counterInterval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counterInterval);
      }
      
      let formattedVal = Math.floor(current);
      if (isK) {
        el.innerText = `${formattedVal}K+`;
      } else if (isPercent) {
        el.innerText = `${formattedVal}%`;
      } else if (isPlus) {
        el.innerText = `+${formattedVal}%`;
      } else {
        el.innerText = `${formattedVal}+`;
      }
    }, stepDuration);
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
        
        // Trigger specific animations on child elements if needed
        
        // If it's a stats block, animate counters inside
        const counterElements = entry.target.querySelectorAll('[data-target]');
        counterElements.forEach(el => {
          if (!el.classList.contains('counted')) {
            el.classList.add('counted');
            animateCounter(el);
          }
        });

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
    // If element is already filled (like select elements or browser autofills)
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
  const navSections = document.querySelectorAll('section');
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
