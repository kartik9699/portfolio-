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
function navigateTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'easeInOut' });
  }
}

  anime({
    targets: 'nav',
    translateY: [-100,0],
    duration: 3000
  });
  anime({
    targets: '.main',
    translateX: [-1000,0],
    duration: 10000
  });
  // anime({
  //   targets: '.project',
  //   translateX: [-1000,0],
  //   duration: 3000,
  //   delay: anime.stagger(100) // increase delay by 100ms for each elements.
  // });
  anime({
    targets: '#skills',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 300},
      {value: 1, easing: 'easeInOutQuad', duration: 1000}
    ],
    delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
  });
  anime({
    targets: '#pro',
    duration:300,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 0},
      {value: 1, easing: 'easeInOutQuad', duration: 1000}
    ],
    delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
  });
  anime({
    targets: '.contact',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 0},
      {value: 1, easing: 'easeInOutQuad', duration: 1000}
    ],
    delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
  });
  anime({
    targets: '.about',
    
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 0},
      {value: 1, easing: 'easeInOutQuad', duration: 1000}
    ],
    delay: anime.stagger(0, {grid: [14, 5], from: 'center'})
  });
  // anime({
  //   targets: '#pro',
  //   translateX: [-1000,0],
  //   duration:1000,
  //   delay: anime.stagger(1000, {easing: 'easeOutQuad',direction: 'reverse'})
  // });
  