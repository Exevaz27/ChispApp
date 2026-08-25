// Lógica Principal de la Aplicación de Estudio ElectroSafe BT/MT
document.addEventListener("DOMContentLoaded", () => {
  // Estado global de la app
  const state = {
    currentCategory: "all",
    searchQuery: "",
    flashcardMode: false,
    onlyPendingMode: false,
    speechSpeed: 1.0,
    masteredIds: JSON.parse(localStorage.getItem("mastered_questions") || "[]"),
    bestScore: parseInt(localStorage.getItem("exam_best_score") || "0", 10),
    
    // Estado del Audio Playlist Continuo
    audioPlaylist: {
      isPlaying: false,
      isPaused: false,
      currentIndex: 0,
      queue: []
    },

    // Estado del Quiz / Simulacro
    quiz: {
      active: false,
      mode: "practice", // 'practice' o 'simulacro'
      questions: [],
      currentIndex: 0,
      score: 0,
      userAnswers: [],
      missedQuestions: [],
      timerSeconds: 15 * 60,
      timerInterval: null
    },

    // Estado de Ordenamiento
    currentSeqIndex: 0,
    currentSeqItems: [],

    // Estado del Juego de Match
    currentMatchIndex: 0,
    selectedLeft: null,
    selectedRight: null,
    matchedPairsCount: 0,

    // Estado del Test Verdadero/Falso
    tfIndex: 0,
    tfScore: 0,

    // Estado de Inspección de Poste
    poleStage: 1,

    // Estado de la Ruleta
    lastRouletteId: null
  };

  // Toast Notification System
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icons = { success: "✅", info: "ℹ️", warning: "⚠️" };
    toast.innerHTML = `<span>${icons[type] || "⚡"}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastOut 0.3s forwards";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // 0. SÍNTESIS DE VOZ / AUDIO ROBUSTA (PROTEGIDA CONTRA GARBAGE COLLECTION)
  // =========================================================================
  window._activeUtterance = null;

  function speakText(text, btnElement) {
    if (!('speechSynthesis' in window)) {
      showToast("Tu navegador no soporta síntesis de voz.", "warning");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.querySelectorAll('.btn-speaker').forEach(b => b.classList.remove('speaking'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = state.speechSpeed || 1.0;
    window._activeUtterance = utterance;

    if (btnElement) {
      btnElement.classList.add('speaking');
      utterance.onend = () => {
        btnElement.classList.remove('speaking');
        window._activeUtterance = null;
      };
      utterance.onerror = () => {
        btnElement.classList.remove('speaking');
        window._activeUtterance = null;
      };
    }

    window.speechSynthesis.speak(utterance);
  }

  window.speakQuestion = function(id) {
    const q = studyData.questions.find(item => item.id === id);
    if (!q) return;
    const btn = document.querySelector(`#card-${id} .btn-speaker`);
    const fullSpeech = `Pregunta número ${q.number}. ${q.title}. Respuesta: ${q.fullAnswer}`;
    speakText(fullSpeech, btn);
  };

  // Resaltado de términos y números críticos
  function formatTextWithHighlights(text) {
    return text
      .replace(/\b(220\s*V|380\s*V|0\s*V)\b/gi, '<span class="tech-tag blue">$1</span>')
      .replace(/\b(0\.80\s*m|0\.80\s*metros|1\.50\s*m|1\.50\s*metros|3\s*m|3\s*metros|5\s*m|5\s*metros|90\s*cm)\b/gi, '<span class="tech-tag">$1</span>')
      .replace(/\b(266\s*A|290\s*A)\b/gi, '<span class="tech-tag">$1</span>')
      .replace(/\b(10%\s*del\s*largo\s*del\s*poste\s*\+\s*60\s*cm|10%\s*\+\s*60\s*cm)\b/gi, '<span class="tech-tag green">$1</span>')
      .replace(/\b(Berkley\s*ART|Res\s*3068|Resolución\s*3068|Stop\s*Work|T4|ARPO|SIT|ATS|PTS)\b/gi, '<span class="tech-tag blue">$1</span>')
      .replace(/\b(30\s*compresiones\s*ininterrumpidas|100\s*a\s*120\s*por\s*minuto|100\s*por\s*minuto|100\/min)\b/gi, '<span class="tech-tag green">$1</span>');
  }

  // =========================================================================
  // 1. NAVEGACIÓN POR PESTAÑAS (TABS)
  // =========================================================================
  const navTabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  navTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      navTabs.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");

      // Auto-inicializar vistas
      if (targetId === "ordenamiento") renderCurrentSequence();
      if (targetId === "juegos") initMatchGame(state.currentMatchIndex);
    });
  });

  // =========================================================================
  // 2. MODO ESTUDIO Y FLASHCARDS
  // =========================================================================
  const cardsGrid = document.getElementById("cards-grid");
  const categoryChipsContainer = document.getElementById("category-chips");
  const searchInput = document.getElementById("search-input");
  const toggleFlashcardBtn = document.getElementById("toggle-flashcards");
  const btnTogglePending = document.getElementById("btn-toggle-pending");
  const globalProgressPill = document.getElementById("global-progress-pill");

  // Renderizar chips de categorías
  function renderCategoryChips() {
    categoryChipsContainer.innerHTML = "";
    studyData.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `chip-btn ${cat.id === state.currentCategory ? "active" : ""}`;
      btn.innerHTML = `${cat.icon} ${cat.name}`;
      btn.addEventListener("click", () => {
        state.currentCategory = cat.id;
        document.querySelectorAll(".chip-btn:not(.pending-filter)").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        renderStudyCards();
      });
      categoryChipsContainer.appendChild(btn);
    });
  }

  // Actualizar contador global de progreso
  function updateGlobalProgress() {
    const total = studyData.questions.length;
    const mastered = state.masteredIds.length;
    const percentage = Math.round((mastered / total) * 100);
    globalProgressPill.innerHTML = `🏆 ${mastered}/${total} Dominadas (${percentage}%)`;
  }

  // Renderizar tarjetas de estudio
  function renderStudyCards() {
    cardsGrid.innerHTML = "";

    const filtered = studyData.questions.filter(q => {
      const matchesCat = state.currentCategory === "all" || q.category === state.currentCategory;
      const isMastered = state.masteredIds.includes(q.id);
      const matchesPending = !state.onlyPendingMode || !isMastered;
      const matchesSearch = !state.searchQuery || 
        q.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        q.fullAnswer.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        q.summary.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCat && matchesPending && matchesSearch;
    });

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-dim);">
          <h3>🔍 No hay preguntas que mostrar con este filtro</h3>
          <p>Prueba con otra palabra o desactiva el filtro de 'Solo Pendientes'.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(q => {
      const isMastered = state.masteredIds.includes(q.id);
      const card = document.createElement("div");
      card.className = `study-card ${isMastered ? "mastered" : ""}`;
      card.id = `card-${q.id}`;

      const catObj = studyData.categories.find(c => c.id === q.category) || { name: "General", icon: "⚡" };
      const formattedAnswer = formatTextWithHighlights(q.fullAnswer);

      card.innerHTML = `
        <div>
          <div class="card-top">
            <span class="card-badge">${catObj.icon} Pregunta ${q.number}</span>
            <div class="card-num-actions">
              <button class="btn-speaker" onclick="speakQuestion(${q.id})" title="Escuchar en voz alta">🔊 Audio</button>
              <span class="card-num">#${q.id}</span>
            </div>
          </div>
          <h3 class="card-title">${q.title}</h3>
          
          <div class="card-body ${state.flashcardMode ? "hidden-answer" : ""}" id="body-${q.id}">
            ${state.flashcardMode ? "👁️ Toca aquí para ver la respuesta completa" : formattedAnswer}
          </div>

          <div class="card-keypoints">
            <strong>Puntos clave:</strong>
            <ul>
              ${q.keyPoints.map(kp => `<li>${formatTextWithHighlights(kp)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-master" onclick="toggleMasterQuestion(${q.id})">
            ${isMastered ? "⭐ Dominada" : "☆ Marcar como aprendida"}
          </button>
          ${state.flashcardMode ? `
            <button class="btn-reveal" onclick="toggleAnswerReveal(${q.id})">
              Mostrar / Ocultar
            </button>
          ` : ""}
        </div>
      `;
      cardsGrid.appendChild(card);
    });

    updateGlobalProgress();
  }

  // Funciones de ventana global para clicks en tarjetas
  window.toggleMasterQuestion = function(id) {
    if (state.masteredIds.includes(id)) {
      state.masteredIds = state.masteredIds.filter(item => item !== id);
      showToast("Pregunta desmarcada", "info");
    } else {
      state.masteredIds.push(id);
      showToast("¡Pregunta marcada como Dominada! ⭐", "success");
    }
    localStorage.setItem("mastered_questions", JSON.stringify(state.masteredIds));
    renderStudyCards();
  };

  window.toggleAnswerReveal = function(id) {
    const body = document.getElementById(`body-${id}`);
    const q = studyData.questions.find(item => item.id === id);
    if (!body || !q) return;

    if (body.classList.contains("hidden-answer")) {
      body.classList.remove("hidden-answer");
      body.innerHTML = formatTextWithHighlights(q.fullAnswer);
    } else {
      body.classList.add("hidden-answer");
      body.innerText = "👁️ Toca aquí para ver la respuesta completa";
    }
  };

  // Eventos de Búsqueda y Filtros
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderStudyCards();
  });

  toggleFlashcardBtn.addEventListener("click", () => {
    state.flashcardMode = !state.flashcardMode;
    toggleFlashcardBtn.classList.toggle("active", state.flashcardMode);
    toggleFlashcardBtn.innerText = state.flashcardMode ? "👁️ Modo Normal" : "🃏 Modo Flashcards";
    renderStudyCards();
  });

  btnTogglePending.addEventListener("click", () => {
    state.onlyPendingMode = !state.onlyPendingMode;
    btnTogglePending.classList.toggle("active", state.onlyPendingMode);
    btnTogglePending.innerText = state.onlyPendingMode ? "⭐ Mostrando Solo Pendientes" : "⭐ Solo Pendientes";
    renderStudyCards();
  });

  // =========================================================================
  // 2.1 REPRODUCTOR CONTINUO DE AUDIO CON SELECTOR DE VELOCIDAD
  // =========================================================================
  const btnListenAll = document.getElementById("btn-listen-all");
  const audioPlayerBar = document.getElementById("audio-player-bar");
  const audioPlayerTitle = document.getElementById("audio-player-title");
  const btnPlayerPrev = document.getElementById("btn-player-prev");
  const btnPlayerPlayPause = document.getElementById("btn-player-play-pause");
  const btnPlayerNext = document.getElementById("btn-player-next");
  const btnPlayerStop = document.getElementById("btn-player-stop");
  const speedPills = document.querySelectorAll(".btn-speed-pill");

  speedPills.forEach(pill => {
    pill.addEventListener("click", () => {
      speedPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.speechSpeed = parseFloat(pill.dataset.speed) || 1.0;
      showToast(`Velocidad de audio: ${state.speechSpeed}x`, "info");

      // Si está reproduciendo, reanudar con la nueva velocidad
      if (state.audioPlaylist.isPlaying && !state.audioPlaylist.isPaused) {
        playPlaylistIndex(state.audioPlaylist.currentIndex);
      }
    });
  });

  function getVisibleQuestionsQueue() {
    return studyData.questions.filter(q => {
      const matchesCat = state.currentCategory === "all" || q.category === state.currentCategory;
      const isMastered = state.masteredIds.includes(q.id);
      const matchesPending = !state.onlyPendingMode || !isMastered;
      const matchesSearch = !state.searchQuery || 
        q.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        q.fullAnswer.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        q.summary.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCat && matchesPending && matchesSearch;
    });
  }

  function startPlayAll() {
    if (!('speechSynthesis' in window)) {
      showToast("Tu navegador no soporta síntesis de voz.", "warning");
      return;
    }

    const queue = getVisibleQuestionsQueue();
    if (queue.length === 0) {
      showToast("No hay preguntas visibles en la lista actual para reproducir.", "warning");
      return;
    }

    window.speechSynthesis.cancel();
    state.audioPlaylist.queue = queue;
    state.audioPlaylist.currentIndex = 0;
    state.audioPlaylist.isPlaying = true;
    state.audioPlaylist.isPaused = false;

    audioPlayerBar.style.display = "flex";
    btnListenAll.classList.add("active-playing");
    btnListenAll.innerHTML = "🎧 Reproduciendo...";
    btnPlayerPlayPause.innerHTML = "⏸️ Pausar";

    playPlaylistIndex(0);
  }

  function playPlaylistIndex(index) {
    if (!state.audioPlaylist.isPlaying) return;

    if (index >= state.audioPlaylist.queue.length) {
      showToast("🏁 ¡Has completado la reproducción de todas las preguntas!", "success");
      stopPlayAll();
      return;
    }

    if (index < 0) index = 0;
    state.audioPlaylist.currentIndex = index;
    const q = state.audioPlaylist.queue[index];

    audioPlayerTitle.innerText = `Pregunta ${index + 1} de ${state.audioPlaylist.queue.length}: ${q.title}`;

    document.querySelectorAll(".study-card").forEach(c => c.classList.remove("reading-active"));
    const activeCard = document.getElementById(`card-${q.id}`);
    if (activeCard) {
      activeCard.classList.add("reading-active");
      activeCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    window.speechSynthesis.cancel();

    const fullSpeech = `Pregunta número ${q.number}. ${q.title}. Respuesta: ${q.fullAnswer}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.lang = "es-ES";
    utterance.rate = state.speechSpeed || 1.0;
    window._activeUtterance = utterance;

    utterance.onend = () => {
      if (state.audioPlaylist.isPlaying && !state.audioPlaylist.isPaused) {
        setTimeout(() => {
          if (state.audioPlaylist.isPlaying && !state.audioPlaylist.isPaused) {
            playPlaylistIndex(state.audioPlaylist.currentIndex + 1);
          }
        }, 700);
      }
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      if (state.audioPlaylist.isPlaying && !state.audioPlaylist.isPaused) {
        playPlaylistIndex(state.audioPlaylist.currentIndex + 1);
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function togglePlayPausePlaylist() {
    if (!state.audioPlaylist.isPlaying) return;

    if (state.audioPlaylist.isPaused) {
      window.speechSynthesis.resume();
      state.audioPlaylist.isPaused = false;
      btnPlayerPlayPause.innerHTML = "⏸️ Pausar";
      document.querySelector(".audio-playing-indicator").innerText = "🎧 En reproducción continua";
    } else {
      window.speechSynthesis.pause();
      state.audioPlaylist.isPaused = true;
      btnPlayerPlayPause.innerHTML = "▶️ Reanudar";
      document.querySelector(".audio-playing-indicator").innerText = "⏸️ Reproducción pausada";
    }
  }

  function stopPlayAll() {
    state.audioPlaylist.isPlaying = false;
    state.audioPlaylist.isPaused = false;
    window.speechSynthesis.cancel();
    window._activeUtterance = null;

    audioPlayerBar.style.display = "none";
    btnListenAll.classList.remove("active-playing");
    btnListenAll.innerHTML = "🎧 Escuchar Todo en Orden";

    document.querySelectorAll(".study-card").forEach(c => c.classList.remove("reading-active"));
  }

  btnListenAll.addEventListener("click", () => {
    if (state.audioPlaylist.isPlaying) {
      stopPlayAll();
    } else {
      startPlayAll();
    }
  });

  btnPlayerPlayPause.addEventListener("click", togglePlayPausePlaylist);
  btnPlayerStop.addEventListener("click", stopPlayAll);

  btnPlayerNext.addEventListener("click", () => {
    if (state.audioPlaylist.currentIndex + 1 < state.audioPlaylist.queue.length) {
      playPlaylistIndex(state.audioPlaylist.currentIndex + 1);
    }
  });

  btnPlayerPrev.addEventListener("click", () => {
    if (state.audioPlaylist.currentIndex - 1 >= 0) {
      playPlaylistIndex(state.audioPlaylist.currentIndex - 1);
    }
  });

  // =========================================================================
  // 3. MODO EXAMEN & SIMULACRO REAL CON TEMPORIZADOR Y REVISIÓN
  // =========================================================================
  const quizConfigCard = document.getElementById("quiz-config-card");
  const quizActiveCard = document.getElementById("quiz-active-card");
  const quizResultsCard = document.getElementById("quiz-results-card");
  const btnStartQuiz = document.getElementById("btn-start-quiz");
  const quizCategorySelect = document.getElementById("quiz-category-select");
  const quizCountSelect = document.getElementById("quiz-count-select");
  const modeBtnPractice = document.getElementById("mode-btn-practice");
  const modeBtnSimulacro = document.getElementById("mode-btn-simulacro");

  const timerContainer = document.getElementById("timer-container");
  const timerDisplay = document.getElementById("timer-display");
  const quizProgressFill = document.getElementById("quiz-progress-fill");
  const quizCurrentNum = document.getElementById("quiz-current-num");
  const quizTotalNum = document.getElementById("quiz-total-num");
  const quizScoreLive = document.getElementById("quiz-score-live");
  const quizQuestionTextContent = document.getElementById("quiz-question-text-content");
  const btnSpeakQuiz = document.getElementById("btn-speak-quiz");
  const quizOptionsList = document.getElementById("quiz-options-list");
  const quizFeedbackBox = document.getElementById("quiz-feedback-box");
  const btnNextQuestion = document.getElementById("btn-next-question");
  const btnRetryMissed = document.getElementById("btn-retry-missed");
  const btnCopyResults = document.getElementById("btn-copy-results");
  const resultsBestScore = document.getElementById("results-best-score");
  const examReviewList = document.getElementById("exam-review-list");

  // Mostrar mejor nota histórica
  if (resultsBestScore && state.bestScore > 0) {
    resultsBestScore.innerText = `🏆 Mejor Puntaje Histórico: ${state.bestScore}%`;
  }

  // Selector de Modo (Práctica vs Simulacro)
  modeBtnPractice.addEventListener("click", () => {
    state.quiz.mode = "practice";
    modeBtnPractice.classList.add("active");
    modeBtnSimulacro.classList.remove("active");
  });

  modeBtnSimulacro.addEventListener("click", () => {
    state.quiz.mode = "simulacro";
    modeBtnSimulacro.classList.add("active");
    modeBtnPractice.classList.remove("active");
  });

  function startQuizSession(questionsToRun) {
    state.quiz.questions = questionsToRun;
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.userAnswers = [];
    state.quiz.missedQuestions = [];
    state.quiz.active = true;

    quizConfigCard.style.display = "none";
    quizResultsCard.style.display = "none";
    quizActiveCard.style.display = "block";

    if (state.quiz.mode === "simulacro") {
      timerContainer.style.display = "flex";
      state.quiz.timerSeconds = 15 * 60; // 15 minutos
      startQuizTimer();
    } else {
      timerContainer.style.display = "none";
    }

    loadQuizQuestion(0);
  }

  // Iniciar Examen desde Configuración
  btnStartQuiz.addEventListener("click", () => {
    const selectedCat = quizCategorySelect.value;
    const requestedCount = parseInt(quizCountSelect.value, 10);

    let pool = studyData.questions;
    if (selectedCat !== "all") {
      pool = pool.filter(q => q.category === selectedCat);
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    startQuizSession(shuffled.slice(0, requestedCount));
  });

  // Repetir solo preguntas falladas (Deduplicadas)
  btnRetryMissed.addEventListener("click", () => {
    if (state.quiz.missedQuestions.length === 0) return;
    
    // Deduplicar por ID
    const uniqueMissed = Array.from(
      new Map(state.quiz.missedQuestions.map(item => [item.id, item])).values()
    );
    const shuffledMissed = uniqueMissed.sort(() => 0.5 - Math.random());
    startQuizSession(shuffledMissed);
  });

  function startQuizTimer() {
    clearInterval(state.quiz.timerInterval);
    updateTimerDisplay();

    state.quiz.timerInterval = setInterval(() => {
      state.quiz.timerSeconds--;
      updateTimerDisplay();

      if (state.quiz.timerSeconds <= 0) {
        clearInterval(state.quiz.timerInterval);
        showToast("⏱️ ¡El tiempo del simulacro ha finalizado!", "warning");
        finishQuiz();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.quiz.timerSeconds / 60);
    const secs = state.quiz.timerSeconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (state.quiz.timerSeconds <= 120) {
      timerDisplay.className = "timer-badge danger";
    } else if (state.quiz.timerSeconds <= 300) {
      timerDisplay.className = "timer-badge warning";
    } else {
      timerDisplay.className = "timer-badge";
    }
  }

  // Cargar una pregunta en el examen
  function loadQuizQuestion(index) {
    const q = state.quiz.questions[index];
    if (!q) return finishQuiz();

    quizCurrentNum.innerText = index + 1;
    quizTotalNum.innerText = state.quiz.questions.length;
    quizScoreLive.innerText = state.quiz.score;
    quizQuestionTextContent.innerText = `${index + 1}. ${q.title}`;

    btnSpeakQuiz.onclick = () => {
      speakText(`${q.title}`, btnSpeakQuiz);
    };

    const progressPct = (index / state.quiz.questions.length) * 100;
    quizProgressFill.style.width = `${progressPct}%`;

    quizFeedbackBox.style.display = "none";
    btnNextQuestion.style.display = "none";
    quizOptionsList.innerHTML = "";

    const optionsWithMeta = q.mcOptions.map((text, origIdx) => ({
      text,
      isCorrect: origIdx === q.correctIndex
    }));
    const shuffledOptions = optionsWithMeta.sort(() => 0.5 - Math.random());

    const letters = ["A", "B", "C", "D"];
    shuffledOptions.forEach((optObj, displayIdx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `
        <span class="quiz-option-letter">${letters[displayIdx]}</span>
        <span>${optObj.text}</span>
      `;
      btn.addEventListener("click", () => handleOptionSelection(displayIdx, optObj, shuffledOptions, q));
      quizOptionsList.appendChild(btn);
    });
  }

  // Manejar selección de respuesta
  function handleOptionSelection(displayIdx, selectedOptObj, shuffledOptions, question) {
    const buttons = quizOptionsList.querySelectorAll(".quiz-option-btn");
    buttons.forEach(b => b.disabled = true);

    const isCorrect = selectedOptObj.isCorrect;

    if (state.quiz.mode === "practice") {
      if (isCorrect) {
        state.quiz.score += 10;
        quizScoreLive.innerText = state.quiz.score;
        buttons[displayIdx].classList.add("correct");
        showQuizFeedback(true, "¡Correcto!", question.explanation);
      } else {
        buttons[displayIdx].classList.add("wrong");
        const correctIndexInDisplay = shuffledOptions.findIndex(o => o.isCorrect);
        if (correctIndexInDisplay !== -1) {
          buttons[correctIndexInDisplay].classList.add("correct");
        }
        showQuizFeedback(false, "Respuesta Incorrecta", question.explanation);
      }
    } else {
      buttons[displayIdx].classList.add("selected-simulacro");
      if (isCorrect) {
        state.quiz.score += 10;
        quizScoreLive.innerText = state.quiz.score;
      }
    }

    if (!isCorrect) {
      state.quiz.missedQuestions.push(question);
    }

    state.quiz.userAnswers.push({
      question: question,
      selectedText: selectedOptObj.text,
      correctText: question.mcOptions[question.correctIndex],
      category: question.category,
      correct: isCorrect
    });

    btnNextQuestion.style.display = "inline-block";
    btnNextQuestion.innerText = (state.quiz.currentIndex === state.quiz.questions.length - 1)
      ? "Finalizar y Ver Ficha 🏁"
      : "Siguiente Pregunta ➔";
  }

  function showQuizFeedback(isCorrect, title, explanation) {
    quizFeedbackBox.className = `quiz-feedback-box ${isCorrect ? "correct" : "wrong"}`;
    quizFeedbackBox.innerHTML = `
      <div class="quiz-feedback-title">${isCorrect ? "✅ " : "❌ "}${title}</div>
      <div class="quiz-feedback-desc">${explanation}</div>
    `;
    quizFeedbackBox.style.display = "block";
  }

  btnNextQuestion.addEventListener("click", () => {
    state.quiz.currentIndex++;
    if (state.quiz.currentIndex < state.quiz.questions.length) {
      loadQuizQuestion(state.quiz.currentIndex);
    } else {
      finishQuiz();
    }
  });

  // Finalizar Examen y Renderizar Ficha + Revisión Detallada
  function finishQuiz() {
    clearInterval(state.quiz.timerInterval);
    quizActiveCard.style.display = "none";
    quizResultsCard.style.display = "block";

    const total = state.quiz.questions.length;
    const correctCount = state.quiz.userAnswers.filter(a => a.correct).length;
    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    document.getElementById("results-score-pct").innerText = `${percentage}%`;
    document.getElementById("results-correct-count").innerText = correctCount;
    document.getElementById("results-wrong-count").innerText = wrongCount;

    // Guardar mejor nota histórica
    if (percentage > state.bestScore) {
      state.bestScore = percentage;
      localStorage.setItem("exam_best_score", state.bestScore);
      showToast("🎉 ¡Nuevo récord de puntaje alcanzado!", "success");
    }
    if (resultsBestScore) {
      resultsBestScore.innerText = `🏆 Mejor Puntaje Histórico: ${state.bestScore}%`;
    }

    // Botón de reintentar falladas
    if (wrongCount > 0) {
      btnRetryMissed.style.display = "inline-block";
      btnRetryMissed.innerText = `🎯 Repetir las ${wrongCount} falladas`;
    } else {
      btnRetryMissed.style.display = "none";
    }

    // Ficha Diagnóstico por Categoría
    const diagContainer = document.getElementById("diagnostic-bars-container");
    diagContainer.innerHTML = "";

    const catStats = {};
    state.quiz.userAnswers.forEach(ans => {
      if (!catStats[ans.category]) {
        catStats[ans.category] = { total: 0, correct: 0 };
      }
      catStats[ans.category].total++;
      if (ans.correct) catStats[ans.category].correct++;
    });

    Object.keys(catStats).forEach(catId => {
      const catObj = studyData.categories.find(c => c.id === catId) || { name: catId, icon: "⚡" };
      const data = catStats[catId];
      const catPct = Math.round((data.correct / data.total) * 100);

      let barColor = "#10b981";
      if (catPct < 60) barColor = "#f43f5e";
      else if (catPct < 85) barColor = "#fbbf24";

      const item = document.createElement("div");
      item.className = "diag-item";
      item.innerHTML = `
        <div class="diag-meta">
          <span>${catObj.icon} ${catObj.name}</span>
          <span style="color: ${barColor}; font-weight: 800;">${data.correct}/${data.total} (${catPct}%)</span>
        </div>
        <div class="diag-track">
          <div class="diag-fill" style="width: ${catPct}%; background: ${barColor};"></div>
        </div>
      `;
      diagContainer.appendChild(item);
    });

    // Lista de Revisión Pregunta por Pregunta
    examReviewList.innerHTML = "";
    state.quiz.userAnswers.forEach((item, idx) => {
      const reviewCard = document.createElement("div");
      reviewCard.className = `review-card-item ${item.correct ? "correct" : "wrong"}`;
      reviewCard.innerHTML = `
        <div class="review-q-header">
          <span>${idx + 1}. ${item.question.title}</span>
          <span style="color: ${item.correct ? "#34d399" : "#fb7185"}; font-weight: 800;">
            ${item.correct ? "✅ Correcta" : "❌ Incorrecta"}
          </span>
        </div>
        <div class="review-ans-diff">
          <div><strong>Tu respuesta:</strong> <span style="color: ${item.correct ? "#34d399" : "#fb7185"};">${item.selectedText}</span></div>
          ${!item.correct ? `<div><strong>Respuesta oficial correcta:</strong> <span style="color: #34d399;">${item.correctText}</span></div>` : ""}
        </div>
        <div class="review-exp">
          <strong>Explicación:</strong> ${item.question.explanation}
        </div>
      `;
      examReviewList.appendChild(reviewCard);
    });

    const messageEl = document.getElementById("results-feedback-message");
    if (percentage >= 90) {
      messageEl.innerHTML = "🌟 <strong>¡PERFIL APROBADO CON HONORES!</strong> Dominas con solidez todos los protocolos de seguridad y redes.";
    } else if (percentage >= 70) {
      messageEl.innerHTML = "👍 <strong>¡BUEN DESEMPEÑO!</strong> Revisa las preguntas falladas en la lista inferior para consolidar tu ingreso.";
    } else {
      messageEl.innerHTML = "📖 <strong>REQUIERE REFUERZO.</strong> Te recomendamos revisar las explicaciones detalladas y repetir las falladas.";
    }
  }

  // Copiar Resumen de Resultados al Portapapeles
  btnCopyResults.addEventListener("click", () => {
    const total = state.quiz.questions.length;
    const correctCount = state.quiz.userAnswers.filter(a => a.correct).length;
    const percentage = Math.round((correctCount / total) * 100);
    const modeName = state.quiz.mode === "simulacro" ? "⏱️ Simulacro Real" : "💡 Práctica";

    const textToCopy = `⚡ *ElectroSafe BT/MT - Resultado de Examen*\n` +
      `📌 Modalidad: ${modeName}\n` +
      `🎯 Calificación: ${percentage}% (${correctCount}/${total} correctas)\n` +
      `🏆 Estado: ${percentage >= 80 ? "APROBADO" : "EN REPASO"}\n` +
      `📅 Fecha: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("📋 ¡Resumen copiado al portapapeles!", "success");
    }).catch(() => {
      showToast("No se pudo copiar automáticamente.", "warning");
    });
  });

  document.getElementById("btn-restart-quiz").addEventListener("click", () => {
    quizResultsCard.style.display = "none";
    quizConfigCard.style.display = "block";
  });

  // =========================================================================
  // 4. MODO ORDENAMIENTO SECUENCIAL (DRAG & DROP / BOTONES)
  // =========================================================================
  const seqTabsContainer = document.getElementById("seq-tabs-container");
  const seqTitle = document.getElementById("seq-title");
  const seqDescription = document.getElementById("seq-description");
  const seqList = document.getElementById("seq-list");
  const btnCheckSeq = document.getElementById("btn-check-seq");
  const btnResetSeq = document.getElementById("btn-reset-seq");
  const seqFeedback = document.getElementById("seq-feedback");
  const seqRationale = document.getElementById("seq-rationale");

  function renderSeqTabs() {
    seqTabsContainer.innerHTML = "";
    studyData.sequences.forEach((seq, idx) => {
      const btn = document.createElement("button");
      btn.className = `seq-tab-btn ${idx === state.currentSeqIndex ? "active" : ""}`;
      btn.innerText = seq.title;
      btn.addEventListener("click", () => {
        state.currentSeqIndex = idx;
        document.querySelectorAll(".seq-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCurrentSequence();
      });
      seqTabsContainer.appendChild(btn);
    });
  }

  function renderCurrentSequence() {
    const seq = studyData.sequences[state.currentSeqIndex];
    if (!seq) return;

    seqTitle.innerText = seq.title;
    seqDescription.innerText = seq.description;
    seqFeedback.style.display = "none";
    seqRationale.style.display = "none";

    state.currentSeqItems = [...seq.steps].sort(() => 0.5 - Math.random());
    renderSeqItemsList();
  }

  function renderSeqItemsList() {
    seqList.innerHTML = "";
    state.currentSeqItems.forEach((step, idx) => {
      const item = document.createElement("div");
      item.className = "seq-item";
      item.draggable = true;
      item.dataset.index = idx;

      item.innerHTML = `
        <div class="seq-left">
          <span class="seq-badge">${idx + 1}</span>
          <span class="seq-text">${step.text}</span>
        </div>
        <div class="seq-controls">
          <button class="btn-move" onclick="moveSeqItem(${idx}, -1)" ${idx === 0 ? "disabled style='opacity:0.3;'" : ""}>▲</button>
          <button class="btn-move" onclick="moveSeqItem(${idx}, 1)" ${idx === state.currentSeqItems.length - 1 ? "disabled style='opacity:0.3;'" : ""}>▼</button>
        </div>
      `;

      item.addEventListener("dragstart", () => item.classList.add("dragging"));
      item.addEventListener("dragend", () => item.classList.remove("dragging"));

      seqList.appendChild(item);
    });

    seqList.addEventListener("dragover", e => {
      e.preventDefault();
      const draggingItem = document.querySelector(".seq-item.dragging");
      if (!draggingItem) return;

      const siblings = [...seqList.querySelectorAll(".seq-item:not(.dragging)")];
      const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
      });

      seqList.insertBefore(draggingItem, nextSibling);
    });
  }

  window.moveSeqItem = function(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.currentSeqItems.length) return;

    const temp = state.currentSeqItems[index];
    state.currentSeqItems[index] = state.currentSeqItems[newIndex];
    state.currentSeqItems[newIndex] = temp;
    renderSeqItemsList();
  };

  btnCheckSeq.addEventListener("click", () => {
    const domItems = seqList.querySelectorAll(".seq-item .seq-text");
    const currentOrderTexts = Array.from(domItems).map(el => el.innerText.trim());

    const activeSeqObj = studyData.sequences[state.currentSeqIndex];
    const officialSeq = activeSeqObj.steps;
    let allCorrect = true;

    currentOrderTexts.forEach((text, i) => {
      if (officialSeq[i].text.trim() !== text) {
        allCorrect = false;
      }
    });

    seqFeedback.style.display = "block";
    if (allCorrect) {
      seqFeedback.className = "seq-feedback success";
      seqFeedback.innerHTML = "🎉 <strong>¡Secuencia Perfecta!</strong> Has ordenado todos los pasos de manera 100% correcta y segura.";
      
      if (activeSeqObj.rationale) {
        seqRationale.innerHTML = activeSeqObj.rationale;
        seqRationale.style.display = "block";
      }
      showToast("¡Secuencia completada con éxito! 🎉", "success");
    } else {
      seqFeedback.className = "seq-feedback error";
      seqFeedback.innerHTML = "⚠️ <strong>El orden no es correcto aún.</strong> Revisa las posiciones de los pasos e inténtalo nuevamente.";
      seqRationale.style.display = "none";
    }
  });

  btnResetSeq.addEventListener("click", renderCurrentSequence);

  // =========================================================================
  // 5. ZONA DE JUEGOS Y MATCH (CON BOTÓN DE REPETIR)
  // =========================================================================
  const matchTabs = document.getElementById("match-tabs");
  const matchColLeft = document.getElementById("match-col-left");
  const matchColRight = document.getElementById("match-col-right");
  const matchStatus = document.getElementById("match-status");
  const btnMatchReset = document.getElementById("btn-match-reset");

  function initMatchGame(gameIndex) {
    state.currentMatchIndex = gameIndex;
    const game = studyData.matchGames[gameIndex];
    if (!game) return;

    state.selectedLeft = null;
    state.selectedRight = null;
    state.matchedPairsCount = 0;
    matchStatus.innerText = "Selecciona un elemento de la izquierda y únelo con su par de la derecha.";

    matchTabs.innerHTML = "";
    studyData.matchGames.forEach((g, idx) => {
      const btn = document.createElement("button");
      btn.className = `chip-btn ${idx === gameIndex ? "active" : ""}`;
      btn.innerText = g.title;
      btn.addEventListener("click", () => initMatchGame(idx));
      matchTabs.appendChild(btn);
    });

    const leftItems = [...game.pairs].sort(() => 0.5 - Math.random());
    const rightItems = [...game.pairs].sort(() => 0.5 - Math.random());

    matchColLeft.innerHTML = "";
    matchColRight.innerHTML = "";

    leftItems.forEach(p => {
      const btn = document.createElement("button");
      btn.className = "match-item-btn";
      btn.innerText = p.left;
      btn.dataset.key = p.left;
      btn.addEventListener("click", () => handleMatchLeftClick(btn, p));
      matchColLeft.appendChild(btn);
    });

    rightItems.forEach(p => {
      const btn = document.createElement("button");
      btn.className = "match-item-btn";
      btn.innerText = p.right;
      btn.dataset.key = p.left;
      btn.addEventListener("click", () => handleMatchRightClick(btn, p));
      matchColRight.appendChild(btn);
    });
  }

  btnMatchReset.addEventListener("click", () => {
    initMatchGame(state.currentMatchIndex);
    showToast("Juego reiniciado y mezclado", "info");
  });

  function handleMatchLeftClick(btn, pair) {
    if (btn.classList.contains("matched")) return;
    document.querySelectorAll("#match-col-left .match-item-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.selectedLeft = { btn, pair };
    checkMatchPair();
  }

  function handleMatchRightClick(btn, pair) {
    if (btn.classList.contains("matched")) return;
    document.querySelectorAll("#match-col-right .match-item-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.selectedRight = { btn, pair };
    checkMatchPair();
  }

  function checkMatchPair() {
    if (!state.selectedLeft || !state.selectedRight) return;

    const leftKey = state.selectedLeft.pair.left;
    const rightKey = state.selectedRight.btn.dataset.key;

    if (leftKey === rightKey) {
      state.selectedLeft.btn.className = "match-item-btn matched";
      state.selectedRight.btn.className = "match-item-btn matched";
      state.matchedPairsCount++;
      matchStatus.innerHTML = `✅ <strong>¡Bien hecho!</strong> ${state.selectedLeft.pair.left} ➔ ${state.selectedRight.pair.right}`;

      const totalPairs = studyData.matchGames[state.currentMatchIndex].pairs.length;
      if (state.matchedPairsCount === totalPairs) {
        matchStatus.innerHTML = "🏆 <strong>¡Felicitaciones! Has emparejado todos los conceptos con éxito.</strong>";
        showToast("¡Tablero completado con éxito! 🏆", "success");
      }
    } else {
      const leftBtn = state.selectedLeft.btn;
      const rightBtn = state.selectedRight.btn;
      leftBtn.classList.add("wrong-shake");
      rightBtn.classList.add("wrong-shake");
      matchStatus.innerText = "❌ No coinciden. ¡Inténtalo de nuevo!";

      setTimeout(() => {
        leftBtn.classList.remove("selected", "wrong-shake");
        rightBtn.classList.remove("selected", "wrong-shake");
      }, 500);
    }

    state.selectedLeft = null;
    state.selectedRight = null;
  }

  // =========================================================================
  // 6. TEST RÁPIDO VERDADERO / FALSO (CON BOTÓN DE REINICIAR)
  // =========================================================================
  const tfQuestion = document.getElementById("tf-question");
  const tfFeedback = document.getElementById("tf-feedback");
  const btnTfTrue = document.getElementById("btn-tf-true");
  const btnTfFalse = document.getElementById("btn-tf-false");
  const tfCurrentNum = document.getElementById("tf-current-num");
  const btnTfReset = document.getElementById("btn-tf-reset");

  function loadTrueFalse(index) {
    state.tfIndex = index;
    const item = studyData.trueFalseQuestions[index];
    if (!item) {
      tfQuestion.innerText = `🏁 ¡Completaste el test! Aciertos: ${state.tfScore} de ${studyData.trueFalseQuestions.length}`;
      tfFeedback.style.display = "block";
      tfFeedback.className = "tf-explanation seq-feedback success";
      tfFeedback.innerHTML = `🏆 <strong>Test Finalizado:</strong> Lograste ${state.tfScore} respuestas correctas sobre ${studyData.trueFalseQuestions.length}.`;
      btnTfTrue.style.display = "none";
      btnTfFalse.style.display = "none";
      return;
    }

    btnTfTrue.style.display = "inline-block";
    btnTfFalse.style.display = "inline-block";
    tfCurrentNum.innerText = `${index + 1}/${studyData.trueFalseQuestions.length}`;
    tfQuestion.innerText = item.q;
    tfFeedback.style.display = "none";
    btnTfTrue.disabled = false;
    btnTfFalse.disabled = false;
  }

  function handleTfAnswer(userVal) {
    const item = studyData.trueFalseQuestions[state.tfIndex];
    btnTfTrue.disabled = true;
    btnTfFalse.disabled = true;

    const isCorrect = userVal === item.correct;
    if (isCorrect) state.tfScore++;

    tfFeedback.style.display = "block";
    tfFeedback.className = `tf-explanation ${isCorrect ? "seq-feedback success" : "seq-feedback error"}`;
    tfFeedback.innerHTML = `
      <strong>${isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto."}</strong> ${item.explanation}
      <div style="margin-top: 0.5rem;">
        <button class="btn-reveal" onclick="nextTf()">Siguiente Pregunta ➔</button>
      </div>
    `;
  }

  window.nextTf = function() {
    loadTrueFalse(state.tfIndex + 1);
  };

  btnTfTrue.addEventListener("click", () => handleTfAnswer(true));
  btnTfFalse.addEventListener("click", () => handleTfAnswer(false));

  btnTfReset.addEventListener("click", () => {
    state.tfScore = 0;
    loadTrueFalse(0);
    showToast("Test Verdadero/Falso reiniciado", "info");
  });

  // =========================================================================
  // 7. CALCULADORA DE EMPOTRAMIENTO DE POSTES CON ALTURA VISIBLE
  // =========================================================================
  const postLengthInput = document.getElementById("post-length-input");
  const calcResultValue = document.getElementById("calc-result-value");
  const calcResultFormula = document.getElementById("calc-result-formula");
  const calcResultAbove = document.getElementById("calc-result-above");
  const presetButtons = document.querySelectorAll(".btn-preset-post");

  function updatePostDepthCalc() {
    const length = parseFloat(postLengthInput.value) || 0;
    const depth = (length * 0.10) + 0.60;
    const aboveGround = Math.max(0, length - depth);

    calcResultFormula.innerText = `Fórmula: (${length}m × 10%) + 60cm = ${(length * 0.10).toFixed(2)}m + 0.60m`;
    calcResultValue.innerText = `Profundidad de pozo requerida: ${depth.toFixed(2)} metros`;
    if (calcResultAbove) {
      calcResultAbove.innerText = `🌲 Altura útil visible sobre el terreno: ${aboveGround.toFixed(2)} metros`;
    }
  }

  postLengthInput.addEventListener("input", updatePostDepthCalc);

  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const meters = btn.dataset.meters;
      postLengthInput.value = meters;
      updatePostDepthCalc();
    });
  });

  // =========================================================================
  // 8. SIMULADOR DE INSPECCIÓN DE POSTES (CON BOTÓN DE REINICIO)
  // =========================================================================
  const poleSimStatus = document.getElementById("pole-sim-status");
  const btnPoleReset = document.getElementById("btn-pole-reset");
  const stageBtns = [
    document.getElementById("stage-btn-1"),
    document.getElementById("stage-btn-2"),
    document.getElementById("stage-btn-3"),
    document.getElementById("stage-btn-4")
  ];

  const hotspots = {
    1: document.getElementById("hotspot-visual"),
    2: document.getElementById("hotspot-punzado"),
    3: document.getElementById("hotspot-golpe"),
    4: document.getElementById("hotspot-movimiento")
  };

  const poleStageMessages = {
    1: "👉 <strong>Paso 1 requerido:</strong> Inspección Visual (que no esté quebrado, sin grandes rajaduras y a plomo).",
    2: "👉 <strong>Paso 2 requerido:</strong> Punzado en los 4 puntos cardinales en la base (comprobar que no esté podrido).",
    3: "👉 <strong>Paso 3 requerido:</strong> Golpe espiralado desde la base hacia arriba (verificar que no esté ahuecado).",
    4: "👉 <strong>Paso 4 requerido:</strong> Movimiento de tracción en sentido contrario a la línea (comprobar firmeza)."
  };

  function resetPoleSimulator() {
    state.poleStage = 1;
    stageBtns.forEach((btn, idx) => {
      btn.className = `pole-stage-btn ${idx === 0 ? "active-target" : ""}`;
    });
    poleSimStatus.innerHTML = `👉 <strong>Paso 1 requerido:</strong> Haz clic en el <strong>Paso 1</strong> o en el punto (1) del poste para realizar la inspección visual.`;
    showToast("Simulador de poste reiniciado", "info");
  }

  function handlePoleStage(stepNum) {
    if (stepNum !== state.poleStage) {
      poleSimStatus.innerHTML = `⚠️ <strong>Secuencia incorrecta:</strong> Debes realizar primero el <strong>Paso ${state.poleStage}</strong> reglamentario.`;
      return;
    }

    const currentBtn = stageBtns[stepNum - 1];
    currentBtn.classList.remove("active-target");
    currentBtn.classList.add("completed");

    if (stepNum < 4) {
      state.poleStage++;
      stageBtns[state.poleStage - 1].classList.add("active-target");
      poleSimStatus.innerHTML = `✅ <strong>Paso ${stepNum} Aprobado.</strong> ${poleStageMessages[state.poleStage]}`;
    } else {
      poleSimStatus.innerHTML = `🎉 <strong>¡INSPECCIÓN COMPLETA Y APROBADA!</strong> El poste de madera ha superado las 4 pruebas reglamentarias y está <strong>APTO PARA EL ASCENSO SEGURO</strong>.`;
      showToast("¡Poste Aprobado para Ascenso Seguro! 🪵", "success");
    }
  }

  stageBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => handlePoleStage(idx + 1));
  });

  Object.keys(hotspots).forEach(k => {
    if (hotspots[k]) {
      hotspots[k].addEventListener("click", () => handlePoleStage(parseInt(k, 10)));
    }
  });

  if (btnPoleReset) {
    btnPoleReset.addEventListener("click", resetPoleSimulator);
  }

  // =========================================================================
  // 9. SIMULADOR DE MEDICIONES EN TOMA BT (VOLTÍMETRO)
  // =========================================================================
  const testerScreen = document.getElementById("tester-screen");
  const testerStatus = document.getElementById("tester-status");
  const probeButtons = document.querySelectorAll(".btn-test-probe");

  probeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      probeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const probeType = btn.dataset.probe;
      if (probeType === "fase-neutro") {
        testerScreen.innerText = "220 V";
        testerStatus.innerHTML = "⚡ <strong>Figura A:</strong> Medición entre Fase y Neutro. Tensión monofásica simple correcta.";
      } else if (probeType === "fase-fase-distinta") {
        testerScreen.innerText = "380 V";
        testerStatus.innerHTML = "⚡ <strong>Figura B:</strong> Medición entre dos fases de distinto potencial (R-S, S-T). Tensión trifásica compuesta.";
      } else if (probeType === "fase-fase-igual") {
        testerScreen.innerText = "000 V";
        testerStatus.innerHTML = "🔒 <strong>Figura C:</strong> Medición entre bornes de igual potencial. 0V confirma que la fase es la misma (fase ligada en paralelo).";
      }
    });
  });

  // =========================================================================
  // 10. MODAL RULETA (SIN PREGUNTAS CONSECUTIVAS REPETIDAS)
  // =========================================================================
  const modalRoulette = document.getElementById("modal-roulette");
  const btnOpenRoulette = document.getElementById("btn-open-roulette");
  const btnCloseRoulette = document.getElementById("btn-close-roulette");
  const btnSpinRoulette = document.getElementById("btn-spin-roulette");
  const rouletteIcon = document.getElementById("roulette-icon");
  const rouletteSpinnerView = document.getElementById("roulette-spinner-view");
  const rouletteQuestionView = document.getElementById("roulette-question-view");
  const rouletteCatBadge = document.getElementById("roulette-cat-badge");
  const rouletteQTitle = document.getElementById("roulette-q-title");
  const rouletteOptionsContainer = document.getElementById("roulette-options-container");
  const rouletteFeedbackBox = document.getElementById("roulette-feedback-box");
  const btnSpinAgain = document.getElementById("btn-spin-again");

  btnOpenRoulette.addEventListener("click", () => {
    modalRoulette.classList.add("open");
    rouletteSpinnerView.style.display = "block";
    rouletteQuestionView.style.display = "none";
  });

  btnCloseRoulette.addEventListener("click", () => {
    modalRoulette.classList.remove("open");
  });

  modalRoulette.addEventListener("click", (e) => {
    if (e.target === modalRoulette) modalRoulette.classList.remove("open");
  });

  function spinAndShowQuestion() {
    rouletteSpinnerView.style.display = "block";
    rouletteQuestionView.style.display = "none";
    rouletteIcon.classList.add("spinning");

    setTimeout(() => {
      rouletteIcon.classList.remove("spinning");
      rouletteSpinnerView.style.display = "none";
      rouletteQuestionView.style.display = "block";

      // Evitar repetir la misma pregunta consecutivamente
      let pool = studyData.questions;
      if (state.lastRouletteId && pool.length > 1) {
        pool = pool.filter(q => q.id !== state.lastRouletteId);
      }
      const randomQ = pool[Math.floor(Math.random() * pool.length)];
      state.lastRouletteId = randomQ.id;

      rouletteCatBadge.innerText = `Pregunta #${randomQ.id}`;
      rouletteQTitle.innerText = randomQ.title;
      rouletteFeedbackBox.style.display = "none";
      rouletteOptionsContainer.innerHTML = "";

      const optionsWithMeta = randomQ.mcOptions.map((text, origIdx) => ({
        text,
        isCorrect: origIdx === randomQ.correctIndex
      }));
      const shuffledOptions = optionsWithMeta.sort(() => 0.5 - Math.random());

      const letters = ["A", "B", "C", "D"];
      shuffledOptions.forEach((optObj, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.innerHTML = `
          <span class="quiz-option-letter">${letters[idx]}</span>
          <span>${optObj.text}</span>
        `;
        btn.addEventListener("click", () => {
          const allBtns = rouletteOptionsContainer.querySelectorAll(".quiz-option-btn");
          allBtns.forEach(b => b.disabled = true);

          if (optObj.isCorrect) {
            btn.classList.add("correct");
            rouletteFeedbackBox.className = "quiz-feedback-box correct";
            rouletteFeedbackBox.innerHTML = `✅ <strong>¡Excelente respuesta!</strong> ${randomQ.explanation}`;
          } else {
            btn.classList.add("wrong");
            const correctBtn = Array.from(allBtns).find((_, i) => shuffledOptions[i].isCorrect);
            if (correctBtn) correctBtn.classList.add("correct");
            rouletteFeedbackBox.className = "quiz-feedback-box wrong";
            rouletteFeedbackBox.innerHTML = `❌ <strong>Respuesta incorrecta.</strong> ${randomQ.explanation}`;
          }
          rouletteFeedbackBox.style.display = "block";
        });
        rouletteOptionsContainer.appendChild(btn);
      });
    }, 900);
  }

  btnSpinRoulette.addEventListener("click", spinAndShowQuestion);
  btnSpinAgain.addEventListener("click", spinAndShowQuestion);

  // =========================================================================
  // 11. MODAL DICCIONARIO / GLOSARIO DE SIGLAS TÉCNICAS
  // =========================================================================
  const modalGlossary = document.getElementById("modal-glossary");
  const btnOpenGlossary = document.getElementById("btn-open-glossary");
  const btnCloseGlossary = document.getElementById("btn-close-glossary");
  const glossarySearchInput = document.getElementById("glossary-search-input");
  const glossaryGrid = document.getElementById("glossary-grid");

  function renderGlossary(filterText = "") {
    if (!glossaryGrid) return;
    glossaryGrid.innerHTML = "";

    const terms = studyData.glossaryTerms || [];
    const filtered = terms.filter(t => {
      return !filterText || 
        t.term.toLowerCase().includes(filterText.toLowerCase()) || 
        t.def.toLowerCase().includes(filterText.toLowerCase());
    });

    if (filtered.length === 0) {
      glossaryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-dim); padding: 2rem;">
          No se encontró ninguna sigla que coincida.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "glossary-card";
      card.innerHTML = `
        <div class="glossary-term">⚡ ${item.term}</div>
        <div class="glossary-def">${item.def}</div>
      `;
      glossaryGrid.appendChild(card);
    });
  }

  if (btnOpenGlossary) {
    btnOpenGlossary.addEventListener("click", () => {
      modalGlossary.classList.add("open");
      renderGlossary(glossarySearchInput.value);
    });
  }

  if (btnCloseGlossary) {
    btnCloseGlossary.addEventListener("click", () => {
      modalGlossary.classList.remove("open");
    });
  }

  if (modalGlossary) {
    modalGlossary.addEventListener("click", (e) => {
      if (e.target === modalGlossary) modalGlossary.classList.remove("open");
    });
  }

  if (glossarySearchInput) {
    glossarySearchInput.addEventListener("input", (e) => {
      renderGlossary(e.target.value);
    });
  }

  // Inicialización de la App
  renderCategoryChips();
  renderStudyCards();
  renderSeqTabs();
  loadTrueFalse(0);
  updatePostDepthCalc();
});
