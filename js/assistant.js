/**
 * AI Assistant Module
 * Clean, optimized local knowledge base chatbot with voice synthesis
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
    assistant: document.querySelector('.ai-assistant'),
  };

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  let currentSpeech = null;
  let isTyping = false;
  let selectedVoice = null;
  const VOICE_GREETING_KEY = 'milan_portfolio_voice_played';

  // ==========================================
  // KNOWLEDGE BASE
  // ==========================================

  const knowledgeBase = [
    // Personal Information
    {
      keywords: ['who', 'milan', 'about', 'introduce', 'himself', 'person'],
      response: "Hi! I'm Milan Priyadarshi, an AI & ML Engineer and Creative Problem Solver. I'm passionate about building innovative solutions that make a difference. Currently pursuing my MCA while continuously learning and growing in the tech world.",
      priority: 10
    },

    // Skills and Technologies
    {
      keywords: ['skill', 'skills', 'technology', 'technologies', 'tech', 'expertise', 'know', 'can do', 'programming'],
      response: "Milan specializes in a wide range of technologies:\n\n🎨 **Frontend Development:** HTML, CSS, JavaScript, React, Vue.js\n⚙️ **Backend Development:** C, Java, Python, MongoDB\n🛠️ **Tools & Platforms:** Git, Docker, VS Code, Webpack\n🎯 **Design & UX:** UI/UX Design, Figma, Responsive Design\n🤖 **AI/ML Focus:** Machine Learning, Data Science, AI Solutions\n\nHe's always eager to learn new technologies and tackle challenging problems!",
      priority: 9
    },

    // Education
    {
      keywords: ['education', 'degree', 'university', 'college', 'study', 'mca', 'bca', 'academic', 'qualification'],
      response: "📚 **Education Background:**\n\n🎓 **Master of Computer Applications (MCA)**\n• Gandhi Institute For Technology, Bhubaneswar\n• Affiliated with Biju Patnaik University of Technology, Odisha\n• Currently pursuing (1st Semester SGPA: 8.28)\n\n🎓 **Bachelor of Computer Applications (BCA)**\n• Utkal University, Bhubaneswar\n• Completed in 2025 with CGPA: 8.26\n\nMilan is committed to continuous learning and staying updated with the latest technologies.",
      priority: 8
    },

    // Projects
    {
      keywords: ['project', 'projects', 'built', 'work', 'portfolio', 'development', 'created'],
      response: "🚀 **Notable Projects:**\n\n💝 **Valentine's Day Interactive Web**\n• Responsive web application with beautiful animations\n• Interactive elements and music integration\n• Built with HTML, CSS, and JavaScript\n\n🔥 **Vue.js & Firebase Application**\n• Modern web app using Vue.js framework\n• Firebase backend integration\n• Real-time data synchronization\n\n🐍 **Python & PostgreSQL Project**\n• Backend application with Python\n• PostgreSQL database integration\n• RESTful API development\n\nCheck out the Projects section for live demos and more details!",
      priority: 8
    },

    // Contact Information
    {
      keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'twitter', 'social', 'communication'],
      response: "📬 **Get in Touch:**\n\n📧 **Email:** milanpriyadarshi447@gmail.com\n💼 **LinkedIn:** linkedin.com/in/milan-priyadarshi2004\n💻 **GitHub:** github.com/milan-priyadarshi\n🐦 **Twitter:** x.com/reyansh_milan\n\nFeel free to reach out for collaborations, opportunities, or just to say hello! Milan is always open to interesting projects and discussions.",
      priority: 9
    },

    // Experience and Background
    {
      keywords: ['experience', 'background', 'work experience', 'professional', 'career'],
      response: "💼 **Professional Journey:**\n\nMilan is building his experience through:\n• Academic projects and research\n• Personal development projects\n• Continuous learning in AI/ML technologies\n• Open source contributions\n• Problem-solving and creative thinking\n\nHe's enthusiastic about applying his skills to real-world challenges and contributing to innovative solutions.",
      priority: 7
    },

    // Resume/CV
    {
      keywords: ['resume', 'cv', 'download', 'pdf', 'document'],
      response: "📄 **Resume Download:**\n\nYou can download Milan's resume by clicking the **\"Download Resume\"** button in the hero section of this page. The PDF will start downloading automatically.\n\nHis resume includes detailed information about his skills, projects, education, and experience.",
      priority: 8
    },

    // Interests and Hobbies
    {
      keywords: ['interest', 'hobby', 'hobbies', 'outside', 'free time', 'personal'],
      response: "🌟 **Beyond Coding:**\n\nWhen not coding, Milan enjoys:\n• Exploring new technologies and trends\n• Contributing to open source projects\n• Learning about AI and machine learning\n• Problem-solving and creative challenges\n• Outdoor activities and nature\n\nHe's passionate about technology but also values work-life balance and continuous personal growth.",
      priority: 6
    },

    // AI/ML Specific
    {
      keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'data science'],
      response: "🤖 **AI/ML Expertise:**\n\nMilan is particularly passionate about:\n• Machine Learning algorithms and applications\n• Data analysis and visualization\n• AI-driven solutions\n• Python for data science\n• Implementing ML models in real projects\n\nHe's continuously expanding his knowledge in this exciting field and loves applying AI to solve practical problems.",
      priority: 7
    },

    // Frontend Specific
    {
      keywords: ['frontend', 'web development', 'ui', 'ux', 'design', 'interface'],
      response: "🎨 **Frontend Development:**\n\nMilan creates beautiful and functional user interfaces using:\n• Modern HTML5 and CSS3\n• JavaScript (ES6+)\n• React.js for dynamic applications\n• Vue.js for elegant solutions\n• Responsive design principles\n• UI/UX best practices with Figma\n\nHe believes great design and functionality go hand in hand!",
      priority: 7
    },

    // Backend Specific
    {
      keywords: ['backend', 'server', 'database', 'api', 'java', 'python backend'],
      response: "⚙️ **Backend Development:**\n\nMilan works with robust backend technologies:\n• Java for enterprise applications\n• Python for versatile solutions\n• C for system-level programming\n• MongoDB for NoSQL databases\n• RESTful API design\n• Docker for containerization\n\nHe enjoys building scalable and efficient server-side solutions.",
      priority: 7
    },

    // Greeting responses
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! 👋 I'm Milan's AI assistant. I'm here to help you learn more about his skills, projects, education, and how to get in touch. What would you like to know?",
      priority: 10
    },

    // Farewell responses
    {
      keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'appreciate'],
      response: "You're welcome! 😊 It was great chatting with you. Feel free to come back anytime if you have more questions about Milan. Have a wonderful day!",
      priority: 9
    },

    // Help responses
    {
      keywords: ['help', 'what can you do', 'how to use', 'commands', 'options'],
      response: "🤝 **How I Can Help:**\n\nI can tell you about:\n• Milan's background and introduction\n• His technical skills and expertise\n• Education and qualifications\n• Projects and portfolio work\n• Contact information and social links\n• Resume and professional documents\n• Interests and hobbies\n\nJust ask me anything! For example:\n• \"Tell me about Milan's skills\"\n• \"What projects has he built?\"\n• \"How can I contact Milan?\"",
      priority: 8
    },

    // Default fallback
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
    isTyping = true;
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    elements.messages.appendChild(typing);
    elements.messages.scrollTop = elements.messages.scrollHeight;
    return typing;
  }

  function removeTypingIndicator(el) {
    if (el && el.parentNode) {
      el.remove();
    }
    isTyping = false;
  }

  function getBotResponse(userText) {
    const lowerText = userText.toLowerCase().trim();

    // Find the best matching response based on keyword matches and priority
    let bestMatch = null;
    let bestScore = 0;
    let bestPriority = 0;

    for (const item of knowledgeBase) {
      if (item.keywords[0] === 'default') continue;

      let score = 0;
      const matchedKeywords = [];

      for (const keyword of item.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher weight
          matchedKeywords.push(keyword);
        }
      }

      // Boost score for multiple keyword matches
      if (matchedKeywords.length > 1) {
        score *= 1.5;
      }

      // Consider priority as tiebreaker
      if (score > bestScore || (score === bestScore && item.priority > bestPriority)) {
        bestScore = score;
        bestMatch = item;
        bestPriority = item.priority;
      }
    }

    return bestMatch ? bestMatch.response : knowledgeBase[knowledgeBase.length - 1].response;
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
    if (elements.assistant) elements.assistant.classList.add('chat-open');

    if (elements.messages && elements.messages.children.length === 0) {
      addWelcomeMessages();
      setTimeout(() => playVoiceGreeting(), 1000);
    }
  }

  function closeChat() {
    if (elements.chat) elements.chat.classList.remove('active');
    if (elements.assistant) elements.assistant.classList.remove('chat-open');

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

  async function botReply(userText) {
    const typingEl = showTypingIndicator();

    try {
      const response = getBotResponse(userText);
      const delay = Math.min(800 + Math.random() * 600, 1500);

      setTimeout(() => {
        removeTypingIndicator(typingEl);
        addMessage(response, 'bot');
        speakText(response);
      }, delay);
    } catch (error) {
      console.error('Bot reply error:', error);
      removeTypingIndicator(typingEl);
      addMessage("Sorry, I'm having trouble responding right now. Please try again!", 'bot');
    }
  }

  // ==========================================
  // VOICE SYNTHESIS
  // ==========================================

  function selectMaleVoice() {
    if (typeof speechSynthesis === 'undefined') return null;

    const voices = speechSynthesis.getVoices();

    // Priority order for male voices
    const maleVoicePatterns = [
      /male/i,
      /david/i,
      /alex/i,
      /james/i,
      /michael/i,
      /john/i,
      /robert/i,
      /william/i,
      /christopher/i,
      /daniel/i
    ];

    // First try to find voices matching male patterns
    for (const pattern of maleVoicePatterns) {
      const maleVoice = voices.find(voice =>
        voice.lang.startsWith('en') && pattern.test(voice.name)
      );
      if (maleVoice) return maleVoice;
    }

    // Fallback: any English male-sounding voice
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

    // Stop any current speech
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, '')); // Remove HTML tags
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Use selected male voice
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
    if (sessionStorage.getItem(VOICE_GREETING_KEY)) return;

    const greeting = "Hello! I'm Milan's AI assistant. Feel free to ask me anything about his work, skills, or projects.";
    speakText(greeting);
    sessionStorage.setItem(VOICE_GREETING_KEY, 'true');
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  function initializeEventListeners() {
    // Chat controls
    if (elements.toggle) elements.toggle.addEventListener('click', openChat);
    if (elements.close) elements.close.addEventListener('click', closeChat);
    if (elements.send) elements.send.addEventListener('click', handleSend);

    // Input handling
    if (elements.input) {
      elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });

      elements.input.addEventListener('input', updateSendButtonState);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeChat();
    });

    // Suggestion buttons
    document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.getAttribute('data-msg');
        if (msg && !isTyping) {
          addMessage(msg, 'user');
          botReply(msg);
        }
      });
    });

    // Prevent form submission
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

    // Initialize voice selection when voices are loaded
    speechSynthesis.onvoiceschanged = () => {
      selectedVoice = selectMaleVoice();
    };

    // If voices are already loaded, select immediately
    if (speechSynthesis.getVoices().length > 0) {
      selectedVoice = selectMaleVoice();
    }
  }

  function initialize() {
    // Initialize voice synthesis
    initializeVoiceSynthesis();

    // Initialize event listeners
    initializeEventListeners();

    // Update send button state
    updateSendButtonState();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
