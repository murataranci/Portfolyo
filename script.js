// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    easing: 'ease-in-out'
});

// For text animation
const typingText = document.querySelector('.typing-text');
const texts = [
    'Frontend Developer',
    'React & JavaScript Developer',
    'Modern Web Technologies',
    'UI/UX Focused Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 100 : 200);
    }
}

typeText();

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuBtn.classList.toggle('menu-active');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : 'auto';
    
    // Link animations
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close menu when menu links are clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        menuBtn.classList.remove('menu-active');
        document.body.style.overflow = 'auto';
        
        navLinksItems.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active menu item
    let current = '';
    
    navLinksItems.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = link.hash;
            }
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.hash === current) {
            link.classList.add('active');
        }
    });
}); 