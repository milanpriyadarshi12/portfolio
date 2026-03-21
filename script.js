/**
 * Portfolio - Milan Priyadarshi
 * Main JavaScript: Navigation, Animations
 */

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-menu')?.classList.remove('active');
        }
    });
});

// ========== Intersection Observer - Scroll Reveal ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .education-card, .highlight-card, .section-heading').forEach(el => {
    el.classList.add('animate-on-scroll');
    revealObserver.observe(el);
});

document.querySelectorAll('section h2').forEach(h => {
    h.classList.add('section-heading', 'animate-on-scroll');
    revealObserver.observe(h);
});

// ========== Active Nav Link ==========
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    let current = sections[0]?.id || 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.id;
        }
    });

    if (window.innerHeight + scrollPosition >= document.body.scrollHeight - 10) {
        current = sections[sections.length - 1]?.id || current;
    }

    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
    if (activeLink) activeLink.classList.add('active');
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ========== Mobile Hamburger Menu ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
}
// ========== AI Assistant ==========

const aiToggle = document.getElementById("aiToggle");
const aiChat = document.getElementById("aiChat");
const aiClose = document.getElementById("aiClose");
const aiSend = document.getElementById("aiSend");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

// Safety check (prevents errors if elements not loaded)
if (aiToggle && aiChat) {

    // Local Knowledge Base
    const knowledgeBase = {
        "who are you": "Hi! I'm Milan's AI assistant 🤖.",
        "skills": "Milan works with AI, ML, Python, JavaScript, React and backend tech.",
        "projects": "He built interactive web apps and AI-based projects.",
        "contact": "Email: milanpriyadarshi447@gmail.com",
        "education": "MCA pursuing | BCA completed with strong CGPA"
    };

    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.classList.add("message", sender);
        msg.textContent = text;
        aiMessages.appendChild(msg);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function botReply(userText) {
        const lowerText = userText.toLowerCase();

        let response = "Ask me about skills, projects, education or contact 😊";

        for (let key in knowledgeBase) {
            if (lowerText.includes(key)) {
                response = knowledgeBase[key];
                break;
            }
        }

        // Typing animation
        const typingMsg = document.createElement("div");
        typingMsg.classList.add("message", "bot");
        typingMsg.textContent = "Typing...";
        aiMessages.appendChild(typingMsg);

        setTimeout(() => {
            typingMsg.remove();
            addMessage(response, "bot");
        }, 700);
    }

    // Open chat
    aiToggle.addEventListener("click", () => {
        aiChat.classList.toggle("active");
    });

    // Close chat
    aiClose?.addEventListener("click", () => {
        aiChat.classList.remove("active");
    });

    // Send message
    aiSend?.addEventListener("click", () => {
        const text = aiInput.value.trim();
        if (!text) return;

        addMessage(text, "user");
        aiInput.value = "";
        botReply(text);
    });

    // Enter key
    aiInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") aiSend.click();
    });
}
