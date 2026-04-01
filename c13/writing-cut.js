const IMG_BASE = '../assets/c13/reading-writing/images/writing-cut/';
const LS_KEY = 'writing_cut_c13_modern_v1';
const STEP_LABELS = ['문장 고르기', '어휘 넣기', '순서 배열', '빈칸 쓰기', '전체 문장 쓰기'];
const STEP_GUIDES = [
  '그림에 맞는 문장을 먼저 찾아 보세요.',
  '핵심 어휘 두 개를 문장에 넣어 보세요.',
  '어절을 순서대로 눌러 문장을 완성해 보세요.',
  '이제 빈칸 두 곳에 들어갈 말을 직접 써 보세요.',
  '마지막으로 도움 없이 전체 문장을 직접 써 보세요.'
];

const PASSAGE_FULL_PARAGRAPHS = [
  '"동물 사랑 바자회"에 여러분을 초대합니다. 저희 "동사모"는 동물을 사랑하는 사람들이 모여서 버려진 동물들을 돌보는 일을 합니다. 매년 바자회를 열어서 동물 보호 기금도 마련하고 버려진 동물에게 새 주인을 찾아 주고 있습니다.',
  '경험이 없어 동물을 잘 돌볼 수 없을까 봐 걱정하시는 분들을 위해 여러 가지 도움도 드립니다. 바자회에 오셔서 물건도 싸게 구입하시고 새로운 동물 가족도 만나 보시기 바랍니다.',
  '낮 12시부터 2시까지는 밴드 음악을 들으면서 채식 뷔페를 즐기실 수 있도록 했습니다. 또 동물 사진을 전시해서 구경하면서 바자회를 즐길 수 있도록 했습니다. 3시부터는 다큐멘터리 "멸종 위기의 동물"도 상영할 예정입니다. 많은 관심 부탁드립니다. 감사합니다.',
  '날짜: 5월 3일 / 장소: 동대문 문화 공원 / 시간: 오전 11시~오후 5시 / 회비: 10,000원',
  '※ 모아진 돈은 모두 버려진 동물, 멸종 위기 동물을 위해 쓰입니다. ※ 바자회에 오신 모든 분께 천으로 만든 가방을 드립니다. ※ 동물 가죽이나 모피로 만든 옷을 입으신 분은 입장할 수 없습니다.'
];

const PASSAGE_SECTIONS = [
  {
    title: '초대와 행사 소개',
    body: PASSAGE_FULL_PARAGRAPHS[0]
  },
  {
    title: '도움과 만남',
    body: PASSAGE_FULL_PARAGRAPHS[1]
  },
  {
    title: '프로그램',
    body: PASSAGE_FULL_PARAGRAPHS[2]
  },
  {
    title: '행사 정보',
    body: PASSAGE_FULL_PARAGRAPHS[3]
  },
  {
    title: '참고 사항',
    body: PASSAGE_FULL_PARAGRAPHS[4]
  }
];

const SENTENCES = [
  '"동물 사랑 바자회"에 여러분을 초대합니다.',
  '저희 동사모는 동물을 사랑하는 사람들이 모여서 버려진 동물들을 돌보는 일을 합니다.',
  '매년 바자회를 열어서 동물 보호 기금도 마련하고 버려진 동물에게 새 주인을 찾아 주고 있습니다.',
  '경험이 없어 동물을 잘 돌볼 수 없을까 봐 걱정하시는 분들을 위해 여러 가지 도움도 드립니다.',
  '바자회에 오셔서 물건도 싸게 구입하시고 새로운 동물 가족도 만나 보시기 바랍니다.',
  '낮 12시부터 2시까지는 밴드 음악을 들으면서 채식 뷔페를 즐기실 수 있도록 했습니다.',
  '또 동물 사진을 전시해서 구경하면서 바자회를 즐길 수 있도록 했습니다.',
  '3시부터는 다큐멘터리 "멸종 위기의 동물"도 상영할 예정입니다.',
  '많은 관심 부탁드립니다. 감사합니다.'
];

