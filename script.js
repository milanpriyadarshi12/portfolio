// Smooth scroll behavior for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .education-card, .highlight-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active nav link highlighting (improved)
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

function updateActiveNav() {
  const scrollPosition = window.scrollY || window.pageYOffset;
  let current = sections[0].id;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // offset for sticky navbar
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.id;
    }
  });
// Special case: if near the bottom of the page, highlight the last section
  if (window.innerHeight + scrollPosition >= document.body.scrollHeight - 10) {
    current = sections[sections.length - 1].id;
  }
  navLinks.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
  if (activeLink) activeLink.classList.add("active");
}

// Update on scroll
window.addEventListener("scroll", updateActiveNav);

// Run on page load
updateActiveNav();
// AI Assistant Logic
const aiToggle = document.getElementById("aiToggle");
const aiChat = document.getElementById("aiChat");
const aiClose = document.getElementById("aiClose");
const aiSend = document.getElementById("aiSend");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

// Local Knowledge Base
const knowledgeBase = {
  "who are you": "Hi! I'm Milan's AI assistant 🤖. I can tell you about his skills, projects, and how to contact him.",
  "skills": "Milan specializes in AI, Machine Learning, Python, JavaScript, React, and backend development.",
  "projects": "Milan has built interactive web projects, AI-based systems, and full-stack applications.",
  "contact": "You can contact Milan via email at milanpriyadarshi447@gmail.com or through LinkedIn.",
  "education": "Milan is pursuing MCA and has completed BCA with strong academic performance."
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

  let response = "I'm not sure about that 🤔. You can ask about skills, projects, education, or contact info.";

  for (let key in knowledgeBase) {
    const pattern = new RegExp(`\\b${key}\\b`, 'i');
    if (pattern.test(lowerText)) {
    response = knowledgeBase[key];
    break;
    }
  }

  setTimeout(() => {
    addMessage(response, "bot");
  }, 800);
}

aiToggle.addEventListener("click", () => {
  aiChat.classList.add("active");
});

aiClose.addEventListener("click", () => {
  aiChat.classList.remove("active");
});

aiSend.addEventListener("click", () => {
  const text = aiInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  aiInput.value = "";
  botReply(text);
});

aiInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") aiSend.click();
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") aiChat.classList.remove("active");
});
