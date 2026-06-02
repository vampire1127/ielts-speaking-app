/**
 * IELTS Speaking Practice App
 * Pure frontend — no backend required
 */

(function () {
  "use strict";

  // ===== Constants =====
  const STORAGE_KEYS = {
    history: "ielts_speaking_history",
    settings: "ielts_speaking_settings",
  };

  const MAX_HISTORY = 50;

  const FILLER_WORDS = [
    "um", "uh", "er", "ah", "like", "you know", "sort of", "kind of",
    "basically", "actually", "literally", "well", "so", "i mean",
  ];

  const ADVANCED_WORDS = [
    "however", "therefore", "furthermore", "moreover", "nevertheless",
    "significant", "essential", "crucial", "beneficial", "detrimental",
    "perspective", "opportunity", "environment", "experience", "development",
    "particularly", "definitely", "absolutely", "approximately", "consequently",
    "demonstrate", "contribute", "establish", "implement", "maintain",
    "picturesque", "tremendous", "captivating", "resilience", "adaptability",
  ];

  const TIMER_HINTS = {
    part1: "Part 1 建议回答 20–30 秒",
    part2_prep: "Part 2 准备时间：1 分钟",
    part2_speak: "Part 2 回答时间：2 分钟",
    part3: "Part 3 建议回答 45–60 秒",
  };

  // ===== State =====
  const state = {
    currentPart: "part1",
    currentQuestion: null,
    timerMode: "free",
    timerSeconds: 0,
    timerMax: 0,
    timerRunning: false,
    timerInterval: null,
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
    recordingStart: null,
    recordingDuration: 0,
    recordingInterval: null,
    recognition: null,
    transcript: "",
    lastScores: null,
    settings: {
      openaiKey: "",
      targetBand: 6.5,
      autoAnalyze: true,
    },
  };

  // ===== DOM Elements =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    tabPart1: $("#tab-part1"),
    tabPart2: $("#tab-part2"),
    tabPart3: $("#tab-part3"),
    topicBadge: $("#topicBadge"),
    questionId: $("#questionId"),
    questionText: $("#questionText"),
    cuesContainer: $("#cuesContainer"),
    cuesList: $("#cuesList"),
    followUpText: $("#followUpText"),
    newQuestionBtn: $("#newQuestionBtn"),
    timerDisplay: $("#timerDisplay"),
    timerProgressBar: $("#timerProgressBar"),
    timerModeLabel: $("#timerModeLabel"),
    timerStartBtn: $("#timerStartBtn"),
    timerPauseBtn: $("#timerPauseBtn"),
    timerResetBtn: $("#timerResetBtn"),
    timerHint: $("#timerHint"),
    recordingStatus: $("#recordingStatus"),
    waveform: $("#waveform"),
    recordingTime: $("#recordingTime"),
    recordBtn: $("#recordBtn"),
    stopBtn: $("#stopBtn"),
    playbackBtn: $("#playbackBtn"),
    audioPlayback: $("#audioPlayback"),
    transcriptBox: $("#transcriptBox"),
    transcriptText: $("#transcriptText"),
    scoringCard: $("#scoringCard"),
    overallScore: $("#overallScore"),
    analyzeBtn: $("#analyzeBtn"),
    analyzeBtnText: $("#analyzeBtnText"),
    scoringNote: $("#scoringNote"),
    sampleToggle: $("#sampleToggle"),
    sampleContent: $("#sampleContent"),
    sampleAnswerText: $("#sampleAnswerText"),
    historyBtn: $("#historyBtn"),
    settingsBtn: $("#settingsBtn"),
    historyModal: $("#historyModal"),
    settingsModal: $("#settingsModal"),
    historyList: $("#historyList"),
    historyEmpty: $("#historyEmpty"),
    clearHistoryBtn: $("#clearHistoryBtn"),
    openaiKey: $("#openaiKey"),
    targetBand: $("#targetBand"),
    autoAnalyze: $("#autoAnalyze"),
    saveSettingsBtn: $("#saveSettingsBtn"),
    toast: $("#toast"),
  };

  // ===== Utilities =====
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function showToast(msg, duration = 2800) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      els.toast.hidden = true;
    }, duration);
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      if (saved) Object.assign(state.settings, JSON.parse(saved));
    } catch (_) { /* ignore */ }
    els.openaiKey.value = state.settings.openaiKey || "";
    els.targetBand.value = String(state.settings.targetBand);
    els.autoAnalyze.checked = state.settings.autoAnalyze;
  }

  function saveSettings() {
    state.settings.openaiKey = els.openaiKey.value.trim();
    state.settings.targetBand = parseFloat(els.targetBand.value);
    state.settings.autoAnalyze = els.autoAnalyze.checked;
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
    showToast("设置已保存");
    closeModal(els.settingsModal);
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "[]");
    } catch (_) {
      return [];
    }
  }

  function saveHistoryEntry(entry) {
    const history = loadHistory();
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
  }

  // ===== Modal =====
  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  $$("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      closeModal(el.closest(".modal"));
    });
  });

  // ===== Part & Question =====
  function setPart(part) {
    state.currentPart = part;
    $$(".part-tab").forEach((tab) => {
      const isActive = tab.dataset.part === part;
      tab.classList.toggle("part-tab--active", isActive);
      tab.setAttribute("aria-selected", isActive);
    });
    resetTimer();
    setupTimerForPart();
    pickQuestion();
  }

  function pickQuestion() {
    const part = state.currentPart;
    let question;

    if (part === "part1") {
      question = randomPick(IELTS_QUESTIONS.part1);
    } else if (part === "part2") {
      question = randomPick(IELTS_QUESTIONS.part2);
    } else {
      question = randomPick(IELTS_QUESTIONS.part3);
    }

    state.currentQuestion = question;
    renderQuestion();
    resetRecording();
    hideScores();
  }

  function renderQuestion() {
    const q = state.currentQuestion;
    if (!q) return;

    els.questionId.textContent = q.id;
    els.sampleAnswerText.textContent = q.sampleAnswer;

    if (state.currentPart === "part1") {
      els.topicBadge.textContent = q.topic;
      els.questionText.textContent = q.question;
      els.followUpText.textContent = q.followUp;
      els.followUpText.hidden = false;
      els.cuesContainer.hidden = true;
    } else if (state.currentPart === "part2") {
      els.topicBadge.textContent = "Cue Card";
      els.questionText.textContent = q.topic;
      els.followUpText.hidden = true;
      els.cuesContainer.hidden = false;
      els.cuesList.innerHTML = q.cues.map((c) => `<li>${c}</li>`).join("");
    } else {
      els.topicBadge.textContent = q.theme || "Discussion";
      els.questionText.textContent = q.question;
      els.followUpText.hidden = true;
      els.cuesContainer.hidden = true;
    }

    els.sampleToggle.setAttribute("aria-expanded", "false");
    els.sampleContent.hidden = true;
  }

  // ===== Timer =====
  function setupTimerForPart() {
    if (state.currentPart === "part2") {
      state.timerMode = "prep";
      state.timerMax = 60;
      els.timerModeLabel.textContent = "准备阶段";
      els.timerHint.textContent = TIMER_HINTS.part2_prep;
    } else if (state.currentPart === "part1") {
      state.timerMode = "free";
      state.timerMax = 0;
      els.timerModeLabel.textContent = "自由练习";
      els.timerHint.textContent = TIMER_HINTS.part1;
    } else {
      state.timerMode = "free";
      state.timerMax = 0;
      els.timerModeLabel.textContent = "自由练习";
      els.timerHint.textContent = TIMER_HINTS.part3;
    }
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    els.timerDisplay.textContent = formatTime(state.timerSeconds);
    if (state.timerMax > 0) {
      const pct = Math.min(100, (state.timerSeconds / state.timerMax) * 100);
      els.timerProgressBar.style.width = `${pct}%`;
    } else {
      els.timerProgressBar.style.width = "0%";
    }
  }

  function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    els.timerStartBtn.disabled = true;
    els.timerPauseBtn.disabled = false;

    state.timerInterval = setInterval(() => {
      state.timerSeconds++;

      if (state.timerMax > 0 && state.timerSeconds >= state.timerMax) {
        onTimerComplete();
      }

      updateTimerDisplay();
    }, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    clearInterval(state.timerInterval);
    els.timerStartBtn.disabled = false;
    els.timerPauseBtn.disabled = true;
  }

  function resetTimer() {
    pauseTimer();
    state.timerSeconds = 0;
    updateTimerDisplay();
    els.timerStartBtn.disabled = false;
    els.timerPauseBtn.disabled = true;
  }

  function onTimerComplete() {
    pauseTimer();

    if (state.currentPart === "part2" && state.timerMode === "prep") {
      showToast("准备时间结束！现在开始 2 分钟回答");
      state.timerMode = "speak";
      state.timerMax = 120;
      state.timerSeconds = 0;
      els.timerModeLabel.textContent = "回答阶段";
      els.timerHint.textContent = TIMER_HINTS.part2_speak;
      updateTimerDisplay();
      setTimeout(startTimer, 800);
    } else {
      showToast("时间到！");
    }
  }

  // ===== Recording =====
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.audioChunks = [];
      state.transcript = "";

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      state.mediaRecorder = new MediaRecorder(stream, { mimeType });

      state.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) state.audioChunks.push(e.data);
      };

      state.mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        state.audioBlob = new Blob(state.audioChunks, { type: mimeType });
        if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
        state.audioUrl = URL.createObjectURL(state.audioBlob);
        els.audioPlayback.src = state.audioUrl;
        els.audioPlayback.hidden = false;
        els.playbackBtn.disabled = false;
        els.analyzeBtn.disabled = false;

        if (state.settings.autoAnalyze) {
          analyzeRecording();
        }
      };

      state.mediaRecorder.start(200);
      state.isRecording = true;
      state.recordingStart = Date.now();

      els.recordBtn.classList.add("recording");
      els.recordBtn.innerHTML = '<span class="record-dot"></span> 录音中…';
      els.recordBtn.disabled = true;
      els.stopBtn.disabled = false;
      els.recordingStatus.textContent = "录音中";
      els.recordingStatus.classList.add("active");
      els.waveform.classList.add("active");

      state.recordingInterval = setInterval(updateRecordingTime, 500);
      startSpeechRecognition();
    } catch (err) {
      showToast("无法访问麦克风，请检查权限设置");
      console.error(err);
    }
  }

  function stopRecording() {
    if (!state.isRecording || !state.mediaRecorder) return;

    state.recordingDuration = state.recordingStart
      ? Math.max(1, Math.floor((Date.now() - state.recordingStart) / 1000))
      : 0;

    state.mediaRecorder.stop();
    state.isRecording = false;
    clearInterval(state.recordingInterval);
    stopSpeechRecognition();

    els.recordBtn.classList.remove("recording");
    els.recordBtn.innerHTML = '<span class="record-dot"></span> 开始录音';
    els.recordBtn.disabled = false;
    els.stopBtn.disabled = true;
    els.recordingStatus.textContent = "已完成";
    els.recordingStatus.classList.remove("active");
    els.waveform.classList.remove("active");
  }

  function updateRecordingTime() {
    if (!state.recordingStart) return;
    const elapsed = Math.floor((Date.now() - state.recordingStart) / 1000);
    els.recordingTime.textContent = formatTime(elapsed);
  }

  function resetRecording() {
    if (state.isRecording) stopRecording();
    state.audioBlob = null;
    state.transcript = "";
    state.recordingDuration = 0;
    if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
    state.audioUrl = null;
    els.audioPlayback.hidden = true;
    els.audioPlayback.src = "";
    els.recordingTime.textContent = "00:00";
    els.transcriptBox.hidden = true;
    els.transcriptText.textContent = "";
    els.playbackBtn.disabled = true;
    els.analyzeBtn.disabled = true;
    els.recordingStatus.textContent = "就绪";
    els.recordingStatus.classList.remove("active", "analyzing");
  }

  function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    state.recognition = new SpeechRecognition();
    state.recognition.lang = "en-US";
    state.recognition.continuous = true;
    state.recognition.interimResults = true;

    state.recognition.onresult = (event) => {
      let final = "";
      for (let i = 0; i < event.results.length; i++) {
        final += event.results[i][0].transcript + " ";
      }
      state.transcript = final.trim();
    };

    state.recognition.onerror = () => { /* silent */ };

    try {
      state.recognition.start();
    } catch (_) { /* already started */ }
  }

  function stopSpeechRecognition() {
    if (state.recognition) {
      try { state.recognition.stop(); } catch (_) { /* ignore */ }
      state.recognition = null;
    }
  }

  function playbackRecording() {
    if (els.audioPlayback.src) {
      els.audioPlayback.hidden = false;
      els.audioPlayback.play();
    }
  }

  // ===== Scoring Engine =====
  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z'\s-]/g, " ").split(/\s+/).filter(Boolean);
  }

  function countFillers(text) {
    const lower = text.toLowerCase();
    let count = 0;
    FILLER_WORDS.forEach((f) => {
      const regex = new RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      const matches = lower.match(regex);
      if (matches) count += matches.length;
    });
    return count;
  }

  function countAdvancedWords(tokens) {
    const set = new Set(tokens);
    return ADVANCED_WORDS.filter((w) => set.has(w)).length;
  }

  function analyzeGrammar(text) {
    const issues = [];
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
    if (sentences.length === 0) return { score: 4.0, issues: ["No complete sentences detected"] };

    let score = 6.0;
    const lower = text.toLowerCase();

    if (/\b(is|are|was|were|have|has|had|will|would|can|could|should|might|must)\b/.test(lower)) {
      score += 0.3;
    }
    if (/\b(because|although|while|whereas|if|unless|since|so that)\b/.test(lower)) {
      score += 0.4;
    }
    if (/\b(not only|but also|either|neither|both)\b/.test(lower)) {
      score += 0.3;
    }

    const repeatedStarts = {};
    sentences.forEach((s) => {
      const first = s.trim().split(/\s+/)[0]?.toLowerCase();
      if (first) repeatedStarts[first] = (repeatedStarts[first] || 0) + 1;
    });
    const overused = Object.values(repeatedStarts).filter((c) => c > 3).length;
    if (overused > 0) {
      score -= 0.3;
      issues.push("Some sentence starters are overused");
    }

    if (sentences.length >= 3) score += 0.3;
    if (sentences.length >= 5) score += 0.2;

    return { score: clampBand(score), issues };
  }

  function analyzeFluency(text, durationSec) {
    const tokens = tokenize(text);
    const wordCount = tokens.length;
    const fillers = countFillers(text);
    let score = 5.5;

    if (wordCount === 0) return { score: 4.0, wpm: 0, fillers, comment: "未检测到有效语音内容" };

    const wpm = durationSec > 0 ? (wordCount / durationSec) * 60 : wordCount * 2;

    if (wpm >= 120 && wpm <= 160) score += 1.0;
    else if (wpm >= 100 && wpm <= 180) score += 0.5;
    else if (wpm < 80) score -= 0.5;

    const fillerRate = wordCount > 0 ? fillers / wordCount : 0;
    if (fillerRate < 0.02) score += 0.8;
    else if (fillerRate < 0.05) score += 0.3;
    else if (fillerRate > 0.1) score -= 0.8;

    if (wordCount >= 40) score += 0.3;
    if (wordCount >= 80) score += 0.3;

    const part = state.currentPart;
    if (part === "part1" && wordCount >= 25 && wordCount <= 60) score += 0.2;
    if (part === "part2" && wordCount >= 150) score += 0.5;
    if (part === "part3" && wordCount >= 50) score += 0.3;

    return { score: clampBand(score), wpm: Math.round(wpm), fillers };
  }

  function analyzeVocabulary(text) {
    const tokens = tokenize(text);
    const unique = new Set(tokens);
    const wordCount = tokens.length;
    let score = 5.5;

    if (wordCount === 0) return { score: 4.0, uniqueRatio: 0, advanced: 0 };

    const uniqueRatio = unique.size / wordCount;
    const advanced = countAdvancedWords(tokens);

    if (uniqueRatio > 0.7) score += 0.8;
    else if (uniqueRatio > 0.55) score += 0.4;
    else if (uniqueRatio < 0.4) score -= 0.5;

    if (advanced >= 5) score += 1.0;
    else if (advanced >= 3) score += 0.6;
    else if (advanced >= 1) score += 0.3;

    const avgLen = tokens.reduce((s, w) => s + w.length, 0) / wordCount;
    if (avgLen > 5) score += 0.3;

    return { score: clampBand(score), uniqueRatio, advanced };
  }

  function analyzePronunciation(text, durationSec) {
    const tokens = tokenize(text);
    const wordCount = tokens.length;
    let score = 5.5;

    if (wordCount === 0) return { score: 4.0, clarity: 0 };

    const clarity = Math.min(1, wordCount / Math.max(durationSec * 1.5, 10));

    if (clarity > 0.8) score += 0.8;
    else if (clarity > 0.5) score += 0.4;
    else score -= 0.5;

    const hasRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (hasRecognition && wordCount > 10) score += 0.3;

    const shortWords = tokens.filter((w) => w.length <= 2).length;
    if (wordCount > 0 && shortWords / wordCount > 0.3) score -= 0.3;

    return { score: clampBand(score), clarity };
  }

  function clampBand(score) {
    return Math.round(Math.min(9, Math.max(4, score)) * 2) / 2;
  }

  function generateComments(scores, analysis) {
    const comments = {};

    if (scores.fluency >= 7) {
      comments.fluency = "语速自然，表达连贯，停顿控制良好。";
    } else if (scores.fluency >= 6) {
      comments.fluency = `语速 ${analysis.fluency.wpm} WPM，整体流畅，注意减少填充词（检测到 ${analysis.fluency.fillers} 处）。`;
    } else {
      comments.fluency = "流利度有待提升，建议放慢语速、减少 um/like 等填充词，多进行跟读练习。";
    }

    if (scores.vocabulary >= 7) {
      comments.vocabulary = `词汇丰富度高（高级词汇 ${analysis.vocabulary.advanced} 个），用词准确多样。`;
    } else if (scores.vocabulary >= 6) {
      comments.vocabulary = "词汇量基本达标，可尝试使用更多同义替换和话题相关的高级表达。";
    } else {
      comments.vocabulary = "词汇较为单一，建议积累话题词汇并练习 paraphrasing。";
    }

    if (scores.grammar >= 7) {
      comments.grammar = "句式多样，复杂结构运用得当，语法错误较少。";
    } else if (scores.grammar >= 6) {
      comments.grammar = "基本语法正确，可尝试加入更多从句和连接词来丰富句式。";
    } else {
      comments.grammar = "语法结构偏简单，注意时态一致性和主谓一致，多练习复合句。";
    }

    if (scores.pronunciation >= 7) {
      comments.pronunciation = "发音清晰，易于理解，语调节奏自然。";
    } else if (scores.pronunciation >= 6) {
      comments.pronunciation = "发音总体可理解，注意个别单词的重音和连读。";
    } else {
      comments.pronunciation = "部分单词识别不清，建议跟读范文并录音对比，重点练习元音和重音。";
    }

    return comments;
  }

  function heuristicScore(text, durationSec) {
    const fluency = analyzeFluency(text, durationSec);
    const vocabulary = analyzeVocabulary(text);
    const grammar = analyzeGrammar(text);
    const pronunciation = analyzePronunciation(text, durationSec);

    const scores = {
      fluency: fluency.score,
      vocabulary: vocabulary.score,
      grammar: grammar.score,
      pronunciation: pronunciation.score,
    };

    const overall = clampBand(
      (scores.fluency + scores.vocabulary + scores.grammar + scores.pronunciation) / 4
    );

    const comments = generateComments(scores, { fluency, vocabulary, grammar, pronunciation });

    return { scores, overall, comments, method: "heuristic" };
  }

  async function openaiScore(text, question) {
    const key = state.settings.openaiKey;
    if (!key) return null;

    const prompt = `You are an IELTS speaking examiner. Score this candidate's response on four criteria (band 4.0-9.0, in 0.5 increments):
- Fluency and Coherence
- Lexical Resource (Vocabulary)
- Grammatical Range and Accuracy
- Pronunciation (estimated from transcript clarity)

Question: ${question}
Candidate's response: "${text || "(no speech detected)"}"

Respond ONLY with valid JSON (no markdown):
{
  "fluency": 6.5,
  "vocabulary": 6.0,
  "grammar": 6.5,
  "pronunciation": 6.0,
  "comments": {
    "fluency": "brief comment in Chinese",
    "vocabulary": "brief comment in Chinese",
    "grammar": "brief comment in Chinese",
    "pronunciation": "brief comment in Chinese"
  }
}`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "";
      const json = JSON.parse(content.replace(/```json\n?|\n?```/g, "").trim());

      const scores = {
        fluency: clampBand(json.fluency),
        vocabulary: clampBand(json.vocabulary),
        grammar: clampBand(json.grammar),
        pronunciation: clampBand(json.pronunciation),
      };

      const overall = clampBand(
        (scores.fluency + scores.vocabulary + scores.grammar + scores.pronunciation) / 4
      );

      return { scores, overall, comments: json.comments, method: "openai" };
    } catch (err) {
      console.warn("OpenAI scoring failed, falling back:", err);
      return null;
    }
  }

  async function analyzeRecording() {
    if (!state.audioBlob && !state.transcript) {
      showToast("请先录音");
      return;
    }

    els.analyzeBtn.disabled = true;
    els.analyzeBtnText.textContent = "评分中…";
    els.recordingStatus.textContent = "分析中";
    els.recordingStatus.classList.add("analyzing");
    els.scoringCard.hidden = false;
    els.scoringCard.classList.add("loading");

    const durationSec = state.recordingDuration || 30;

    let text = state.transcript;

    if (!text || text.length < 5) {
      text = await transcribeWithWhisper();
    }

    if (text) {
      els.transcriptBox.hidden = false;
      els.transcriptText.textContent = text;
    }

    const questionText = getQuestionDisplayText();
    let result = null;

    if (state.settings.openaiKey) {
      result = await openaiScore(text, questionText);
    }

    if (!result) {
      result = heuristicScore(text, durationSec);
      els.scoringNote.textContent = "基于浏览器语音识别 + 语言分析的智能评分";
    } else {
      els.scoringNote.textContent = "由 OpenAI GPT 提供的 AI 评分";
    }

    state.lastScores = result;
    renderScores(result);
    savePracticeRecord(result, text, durationSec);

    els.analyzeBtn.disabled = false;
    els.analyzeBtnText.textContent = "重新评分";
    els.recordingStatus.textContent = "已完成";
    els.recordingStatus.classList.remove("analyzing");
    els.scoringCard.classList.remove("loading");
  }

  async function transcribeWithWhisper() {
    const key = state.settings.openaiKey;
    if (!key || !state.audioBlob) return state.transcript;

    try {
      const formData = new FormData();
      formData.append("file", state.audioBlob, "recording.webm");
      formData.append("model", "whisper-1");
      formData.append("language", "en");

      const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}` },
        body: formData,
      });

      if (!res.ok) return state.transcript;
      const data = await res.json();
      return data.text || state.transcript;
    } catch (_) {
      return state.transcript;
    }
  }

  function getQuestionDisplayText() {
    const q = state.currentQuestion;
    if (!q) return "";
    if (state.currentPart === "part2") return q.topic;
    return q.question;
  }

  function renderScores(result) {
    const { scores, overall, comments } = result;

    els.overallScore.textContent = overall.toFixed(1);

    ["fluency", "vocabulary", "grammar", "pronunciation"].forEach((key) => {
      const val = scores[key];
      const el = $(`[data-criterion="${key}"]`);
      const bar = $(`[data-bar="${key}"]`);
      const comment = $(`[data-comment="${key}"]`);

      if (el) el.textContent = val.toFixed(1);
      if (bar) bar.style.width = `${(val / 9) * 100}%`;
      if (comment) comment.textContent = comments[key] || "";
    });

    const target = state.settings.targetBand;
    if (overall >= target) {
      showToast(`🎉 达到目标分数 ${target}！`);
    }
  }

  function hideScores() {
    els.scoringCard.hidden = true;
    state.lastScores = null;
  }

  function savePracticeRecord(result, transcript, durationSec) {
    const q = state.currentQuestion;
    saveHistoryEntry({
      id: Date.now(),
      part: state.currentPart,
      questionId: q?.id,
      question: getQuestionDisplayText(),
      overall: result.overall,
      scores: result.scores,
      comments: result.comments,
      transcript: transcript || "",
      duration: durationSec,
      method: result.method,
      timestamp: new Date().toISOString(),
    });
  }

  // ===== History =====
  function renderHistory() {
    const history = loadHistory();
    els.historyList.innerHTML = "";

    if (history.length === 0) {
      els.historyEmpty.hidden = false;
      return;
    }

    els.historyEmpty.hidden = true;

    history.forEach((item) => {
      const li = document.createElement("li");
      li.className = "history-item";
      const date = new Date(item.timestamp);
      const partLabel = item.part.replace("part", "Part ");

      li.innerHTML = `
        <div class="history-item__top">
          <span class="history-item__part">${partLabel}</span>
          <span class="history-item__score">${item.overall.toFixed(1)}</span>
        </div>
        <p class="history-item__question">${escapeHtml(item.question)}</p>
        <p class="history-item__meta">${date.toLocaleDateString("zh-CN")} ${date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} · ${formatTime(item.duration)}</p>
      `;

      li.addEventListener("click", () => showHistoryDetail(item));
      els.historyList.appendChild(li);
    });
  }

  function showHistoryDetail(item) {
    closeModal(els.historyModal);

    if (item.part !== state.currentPart) setPart(item.part);

    const questions = IELTS_QUESTIONS[item.part];
    const found = questions?.find((q) => q.id === item.questionId);
    if (found) {
      state.currentQuestion = found;
      renderQuestion();
    }

    els.scoringCard.hidden = false;
    renderScores({
      scores: item.scores,
      overall: item.overall,
      comments: item.comments,
    });

    if (item.transcript) {
      els.transcriptBox.hidden = false;
      els.transcriptText.textContent = item.transcript;
    }

    showToast("已加载历史记录");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function clearHistory() {
    if (!confirm("确定清空所有练习历史？")) return;
    localStorage.removeItem(STORAGE_KEYS.history);
    renderHistory();
    showToast("历史已清空");
  }

  // ===== Event Listeners =====
  function bindEvents() {
    [els.tabPart1, els.tabPart2, els.tabPart3].forEach((tab) => {
      tab.addEventListener("click", () => setPart(tab.dataset.part));
    });

    els.newQuestionBtn.addEventListener("click", pickQuestion);

    els.timerStartBtn.addEventListener("click", startTimer);
    els.timerPauseBtn.addEventListener("click", pauseTimer);
    els.timerResetBtn.addEventListener("click", resetTimer);

    els.recordBtn.addEventListener("click", startRecording);
    els.stopBtn.addEventListener("click", stopRecording);
    els.playbackBtn.addEventListener("click", playbackRecording);
    els.analyzeBtn.addEventListener("click", analyzeRecording);

    els.sampleToggle.addEventListener("click", () => {
      const expanded = els.sampleToggle.getAttribute("aria-expanded") === "true";
      els.sampleToggle.setAttribute("aria-expanded", !expanded);
      els.sampleContent.hidden = expanded;
    });

    els.historyBtn.addEventListener("click", () => {
      renderHistory();
      openModal(els.historyModal);
    });

    els.settingsBtn.addEventListener("click", () => openModal(els.settingsModal));
    els.saveSettingsBtn.addEventListener("click", saveSettings);
    els.clearHistoryBtn.addEventListener("click", clearHistory);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        [els.historyModal, els.settingsModal].forEach((m) => {
          if (!m.hidden) closeModal(m);
        });
      }
    });
  }

  // ===== Init =====
  function init() {
    loadSettings();
    bindEvents();
    setPart("part1");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