const RAW_CUTS = [
  { imgFile: 'c13-cut01.webp', alt: '바자회 포스터를 들고 사람들을 초대하는 장면', distractors: [2, 4, 8], dropSegments: ['"', '"에 여러분을 ', '.'], dropAnswers: ['동물 사랑 바자회', '초대합니다'], dropChoices: ['동물 사랑 바자회', '초대합니다', '상영할 예정입니다', '구입하시고'], orderTokens: ['"동물 사랑 바자회"에', '여러분을', '초대합니다.'], fillBlankAnswers: [['동물 사랑 바자회', '동물사랑바자회'], ['초대합니다']], fillPrompt: '"[1]"에 여러분을 [2].', hints: ['바자회', '초대', '포스터'], requiredKeywords: ['동물 사랑 바자회', '여러분', '초대'], acceptedPatterns: ['"동물 사랑 바자회"에 여러분을 초대합니다.', '동물 사랑 바자회에 여러분을 초대합니다.'] },
  { imgFile: 'c13-cut02.webp', alt: '동사모 회원들이 버려진 동물을 돌보는 장면', distractors: [0, 2, 6], dropSegments: ['저희 ', '는 동물을 사랑하는 사람들이 모여서 버려진 동물들을 ', '.'], dropAnswers: ['동사모', '돌보는 일을 합니다'], dropChoices: ['동사모', '돌보는 일을 합니다', '사진을 전시해서', '많은 관심 부탁드립니다'], orderTokens: ['저희 동사모는', '동물을 사랑하는 사람들이 모여서', '버려진 동물들을 돌보는 일을 합니다.'], fillBlankAnswers: [['동사모'], ['돌보는 일을 합니다', '돌보는일을합니다']], fillPrompt: '저희 [1]는 동물을 사랑하는 사람들이 모여서 버려진 동물들을 [2].', hints: ['동사모', '버려진 동물', '돌보다'], requiredKeywords: ['동사모', '버려진 동물', '돌보'], acceptedPatterns: ['저희 동사모는 동물을 사랑하는 사람들이 모여서 버려진 동물들을 돌보는 일을 합니다.'] },
  { imgFile: 'c13-cut03.webp', alt: '바자회를 열어 기금을 마련하고 새 주인을 찾아 주는 장면', distractors: [1, 5, 7], dropSegments: ['매년 바자회를 열어서 동물 보호 기금도 ', ' 버려진 동물에게 새 주인을 ', '.'], dropAnswers: ['마련하고', '찾아 주고 있습니다'], dropChoices: ['마련하고', '찾아 주고 있습니다', '즐기실 수 있도록 했습니다', '상영할 예정입니다'], orderTokens: ['매년 바자회를 열어서', '동물 보호 기금도 마련하고', '버려진 동물에게 새 주인을 찾아 주고 있습니다.'], fillBlankAnswers: [['마련하고'], ['찾아 주고 있습니다', '찾아주고있습니다', '찾아 줍니다']], fillPrompt: '매년 바자회를 열어서 동물 보호 기금도 [1] 버려진 동물에게 새 주인을 [2].', hints: ['동물 보호 기금', '새 주인', '바자회'], requiredKeywords: ['기금', '새 주인', '바자회'], acceptedPatterns: ['매년 바자회를 열어서 동물 보호 기금도 마련하고 버려진 동물에게 새 주인을 찾아 주고 있습니다.', '매년 바자회를 열어서 동물 보호 기금을 마련하고 버려진 동물에게 새 주인을 찾아 줍니다.'] },
  { imgFile: 'c13-cut04.webp', alt: '초보자를 도와주는 안내 상담 장면', distractors: [2, 4, 7], dropSegments: ['경험이 없어 동물을 잘 돌볼 수 ', ' 걱정하시는 분들을 위해 여러 가지 ', '.'], dropAnswers: ['없을까 봐', '도움도 드립니다'], dropChoices: ['없을까 봐', '도움도 드립니다', '싸게 구입하시고', '상영할 예정입니다'], orderTokens: ['경험이 없어', '동물을 잘 돌볼 수 없을까 봐', '걱정하시는 분들을 위해', '여러 가지 도움도 드립니다.'], fillBlankAnswers: [['없을까 봐', '없을까봐'], ['도움도 드립니다', '도움도드립니다']], fillPrompt: '경험이 없어 동물을 잘 돌볼 수 [1] 걱정하시는 분들을 위해 여러 가지 [2].', hints: ['경험이 없다', '걱정하다', '도움'], requiredKeywords: ['없을까 봐', '걱정', '도움'], acceptedPatterns: ['경험이 없어 동물을 잘 돌볼 수 없을까 봐 걱정하시는 분들을 위해 여러 가지 도움도 드립니다.'] },
  { imgFile: 'c13-cut05.webp', alt: '바자회에서 물건을 사고 새로운 동물 가족을 만나는 장면', distractors: [0, 3, 6], dropSegments: ['바자회에 오셔서 물건도 ', ' 구입하시고 새로운 동물 가족도 ', '.'], dropAnswers: ['싸게', '만나 보시기 바랍니다'], dropChoices: ['싸게', '만나 보시기 바랍니다', '없을까 봐', '즐길 수 있도록 했습니다'], orderTokens: ['바자회에 오셔서', '물건도 싸게 구입하시고', '새로운 동물 가족도 만나 보시기 바랍니다.'], fillBlankAnswers: [['싸게'], ['만나 보시기 바랍니다', '만나보시기바랍니다']], fillPrompt: '바자회에 오셔서 물건도 [1] 구입하시고 새로운 동물 가족도 [2].', hints: ['바자회에 오셔서', '싸게 구입하다', '새로운 동물 가족'], requiredKeywords: ['바자회', '싸게', '새로운 동물 가족'], acceptedPatterns: ['바자회에 오셔서 물건도 싸게 구입하시고 새로운 동물 가족도 만나 보시기 바랍니다.'] },
  { imgFile: 'c13-cut06.webp', alt: '밴드 음악과 채식 뷔페를 즐기는 장면', distractors: [4, 6, 7], dropSegments: ['낮 12시부터 2시까지는 ', '을 들으면서 채식 뷔페를 ', '.'], dropAnswers: ['밴드 음악', '즐기실 수 있도록 했습니다'], dropChoices: ['밴드 음악', '즐기실 수 있도록 했습니다', '사진', '상영할 예정입니다'], orderTokens: ['낮 12시부터 2시까지는', '밴드 음악을 들으면서', '채식 뷔페를 즐기실 수 있도록 했습니다.'], fillBlankAnswers: [['밴드 음악', '밴드음악'], ['즐기실 수 있도록 했습니다', '즐기실수있도록했습니다']], fillPrompt: '낮 12시부터 2시까지는 [1]을 들으면서 채식 뷔페를 [2].', hints: ['12시부터 2시까지', '밴드 음악', '채식 뷔페'], requiredKeywords: ['12시부터 2시까지', '밴드 음악', '채식 뷔페'], acceptedPatterns: ['낮 12시부터 2시까지는 밴드 음악을 들으면서 채식 뷔페를 즐기실 수 있도록 했습니다.'] },
  { imgFile: 'c13-cut07.webp', alt: '동물 사진을 전시하고 바자회를 구경하는 장면', distractors: [1, 4, 8], dropSegments: ['또 동물 사진을 ', ' 구경하면서 바자회를 ', '.'], dropAnswers: ['전시해서', '즐길 수 있도록 했습니다'], dropChoices: ['전시해서', '즐길 수 있도록 했습니다', '돌보는 일을 합니다', '감사합니다'], orderTokens: ['또', '동물 사진을 전시해서', '구경하면서 바자회를 즐길 수 있도록 했습니다.'], fillBlankAnswers: [['전시해서'], ['즐길 수 있도록 했습니다', '즐길수있도록했습니다']], fillPrompt: '또 동물 사진을 [1] 구경하면서 바자회를 [2].', hints: ['동물 사진', '전시', '바자회'], requiredKeywords: ['동물 사진', '전시', '바자회'], acceptedPatterns: ['또 동물 사진을 전시해서 구경하면서 바자회를 즐길 수 있도록 했습니다.'] },
  { imgFile: 'c13-cut08.webp', alt: '다큐멘터리 상영을 안내하는 장면', distractors: [5, 6, 8], dropSegments: ['3시부터는 다큐멘터리 "', '"도 ', '.'], dropAnswers: ['멸종 위기의 동물', '상영할 예정입니다'], dropChoices: ['멸종 위기의 동물', '상영할 예정입니다', '채식 뷔페', '감사합니다'], orderTokens: ['3시부터는', '다큐멘터리 "멸종 위기의 동물"도', '상영할 예정입니다.'], fillBlankAnswers: [['멸종 위기의 동물', '멸종위기의동물'], ['상영할 예정입니다', '상영할예정입니다']], fillPrompt: '3시부터는 다큐멘터리 "[1]"도 [2].', hints: ['3시부터', '다큐멘터리', '멸종 위기의 동물'], requiredKeywords: ['3시', '다큐멘터리', '멸종 위기의 동물'], acceptedPatterns: ['3시부터는 다큐멘터리 "멸종 위기의 동물"도 상영할 예정입니다.', '3시부터는 다큐멘터리 멸종 위기의 동물도 상영할 예정입니다.'] },
  { imgFile: 'c13-cut09.webp', alt: '마지막으로 관심을 부탁하며 글을 마무리하는 장면', distractors: [0, 2, 7], dropSegments: ['많은 관심 ', ' ', '.'], dropAnswers: ['부탁드립니다', '감사합니다'], dropChoices: ['부탁드립니다', '감사합니다', '초대합니다', '상영할 예정입니다'], orderTokens: ['많은 관심', '부탁드립니다.', '감사합니다.'], fillBlankAnswers: [['부탁드립니다'], ['감사합니다']], fillPrompt: '많은 관심 [1]. [2].', hints: ['많은 관심', '부탁드리다', '마무리'], requiredKeywords: ['많은 관심', '부탁', '감사'], acceptedPatterns: ['많은 관심 부탁드립니다. 감사합니다.', '많은 관심 부탁드립니다.'] }
];
const cuts = RAW_CUTS.map(({ distractors, fillBlankAnswers, ...cut }, index) => ({
  id: `cut${String(index + 1).padStart(2, '0')}`,
  sentence: SENTENCES[index],
  mcqOptions: [SENTENCES[index], ...distractors.map((choiceIndex) => SENTENCES[choiceIndex])],
  fillBlanks: fillBlankAnswers.map((answers, answerIndex) => ({
    label: `빈칸 ${answerIndex + 1}`,
    answers
  })),
  ...cut
}));

