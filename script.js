// Inicjalizacja animacji AOS (Animate On Scroll)
AOS.init({
    duration: 800, // Czas trwania animacji w ms
    once: true,    // Animacja wykona się tylko raz
    offset: 100    // Uruchomienie animacji 100px przed elementem
});

// Obsługa menu mobilnego
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animacja ikony hamburgera (opcjonalnie)
    hamburger.classList.toggle('toggle');
});

// Zamykanie menu po kliknięciu w link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Płynne przewijanie do sekcji (dla starszych przeglądarek)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});