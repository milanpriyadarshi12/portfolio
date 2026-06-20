/* ============================================================
   AI ASSISTANT MODULE
   Local knowledge base chatbot
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Elements ---------- */
  const els = {
    toggle: document.getElementById('aiToggle'),
    chat:   document.getElementById('aiChat'),
    close:  document.getElementById('aiClose'),
    send:   document.getElementById('aiSend'),
    input:  document.getElementById('aiInput'),
    msgs:   document.getElementById('aiMessages'),
  };

  if (!els.toggle || !els.chat) return;

  /* ---------- State ---------- */
  let isOpen = false;
  let isTyping = false;
  let hasGreeted = false;
  let currentSpeech = null;
  let selectedVoice = null;

  /* ---------- Knowledge Base ---------- */
  const kb = [
    {
      kw: ['who', 'milan', 'about', 'introduce', 'yourself'],
      res: "Hi! I'm Milan Priyadarshi — an AI & ML Engineer and Creative Problem Solver. Currently pursuing my MCA while building innovative projects. Passionate about AI, web development, and turning ideas into working products.",
      p: 10
    },
    {
      kw: ['skills', 'technology', 'tech', 'stack', 'know'],
      res: "Milan's technical skills include:\n\n🎨 **Frontend:** HTML, CSS, JavaScript, React, Chart.js\n⚙️ **Backend:** Python, Java, C, Django, MySQL\n🤖 **AI/ML:** Machine Learning, NLP, spaCy, scikit-learn\n🎯 **Design:** UI/UX, Figma, Responsive Design",
      p: 9
    },
    {
      kw: ['education', 'degree', 'mca', 'bca', 'university', 'college'],
      res: "📚 Milan's Education:\n\n🎓 **MCA** — Gandhi Institute For Technology, Bhubaneswar\n• SGPA: 8.28 (1st Semester) | Currently Pursuing\n\n🎓 **BCA** — Utkal University, Bhubaneswar\n• CGPA: 8.26 | Completed 2025",
      p: 8
    },
    {
      kw: ['projects', 'portfolio', 'built', 'work', 'made'],
      res: "🚀 Milan's Featured Projects:\n\n🤖 **AI Resume Intelligence Platform** — NLP-powered resume analyzer with ATS scoring, job matching, and improvement suggestions. Built with Python, Flask, spaCy.\n\n💝 **Valentine's Day Interactive Web** — Responsive animated project with music and interactive elements. Built with HTML/CSS/JS.\n\nCheck the Projects section for live demos!",
      p: 8
    },
    {
      kw: ['contact', 'email', 'reach', 'linkedin', 'github', 'social'],
      res: "📬 Contact Milan:\n\n📧 **Email:** milanpriyadarshi447@gmail.com\n💼 **LinkedIn:** linkedin.com/in/milan-priyadarshi2004\n💻 **GitHub:** github.com/milan-priyadarshi\n🐦 **Twitter:** x.com/reyansh_milan\n\nHe's open to collaborations and opportunities!",
      p: 9
    },
    {
      kw: ['resume', 'cv', 'download', 'pdf'],
      res: "📄 You can download Milan's resume by clicking the **\"Download Resume\"** button in the hero section. It includes his full skills, projects, and education details.",
      p: 8
    },
    {
      kw: ['ai', 'ml', 'machine learning', 'artificial', 'nlp'],
      res: "🤖 Milan is passionate about AI/ML! He works with:\n• Machine Learning algorithms\n• Natural Language Processing (NLP)\n• scikit-learn & spaCy\n• AI-powered web applications\n\nHis AI Resume Intelligence Platform is a great example of applied ML!",
      p: 7
    },
    {
      kw: ['hello', 'hi', 'hey', 'greetings', 'sup'],
      res: "Hello! 👋 I'm Milan's AI assistant. I can tell you about his skills, projects, education, and how to get in touch. What would you like to know?",
      p: 10
    },
    {
      kw: ['bye', 'thanks', 'thank', 'goodbye'],
      res: "You're welcome! 😊 Great chatting with you. Come back anytime if you have more questions about Milan. Have a wonderful day!",
      p: 9
    },
    {
      kw: ['help', 'what', 'can', 'commands'],
      res: "I can tell you about:\n• Milan's **skills** & technologies\n• His **projects** and portfolio work\n• **Education** background\n• How to **contact** him\n• Download his **resume**\n\nJust ask naturally — e.g. \"What are his skills?\" or \"How can I hire Milan?\"",
      p: 8
    },
    {
      kw: ['__default__'],
      res: "I'd love to help you learn more about Milan! Ask me about his skills, projects, education, or how to contact him.",
      p: 1
    }
  ];

  /* ---------- Helpers ---------- */
  function fmt(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function addMsg(text, sender) {
    if (!els.msgs) return;
    const d = document.createElement('div');
    d.className = 'message ' + sender;
    d.innerHTML = fmt(text);
    els.msgs.appendChild(d);
    els.msgs.scrollTop = els.msgs.scrollHeight;
  }

  function showTyping() {
    if (isTyping || !els.msgs) return null;
    const t = document.createElement('div');
    t.className = 'typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    els.msgs.appendChild(t);
    els.msgs.scrollTop = els.msgs.scrollHeight;
    isTyping = true;
    return t;
  }

  function hideTyping(el) {
    if (el && el.parentNode) el.remove();
    isTyping = false;
  }

  function getReply(text) {
    const lower = text.toLowerCase().trim();
    let best = kb[kb.length - 1];
    let bestScore = 0;

    kb.forEach(item => {
      if (item.kw[0] === '__default__') return;
      let score = 0;
      item.kw.forEach(k => { if (lower.includes(k)) score += k.length + item.p; });
      if (score > bestScore) { bestScore = score; best = item; }
    });

    return best.res;
  }

  function botReply(text) {
    const typing = showTyping();
    setTimeout(() => {
      hideTyping(typing);
      addMsg(getReply(text), 'bot');
    }, 700 + Math.random() * 300);
  }

  function updateSendBtn() {
    if (els.send && els.input) {
      els.send.disabled = !els.input.value.trim() || isTyping;
    }
  }

  function handleSend() {
    if (!els.input || isTyping) return;
    const text = els.input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    els.input.value = '';
    updateSendBtn();
    botReply(text);
  }

  /* ---------- Open / Close ---------- */
  function openChat() {
    isOpen = true;
    els.chat.classList.add('active');

    if (els.msgs && els.msgs.children.length === 0) {
      addMsg("Hello! 👋 I'm Milan's AI assistant.\n\nI can tell you about his **skills**, **projects**, **education**, and how to **contact** him.\n\nWhat would you like to know?", 'bot');
      if (!hasGreeted) {
        hasGreeted = true;
        setTimeout(speakGreeting, 800);
      }
    }
  }

  function closeChat() {
    isOpen = false;
    els.chat.classList.remove('active');
    stopSpeech();
  }

  /* ---------- Voice (greeting only) ---------- */
  function selectVoice() {
    if (typeof speechSynthesis === 'undefined') return;
    const voices = speechSynthesis.getVoices();
    const patterns = [/david/i, /alex/i, /james/i, /male/i, /michael/i];
    for (const p of patterns) {
      const v = voices.find(v => v.lang.startsWith('en') && p.test(v.name));
      if (v) { selectedVoice = v; return; }
    }
    selectedVoice = voices.find(v => v.lang.startsWith('en') && !/karen|zira|susan|hazel|female/i.test(v.name))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0]
      || null;
  }

  function stopSpeech() {
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      currentSpeech = null;
    }
  }

  function speakGreeting() {
    if (typeof speechSynthesis === 'undefined') return;
    if (!selectedVoice) selectVoice();
    const utt = new SpeechSynthesisUtterance("Hello! I'm Milan's AI assistant. Feel free to ask me about his skills or projects.");
    utt.rate = 0.92;
    utt.pitch = 1;
    utt.volume = 0.7;
    if (selectedVoice) utt.voice = selectedVoice;
    currentSpeech = utt;
    speechSynthesis.speak(utt);
    utt.onend = () => { currentSpeech = null; };
    utt.onerror = () => { currentSpeech = null; };
  }

  /* ---------- Events ---------- */
  els.toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  if (els.close) els.close.addEventListener('click', closeChat);
  if (els.send) els.send.addEventListener('click', handleSend);

  if (els.input) {
    els.input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    els.input.addEventListener('input', updateSendBtn);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-msg');
      if (!msg || isTyping) return;
      if (!isOpen) openChat();
      addMsg(msg, 'user');
      botReply(msg);
    });
  });

  /* ---------- Voice init ---------- */
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = selectVoice;
    setTimeout(selectVoice, 100);
  }

  updateSendBtn();
})();
