/**
 * AI Assistant Module
 * Local knowledge base chatbot with voice synthesis
 */

(function () {
  'use strict';

  // ==========================================
  // DOM ELEMENTS
  // ==========================================

  const elements = {
    toggle: document.getElementById('aiToggle'),
    chat: document.getElementById('aiChat'),
    close: document.getElementById('aiClose'),
    send: document.getElementById('aiSend'),
    input: document.getElementById('aiInput'),
    messages: document.getElementById('aiMessages'),
  };

  // ==========================================
  // STATE
  // ==========================================

  let currentSpeech = null;
  let isTyping = false;
  let selectedVoice = null;
  let hasPlayedGreeting = false;

  // ==========================================
  // KNOWLEDGE BASE
  // ==========================================

  const knowledgeBase = [
    {
      keywords: ['who', 'milan', 'about', 'introduce'],
      response: "Hi! I'm Milan Priyadarshi, an AI & ML Engineer and Creative Problem Solver. I'm passionate about building innovative solutions that make a difference. Currently pursuing my MCA while continuously learning and growing in the tech world.",
      priority: 10
    },
    {
      keywords: ['skills', 'technology', 'tech'],
      response: "Milan specializes in a wide range of technologies:\n\n🎨 **Frontend Development:** HTML, CSS, JavaScript, React, Vue.js\n⚙️ **Backend Development:** C, Java, Python, MongoDB\n🛠️ **Tools & Platforms:** Git, Docker, VS Code, Webpack\n🎯 **Design & UX:** UI/UX Design, Figma, Responsive Design\n🤖 **AI/ML Focus:** Machine Learning, Data Science, AI Solutions\n\nHe's always eager to learn new technologies and tackle challenging problems!",
      priority: 9
    },
    {
      keywords: ['education', 'degree', 'mca', 'bca'],
      response: "📚 **Education Background:**\n\n🎓 **Master of Computer Applications (MCA)**\n• Gandhi Institute For Technology, Bhubaneswar\n• Affiliated with Biju Patnaik University of Technology, Odisha\n• Currently pursuing (1st Semester SGPA: 8.28)\n\n🎓 **Bachelor of Computer Applications (BCA)**\n• Utkal University, Bhubaneswar\n• Completed in 2025 with CGPA: 8.26\n\nMilan is committed to continuous learning and staying updated with the latest technologies.",
      priority: 8
    },
    {
      keywords: ['projects', 'portfolio', 'built'],
      response: "🚀 **Notable Projects:**\n\n💝 **Valentine's Day Interactive Web**\n• Responsive web application with beautiful animations\n• Interactive elements and music integration\n• Built with HTML, CSS, and JavaScript\n\n🔥 **Vue.js & Firebase Application**\n• Modern web app using Vue.js framework\n• Firebase backend integration\n• Real-time data synchronization\n\n🐍 **Python & PostgreSQL Project**\n• Backend application with Python\n• PostgreSQL database integration\n• RESTful API development\n\nCheck out the Projects section for live demos and more details!",
      priority: 8
    },
    {
      keywords: ['contact', 'email', 'linkedin', 'github'],
      response: "📬 **Get in Touch:**\n\n📧 **Email:** milanpriyadarshi447@gmail.com\n💼 **LinkedIn:** linkedin.com/in/milan-priyadarshi2004\n💻 **GitHub:** github.com/milan-priyadarshi\n🐦 **Twitter:** x.com/reyansh_milan\n\nFeel free to reach out for collaborations, opportunities, or just to say hello! Milan is always open to interesting projects and discussions.",
      priority: 9
    },
    {
      keywords: ['experience', 'background', 'professional'],
      response: "💼 **Professional Journey:**\n\nMilan is building his experience through:\n• Academic projects and research\n• Personal development projects\n• Continuous learning in AI/ML technologies\n• Open source contributions\n• Problem-solving and creative thinking\n\nHe's enthusiastic about applying his skills to real-world challenges and contributing to innovative solutions.",
      priority: 7
    },
    {
      keywords: ['resume', 'cv', 'download', 'pdf'],
      response: "📄 **Resume Download:**\n\nYou can download Milan's resume by clicking the **\"Download Resume\"** button in the hero section of this page. The PDF will start downloading automatically.\n\nHis resume includes detailed information about his skills, projects, education, and experience.",
      priority: 8
    },
    {
      keywords: ['hobby', 'hobbies', 'outside', 'personal'],
      response: "🌟 **Beyond Coding:**\n\nWhen not coding, Milan enjoys:\n• Exploring new technologies and trends\n• Contributing to open source projects\n• Learning about AI and machine learning\n• Problem-solving and creative challenges\n• Outdoor activities and nature\n\nHe's passionate about technology but also values work-life balance and continuous personal growth.",
      priority: 6
    },
    {
      keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence'],
      response: "🤖 **AI/ML Expertise:**\n\nMilan is particularly passionate about:\n• Machine Learning algorithms and applications\n• Data analysis and visualization\n• AI-driven solutions\n• Python for data science\n• Implementing ML models in real projects\n\nHe's continuously expanding his knowledge in this exciting field and loves applying AI to solve practical problems.",
      priority: 7
    },
    {
      keywords: ['frontend', 'web development', 'ui', 'ux', 'design'],
      response: "🎨 **Frontend Development:**\n\nMilan creates beautiful and functional user interfaces using:\n• Modern HTML5 and CSS3\n• JavaScript (ES6+)\n• React.js for dynamic applications\n• Vue.js for elegant solutions\n• Responsive design principles\n• UI/UX best practices with Figma\n\nHe believes great design and functionality go hand in hand!",
      priority: 7
    },
    {
      keywords: ['backend', 'server', 'database', 'api', 'java', 'python'],
      response: "⚙️ **Backend Development:**\n\nMilan works with robust backend technologies:\n• Java for enterprise applications\n• Python for versatile solutions\n• C for system-level programming\n• MongoDB for NoSQL databases\n• RESTful API design\n• Docker for containerization\n\nHe enjoys building scalable and efficient server-side solutions.",
      priority: 7
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello! 👋 I'm Milan's AI assistant. I'm here to help you learn more about his skills, projects, education, and how to get in touch. What would you like to know?",
      priority: 10
    },
    {
      keywords: ['bye', 'thanks', 'thank you'],
      response: "You're welcome! 😊 It was great chatting with you. Feel free to come back anytime if you have more questions about Milan. Have a wonderful day!",
      priority: 9
    },
    {
      keywords: ['help', 'what can you do', 'commands'],
      response: "🤝 **How I Can Help:**\n\nI can tell you about:\n• Milan's background and introduction\n• His technical skills and expertise\n• Education and qualifications\n• Projects and portfolio work\n• Contact information and social links\n• Resume and professional documents\n• Interests and hobbies\n\nJust ask me anything! For example:\n• \"Tell me about Milan's skills\"\n• \"What projects has he built?\"\n• \"How can I contact Milan?\"",
      priority: 8
    },
    {
      keywords: ['default'],
      response: "I'd be happy to help you learn more about Milan! I can tell you about his skills, projects, education, or how to contact him. What specific information are you looking for?",
      priority: 1
    }
  ];

  // ==========================================
  // CHAT UI LOGIC
  // ==========================================

  function formatMessageText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n+/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, sender) {
    if (!elements.messages) return;

    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerHTML = formatMessageText(text);
    elements.messages.appendChild(msg);
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function showTypingIndicator() {
    if (isTyping || !elements.messages) return null;

    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    elements.messages.appendChild(typing);
    elements.messages.scrollTop = elements.messages.scrollHeight;
    isTyping = true;

    return typing;
  }

  function removeTypingIndicator(el) {
    if (el) el.remove();
    isTyping = false;
  }

  function getBotResponse(userText) {
    const lowerText = userText.toLowerCase().trim();

    let bestMatch = knowledgeBase[knowledgeBase.length - 1];
    let bestScore = 0;

    knowledgeBase.forEach((item) => {
      if (item.keywords[0] === 'default') return;

      let score = 0;
      item.keywords.forEach((k) => {
        if (lowerText.includes(k)) score += k.length;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });

    return bestMatch.response;
  }

  function addWelcomeMessages() {
    const welcome = `Hello! 👋 I'm Milan's AI assistant

I can tell you about:
• His skills & technologies
• Projects he's built
• Education background
• How to contact him

What would you like to know?`;
    addMessage(welcome, 'bot');
  }

  function openChat() {
    if (elements.chat) elements.chat.classList.add('active');

    if (elements.messages && elements.messages.children.length === 0) {
      addWelcomeMessages();

      // Play voice greeting only once when assistant opens for the first time
      if (!hasPlayedGreeting) {
        setTimeout(() => playVoiceGreeting(), 1000);
        hasPlayedGreeting = true;
      }
    }
  }

  function closeChat() {
    if (elements.chat) elements.chat.classList.remove('active');

    // Stop any active speech when closing
    stopSpeech();

    // Remove typing indicator if present
    const typingEl = document.querySelector('.typing-indicator');
    if (typingEl) removeTypingIndicator(typingEl);
  }

  function handleSend() {
    if (!elements.input || isTyping) return;

    const text = elements.input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    elements.input.value = '';
    updateSendButtonState();
    botReply(text);
  }

  function updateSendButtonState() {
    if (!elements.send || !elements.input) return;

    const text = elements.input.value.trim();
    elements.send.disabled = !text || isTyping;
  }

  function botReply(userText) {
    const typingEl = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingEl);

      const response = getBotResponse(userText);
      addMessage(response, 'bot');

      // No voice for normal replies - only for initial greeting
    }, 900);
  }

  // ==========================================
  // VOICE SYNTHESIS
  // ==========================================

  function selectMaleVoice() {
    if (typeof speechSynthesis === 'undefined') return null;

    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    const malePatterns = [/male/i, /david/i, /alex/i, /james/i, /michael/i, /john/i, /robert/i];

    // First try to find voices matching male patterns
    for (const pattern of malePatterns) {
      const voice = voices.find(v => v.lang.startsWith('en') && pattern.test(v.name));
      if (voice) return voice;
    }

    // Fallback: any English voice that doesn't sound female
    const englishMaleVoice = voices.find(voice =>
      voice.lang.startsWith('en') &&
      !/female|girl|woman|karen|zira|susan|hazel/i.test(voice.name)
    );

    if (englishMaleVoice) return englishMaleVoice;

    // Final fallback: any English voice
    return voices.find(voice => voice.lang.startsWith('en')) || voices[0];
  }

  function speakText(text) {
    if (typeof speechSynthesis === 'undefined' || !text) return;

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Ensure we have a selected voice
    if (!selectedVoice) {
      selectedVoice = selectMaleVoice();
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    currentSpeech = utterance;
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      currentSpeech = null;
    };

    utterance.onerror = () => {
      currentSpeech = null;
    };
  }

  function stopSpeech() {
    if (typeof speechSynthesis !== 'undefined' && currentSpeech) {
      speechSynthesis.cancel();
      currentSpeech = null;
    }
  }

  function playVoiceGreeting() {
    if (typeof speechSynthesis === 'undefined') return;

    // Ensure we have a voice selected before speaking
    if (!selectedVoice) {
      selectedVoice = selectMaleVoice();
    }

    const greeting = "Hello! I'm Milan's AI assistant. Feel free to ask me anything about his work, skills, or projects.";
    speakText(greeting);
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  function initializeEventListeners() {
    if (elements.toggle) elements.toggle.addEventListener('click', openChat);
    if (elements.close) elements.close.addEventListener('click', closeChat);
    if (elements.send) elements.send.addEventListener('click', handleSend);

    if (elements.input) {
      elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });

      elements.input.addEventListener('input', updateSendButtonState);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeChat();
    });

    // Suggestion buttons - no voice for these
    document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.getAttribute('data-msg');
        if (msg && !isTyping) {
          addMessage(msg, 'user');
          botReply(msg);
        }
      });
    });

    const form = elements.input?.closest('form');
    if (form) {
      form.addEventListener('submit', (e) => e.preventDefault());
    }
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================

  function initializeVoiceSynthesis() {
    if (typeof speechSynthesis === 'undefined') return;

    // Try to get voices immediately
    selectedVoice = selectMaleVoice();

    // Set up the event listener for when voices change (async loading)
    speechSynthesis.onvoiceschanged = () => {
      selectedVoice = selectMaleVoice();
    };

    // Fallback: try again after a short delay in case voices load asynchronously
    setTimeout(() => {
      if (!selectedVoice) {
        selectedVoice = selectMaleVoice();
      }
    }, 100);
  }

  function initialize() {
    initializeVoiceSynthesis();
    initializeEventListeners();
    updateSendButtonState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();