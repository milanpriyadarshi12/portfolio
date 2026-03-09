/**
 * AI Assistant Module
 * Handles chat UI, message formatting, and knowledge base responses
 */

(function () {
  'use strict';

  const VOICE_GREETING_KEY = 'milan_portfolio_voice_played';

  const elements = {
    toggle: document.getElementById('aiToggle'),
    chat: document.getElementById('aiChat'),
    close: document.getElementById('aiClose'),
    send: document.getElementById('aiSend'),
    input: document.getElementById('aiInput'),
    messages: document.getElementById('aiMessages'),
    assistant: document.querySelector('.ai-assistant'),
  };

  const knowledgeBase = [
    { keywords: ['skill', 'skills', 'technology', 'technologies', 'tech', 'expertise', 'know', 'can do'],
      response: "Milan specializes in:\n\n• **Frontend:** HTML, CSS, JavaScript, React, Vue.js\n• **Backend:** C, Java, Python, MongoDB\n• **Tools:** Git, Docker, VS Code, Webpack\n• **Design:** UI/UX, Figma, Responsive Design\n\nHe's an AI & ML Engineer with a focus on practical projects and creative problem-solving." },
    { keywords: ['project', 'projects', 'built', 'built?', 'work', 'portfolio'],
      response: "Milan has built several projects:\n\n• **Valentine's Day Interactive Web** – Responsive project with animations, music, and interactive elements (HTML, CSS, JS)\n• **Project Two** – Vue.js & Firebase application\n• **Project Three** – Python & PostgreSQL project\n\nCheck the Projects section for live links!" },
    { keywords: ['education', 'degree', 'university', 'college', 'study', 'mca', 'bca'],
      response: "Milan's Education:\n\n• **MCA** (Pursuing) – Gandhi Institute For Technology, Bhubaneswar | SGPA: 8.28 (1st Sem)\n• **BCA** (2025) – Utkal University, Bhubaneswar | CGPA: 8.26\n\nHe's continuously learning and expanding his knowledge in AI/ML." },
    { keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'twitter'],
      response: "You can contact Milan:\n\n📧 Email: milanpriyadarshi447@gmail.com\n🔗 LinkedIn: linkedin.com/in/milan-priyadarshi2004\n💻 GitHub: github.com/milan-priyadarshi\n🐦 Twitter: x.com/reyansh_milan\n\nFeel free to reach out for collaboration!" },
    { keywords: ['resume', 'cv', 'download'],
      response: "You can download Milan's resume from the **Download Resume** button in the hero section. The PDF will start downloading when you click it." },
    { keywords: ['portfolio', 'about', 'who is milan'],
      response: "Milan Priyadarshi is an AI & ML Engineer and Creative Problem Solver. He's passionate about AI/ML and loves building practical projects. He's a motivated learner eager to contribute to innovative AI-driven solutions." },
    { keywords: ['experience', 'experience?'],
      response: "Milan is building experience through academic projects, personal projects, and continuous learning in AI/ML. Check his Projects section for details!" },
    { keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello! 👋 I'm Milan's AI assistant. How can I help you today? Ask about his skills, projects, education, or contact info!" },
    { keywords: ['thanks', 'thank you', 'help'],
      response: "You're welcome! 😊 Feel free to ask anything else about Milan. Good luck!" },
    { keywords: ['default'],
      response: "You can ask me about:\n\n• Milan's skills\n• Milan's projects\n• Education\n• Contact information\n• Resume\n\nJust type your question above!" },
  ];

  function formatMessageText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n+/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerHTML = formatMessageText(text);
    elements.messages.appendChild(msg);
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    elements.messages.appendChild(typing);
    elements.messages.scrollTop = elements.messages.scrollHeight;
    return typing;
  }

  function removeTypingIndicator(el) {
    if (el && el.parentNode) el.remove();
  }

  function getBotResponse(userText) {
    const lower = userText.toLowerCase().trim();
    for (const item of knowledgeBase) {
      if (item.keywords[0] === 'default') continue;
      if (item.keywords.some(kw => lower.includes(kw))) return item.response;
    }
    return knowledgeBase[knowledgeBase.length - 1].response;
  }

  function addWelcomeMessages() {
    const welcome = `Hello! I'm Milan's AI assistant 🤖

I can help you with information about:

• Milan's skills
• Projects
• Education
• Contact information
• Resume

Just ask me anything!`;
    addMessage(welcome, 'bot');
  }

  function playVoiceGreeting() {
    if (typeof speechSynthesis === 'undefined') return;
    if (sessionStorage.getItem(VOICE_GREETING_KEY)) return;
    const utterance = new SpeechSynthesisUtterance(
      "Hello! I'm Milan's assistant. Feel free to ask me anything about his work, skills, or projects."
    );
    utterance.rate = 0.95;
    utterance.pitch = 1;
    const voices = speechSynthesis.getVoices();
    const en = voices.find(v => v.lang.startsWith('en'));
    if (en) utterance.voice = en;
    utterance.onend = () => sessionStorage.setItem(VOICE_GREETING_KEY, 'true');
    speechSynthesis.speak(utterance);
  }

  function botReply(userText) {
    const typingEl = showTypingIndicator();
    const response = getBotResponse(userText);
    const delay = Math.min(600 + Math.random() * 400, 1200);
    setTimeout(() => {
      removeTypingIndicator(typingEl);
      addMessage(response, 'bot');
    }, delay);
  }

  function openChat() {
    elements.chat?.classList.add('active');
    elements.assistant?.classList.add('chat-open');
    if (elements.messages && elements.messages.children.length === 0) {
      addWelcomeMessages();
      playVoiceGreeting();
    }
  }

  function closeChat() {
    elements.chat?.classList.remove('active');
    elements.assistant?.classList.remove('chat-open');
  }

  function handleSend() {
    const text = elements.input?.value?.trim();
    if (!text) return;
    addMessage(text, 'user');
    elements.input.value = '';
    botReply(text);
  }

  if (elements.toggle) elements.toggle.addEventListener('click', openChat);
  if (elements.close) elements.close.addEventListener('click', closeChat);
  if (elements.send) elements.send.addEventListener('click', handleSend);

  if (elements.input) {
    elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeChat();
  });

  document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      if (msg) {
        addMessage(msg, 'user');
        botReply(msg);
      }
    });
  });

  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = () => {};
  }
})();
