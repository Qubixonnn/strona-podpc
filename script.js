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


// --- CHATBOT LOGIC ---

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const messagesContainer = document.getElementById('chat-messages');

// Otwieranie/zamykanie
if(chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });
}

if(chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
}

// Funkcja dodawania wiadomości
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerHTML = text; // innerHTML pozwala na linki <a href>
    messagesContainer.appendChild(msgDiv);
    
    // Przewiń do dołu
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// "MÓZG" Bota - proste słowa kluczowe
function getBotResponse(input) {
    // Zamień na małe litery, żeby "CENA" i "cena" było tym samym
    input = input.toLowerCase();

    if (input.includes('cen') || input.includes('koszt') || input.includes('ile')) {
        return 'Ceny zaczynają się od 20 zł. <a href="#pricing" style="color:blue">Sprawdź pełny cennik tutaj</a>.';
    } 
    else if (input.includes('adres') || input.includes('gdzie') || input.includes('dojazd')) {
        return 'Znajdziesz mnie w Podwody-Kolonia 16A, Bełchatów. <a href="#contact" style="color:blue">Zobacz mapę</a>.';
    }
    else if (input.includes('telefon') || input.includes('kontakt') || input.includes('nr')) {
        return 'Mój numer to: 536 515 451. Możesz dzwonić śmiało!';
    }
    else if (input.includes('czas') || input.includes('długo')) {
        return 'Większość napraw wykonuję w 24-48h. Diagnostyka jest zazwyczaj tego samego dnia.';
    }
    else if (input.includes('cześć') || input.includes('hej') || input.includes('witam')) {
        return 'Cześć! W czym mogę Ci pomóc z Twoim komputerem?';
    }
    else {
        return 'Nie jestem pewien, ale chętnie odpowiem osobiście. Napisz do mnie przez formularz kontaktowy!';
    }
}

// Obsługa wysyłania
function handleSend() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // 1. Dodaj wiadomość użytkownika
    addMessage(text, 'user');
    chatInput.value = '';

    // 2. Symuluj myślenie bota (małe opóźnienie)
    setTimeout(() => {
        const reply = getBotResponse(text);
        addMessage(reply, 'bot');
    }, 600);
}

if(chatSend) {
    chatSend.addEventListener('click', handleSend);
    
    // Obsługa klawisza Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

