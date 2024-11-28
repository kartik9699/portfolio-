// Function to trigger animations on scroll
function triggerAnimationOnScroll(target, animationParams) {
  // Trigger the animation when the element comes into view
  anime({
    targets: target,
    easing: 'easeOutQuad', // Smooth easing
    ...animationParams
  });
}

// Scroll-triggered Animations using IntersectionObserver
const observerOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.5, // Trigger animation when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is in the viewport, let's trigger its animation
      if (entry.target.classList.contains('project')) {
        triggerAnimationOnScroll('.project', {
          opacity: [0, 1], // Fade in effect
          translateY: [50, 0], // Slide up effect
          duration: 2000, // 1 second animation
          delay: anime.stagger(100) // Staggered delay for each project element
        });
      } else if (entry.target.id === 'skills') {
        triggerAnimationOnScroll('#skills', {
          opacity: [0, 1], // Fade in effect
          scale: [0.8, 1], // Scale up effect
          duration: 2000,
          easing: 'easeInOutQuad'
        });
      } else if (entry.target.id === 'pro') {
        triggerAnimationOnScroll('#pro', {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 2000,
          easing: 'easeInOutQuad'
        });
      } else if (entry.target.classList.contains('contact')) {
        triggerAnimationOnScroll('.contact', {
          opacity: [0, 1],
          translateY: [50, 0], // Slide in from bottom
          duration: 2000,
          easing: 'easeOutQuad'
        });
      } else if (entry.target.classList.contains('about')) {
        triggerAnimationOnScroll('.about', {
          opacity: [0, 1],
          translateY: [50, 0], // Slide in from bottom
          duration: 2000,
          easing: 'easeOutQuad'
        });
      }

      // Stop observing the element after the animation has started
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Attach the observer to specific elements
const elementsToObserve = document.querySelectorAll('.project, #skills, #pro, .contact, .about');
elementsToObserve.forEach(element => observer.observe(element));

// Initial Animations on Page Load (optional, for any elements that should animate immediately)
anime({
  targets: 'nav',
  translateY: [-100, 0],
  duration: 2000, // Smoother entrance for navigation
  easing: 'easeOutQuad'
});

anime({
  targets: '.main',
  translateX: [-1000, 0],
  duration: 3000, // Smoother entrance for main content
  easing: 'easeOutCubic'
});
