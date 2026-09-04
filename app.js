/**
 * ============================================================================
 * SYAZRI THE GREAT — WISDOM ENGINE & INTERACTIVE CLIENT
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CODEX DATASET: OFFICIAL QUOTES OF SYAZRI THE GREAT
  // --------------------------------------------------------------------------
  const QUOTES_DATA = [
    {
      id: 1,
      text: "Greatness is not an accident of fate, it is an engineered habit.",
      category: "Righteous Path",
      context: "The core foundational doctrine of discipline and mastery",
      keywords: ["greatness", "accident", "fate", "engineered", "habit", "discipline", "mindset", "success"],
      reverence: 100,
      featured: true
    },
    {
      id: 2,
      text: "go straight dont belok belok, Jannah is the destination",
      category: "Righteous Path",
      context: "Sacred guidance on unwavering moral focus and ultimate purpose",
      keywords: ["straight", "belok", "jannah", "destination", "life", "path", "purpose", "focus", "god"],
      reverence: 100,
      featured: true
    },
    {
      id: 3,
      text: "bapak kau balik",
      category: "Sovereign Decrees",
      context: "The definitive verdict when discourse and negotiations have concluded",
      keywords: ["bapak", "kau", "balik", "dismissal", "verdict", "argument", "peace"],
      reverence: 99,
      featured: true
    },
    {
      id: 4,
      text: "Dia cantik tapi bukan taste aku",
      category: "Aesthetic & Taste",
      context: "Uncompromising standards in aesthetics, romance, and sovereignty",
      keywords: ["cantik", "taste", "standards", "love", "beauty", "choice", "rejection"],
      reverence: 98,
      featured: true
    },
    {
      id: 5,
      text: "nah ahhh, you stupid",
      category: "Sovereign Decrees",
      context: "Swift intellectual refutation when encountering flawed reasoning",
      keywords: ["nah", "stupid", "logic", "refutation", "debate", "truth", "critique"],
      reverence: 97,
      featured: true
    },
    {
      id: 6,
      text: "Tashrab eih? Ashrab shay!",
      category: "Cultural Lore",
      context: "The timeless Middle Eastern hospitality exchange of refreshment and tea",
      keywords: ["tashrab", "eih", "ashrab", "shay", "tea", "drink", "hospitality", "arabic"],
      reverence: 96,
      featured: true
    },
    {
      id: 7,
      text: "013******9",
      category: "Sacred Hotline",
      context: "The direct line to communicate with Syazri The Great",
      keywords: ["013******9", "phone", "number", "contact", "hotline", "call", "whatsapp", "reach"],
      reverence: 100,
      featured: true
    },
    {
      id: 8,
      text: "hidup IU",
      category: "Aesthetic & Taste",
      context: "Eternal salute of allegiance to the queen of Korean music, IU",
      keywords: ["hidup", "iu", "music", "allegiance", "loyalty", "queen", "kpop", "singer"],
      reverence: 99,
      featured: true
    },
    {
      id: 9,
      text: "pi ram li",
      category: "Cultural Lore",
      context: "Homage to the immortal father of Malaysian cinema and timeless artistic genius",
      keywords: ["pi", "ram", "li", "p.ramlee", "cinema", "legend", "art", "film", "heritage"],
      reverence: 95,
      featured: true
    },
    {
      id: 10,
      text: "yare yare",
      category: "Cultural Lore",
      context: "Ojou sama its time to go to bed",
      keywords: ["yare", "anime", "daze", "stoic", "sigh", "unbothered", "chill", "calm"],
      reverence: 94,
      featured: true
    },
    {
      id: 11,
      text: "3.14159265359",
      category: "Cultural Lore",
      context: "The value of pi (π)",
      keywords: ["3.14159265359", "pi", "value", "math", "circle", "constant", "geometry", "calculation", "formula", "precision"],
      reverence: 96,
      featured: true
    },
    {
      id: 12,
      text: "saya tak tahu, saya intern je",
      category: "Sovereign Decrees",
      context: "The foundational doctrine of corporate self defence",
      keywords: ["saya", "tak", "tahu", "intern", "je", "self", "defence", "defense", "work", "office", "survival", "innocent"],
      reverence: 98,
      featured: true
    }
  ];

  // --------------------------------------------------------------------------
  // 2. STATE MANAGEMENT & STORAGE
  // --------------------------------------------------------------------------
  let currentFeaturedIndex = 0;
  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'featured';
  let activeTheme = localStorage.getItem('syazri_theme') || 'gold';
  let favorites = JSON.parse(localStorage.getItem('syazri_favs') || '[]');
  let isSoundActive = false;
  let activeExportQuote = null;
  let exportTheme = 'cosmic-gold';
  let exportRatio = 'square';

  // --------------------------------------------------------------------------
  // 3. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const featuredQuoteText = document.getElementById('featuredQuoteText');
  const featuredCategory = document.getElementById('featuredCategory');
  const featuredContext = document.getElementById('featuredContext');
  const featuredQuoteCard = document.getElementById('featuredQuoteCard');
  const summonQuoteBtn = document.getElementById('summonQuoteBtn');
  const featuredTtsBtn = document.getElementById('featuredTtsBtn');
  const featuredCopyBtn = document.getElementById('featuredCopyBtn');
  const featuredFavBtn = document.getElementById('featuredFavBtn');
  const featuredExportBtn = document.getElementById('featuredExportBtn');
  const shareFeaturedBtn = document.getElementById('shareFeaturedBtn');

  const quotesGrid = document.getElementById('quotesGrid');
  const quoteSearchInput = document.getElementById('quoteSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortQuotesSelect = document.getElementById('sortQuotesSelect');
  const categoryTabs = document.getElementById('categoryTabs');
  const noResultsBox = document.getElementById('noResultsBox');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const totalQuotesCounter = document.getElementById('totalQuotesCounter');

  const oracleQueryInput = document.getElementById('oracleQueryInput');
  const askOracleBtn = document.getElementById('askOracleBtn');
  const oracleIdleState = document.getElementById('oracleIdleState');
  const oracleActiveState = document.getElementById('oracleActiveState');
  const oracleQuoteText = document.getElementById('oracleQuoteText');
  const oracleInsightText = document.getElementById('oracleInsightText');
  const oracleTimestamp = document.getElementById('oracleTimestamp');
  const oracleSpeakBtn = document.getElementById('oracleSpeakBtn');
  const oracleCopyBtn = document.getElementById('oracleCopyBtn');

  const soundToggle = document.getElementById('soundToggle');
  const themePickerBtn = document.getElementById('themePickerBtn');
  const themeMenu = document.getElementById('themeMenu');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  const favCountBadge = document.getElementById('favCountBadge');
  const favoritesBtn = document.getElementById('favoritesBtn');
  const footerFavBtn = document.getElementById('footerFavBtn');
  const favDrawer = document.getElementById('favDrawer');
  const closeFavDrawerBtn = document.getElementById('closeFavDrawerBtn');
  const favQuotesList = document.getElementById('favQuotesList');
  const exportFavsJsonBtn = document.getElementById('exportFavsJsonBtn');
  const exportFavsMdBtn = document.getElementById('exportFavsMdBtn');
  const clearAllFavsBtn = document.getElementById('clearAllFavsBtn');

  const exportModal = document.getElementById('exportModal');
  const closeExportModalBtn = document.getElementById('closeExportModalBtn');
  const exportCardCanvas = document.getElementById('exportCardCanvas');
  const downloadCanvasBtn = document.getElementById('downloadCanvasBtn');
  const toastContainer = document.getElementById('toastContainer');
  const bannerShuffleBtn = document.getElementById('bannerShuffleBtn');

  // --------------------------------------------------------------------------
  // 4. WEB AUDIO AMBIENT DRONE & PROCEDURAL CHIMES
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let masterGain = null;
  let ambientOscillators = [];

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  function toggleCosmicAmbience() {
    initAudio();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isSoundActive) {
      stopAmbience();
      isSoundActive = false;
      soundToggle.classList.remove('active');
      showToast("Cosmic ambience silenced", "✦");
    } else {
      startAmbience();
      isSoundActive = true;
      soundToggle.classList.add('active');
      showToast("Cosmic ambience awakened", "♫");
    }
  }

  function startAmbience() {
    if (!audioCtx) return;
    stopAmbience();

    // Cosmic drone chord (F1, C2, A2 harmonic series)
    const baseFreqs = [43.65, 65.41, 110.0, 164.81];
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    const ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);

    baseFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Subtle detune for rich celestial texture
      osc.detune.setValueAtTime((idx - 1.5) * 5, audioCtx.currentTime);

      osc.connect(filter);
      osc.start();
      ambientOscillators.push(osc);
    });

    filter.connect(ambientGain);
    ambientGain.connect(masterGain);
    ambientOscillators.push({ stop: () => ambientGain.disconnect() });
  }

  function stopAmbience() {
    ambientOscillators.forEach(osc => {
      try {
        if (typeof osc.stop === 'function') osc.stop();
        if (typeof osc.disconnect === 'function') osc.disconnect();
      } catch (e) { }
    });
    ambientOscillators = [];
  }

  function playChime(type = 'summon') {
    if (!audioCtx) initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'summon') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3); // C6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    } else if (type === 'copy') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    } else if (type === 'oracle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.4); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.8); // A5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    }

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 1.3);
  }

  // --------------------------------------------------------------------------
  // 5. TEXT-TO-SPEECH (TTS) NARRATOR
  // --------------------------------------------------------------------------
  function speakQuote(text, btnElement = null) {
    if (!('speechSynthesis' in window)) {
      showToast("Speech synthesis is not supported in this browser.", "⚠️");
      return;
    }

    window.speechSynthesis.cancel();

    if (btnElement && btnElement.classList.contains('speaking')) {
      btnElement.classList.remove('speaking');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 0.88; // Regal, deep, grounded cadence

    // Choose best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const dignifiedVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Male') || v.name.includes('Great')) && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
    if (dignifiedVoice) utterance.voice = dignifiedVoice;

    if (btnElement) {
      btnElement.classList.add('speaking');
      utterance.onend = () => btnElement.classList.remove('speaking');
      utterance.onerror = () => btnElement.classList.remove('speaking');
    }

    window.speechSynthesis.speak(utterance);
    showToast("Narration reciting the decree...", "🗣️");
  }

  // --------------------------------------------------------------------------
  // 6. HERO STAGE & RANDOMIZER
  // --------------------------------------------------------------------------
  function renderFeaturedQuote(index, animated = true) {
    const quote = QUOTES_DATA[index];
    if (!quote) return;

    currentFeaturedIndex = index;

    if (animated) {
      featuredQuoteText.classList.add('fade-swap');
      setTimeout(() => {
        updateFeaturedDOM(quote);
        featuredQuoteText.classList.remove('fade-swap');
      }, 250);
    } else {
      updateFeaturedDOM(quote);
    }
  }

  function updateFeaturedDOM(quote) {
    featuredQuoteText.textContent = `“${quote.text}”`;
    featuredCategory.textContent = quote.category;
    featuredContext.textContent = quote.context;

    // Update favorite state icon
    const isFav = favorites.some(f => f.id === quote.id);
    if (isFav) {
      featuredFavBtn.classList.add('favorited');
    } else {
      featuredFavBtn.classList.remove('favorited');
    }
  }

  function summonRandomQuote() {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * QUOTES_DATA.length);
    } while (nextIndex === currentFeaturedIndex && QUOTES_DATA.length > 1);

    renderFeaturedQuote(nextIndex, true);
    playChime('summon');
  }

  // --------------------------------------------------------------------------
  // 7. 3D CARD PARALLAX TILT LOGIC
  // --------------------------------------------------------------------------
  function setup3DCardTilt(cardElement) {
    if (!cardElement) return;

    cardElement.addEventListener('mousemove', (e) => {
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      cardElement.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      cardElement.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      cardElement.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  // --------------------------------------------------------------------------
  // 8. CODEX / QUOTES GRID ENGINE
  // --------------------------------------------------------------------------
  function filterAndSortQuotes() {
    let list = [...QUOTES_DATA];

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter(q => q.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const qLower = searchQuery.toLowerCase().trim();
      list = list.filter(q =>
        q.text.toLowerCase().includes(qLower) ||
        q.category.toLowerCase().includes(qLower) ||
        q.context.toLowerCase().includes(qLower) ||
        (q.keywords && q.keywords.some(k => k.toLowerCase().includes(qLower)))
      );
    }

    // Sort order
    if (activeSort === 'random') {
      list.sort(() => Math.random() - 0.5);
    } else if (activeSort === 'popular') {
      list.sort((a, b) => b.reverence - a.reverence);
    } else if (activeSort === 'short') {
      list.sort((a, b) => a.text.length - b.text.length);
    } else if (activeSort === 'long') {
      list.sort((a, b) => b.text.length - a.text.length);
    } else {
      // Sovereign's default order
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.id - b.id);
    }

    renderQuotesGrid(list);
    updateCategoryCounts();
  }

  function renderQuotesGrid(quotes) {
    quotesGrid.innerHTML = '';

    if (quotes.length === 0) {
      noResultsBox.classList.remove('hidden');
      return;
    } else {
      noResultsBox.classList.add('hidden');
    }

    const fragment = document.createDocumentFragment();

    quotes.forEach((q, idx) => {
      const card = document.createElement('article');
      card.className = 'quote-card';
      card.style.animation = `oracleReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04}s forwards`;

      const isFav = favorites.some(f => f.id === q.id);

      card.innerHTML = `
        <div>
          <div class="card-meta-top">
            <span class="card-category-badge">${q.category}</span>
            <span class="card-id-num">#${String(q.id).padStart(2, '0')}</span>
          </div>

          <blockquote class="card-quote-body">
            “${q.text}”
          </blockquote>

          <p class="card-context-text">
            ✦ ${q.context}
          </p>
        </div>

        <div class="card-footer-row">
          <div class="card-author-tag">
            <span>⚔</span> Syazri The Great
          </div>

          <div class="quote-action-group">
            <button class="action-btn card-tts-btn" data-id="${q.id}" title="Listen" aria-label="Listen Quote">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </button>
            <button class="action-btn card-copy-btn" data-id="${q.id}" title="Copy Quote" aria-label="Copy Quote">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <button class="action-btn card-fav-btn ${isFav ? 'favorited' : ''}" data-id="${q.id}" title="Favorite" aria-label="Save Quote">
              <svg class="heart-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button class="action-btn card-export-btn" data-id="${q.id}" title="Export Image Card" aria-label="Export Image">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </button>
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    quotesGrid.appendChild(fragment);
  }

  function updateCategoryCounts() {
    const countAllEl = document.getElementById('countAll');
    const countRighteousEl = document.getElementById('countRighteous');
    const countDecreesEl = document.getElementById('countDecrees');
    const countTasteEl = document.getElementById('countTaste');
    const countCulturalEl = document.getElementById('countCultural');
    const countHotlineEl = document.getElementById('countHotline');

    if (countAllEl) countAllEl.textContent = QUOTES_DATA.length;
    if (countRighteousEl) countRighteousEl.textContent = QUOTES_DATA.filter(q => q.category === 'Righteous Path').length;
    if (countDecreesEl) countDecreesEl.textContent = QUOTES_DATA.filter(q => q.category === 'Sovereign Decrees').length;
    if (countTasteEl) countTasteEl.textContent = QUOTES_DATA.filter(q => q.category === 'Aesthetic & Taste').length;
    if (countCulturalEl) countCulturalEl.textContent = QUOTES_DATA.filter(q => q.category === 'Cultural Lore').length;
    if (countHotlineEl) countHotlineEl.textContent = QUOTES_DATA.filter(q => q.category === 'Sacred Hotline').length;
    if (totalQuotesCounter) totalQuotesCounter.textContent = `${QUOTES_DATA.length}`;
  }

  // --------------------------------------------------------------------------
  // 9. ORACLE OF SYAZRI (INTERACTIVE QUERY REVEAL)
  // --------------------------------------------------------------------------
  function consultOracle(customPrompt = '') {
    const query = customPrompt || oracleQueryInput.value.trim();
    if (!query) {
      showToast("Please present your inquiry to the Oracle.", "✦");
      oracleQueryInput.focus();
      return;
    }

    playChime('oracle');
    oracleIdleState.classList.add('hidden');
    oracleActiveState.classList.remove('hidden');

    // Matching algorithm based on keyword occurrence
    const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    let bestMatch = null;
    let highestScore = -1;

    QUOTES_DATA.forEach(q => {
      let score = 0;
      const fullText = (q.text + ' ' + q.context + ' ' + q.category + ' ' + (q.keywords ? q.keywords.join(' ') : '')).toLowerCase();
      words.forEach(w => {
        if (fullText.includes(w)) score += 3;
      });
      // Add slight randomness for variety
      score += Math.random() * 1.5;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = q;
      }
    });

    if (!bestMatch) {
      bestMatch = QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)];
    }

    oracleQuoteText.textContent = `“${bestMatch.text}”`;
    oracleInsightText.textContent = `Decree of Syazri: ${bestMatch.context}. Internalize this truth to overcome the dilemma of "${query.slice(0, 45)}${query.length > 45 ? '...' : ''}".`;
    oracleTimestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    oracleSpeakBtn.onclick = () => speakQuote(bestMatch.text, oracleSpeakBtn);
    oracleCopyBtn.onclick = () => copyTextToClipboard(`"${bestMatch.text}" — Syazri The Great`);

    showToast("The Oracle of Syazri has answered.", "🔮");
  }

  // --------------------------------------------------------------------------
  // 10. SOCIAL IMAGE CARD GENERATOR (HTML5 CANVAS)
  // --------------------------------------------------------------------------
  const crestImage = new Image();
  crestImage.src = 'assets/syazri_photo.jpg?v=3';

  function openExportModal(quote) {
    activeExportQuote = quote;
    exportModal.classList.remove('hidden');
    renderCardToCanvas();
  }

  function closeExportModal() {
    exportModal.classList.add('hidden');
  }

  function renderCardToCanvas() {
    if (!activeExportQuote || !exportCardCanvas) return;

    let width = 1080;
    let height = 1080;

    if (exportRatio === 'story') {
      width = 1080;
      height = 1920;
    } else if (exportRatio === 'banner') {
      width = 1920;
      height = 1080;
    }

    exportCardCanvas.width = width;
    exportCardCanvas.height = height;

    const ctx = exportCardCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Background Gradient
    let bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (exportTheme === 'cosmic-gold') {
      bgGrad.addColorStop(0, '#0a0d17');
      bgGrad.addColorStop(0.5, '#121829');
      bgGrad.addColorStop(1, '#05070d');
    } else if (exportTheme === 'cyber-cyan') {
      bgGrad.addColorStop(0, '#06131c');
      bgGrad.addColorStop(0.5, '#0b2336');
      bgGrad.addColorStop(1, '#030a0f');
    } else if (exportTheme === 'royal-amethyst') {
      bgGrad.addColorStop(0, '#150921');
      bgGrad.addColorStop(0.5, '#26123b');
      bgGrad.addColorStop(1, '#0a0410');
    } else {
      bgGrad.addColorStop(0, '#111111');
      bgGrad.addColorStop(1, '#050505');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Ambient Glowing Highlights
    const glowColor = exportTheme === 'cosmic-gold' ? 'rgba(245, 158, 11, 0.18)' :
      exportTheme === 'cyber-cyan' ? 'rgba(6, 182, 212, 0.18)' :
        exportTheme === 'royal-amethyst' ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.08)';

    const radGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.6);
    radGrad.addColorStop(0, glowColor);
    radGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Draw Outer Card Decorative Frame
    const margin = width * 0.06;
    ctx.strokeStyle = exportTheme === 'cosmic-gold' ? 'rgba(245, 158, 11, 0.4)' :
      exportTheme === 'cyber-cyan' ? 'rgba(6, 182, 212, 0.4)' :
        exportTheme === 'royal-amethyst' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    // Corner Accents
    const cornerSize = 24;
    ctx.lineWidth = 6;
    ctx.strokeStyle = exportTheme === 'cosmic-gold' ? '#f59e0b' :
      exportTheme === 'cyber-cyan' ? '#06b6d4' :
        exportTheme === 'royal-amethyst' ? '#a855f7' : '#ffffff';

    // Top-Left
    ctx.strokeRect(margin - 3, margin - 3, cornerSize, cornerSize);
    // Top-Right
    ctx.strokeRect(width - margin - cornerSize + 3, margin - 3, cornerSize, cornerSize);
    // Bottom-Left
    ctx.strokeRect(margin - 3, height - margin - cornerSize + 3, cornerSize, cornerSize);
    // Bottom-Right
    ctx.strokeRect(width - margin - cornerSize + 3, height - margin - cornerSize + 3, cornerSize, cornerSize);

    // 4. Draw Emblem Crest Icon at Top
    const crestSize = width * 0.14;
    const crestX = width / 2 - crestSize / 2;
    const crestY = height * 0.12;

    if (crestImage.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, crestY + crestSize / 2, crestSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(crestImage, crestX, crestY, crestSize, crestSize);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(width / 2, crestY + crestSize / 2, crestSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // 5. Draw Category Badge
    ctx.fillStyle = exportTheme === 'cosmic-gold' ? '#f59e0b' :
      exportTheme === 'cyber-cyan' ? '#06b6d4' :
        exportTheme === 'royal-amethyst' ? '#a855f7' : '#ffffff';
    ctx.font = `700 ${Math.round(width * 0.024)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(activeExportQuote.category.toUpperCase(), width / 2, crestY + crestSize + width * 0.06);

    // 6. Draw Quote Text with Word Wrap
    ctx.fillStyle = '#ffffff';
    const quoteFontSize = Math.round(width * (exportRatio === 'story' ? 0.048 : 0.042));
    ctx.font = `700 ${quoteFontSize}px "Cinzel", serif`;
    ctx.textAlign = 'center';

    const quoteText = `“${activeExportQuote.text}”`;
    const maxWidth = width - margin * 4;
    const lineHeight = quoteFontSize * 1.45;
    const lines = wrapText(ctx, quoteText, maxWidth);

    const startY = (height / 2) - ((lines.length * lineHeight) / 2) + width * 0.04;
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + (i * lineHeight));
    });

    // 7. Draw Author Signature & Title
    const authorY = height - margin - width * 0.12;
    ctx.fillStyle = exportTheme === 'cosmic-gold' ? '#fef08a' :
      exportTheme === 'cyber-cyan' ? '#a5f3fc' :
        exportTheme === 'royal-amethyst' ? '#fae8ff' : '#ffffff';
    ctx.font = `800 ${Math.round(width * 0.034)}px "Cinzel", serif`;
    ctx.fillText("SYAZRI THE GREAT", width / 2, authorY);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = `500 ${Math.round(width * 0.02)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText("Philosopher • Sovereign of Mindset • Master Architect", width / 2, authorY + width * 0.035);
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function downloadCanvasImage() {
    if (!exportCardCanvas || !activeExportQuote) return;
    const link = document.createElement('a');
    const safeTitle = activeExportQuote.category.replace(/\s+/g, '_').toLowerCase();
    link.download = `syazri_the_great_quote_${safeTitle}_${activeExportQuote.id}.png`;
    link.href = exportCardCanvas.toDataURL('image/png');
    link.click();
    showToast("High-res wisdom card downloaded!", "🎉");
  }

  // --------------------------------------------------------------------------
  // 11. FAVORITES DRAWER & LOCAL STORAGE
  // --------------------------------------------------------------------------
  function toggleFavorite(quoteId) {
    const quote = QUOTES_DATA.find(q => q.id === quoteId);
    if (!quote) return;

    const index = favorites.findIndex(f => f.id === quoteId);
    if (index >= 0) {
      favorites.splice(index, 1);
      showToast("Removed from bookmarks", "🤍");
    } else {
      favorites.push(quote);
      showToast("Added to bookmarks!", "⭐");
    }

    localStorage.setItem('syazri_favs', JSON.stringify(favorites));
    updateFavoritesUI();
    filterAndSortQuotes();

    if (QUOTES_DATA[currentFeaturedIndex]?.id === quoteId) {
      renderFeaturedQuote(currentFeaturedIndex, false);
    }
  }

  function updateFavoritesUI() {
    if (favCountBadge) favCountBadge.textContent = favorites.length;

    if (!favQuotesList) return;
    favQuotesList.innerHTML = '';

    if (favorites.length === 0) {
      favQuotesList.innerHTML = `
        <div class="text-center" style="padding: 40px 10px; color: var(--text-dim);">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">⭐</div>
          <p>No bookmarked wisdom yet.</p>
          <p style="font-size: 0.8rem; margin-top: 6px;">Click the heart on any card to save your sacred maxims.</p>
        </div>
      `;
      return;
    }

    favorites.forEach(f => {
      const item = document.createElement('div');
      item.className = 'fav-item-card';
      item.innerHTML = `
        <button class="fav-remove-btn" data-id="${f.id}" title="Remove Bookmark">✕</button>
        <div class="fav-item-text">“${f.text}”</div>
        <div class="fav-item-meta">${f.category} — #${f.id}</div>
      `;
      favQuotesList.appendChild(item);
    });
  }

  function exportFavoritesJSON() {
    if (favorites.length === 0) {
      showToast("No favorites to export.", "⚠️");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "syazri_the_great_favorites.json");
    dlAnchor.click();
    showToast("Favorites exported as JSON!", "📁");
  }

  function exportFavoritesMarkdown() {
    if (favorites.length === 0) {
      showToast("No favorites to export.", "⚠️");
      return;
    }
    let md = `# The Bookmarked Annals of Syazri The Great\n\n`;
    favorites.forEach((f, i) => {
      md += `### ${i + 1}. ${f.category}\n> "${f.text}"\n\n*— Syazri The Great (${f.context})*\n\n---\n\n`;
    });

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(md);
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "syazri_the_great_favorites.md");
    dlAnchor.click();
    showToast("Favorites exported as Markdown!", "📝");
  }

  function clearAllFavorites() {
    if (favorites.length === 0) return;
    if (confirm("Are you sure you want to clear all bookmarked quotes?")) {
      favorites = [];
      localStorage.setItem('syazri_favs', JSON.stringify(favorites));
      updateFavoritesUI();
      filterAndSortQuotes();
      renderFeaturedQuote(currentFeaturedIndex, false);
      showToast("All bookmarks cleared.", "🗑️");
    }
  }

  // --------------------------------------------------------------------------
  // 12. UTILITY & SHARING FUNCTIONS
  // --------------------------------------------------------------------------
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        playChime('copy');
        showToast("Copied decree to clipboard!", "📋");
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      playChime('copy');
      showToast("Copied decree to clipboard!", "📋");
    } catch (err) {
      showToast("Unable to copy.", "❌");
    }
    document.body.removeChild(textArea);
  }

  function shareQuote(quote) {
    const shareText = `"${quote.text}" — Syazri The Great\n\n#SyazriTheGreat #Wisdom #Mindset`;
    if (navigator.share) {
      navigator.share({
        title: 'Syazri The Great Wisdom',
        text: shareText,
        url: window.location.href
      }).catch(() => { });
    } else {
      copyTextToClipboard(shareText);
    }
  }

  function showToast(message, icon = "✦") {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--primary);">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function setTheme(theme) {
    activeTheme = theme;
    document.body.className = `aura-${theme}`;
    localStorage.setItem('syazri_theme', theme);

    document.querySelectorAll('.theme-opt').forEach(opt => {
      if (opt.getAttribute('data-aura') === theme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. INTERACTIVE PARTICLE / STARFIELD BACKGROUND CANVAS
  // --------------------------------------------------------------------------
  function setupStarfieldCanvas() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mousePos = { x: width / 2, y: height / 2 };
    let stars = [];
    const count = Math.min(Math.floor((width * height) / 10000), 100);

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        baseVx: (Math.random() - 0.5) * 0.3,
        baseVy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.baseVx;
        s.y += s.baseVy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();

        // Connect nearby stars with subtle constellation lines
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - dist / 90) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 14. EVENT LISTENERS INITIALIZATION
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Hero Actions
    summonQuoteBtn?.addEventListener('click', summonRandomQuote);
    bannerShuffleBtn?.addEventListener('click', () => {
      summonRandomQuote();
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    });

    featuredTtsBtn?.addEventListener('click', () => {
      const q = QUOTES_DATA[currentFeaturedIndex];
      if (q) speakQuote(q.text, featuredTtsBtn);
    });

    featuredCopyBtn?.addEventListener('click', () => {
      const q = QUOTES_DATA[currentFeaturedIndex];
      if (q) copyTextToClipboard(`"${q.text}" — Syazri The Great`);
    });

    featuredFavBtn?.addEventListener('click', () => {
      const q = QUOTES_DATA[currentFeaturedIndex];
      if (q) toggleFavorite(q.id);
    });

    featuredExportBtn?.addEventListener('click', () => {
      const q = QUOTES_DATA[currentFeaturedIndex];
      if (q) openExportModal(q);
    });

    shareFeaturedBtn?.addEventListener('click', () => {
      const q = QUOTES_DATA[currentFeaturedIndex];
      if (q) shareQuote(q);
    });

    // Sound toggle
    soundToggle?.addEventListener('click', toggleCosmicAmbience);

    // Theme selector
    themePickerBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('show');
    });

    document.querySelectorAll('.theme-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const theme = e.currentTarget.getAttribute('data-aura');
        if (theme) setTheme(theme);
        themeMenu.classList.remove('show');
        showToast(`Aura transformed to ${opt.textContent.trim()}`, "✨");
      });
    });

    document.addEventListener('click', () => {
      themeMenu?.classList.remove('show');
    });

    // Mobile Hamburger
    mobileMenuToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-menu .nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu?.classList.remove('show');
      }
    });

    // Oracle
    askOracleBtn?.addEventListener('click', () => consultOracle());
    oracleQueryInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') consultOracle();
    });

    document.querySelectorAll('.oracle-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const prompt = e.currentTarget.getAttribute('data-prompt');
        if (prompt) {
          oracleQueryInput.value = prompt;
          consultOracle(prompt);
        }
      });
    });

    // Codex Search & Filter
    quoteSearchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
      filterAndSortQuotes();
    });

    clearSearchBtn?.addEventListener('click', () => {
      quoteSearchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterAndSortQuotes();
    });

    sortQuotesSelect?.addEventListener('change', (e) => {
      activeSort = e.target.value;
      filterAndSortQuotes();
    });

    categoryTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.cat-tab');
      if (!tab) return;

      document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-category') || 'all';
      filterAndSortQuotes();
    });

    resetFiltersBtn?.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      quoteSearchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-category') === 'all');
      });
      filterAndSortQuotes();
    });

    // Delegated actions for quotes grid cards
    quotesGrid?.addEventListener('click', (e) => {
      const ttsBtn = e.target.closest('.card-tts-btn');
      if (ttsBtn) {
        const id = parseInt(ttsBtn.getAttribute('data-id'), 10);
        const q = QUOTES_DATA.find(item => item.id === id);
        if (q) speakQuote(q.text, ttsBtn);
        return;
      }

      const copyBtn = e.target.closest('.card-copy-btn');
      if (copyBtn) {
        const id = parseInt(copyBtn.getAttribute('data-id'), 10);
        const q = QUOTES_DATA.find(item => item.id === id);
        if (q) copyTextToClipboard(`"${q.text}" — Syazri The Great`);
        return;
      }

      const favBtn = e.target.closest('.card-fav-btn');
      if (favBtn) {
        const id = parseInt(favBtn.getAttribute('data-id'), 10);
        toggleFavorite(id);
        return;
      }

      const exportBtn = e.target.closest('.card-export-btn');
      if (exportBtn) {
        const id = parseInt(exportBtn.getAttribute('data-id'), 10);
        const q = QUOTES_DATA.find(item => item.id === id);
        if (q) openExportModal(q);
        return;
      }
    });

    // Favorites Drawer Controls
    favoritesBtn?.addEventListener('click', () => favDrawer.classList.remove('hidden'));
    footerFavBtn?.addEventListener('click', () => favDrawer.classList.remove('hidden'));
    closeFavDrawerBtn?.addEventListener('click', () => favDrawer.classList.add('hidden'));
    favDrawer?.addEventListener('click', (e) => {
      if (e.target === favDrawer) favDrawer.classList.add('hidden');
    });

    favQuotesList?.addEventListener('click', (e) => {
      const rmBtn = e.target.closest('.fav-remove-btn');
      if (rmBtn) {
        const id = parseInt(rmBtn.getAttribute('data-id'), 10);
        toggleFavorite(id);
      }
    });

    exportFavsJsonBtn?.addEventListener('click', exportFavoritesJSON);
    exportFavsMdBtn?.addEventListener('click', exportFavoritesMarkdown);
    clearAllFavsBtn?.addEventListener('click', clearAllFavorites);

    // Export Modal Controls
    closeExportModalBtn?.addEventListener('click', closeExportModal);
    exportModal?.addEventListener('click', (e) => {
      if (e.target === exportModal) closeExportModal();
    });

    document.querySelectorAll('.canvas-theme-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.canvas-theme-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        exportTheme = e.currentTarget.getAttribute('data-style');
        renderCardToCanvas();
      });
    });

    document.querySelectorAll('.canvas-ratio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.canvas-ratio-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        exportRatio = e.currentTarget.getAttribute('data-ratio');
        renderCardToCanvas();
      });
    });

    downloadCanvasBtn?.addEventListener('click', downloadCanvasImage);

    // Header Scroll Glass Shadow
    window.addEventListener('scroll', () => {
      const header = document.getElementById('mainHeader');
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    // 3D parallax on Hero card
    setup3DCardTilt(featuredQuoteCard);
  }

  // --------------------------------------------------------------------------
  // 15. INITIALIZATION BOOTSTRAP
  // --------------------------------------------------------------------------
  function init() {
    // Sanitize favorites to match current dataset
    favorites = favorites.filter(f => QUOTES_DATA.some(q => q.id === f.id));
    localStorage.setItem('syazri_favs', JSON.stringify(favorites));

    setTheme(activeTheme);
    renderFeaturedQuote(0, false);
    filterAndSortQuotes();
    updateFavoritesUI();
    setupStarfieldCanvas();
    setupEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
