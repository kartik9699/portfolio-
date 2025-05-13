document.addEventListener('DOMContentLoaded', function() {
  // Loading Screen
  setTimeout(function() {
    document.querySelector('.loading-screen').style.opacity = '0';
    setTimeout(function() {
      document.querySelector('.loading-screen').style.display = 'none';
    }, 250);
  }, 1000);

  // Theme Switcher
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme');
  const themeText = document.getElementById('theme-text');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
      themeText.textContent = 'Dark Mode';
    } else {
      themeText.textContent = 'Light Mode';
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeText.textContent = 'Dark Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeText.textContent = 'Light Mode';
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);

  // Mobile Menu Toggle
  function menuShow() {
    document.querySelector('.nav_list').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function menuHide() {
    document.querySelector('.nav_list').classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  window.menuShow = menuShow;
  window.menuHide = menuHide;

  // Typing Animation
  const typed = new Typed('#typed-text', {
    strings: ['Web Developer', 'Frontend Developer', 'Full Stack Developer', 'Backend Developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: true
  });

  // Smooth Scrolling for Navigation
  function navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      menuHide();
    }
  }

  window.navigateTo = navigateTo;

  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Animate Stats Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);
        
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, 16);
    });
  }

  // Animate Skill Bars
  const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach(item => {
      const percent = item.getAttribute("data-percent");
      const progressBar = item.querySelector(".skill-progress");
      const progressText = item.querySelector(".progress-text");

      // Set width and text
      progressBar.style.width = percent + "%";
      progressText.textContent = percent + "%";
    });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class based on element
        if (entry.target.classList.contains('project-card')) {
          entry.target.classList.add('show');
        } else if (entry.target.classList.contains('skills-category')) {
          entry.target.classList.add('show');
          animateSkills();
        } else if (entry.target.classList.contains('about-container')) {
          entry.target.classList.add('show');
          animateStats();
        } else if (entry.target.classList.contains('contact-container')) {
          entry.target.classList.add('show');
        } else if (entry.target.classList.contains('hidden')) {
          entry.target.classList.add('show');
        }
        
        // Stop observing the element after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with 'hidden' class
  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
  
  // Observe specific sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show an alert
      alert(`Thanks for your message, ${name}! We'll get back to you soon at ${email}.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Initial animations on page load
  anime({
    targets: 'nav',
    translateY: [-100, 0],
    duration: 1000,
    easing: 'easeOutQuad'
  });

  anime({
    targets: '.main',
    opacity: [0, 1],
    translateX: [-100, 0],
    duration: 1500,
    easing: 'easeOutCubic',
    delay: 500
  });
const imagePath = './wmremove-transformed.png';
const containers = document.getElementsByClassName('image');
const toggleBtn = document.querySelector('.toggle');
let dark = true;

// Function to create a canvas and draw processed image
function addProcessedImage(container) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imagePath;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 230 && g > 230 && b > 230) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    container.appendChild(canvas); // ✅ Append only after processing
  };
}

// Loop through all containers with class "image" and add a processed image
for (let i = 0; i < containers.length; i++) {
  addProcessedImage(containers[i]);
}
    
  });



