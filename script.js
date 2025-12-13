// Inicjalizacja animacji AOS
AOS.init({ duration: 800, once: true, offset: 100 });

// Menu mobilne
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

// Płynne przewijanie
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- UNIWERSALNA FUNKCJA SLIDERA (Obsługuje Realizacje i Opinie) ---
function initSlider(sliderID) {
    const wrapper = document.getElementById(sliderID);
    if (!wrapper) return; // Jeśli slider nie istnieje, przerwij

    const track = wrapper.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextBtn = wrapper.querySelector('.next-btn');
    const prevBtn = wrapper.querySelector('.prev-btn');

    // Ustawienie szerokości slajdu
    const slideWidth = 100; // procenty

    // Funkcja przesuwania
    const moveToSlide = (currentSlide, targetSlide) => {
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        track.style.transform = 'translateX(-' + targetIndex * slideWidth + '%)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Kliknięcie w prawo
    nextBtn.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        
        // Pętla: jak dojedzie do końca, wraca na początek
        if (!nextSlide) {
            nextSlide = slides[0];
        }

        moveToSlide(currentSlide, nextSlide);
    });

    // Kliknięcie w lewo
    prevBtn.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;

        // Pętla: jak jest na początku, idzie na koniec
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
        }

        moveToSlide(currentSlide, prevSlide);
    });
}

// Uruchomienie sliderów dla konkretnych sekcji
initSlider('projects-slider');
initSlider('reviews-slider');
