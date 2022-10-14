'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let btnOpenModal of btnsOpenModal)
//   btnOpenModal.addEventListener('click', openModal);

btnsOpenModal.forEach(function(btn, i, arr) {
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selecting elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button')
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'))

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div')
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved dunctionality and analytics'
message.innerHTML = 'We use cookies for improved dunctionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click' , function() {
  message.remove()
})

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '104.3%'
document.body.style.overflowX = 'hidden'


// console.log(message.style.height); // inline styles
// console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'

// document.documentElement.style.setProperty('--color-primary', 'orangered')

btnScrollTo.addEventListener('click', function(e) {
  // const s1coords = section1.getBoundingClientRect();

  // console.log('scroll (x, y)', window.pageXOffset, window.pageYOffset);
  // console.log(document.documentElement.clientHeight);

  // window.scrollTo(s1coords.left, s1coords.top+window.pageYOffset)
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top+window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({behavior:'smooth'})
  
})

// Page Nav

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()
  const section = document.querySelector(`${e.target.getAttribute('href')}`)
  section ? section.scrollIntoView({behavior:'smooth'}) : section
})


tabsContainer.addEventListener('click', function(e) {

  if(!e.target.closest('.operations__tab')) return

    for (let i of tabsContent) {
      i.classList.remove('operations__content--active')
    }
    for (let j of tabs) {
      j.classList.remove('operations__tab--active')
    }
    document.querySelector(`.operations__content--${e.target.closest('.operations__tab').dataset.tab}`).classList.add('operations__content--active')
    document.querySelector(`.operations__tab--${e.target.closest('.operations__tab').dataset.tab}`).classList.add('operations__tab--active')
})

// Menu fade anim.
const handleHover = function (opacity, e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity
  } 
}

nav.addEventListener('mouseover', handleHover.bind(this, 0.5))

nav.addEventListener('mouseout', handleHover.bind(this, 1))

// Sticky nav

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const navr = nav.getBoundingClientRect()
const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // threshold: ((navr.height) / header.getBoundingClientRect().height) , 
  rootMargin: `-${navr.height}px`
});
headerObs.observe(header)

// Reveal sections
// const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return
  
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})
allSections.forEach(function(s) {
  sectionObserver.observe(s)
  s.classList.add('section--hidden')
})

// Lazy loading

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src
  // entry.target.classList.remove('lazy-img')
  
  entry.target.addEventListener('load', function(e) {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => {
  imgObserver.observe(img)
})

// Slider
const sliderFunctionality = function() {

  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')
  let curSlide = 0

  const slider = document.querySelector('.slider')
  // slider.style.transform = `scale(0.5)`
  // slider.style.overflow = `visible`

  const createDots = function() {
    slides.forEach((s, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const goToSlide = function(slide,target=dotContainer.children[slide]) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * i - (100*slide)}%)`
    })
    for (let el of dotContainer.children) {
      el.classList.remove('dots__dot--active')
    }
    target ? target.classList.add('dots__dot--active') : target
  }

  const init = function() {
    createDots()
    goToSlide(0)
  }
  init()

  const nextSlide = function() {
    if (curSlide >= slides.length-1) curSlide = 0
    else curSlide ++;
    goToSlide(curSlide)
  }

  const prevSlide = function() {
    if (curSlide <= 0) curSlide = slides.length - 1
    else curSlide --;
    goToSlide(curSlide)
  }

  btnRight.addEventListener('click', nextSlide)

  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide()
    }
    if (e.key === 'ArrowRight') {
      nextSlide()
    }
  })

  dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide)
      goToSlide(curSlide)
    }
  })
}
sliderFunctionality();

// window.addEventListener('scroll', function(e) {
//   const s1coords = section1.getBoundingClientRect();
//   if (window.scrollY > s1coords.top + window.scrollY) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1);


// const h1 = document.querySelector('h1')

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'white'

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('header').style.background = 'var(--gradient-secondary)'

// document.querySelectorAll('.nav__link').forEach(function(el, i, arr) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//     const section = document.querySelector(`${el.getAttribute('href')}`)
//     section.scrollIntoView({behavior:'smooth'})
//   })
// })

// const alerth1 = function(e) {
//   alert('add: h1')


// }

// const h1 = document.querySelector('h1')
// h1.addEventListener('mouseenter', alerth1)

// const randomInt = (min, max) => Math.floor(Math.random () * (max - min + 1)+ min)
// const randomColor = ( ) => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log(e.target, e.currentTarget);
//   e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
// })
// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
// }, true)

// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000)

// h1.onmouseenter = function(e) {
//   alert('add: h1')
// }



// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo'

// // Doesn't work
// // console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist')

// const link = document.querySelector('.nav__link--btn')
// console.log(link.href);
// console.log(link.getAttribute('href'));
// console.log(window.location);

// console.log(logo.dataset.versionNumber);

// logo.classList.add('c')
// logo.classList.toggle('c')
// logo.classList.contains('c')
// logo.classList.remove('c')
// // logo.className = 'jonas'

// life

// document.addEventListener('DOMContentLoaded' , function(e) {
//   console.log('HTML PARSED AND DOM TREE BUILED', e);
// })
// window.addEventListener('load' , function(e) {
//   console.log('loaded', e);
// })
// window.addEventListener('beforeunload' , function(e) {
//   e.preventDefault()
//   console.log(e);
//   e.returnValue = ''
// })