const app = document.getElementById('app');
let floatingPreviewObserver = null;
const floatingPreviewMedia = window.matchMedia('(max-width: 960px)');
let shouldFocusPassageClose = false;
let shouldRestorePassageTrigger = false;

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildInitialState() {
  return {
    view: 'activity',
    currentCut: 0,
    currentStep: 0,
    passageOpen: false,
    activeSlot: 0,
    dragChoiceId: null,
    responses: cuts.map((cut) => ({
      step1: {
        selected: null,
        checked: false,
        correct: false,
        optionOrder: shuffle(cut.mcqOptions.map((label, index) => ({ id: index, label })))
      },
      step2: {
        placements: Array(cut.dropAnswers.length).fill(null),
        checked: false,
        correct: false,
        choiceOrder: shuffle(cut.dropChoices.map((label, index) => ({ id: index, label })))
      },
      step3: {
        arranged: [],
        checked: false,
        correct: false,
        bankOrder: shuffle(cut.orderTokens.map((label, index) => ({ id: index, label })))
      },
      step4: {
        inputs: Array(cut.fillBlanks.length).fill(''),
        checked: false,
        correct: false,
        correctCount: 0
      },
      step5: {
        text: '',
        checked: false,
        evaluation: null
      }
    }))
  };
}

function isUsableSavedState(candidate) {
  return Boolean(
    candidate &&
    Array.isArray(candidate.responses) &&
    candidate.responses.length === cuts.length &&
    typeof candidate.currentCut === 'number' &&
    typeof candidate.currentStep === 'number'
  );
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return buildInitialState();
    const parsed = JSON.parse(raw);
    return isUsableSavedState(parsed) ? parsed : buildInitialState();
  } catch {
    return buildInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

let state = loadState();
if (typeof state.passageOpen !== 'boolean') {
  state.passageOpen = false;
}

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[.,!?~]/g, '')
    .trim();
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveImageSrc(cut) {
  if (cut.imgFile) {
    return `${IMG_BASE}${cut.imgFile}`;
  }

  const cutNumber = cut.id ? cut.id.replace('cut', '') : '';
  const hintCopy = Array.isArray(cut.hints) ? cut.hints.slice(0, 2).join(' · ') : cut.alt;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff7ed"/>
          <stop offset="100%" stop-color="#eff6ff"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#bg)"/>
      <circle cx="140" cy="128" r="92" fill="#fdba74" opacity="0.25"/>
      <circle cx="1050" cy="140" r="118" fill="#93c5fd" opacity="0.24"/>
      <rect x="84" y="86" width="1032" height="503" rx="34" fill="#ffffff" stroke="#fcd9bd" stroke-width="4"/>
      <text x="600" y="240" text-anchor="middle" font-family="Noto Sans KR, sans-serif" font-size="42" font-weight="800" fill="#9a3412">13과 컷 ${cutNumber}</text>
      <text x="600" y="320" text-anchor="middle" font-family="Noto Sans KR, sans-serif" font-size="28" font-weight="700" fill="#0f172a">${hintCopy}</text>
      <text x="600" y="390" text-anchor="middle" font-family="Noto Sans KR, sans-serif" font-size="22" font-weight="600" fill="#64748b">실제 이미지는 추후 교체 예정</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getCurrentCut() {
  return cuts[state.currentCut];
}

function getCurrentResponse() {
  return state.responses[state.currentCut];
}

function getStepResponse(response, stepIndex) {
  if (stepIndex === 0) return response.step1;
  if (stepIndex === 1) return response.step2;
  if (stepIndex === 2) return response.step3;
  if (stepIndex === 3) return response.step4;
  return response.step5;
}

function canGoNext() {
  if (state.view === 'summary') return false;
  const response = getCurrentResponse();
  return getStepResponse(response, state.currentStep).checked;
}

function findById(list, id) {
  return list.find((item) => String(item.id) === String(id));
}

function matchesAnswer(input, answers) {
  const normalized = normalizeText(input);
  return answers.some((answer) => normalized === normalizeText(answer));
}

function evaluateSentence(text, cut) {
  const raw = (text || '').trim();
  const matchedKeywords = cut.requiredKeywords.filter((keyword) =>
    normalizeText(raw).includes(normalizeText(keyword))
  );

  if (!raw) {
    return { level: 'empty', matchedKeywords, missingKeywords: cut.requiredKeywords };
  }

  if (normalizeText(raw) === normalizeText(cut.sentence)) {
    return { level: 'exact', matchedKeywords: cut.requiredKeywords, missingKeywords: [] };
  }

  if (cut.acceptedPatterns.some((pattern) => normalizeText(raw) === normalizeText(pattern))) {
    return { level: 'accepted', matchedKeywords, missingKeywords: [] };
  }

  if (matchedKeywords.length === cut.requiredKeywords.length) {
    return { level: 'strong', matchedKeywords, missingKeywords: [] };
  }

  if (matchedKeywords.length >= Math.max(2, cut.requiredKeywords.length - 1)) {
    return {
      level: 'partial',
      matchedKeywords,
      missingKeywords: cut.requiredKeywords.filter((keyword) => !matchedKeywords.includes(keyword))
    };
  }

  return {
    level: 'weak',
    matchedKeywords,
    missingKeywords: cut.requiredKeywords.filter((keyword) => !matchedKeywords.includes(keyword))
  };
}

function feedbackBlock(type, title, koBody, viBody, extra = '') {
  return `
    <div id="step-feedback" class="feedback ${type}">
      <strong>${title}</strong>
      <div class="feedback-body">
        <span class="feedback-label">한국어</span>
        <div>${koBody}</div>
      </div>
      <div class="feedback-body feedback-body--vi">
        <span class="feedback-label">Tiếng Việt</span>
        <div>${viBody}</div>
      </div>
      ${extra}
    </div>
  `;
}

function feedbackSentenceExtra(sentence) {
  return `
    <div class="feedback-extra">
      <span class="feedback-label">모범 문장 / Câu mẫu</span>
      <div>${escapeHtml(sentence)}</div>
    </div>
  `;
}

function feedbackKeywordExtra(keywords) {
  if (!keywords || !keywords.length) return '';
  return `
    <div class="feedback-extra">
      <span class="feedback-label">넣어 보면 좋은 말 / Từ nên thêm</span>
      <div>${escapeHtml(keywords.join(', '))}</div>
    </div>
  `;
}

function renderGuideZone(content, label, tone = 'primary', compact = false) {
  return `
    <div class="guide-zone ${tone}${compact ? ' compact' : ''}">
      <div class="guide-callout ${tone}">${label}</div>
      ${content}
    </div>
  `;
}

function getStep1Feedback(cut, response) {
  if (!response.step1.checked) return '';
  if (response.step1.correct) {
    return feedbackBlock(
      'correct',
      '잘 골랐어요.',
      '그림과 맞는 문장을 잘 찾았어요.',
      'Bạn đã chọn đúng câu phù hợp với bức tranh.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  return feedbackBlock(
    'wrong',
    '다시 한 번 볼까요?',
    '그림에 맞는 문장은 이 문장이에요.',
    'Hãy xem lại nhé. Câu đúng là câu này.',
    feedbackSentenceExtra(cut.sentence)
  );
}

function getStep2Feedback(cut, response) {
  if (!response.step2.checked) return '';
  if (response.step2.correct) {
    return feedbackBlock(
      'correct',
      '좋아요. 알맞게 넣었어요.',
      '두 낱말을 맞는 자리에 잘 넣었어요.',
      'Tốt lắm. Bạn đã đặt đúng hai từ vào chỗ trống.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  return feedbackBlock(
    'warn',
    '자리만 다시 보면 돼요.',
    '단어가 들어갈 자리를 다시 맞춰 보세요.',
    'Chỉ cần xem lại vị trí của từ và thử lại.',
    feedbackSentenceExtra(cut.sentence)
  );
}

function getStep3Feedback(cut, response) {
  if (!response.step3.checked) return '';
  if (response.step3.correct) {
    return feedbackBlock(
      'correct',
      '순서가 맞아요.',
      '말의 순서가 자연스럽게 잘 이어져요.',
      'Thứ tự các cụm từ đã đúng và nghe rất tự nhiên.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  return feedbackBlock(
    'warn',
    '순서를 다시 맞춰 볼까요?',
    '문장이 자연스럽게 이어지도록 다시 배열해 보세요.',
    'Hãy sắp xếp lại để câu nối với nhau tự nhiên hơn.',
    feedbackSentenceExtra(cut.sentence)
  );
}

function getStep4Feedback(cut, response) {
  if (!response.step4.checked) return '';
  if (response.step4.correct) {
    return feedbackBlock(
      'correct',
      '빈칸을 다 맞혔어요.',
      '두 빈칸이 모두 맞아요.',
      'Bạn đã điền đúng cả hai chỗ trống.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  if (response.step4.correctCount > 0) {
    return feedbackBlock(
      'warn',
      response.step4.correctCount === 1 ? '한 칸은 맞았어요.' : '조금만 더 하면 돼요.',
      `맞은 빈칸은 ${response.step4.correctCount}개예요. 틀린 칸만 다시 보면 돼요.`,
      `Bạn đã đúng ${response.step4.correctCount}/${cut.fillBlanks.length} chỗ trống. Chỉ cần sửa ô còn sai thôi.`,
      feedbackSentenceExtra(cut.sentence)
    );
  }
  return feedbackBlock(
    'wrong',
    '힌트를 보고 다시 써 볼까요?',
    '그림과 힌트를 다시 보고 빈칸을 채워 보세요.',
    'Hãy nhìn lại tranh và gợi ý rồi điền lại chỗ trống.',
    feedbackSentenceExtra(cut.sentence)
  );
}

function getStep5Feedback(cut, response) {
  if (!response.step5.checked || !response.step5.evaluation) return '';
  const result = response.step5.evaluation;
  if (result.level === 'exact') {
    return feedbackBlock(
      'correct',
      '아주 잘 썼어요.',
      '모범 문장과 거의 같아요.',
      'Bạn viết rất chính xác, gần như giống câu mẫu.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  if (result.level === 'accepted' || result.level === 'strong') {
    return feedbackBlock(
      'correct',
      '뜻이 잘 전달됐어요.',
      '표현이 조금 달라도 핵심 뜻은 잘 들어갔어요.',
      'Dù cách diễn đạt hơi khác, ý chính vẫn được truyền đạt rất tốt.',
      feedbackSentenceExtra(cut.sentence)
    );
  }
  if (result.level === 'partial') {
    const koBody = result.missingKeywords.length
      ? '이 말을 더 넣으면 문장이 더 좋아져요.'
      : '핵심 말을 한 번 더 확인해 보세요.';
    const viBody = result.missingKeywords.length
      ? 'Nếu thêm những từ này thì câu sẽ đầy đủ và tự nhiên hơn.'
      : 'Hãy kiểm tra lại các từ khóa chính nhé.';
    return feedbackBlock(
      'warn',
      '조금만 더 보태면 돼요.',
      koBody,
      viBody,
      feedbackKeywordExtra(result.missingKeywords) + feedbackSentenceExtra(cut.sentence)
    );
  }
  return feedbackBlock(
    'wrong',
    '핵심 말을 넣어 다시 써 볼까요?',
    '그림의 핵심 말을 넣어서 다시 써 보세요.',
    'Hãy viết lại và thêm những từ khóa quan trọng của bức tranh.',
    feedbackKeywordExtra(result.missingKeywords) + feedbackSentenceExtra(cut.sentence)
  );
}

function renderStepPills() {
  return STEP_LABELS.map((label, index) => {
    const classNames = ['step-pill'];
    if (index < state.currentStep) classNames.push('done');
    if (index === state.currentStep) classNames.push('active');
    return `<div class="${classNames.join(' ')}">${index + 1}. ${label}</div>`;
  }).join('');
}

function renderCutPills() {
  return cuts.map((_, index) => {
    const classNames = ['cut-pill'];
    if (index < state.currentCut) classNames.push('done');
    if (index === state.currentCut) classNames.push('active');
    return `<div class="${classNames.join(' ')}">컷 ${index + 1}</div>`;
  }).join('');
}

function renderTopTools(label) {
  return `
    <div class="top-tools">
      <button type="button" class="passage-open-btn" data-action="open-passage" aria-haspopup="dialog" aria-controls="passage-dialog" aria-expanded="${state.passageOpen ? 'true' : 'false'}">전체 지문 팝업 보기</button>
      <span class="focus-chip">${label}</span>
    </div>
  `;
}

function renderPassageModal() {
  return `
    <div class="passage-backdrop" data-action="close-passage"></div>
    <section id="passage-dialog" class="passage-modal" role="dialog" aria-modal="true" aria-labelledby="passage-title" tabindex="-1">
      <div class="passage-head">
        <div>
          <div class="eyebrow">13과 읽기 지문</div>
          <h2 id="passage-title" class="passage-title">초대의 글</h2>
          <p class="passage-subtitle">처음부터 끝까지 이어서 읽고 싶을 때 한 번에 볼 수 있는 팝업입니다.</p>
        </div>
        <button type="button" class="ghost-btn" data-action="close-passage" data-passage-close-button>닫기</button>
      </div>
      <div class="passage-body">
        <div class="passage-card passage-overview">
          <strong>전체 지문</strong>
          ${PASSAGE_FULL_PARAGRAPHS.map((paragraph) => `
            <p class="passage-copy">${escapeHtml(paragraph)}</p>
          `).join('')}
        </div>
        <div class="eyebrow passage-section-label">문단별로 다시 보기</div>
        ${PASSAGE_SECTIONS.map((section) => `
          <div class="passage-card">
            <strong>${escapeHtml(section.title)}</strong>
            <p>${escapeHtml(section.body)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderImagePanel(cut) {
  return `
    <section class="panel" data-image-panel>
      <div class="panel-head">
        <div>
          <h3>컷 ${state.currentCut + 1}</h3>
          <p>그림을 먼저 보고, 인물과 행동, 핵심 장면을 떠올려 보세요.</p>
        </div>
        <span class="highlight-tag">그림 보기</span>
      </div>
      <div class="image-wrap">
        <img src="${resolveImageSrc(cut)}" alt="${escapeHtml(cut.alt)}" data-primary-image>
      </div>
      <div class="image-caption">그림 속 장면을 먼저 읽고, 아래 힌트로 어떤 문장이 어울리는지 추측해 보세요.</div>
      <div class="support-row">
        ${cut.hints.map((hint) => `<span class="support-chip">${escapeHtml(hint)}</span>`).join('')}
      </div>
    </section>
  `;
}

function renderFloatingPreview(cut) {
  return `
    <button
      type="button"
      class="floating-image-preview"
      data-action="scroll-to-image"
      data-floating-preview
      aria-label="현재 그림으로 다시 이동하기"
    >
      <img src="${resolveImageSrc(cut)}" alt="">
      <span class="floating-image-preview__copy">
        <strong>현재 그림</strong>
        <span>컷 ${state.currentCut + 1} 다시 보려면 누르세요</span>
      </span>
    </button>
  `;
}

function renderStep1(cut, response) {
  const needsSelection = response.step1.selected === null;
  const needsCheck = response.step1.selected !== null && !response.step1.checked;
  const choicesBlock = `
    <div class="choice-list" data-step1-choice-list>
      ${response.step1.optionOrder.map((option) => {
        const classNames = ['choice-btn'];
        if (response.step1.selected === option.id) classNames.push('selected');
        if (response.step1.checked && option.label === cut.sentence) classNames.push('correct');
        if (response.step1.checked && response.step1.selected === option.id && option.label !== cut.sentence) classNames.push('wrong');
        return `
          <button type="button" class="${classNames.join(' ')}" data-action="select-choice" data-option-id="${option.id}">
            ${escapeHtml(option.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;
  const actionsBlock = `
    <div class="actions">
      <button type="button" class="ghost-btn" data-action="check-step1" ${response.step1.selected === null ? 'disabled' : ''}>정답 확인</button>
    </div>
  `;
  return `
    <div class="instruction-card">
      <strong>지금 할 활동</strong>
      <span>그림에 맞는 문장을 하나 고르세요.</span>
    </div>
    ${needsSelection ? renderGuideZone(choicesBlock, '먼저 맞는 문장을 하나 눌러 보세요') : choicesBlock}
    ${needsCheck ? renderGuideZone(actionsBlock, '선택했으면 정답 확인을 눌러 보세요') : actionsBlock}
    ${getStep1Feedback(cut, response)}
  `;
}

function renderStep2(cut, response) {
  const usedIds = response.step2.placements.filter((value) => value !== null);
  const emptySlotIndex = response.step2.placements.findIndex((value) => value === null);
  const needsPlacement = emptySlotIndex !== -1;
  const slots = cut.dropSegments.map((segment, index) => {
    if (index === cut.dropSegments.length - 1) return escapeHtml(segment);
    const choiceId = response.step2.placements[index];
    const choice = choiceId === null ? null : findById(response.step2.choiceOrder, choiceId);
    const slotText = choice ? choice.label : `빈칸 ${index + 1}`;
    const classNames = ['drop-slot'];
    if (state.activeSlot === index) classNames.push('active');
    if (choice) classNames.push('filled');
    return `${escapeHtml(segment)}<button type="button" class="${classNames.join(' ')}" data-action="activate-slot" data-slot="${index}">${escapeHtml(slotText)}</button>`;
  }).join('');

  const workBlock = `
    <div class="template-box">
      <div class="template-line">${slots}</div>
    </div>
    <div class="word-bank">
      ${response.step2.choiceOrder.map((choice) => {
        const used = usedIds.includes(choice.id);
        return `
          <button
            type="button"
            class="word-chip ${used ? 'used' : ''}"
            data-action="use-word"
            data-choice-id="${choice.id}"
            draggable="${used ? 'false' : 'true'}"
            ${used ? 'disabled' : ''}
          >
            ${escapeHtml(choice.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;
  const actionsBlock = `
    <div class="actions">
      <div class="action-group">
        <button type="button" class="ghost-btn" data-action="check-step2" ${response.step2.placements.includes(null) ? 'disabled' : ''}>확인</button>
        <button type="button" class="reset-btn" data-action="reset-step2">빈칸 비우기</button>
      </div>
    </div>
  `;
  return `
    <div class="instruction-card">
      <strong>지금 할 활동</strong>
      <span>알맞은 어휘를 눌러서 빈칸에 넣으세요. 채워진 칸을 누르면 다시 비울 수 있습니다.</span>
    </div>
    ${needsPlacement ? renderGuideZone(workBlock, `빈칸 ${emptySlotIndex + 1}에 들어갈 말을 넣어 보세요`) : workBlock}
    ${!needsPlacement && !response.step2.checked ? renderGuideZone(actionsBlock, '다 넣었으면 확인을 눌러 보세요') : actionsBlock}
    ${getStep2Feedback(cut, response)}
  `;
}

function renderStep3(cut, response) {
  const arrangedItems = response.step3.arranged.map((id) => findById(response.step3.bankOrder, id));
  const bankItems = response.step3.bankOrder.filter((item) => !response.step3.arranged.includes(item.id));
  const needsOrdering = response.step3.arranged.length < cut.orderTokens.length;
  const orderLabel = response.step3.arranged.length === 0
    ? '아래 어절부터 순서대로 눌러 보세요'
    : '남은 어절을 이어서 눌러 문장을 완성해 보세요';
  const workBlock = `
    <div class="arranged-box">
      <div class="arranged-line">
        ${arrangedItems.length
          ? arrangedItems.map((item) => `<button type="button" class="order-chip" data-action="remove-order" data-order-id="${item.id}">${escapeHtml(item.label)}</button>`).join('')
          : '<span class="blank-inline">순서대로 놓아 보세요</span>'}
      </div>
    </div>
    <div class="order-bank">
      <div class="order-row">
        ${bankItems.map((item) => `<button type="button" class="order-chip" data-action="pick-order" data-order-id="${item.id}">${escapeHtml(item.label)}</button>`).join('')}
      </div>
    </div>
  `;
  const actionsBlock = `
    <div class="actions">
      <div class="action-group">
        <button type="button" class="ghost-btn" data-action="check-step3" ${response.step3.arranged.length !== cut.orderTokens.length ? 'disabled' : ''}>순서 확인</button>
        <button type="button" class="reset-btn" data-action="reset-step3">다시 배열하기</button>
      </div>
    </div>
  `;
  return `
    <div class="instruction-card">
      <strong>지금 할 활동</strong>
      <span>어절을 순서대로 눌러 문장을 만드세요. 위에 올라간 어절을 누르면 다시 아래로 돌아갑니다.</span>
    </div>
    ${needsOrdering ? renderGuideZone(workBlock, orderLabel) : workBlock}
    ${!needsOrdering && !response.step3.checked ? renderGuideZone(actionsBlock, '문장이 완성되면 순서 확인을 눌러 보세요') : actionsBlock}
    ${getStep3Feedback(cut, response)}
  `;
}

function renderFillPrompt(prompt) {
  return escapeHtml(prompt)
    .replace('[1]', '<span class="blank-inline">빈칸 1</span>')
    .replace('[2]', '<span class="blank-inline">빈칸 2</span>');
}

function renderStep4(cut, response) {
  const needsWriting = response.step4.inputs.some((value) => !value.trim());
  const workBlock = `
    <div class="fill-preview">${renderFillPrompt(cut.fillPrompt)}</div>
    <div class="fill-grid">
      ${cut.fillBlanks.map((blank, index) => `
        <div class="fill-field">
          <label for="fill-${index}">${blank.label}</label>
          <input id="fill-${index}" type="text" data-action="fill-input" data-fill-index="${index}" value="${escapeHtml(response.step4.inputs[index])}" autocomplete="off">
        </div>
      `).join('')}
    </div>
  `;
  const actionsBlock = `
    <div class="actions">
      <button type="button" class="ghost-btn" data-action="check-step4" ${response.step4.inputs.some((value) => !value.trim()) ? 'disabled' : ''}>빈칸 확인</button>
    </div>
  `;
  return `
    <div class="instruction-card">
      <strong>지금 할 활동</strong>
      <span>이제 빈칸 두 곳에 들어갈 말을 직접 써 보세요.</span>
    </div>
    ${needsWriting ? renderGuideZone(workBlock, '두 빈칸에 들어갈 말을 직접 써 보세요') : workBlock}
    ${!needsWriting && !response.step4.checked ? renderGuideZone(actionsBlock, '다 썼으면 빈칸 확인을 눌러 보세요') : actionsBlock}
    ${getStep4Feedback(cut, response)}
  `;
}

function renderStep5(cut, response) {
  const needsSentenceWrite = !response.step5.text.trim();
  const workBlock = `
    <div class="fullwrite-box">
      <label for="full-sentence">전체 문장 쓰기</label>
      <textarea id="full-sentence" data-action="full-text" placeholder="그림을 보고 한 문장으로 써 보세요.">${escapeHtml(response.step5.text)}</textarea>
    </div>
    <div class="support-row">
      ${cut.hints.map((hint) => `<span class="support-chip">${escapeHtml(hint)}</span>`).join('')}
    </div>
  `;
  const actionsBlock = `
    <div class="actions">
      <button type="button" class="ghost-btn" data-action="check-step5" ${!response.step5.text.trim() ? 'disabled' : ''}>문장 확인</button>
    </div>
  `;
  return `
    <div class="instruction-card">
      <strong>지금 할 활동</strong>
      <span>도움 없이 전체 문장을 직접 써 보세요. 표현이 조금 달라도 핵심 의미가 맞으면 인정합니다.</span>
    </div>
    ${needsSentenceWrite ? renderGuideZone(workBlock, '전체 문장을 직접 써 보세요') : workBlock}
    ${!needsSentenceWrite && !response.step5.checked ? renderGuideZone(actionsBlock, '문장을 다 썼으면 확인을 눌러 보세요') : actionsBlock}
    ${getStep5Feedback(cut, response)}
  `;
}

function renderStepPanel(cut, response) {
  let content = '';
  if (state.currentStep === 0) content = renderStep1(cut, response);
  if (state.currentStep === 1) content = renderStep2(cut, response);
  if (state.currentStep === 2) content = renderStep3(cut, response);
  if (state.currentStep === 3) content = renderStep4(cut, response);
  if (state.currentStep === 4) content = renderStep5(cut, response);

  let nextLabel = '다음 컷';
  if (state.currentCut === cuts.length - 1) {
    nextLabel = state.currentStep === STEP_LABELS.length - 1 ? '종합 피드백 보기' : '다음 단계';
  }

  const nextGuide = state.currentCut === cuts.length - 1
    ? (state.currentStep === STEP_LABELS.length - 1 ? '마지막이면 종합 피드백으로 넘어갑니다' : '이 단계가 끝나면 다음 단계로 이동합니다')
    : '이 컷이 끝나면 다음 컷으로 이동합니다';
  const nextGuideText = canGoNext()
    ? nextGuide
    : '먼저 위 활동을 끝내면 여기로 진행할 수 있어요';
  const nextGuideTone = canGoNext() ? 'success' : 'primary';
  const nextButton = `<button type="button" class="nav-btn" data-action="next" ${canGoNext() ? '' : 'disabled'}>${nextLabel}</button>`;

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>${state.currentStep + 1}단계 · ${STEP_LABELS[state.currentStep]}</h3>
          <p>${STEP_GUIDES[state.currentStep]} 지금은 이 단계로 모든 컷을 차례대로 연습하는 중입니다.</p>
        </div>
        <span class="highlight-tag">지금 하기</span>
      </div>
      ${content}
      <div class="actions">
        <div class="action-group">
          <button type="button" class="ghost-btn" data-action="prev" ${(state.currentCut === 0 && state.currentStep === 0) ? 'disabled' : ''}>이전</button>
          <button type="button" class="reset-btn" data-action="restart">처음부터</button>
        </div>
        ${renderGuideZone(nextButton, nextGuideText, nextGuideTone, true)}
      </div>
    </section>
  `;
}

function getStepMetricValue(stepIndex) {
  return state.responses.filter((response) => getStepResponse(response, stepIndex).correct).length;
}

function getSentenceSuccessCount() {
  return state.responses.filter((response, index) => {
    const result = response.step5.evaluation || evaluateSentence(response.step5.text, cuts[index]);
    return ['exact', 'accepted', 'strong'].includes(result.level);
  }).length;
}

function getSentenceLabel(result) {
  if (result.level === 'exact') return '매우 정확';
  if (result.level === 'accepted' || result.level === 'strong') return '의미 전달 성공';
  if (result.level === 'partial') return '조금 더 보완';
  if (result.level === 'empty') return '미작성';
  return '다시 보기';
}

function renderSummary() {
  const sentenceSuccess = getSentenceSuccessCount();
  const reviewTargets = state.responses
    .map((response, index) => ({
      index,
      result: response.step5.evaluation || evaluateSentence(response.step5.text, cuts[index])
    }))
    .filter((item) => !['exact', 'accepted', 'strong'].includes(item.result.level));

  return `
    <div class="progress-card">
      <div class="progress-top">
        <div>
          <div class="eyebrow">종합 피드백</div>
          <h2 class="progress-title">컷 문장 쓰기 결과를 확인해 보세요.</h2>
          <p class="progress-desc">어느 단계가 쉬웠는지, 어느 컷을 다시 보면 좋을지 한눈에 볼 수 있습니다.</p>
        </div>
        ${renderTopTools('마무리')}
      </div>
    </div>

    <section class="summary-layout">
      <div class="summary-metrics">
        <div class="metric"><strong>${getStepMetricValue(0)} / ${cuts.length}</strong><span>문장 고르기</span></div>
        <div class="metric"><strong>${getStepMetricValue(1)} / ${cuts.length}</strong><span>어휘 넣기</span></div>
        <div class="metric"><strong>${getStepMetricValue(2)} / ${cuts.length}</strong><span>순서 배열</span></div>
        <div class="metric"><strong>${getStepMetricValue(3)} / ${cuts.length}</strong><span>빈칸 쓰기</span></div>
        <div class="metric"><strong>${sentenceSuccess} / ${cuts.length}</strong><span>전체 문장 쓰기</span></div>
      </div>

      <div class="summary-card">
        <div class="panel-head">
          <div>
            <h3>컷별 확인</h3>
            <p>내 문장과 모범 문장을 비교하면서 다시 보고 싶은 컷을 골라 보세요.</p>
          </div>
          <span class="highlight-tag">다시 보기</span>
        </div>
        <div class="summary-list">
          ${state.responses.map((response, index) => {
            const cut = cuts[index];
            const result = response.step5.evaluation || evaluateSentence(response.step5.text, cut);
            const helper = result.missingKeywords && result.missingKeywords.length
              ? `보완하면 좋은 핵심어: ${escapeHtml(result.missingKeywords.join(', '))}`
              : '핵심 표현이 잘 들어갔습니다.';
            return `
              <div class="summary-item">
                <strong>컷 ${index + 1} · ${getSentenceLabel(result)}</strong>
                <p>내 문장: ${response.step5.text.trim() ? escapeHtml(response.step5.text.trim()) : '아직 쓰지 않았습니다.'}</p>
                <p>모범 문장: ${escapeHtml(cut.sentence)}</p>
                <p>${helper}</p>
                <div class="actions">
                  <button type="button" class="ghost-btn" data-action="review-cut" data-cut-index="${index}">이 컷 다시 하기</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${reviewTargets.length ? `
        <div class="summary-card">
          <div class="panel-head">
            <div>
              <h3>우선 다시 보면 좋은 컷</h3>
              <p>핵심어가 비어 있는 컷부터 복습하면 훨씬 빠르게 정리됩니다.</p>
            </div>
          </div>
          <div class="summary-list">
            ${reviewTargets.map((item) => `
              <div class="summary-item">
                <strong>컷 ${item.index + 1}</strong>
                <p>보완하면 좋은 핵심어: ${escapeHtml(item.result.missingKeywords.join(', ') || '문장 전체 흐름')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="actions">
        <button type="button" class="nav-btn" data-action="restart">처음부터 다시 하기</button>
      </div>
    </section>
  `;
}

function renderActivity() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  return `
    <div class="activity-layout">
      <div class="activity-secondary">
        <div class="progress-card">
      <div class="progress-top">
        <div>
          <div class="eyebrow">${state.currentStep + 1}단계 / ${STEP_LABELS.length}단계</div>
          <h2 class="progress-title">${STEP_LABELS[state.currentStep]}</h2>
          <p class="progress-desc">현재 단계에서 컷 ${state.currentCut + 1} / ${cuts.length}을 연습하고 있습니다. 이 단계가 끝나면 다음 단계로 넘어갑니다.</p>
        </div>
        ${renderTopTools(`컷 ${state.currentCut + 1}`)}
      </div>
      <div class="step-pills">${renderStepPills()}</div>
      <div class="cut-pills">${renderCutPills()}</div>
        </div>
      </div>
      <div class="activity-primary">
        <div class="workspace">
      ${renderImagePanel(cut)}
      ${renderStepPanel(cut, response)}
        </div>
      </div>
    </div>
    ${renderFloatingPreview(cut)}
  `;
}

function renderApp() {
  const mainView = state.view === 'summary' ? renderSummary() : renderActivity();
  app.innerHTML = `${mainView}${state.passageOpen ? renderPassageModal() : ''}`;
  setupFloatingPreview();
  refreshLiveButtons();
  syncPassageUi();
  saveState();
}

function focusAfterRender(selector) {
  requestAnimationFrame(() => {
    const element = document.querySelector(selector);
    if (element) element.focus({ preventScroll: true });
  });
}

function syncPassageUi() {
  document.body.classList.toggle('passage-open', state.passageOpen);
  const navTrigger = document.querySelector('[data-nav-open-passage]');
  if (navTrigger) navTrigger.setAttribute('aria-expanded', state.passageOpen ? 'true' : 'false');

  if (shouldFocusPassageClose) {
    focusAfterRender('[data-passage-close-button]');
  } else if (shouldRestorePassageTrigger) {
    focusAfterRender('[data-action="open-passage"]');
  }

  shouldFocusPassageClose = false;
  shouldRestorePassageTrigger = false;
}

function handlePassageTabKey(event) {
  if (!state.passageOpen || event.key !== 'Tab') return;

  const dialog = document.getElementById('passage-dialog');
  if (!dialog) return;

  const focusableElements = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.disabled && element.offsetParent !== null);

  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (focusableElements.length === 1) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function teardownFloatingPreview() {
  if (floatingPreviewObserver) {
    floatingPreviewObserver.disconnect();
    floatingPreviewObserver = null;
  }
}

function setFloatingPreviewVisible(visible) {
  const preview = app.querySelector('[data-floating-preview]');
  if (preview) preview.classList.toggle('is-visible', visible);
}

function setupFloatingPreview() {
  teardownFloatingPreview();
  setFloatingPreviewVisible(false);

  if (state.view !== 'activity' || !floatingPreviewMedia.matches || typeof IntersectionObserver !== 'function') {
    return;
  }

  const imagePanel = app.querySelector('[data-image-panel]');
  const preview = app.querySelector('[data-floating-preview]');
  if (!imagePanel || !preview) return;

  floatingPreviewObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const shouldShow = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      preview.classList.toggle('is-visible', shouldShow);
    },
    {
      threshold: [0, 0.18, 0.45, 1],
      rootMargin: '-76px 0px 0px 0px'
    }
  );

  floatingPreviewObserver.observe(imagePanel);
}

function scrollToImagePanel() {
  const imagePanel = app.querySelector('[data-image-panel]');
  if (!imagePanel) return;
  setFloatingPreviewVisible(false);
  imagePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scheduleImagePanelScroll() {
  if (state.view !== 'activity' || typeof window.requestAnimationFrame !== 'function') return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      scrollToImagePanel();
    });
  });
}

function scrollRangeIntoView(startElement, endElement) {
  if (!startElement || !endElement) return;
  const topPadding = 92;
  const bottomPadding = 28;
  const startRect = startElement.getBoundingClientRect();
  const endRect = endElement.getBoundingClientRect();
  const rangeTop = Math.min(startRect.top, endRect.top);
  const rangeBottom = Math.max(startRect.bottom, endRect.bottom);
  const viewportTop = topPadding;
  const viewportBottom = window.innerHeight - bottomPadding;

  if (rangeTop >= viewportTop && rangeBottom <= viewportBottom) return;

  window.scrollTo({
    top: Math.max(window.scrollY + rangeTop - topPadding, 0),
    behavior: 'smooth'
  });
}

function scheduleRangeScroll(getElements) {
  if (state.view !== 'activity' || typeof window.requestAnimationFrame !== 'function') return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const { startElement, endElement } = getElements();
      scrollRangeIntoView(startElement, endElement);
    });
  });
}

function scheduleStep1SelectionScroll() {
  if (state.currentStep !== 0) return;
  scheduleRangeScroll(() => ({
    startElement: app.querySelector('[data-step1-choice-list]'),
    endElement: app.querySelector('[data-action="check-step1"]')
  }));
}

function scheduleCheckActionToNextScroll(checkAction) {
  scheduleRangeScroll(() => ({
    startElement: app.querySelector(`[data-action="${checkAction}"]`),
    endElement: app.querySelector('[data-action="next"]')
  }));
}

function refreshLiveButtons() {
  const step4Button = app.querySelector('[data-action="check-step4"]');
  if (step4Button && state.view === 'activity' && state.currentStep === 3) {
    const response = getCurrentResponse();
    step4Button.disabled = response.step4.inputs.some((value) => !value.trim());
  }

  const step5Button = app.querySelector('[data-action="check-step5"]');
  if (step5Button && state.view === 'activity' && state.currentStep === 4) {
    const response = getCurrentResponse();
    step5Button.disabled = !response.step5.text.trim();
  }
}

function resetStepFeedback() {
  const feedback = document.getElementById('step-feedback');
  if (feedback) feedback.remove();
  const nextButton = app.querySelector('[data-action="next"]');
  if (nextButton) nextButton.disabled = true;
}

function setStepUnchecked(stepData) {
  stepData.checked = false;
  if ('correct' in stepData) stepData.correct = false;
}

function selectChoice(optionId) {
  const response = getCurrentResponse();
  response.step1.selected = Number(optionId);
  setStepUnchecked(response.step1);
}

function checkStep1() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  const selected = findById(response.step1.optionOrder, response.step1.selected);
  response.step1.checked = true;
  response.step1.correct = Boolean(selected && selected.label === cut.sentence);
}

function activateSlot(slotIndex) {
  const response = getCurrentResponse();
  const numericIndex = Number(slotIndex);
  if (response.step2.placements[numericIndex] !== null) {
    response.step2.placements[numericIndex] = null;
  }
  state.activeSlot = numericIndex;
  setStepUnchecked(response.step2);
}

function placeChoice(choiceId, preferredSlot = null) {
  const response = getCurrentResponse();
  const numericId = Number(choiceId);
  if (response.step2.placements.includes(numericId)) return;
  let targetSlot = preferredSlot === null ? state.activeSlot : Number(preferredSlot);
  if (response.step2.placements[targetSlot] !== null) {
    targetSlot = response.step2.placements.findIndex((value) => value === null);
  }
  if (targetSlot === -1) return;
  response.step2.placements[targetSlot] = numericId;
  state.activeSlot = Math.min(targetSlot + 1, response.step2.placements.length - 1);
  setStepUnchecked(response.step2);
}

function resetStep2() {
  const response = getCurrentResponse();
  response.step2.placements = Array(getCurrentCut().dropAnswers.length).fill(null);
  setStepUnchecked(response.step2);
  state.activeSlot = 0;
}

function checkStep2() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  response.step2.checked = true;
  response.step2.correct = response.step2.placements.every((choiceId, index) => {
    const choice = findById(response.step2.choiceOrder, choiceId);
    return choice && normalizeText(choice.label) === normalizeText(cut.dropAnswers[index]);
  });
}

function pickOrder(orderId) {
  const response = getCurrentResponse();
  const numericId = Number(orderId);
  if (response.step3.arranged.includes(numericId)) return;
  response.step3.arranged.push(numericId);
  setStepUnchecked(response.step3);
}

function removeOrder(orderId) {
  const response = getCurrentResponse();
  response.step3.arranged = response.step3.arranged.filter((id) => id !== Number(orderId));
  setStepUnchecked(response.step3);
}

function resetStep3() {
  const response = getCurrentResponse();
  response.step3.arranged = [];
  setStepUnchecked(response.step3);
}

function checkStep3() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  response.step3.checked = true;
  response.step3.correct = response.step3.arranged.length === cut.orderTokens.length &&
    response.step3.arranged.every((id, index) => id === index);
}

function updateFillInput(index, value) {
  const response = getCurrentResponse();
  response.step4.inputs[Number(index)] = value;
  setStepUnchecked(response.step4);
  response.step4.correctCount = 0;
  resetStepFeedback();
}

function checkStep4() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  const correctCount = cut.fillBlanks.filter((blank, index) =>
    matchesAnswer(response.step4.inputs[index], blank.answers)
  ).length;
  response.step4.checked = true;
  response.step4.correctCount = correctCount;
  response.step4.correct = correctCount === cut.fillBlanks.length;
}

function updateFullText(value) {
  const response = getCurrentResponse();
  response.step5.text = value;
  response.step5.checked = false;
  response.step5.evaluation = null;
  resetStepFeedback();
}

function checkStep5() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  response.step5.checked = true;
  response.step5.evaluation = evaluateSentence(response.step5.text, cut);
}

function goPrev() {
  if (state.view === 'summary') {
    state.view = 'activity';
    state.currentCut = cuts.length - 1;
    state.currentStep = STEP_LABELS.length - 1;
    return;
  }
  if (state.currentCut > 0) {
    state.currentCut -= 1;
    return;
  }
  if (state.currentStep > 0) {
    state.currentStep -= 1;
    state.currentCut = cuts.length - 1;
    state.activeSlot = 0;
  }
}

function goNext() {
  if (!canGoNext()) return false;
  if (state.currentCut < cuts.length - 1) {
    state.currentCut += 1;
    state.activeSlot = 0;
    return true;
  }
  if (state.currentStep < STEP_LABELS.length - 1) {
    state.currentStep += 1;
    state.currentCut = 0;
    state.activeSlot = 0;
    return true;
  }
  state.view = 'summary';
  return false;
}

function restartAll() {
  localStorage.removeItem(LS_KEY);
  state = buildInitialState();
}

function getReviewStartStep(cutIndex) {
  const response = state.responses[cutIndex];
  if (!response.step1.correct) return 0;
  if (!response.step2.correct) return 1;
  if (!response.step3.correct) return 2;
  if (!response.step4.correct) return 3;
  const finalResult = response.step5.evaluation || evaluateSentence(response.step5.text, cuts[cutIndex]);
  if (!['exact', 'accepted', 'strong'].includes(finalResult.level)) return 4;
  return 4;
}

function reviewCut(index) {
  state.view = 'activity';
  state.currentCut = Number(index);
  state.currentStep = getReviewStartStep(state.currentCut);
  state.activeSlot = 0;
}

function openPassage() {
  state.passageOpen = true;
  shouldFocusPassageClose = true;
  shouldRestorePassageTrigger = false;
}

function closePassage() {
  state.passageOpen = false;
  shouldRestorePassageTrigger = true;
  shouldFocusPassageClose = false;
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const { action } = target.dataset;
  let shouldRender = true;
  let shouldScrollToImagePanel = false;
  let shouldScrollStep1Selection = false;
  let checkActionToScroll = '';

  if (action === 'select-choice') {
    selectChoice(target.dataset.optionId);
    shouldScrollStep1Selection = true;
  }
  else if (action === 'check-step1') {
    checkStep1();
    checkActionToScroll = action;
  }
  else if (action === 'activate-slot') activateSlot(target.dataset.slot);
  else if (action === 'use-word') placeChoice(target.dataset.choiceId);
  else if (action === 'check-step2') {
    checkStep2();
    checkActionToScroll = action;
  }
  else if (action === 'reset-step2') resetStep2();
  else if (action === 'pick-order') pickOrder(target.dataset.orderId);
  else if (action === 'remove-order') removeOrder(target.dataset.orderId);
  else if (action === 'check-step3') {
    checkStep3();
    checkActionToScroll = action;
  }
  else if (action === 'reset-step3') resetStep3();
  else if (action === 'check-step4') {
    checkStep4();
    checkActionToScroll = action;
  }
  else if (action === 'check-step5') {
    checkStep5();
    checkActionToScroll = action;
  }
  else if (action === 'prev') goPrev();
  else if (action === 'next') shouldScrollToImagePanel = goNext();
  else if (action === 'restart') restartAll();
  else if (action === 'review-cut') reviewCut(target.dataset.cutIndex);
  else if (action === 'scroll-to-image') {
    scrollToImagePanel();
    shouldRender = false;
  }
  else if (action === 'open-passage') openPassage();
  else if (action === 'close-passage') closePassage();
  else shouldRender = false;

  if (shouldRender) {
    renderApp();
    if (shouldScrollStep1Selection) {
      scheduleStep1SelectionScroll();
    }
    if (checkActionToScroll) {
      scheduleCheckActionToNextScroll(checkActionToScroll);
    }
    if (shouldScrollToImagePanel) {
      scheduleImagePanelScroll();
    }
  }
});

app.addEventListener('input', (event) => {
  const target = event.target;
  if (target.dataset.action === 'fill-input') {
    updateFillInput(target.dataset.fillIndex, target.value);
  }
  if (target.dataset.action === 'full-text') {
    updateFullText(target.value);
  }
  refreshLiveButtons();
  saveState();
});

app.addEventListener('dragstart', (event) => {
  const target = event.target.closest('[data-choice-id]');
  if (!target || target.disabled) return;
  state.dragChoiceId = target.dataset.choiceId;
  event.dataTransfer.setData('text/plain', target.dataset.choiceId);
});

app.addEventListener('dragover', (event) => {
  const slot = event.target.closest('[data-slot]');
  if (!slot) return;
  event.preventDefault();
});

app.addEventListener('drop', (event) => {
  const slot = event.target.closest('[data-slot]');
  if (!slot) return;
  event.preventDefault();
  const choiceId = event.dataTransfer.getData('text/plain') || state.dragChoiceId;
  if (!choiceId) return;
  placeChoice(choiceId, slot.dataset.slot);
  renderApp();
});

document.addEventListener('keydown', (event) => {
  handlePassageTabKey(event);
  if (event.key === 'Escape' && state.passageOpen) {
    closePassage();
    renderApp();
  }
});

document.addEventListener('click', (event) => {
  const navTrigger = event.target.closest('[data-nav-open-passage]');
  if (!navTrigger) return;
  event.preventDefault();
  openPassage();
  renderApp();
});

if (typeof floatingPreviewMedia.addEventListener === 'function') {
  floatingPreviewMedia.addEventListener('change', setupFloatingPreview);
} else if (typeof floatingPreviewMedia.addListener === 'function') {
  floatingPreviewMedia.addListener(setupFloatingPreview);
}

renderApp();

