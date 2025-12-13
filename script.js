// Inicjalizacja animacji AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Obsługa menu mobilnego
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Płynne przewijanie do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- LOGIKA SLIDERA (OPINIE) ---
const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.slider-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Ustawienie slajdów obok siebie
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
// Ponieważ używamy flexboxa w CSS dla .slider-track, ten krok w JS nie jest konieczny 
// do układania, ale jest potrzebny do obliczeń przesunięcia.
// Jednak przy flexbox wystarczy transform: translateX.

const moveToSlide = (track, currentSlide, targetSlide) => {
    // Przesuń track o index slajdu * 100%
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    track.style.transform = 'translateX(-' + targetIndex * 100 + '%)';
    
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}

// Kliknięcie w lewo
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;

    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    }
});

// Kliknięcie w prawo
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;

    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }
});

// Kliknięcie w kropki nawigacji
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-dot');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});
