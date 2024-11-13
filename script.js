// Show and Hide Menu
function menuShow() {
  console.log("show");
  let menu = document.getElementsByClassName('nav_list')[0];
  menu.style.right = '0px';
}

function menuHide() {
  console.log("hide");
  let menu = document.getElementsByClassName('nav_list')[0];
  menu.style.right = '-400px';
}

// Scroll to Section
function navigateTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Function to trigger animations on scroll
function triggerAnimationOnScroll(target, animationParams) {
  // Trigger the animation when the element comes into view
  anime({
    targets: target,
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
      // Trigger specific animations for each section when it comes into view
      if (entry.target.classList.contains('project')) {
        triggerAnimationOnScroll('.project', {
          translateX: [-1000, 0],
          duration: 3000,
          delay: anime.stagger(100) // increase delay by 100ms for each element.
        });
      } else if (entry.target.id === 'skills') {
        triggerAnimationOnScroll('#skills', {
          scale: [
            {value: .1, easing: 'easeOutSine', duration: 300},
            {value: 1, easing: 'easeInOutQuad', duration: 1000}
          ],
          delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
        });
      } else if (entry.target.id === 'pro') {
        triggerAnimationOnScroll('#pro', {
          scale: [
            {value: .1, easing: 'easeOutSine', duration: 0},
            {value: 1, easing: 'easeInOutQuad', duration: 1000}
          ],
          delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
        });
      } else if (entry.target.classList.contains('contact')) {
        triggerAnimationOnScroll('.contact', {
          scale: [
            {value: .1, easing: 'easeOutSine', duration: 0},
            {value: 1, easing: 'easeInOutQuad', duration: 1000}
          ],
          delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
        });
      } else if (entry.target.classList.contains('about')) {
        triggerAnimationOnScroll('.about', {
          scale: [
            {value: .1, easing: 'easeOutSine', duration: 0},
            {value: 1, easing: 'easeInOutQuad', duration: 1000}
          ],
          delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
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

// Initial Animations on Page Load (these are still applied immediately on load)
anime({
  targets: 'nav',
  translateY: [-100, 0],
  duration: 3000
});

anime({
  targets: '.main',
  translateX: [-1000, 0],
  duration: 10000
});
