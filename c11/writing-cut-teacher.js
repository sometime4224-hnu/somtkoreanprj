const IMG_BASE = '../assets/c11/reading-writing/images/writing-cut/';
const LS_KEY = 'writing_cut_c11_teacher_v1';
const STEP_LABELS = ['문장 고르기', '어휘 넣기', '순서 배열', '빈칸 쓰기', '전체 문장 쓰기'];
const STEP_GUIDES = [
  '그림에 맞는 문장을 먼저 찾아 보세요.',
  '핵심 어휘 두 개를 문장에 넣어 보세요.',
  '어절을 순서대로 눌러 문장을 완성해 보세요.',
  '이제 빈칸 두 곳에 들어갈 말을 직접 써 보세요.',
  '마지막으로 도움 없이 전체 문장을 직접 써 보세요.'
];

const PASSAGE_FULL_PARAGRAPHS = [
  "직장인이라면 누구든지 회사에서 꼭 필요한 사람이 되고 싶을 것이다. 그런 사람이 되려면 어떤 노력을 해야 할까? 만약 회사에서 성공하고 싶다면 항상 '친절'과 '독서'를 실천해야 한다.",
  '회사에는 일을 맡기면 다른 사람보다 빨리 잘 해결하는 사람이 있다. 그 사람은 어려운 일이 생겨도 누군가의 도움을 받아 쉽게 해결한다. 사람들은 그가 운이 좋다고 말한다. 왜 그 사람에게만 좋은 일이 자주 생길까? 그 이유는 평소의 작은 친절 때문이다. 복사기를 도와주고 서류를 함께 들어 주고 우산을 빌려주는 것은 아주 작은 일이다. 사람들은 이런 작은 친절을 오래 기억했다가 나중에 그 사람을 돕는다. 그래서 친절한 사람이 그렇지 않은 사람보다 성공할 가능성이 높다.',
  '독서를 하는 사람이 성공한다. 한국의 직장인들은 1년에 평균 16권의 책을 읽는다. 가장 많이 읽는 책의 종류는 경제 경영 서적과 소설이다. 경제 경영 서적을 읽으면 업무에 필요한 지식을 얻을 수 있다.'
];

const PASSAGE_SECTIONS = [
  {
    title: '도입',
    body: PASSAGE_FULL_PARAGRAPHS[0]
  },
  {
    title: '1. 친절한 사람이 성공한다.',
    body: PASSAGE_FULL_PARAGRAPHS[1]
  },
  {
    title: '2. 독서를 하는 사람이 성공한다.',
    body: PASSAGE_FULL_PARAGRAPHS[2]
  }
];

const SENTENCES = [
  '회사에서 꼭 필요한 사람이 되고 싶습니다.',
  '그런 사람이 되려면 어떤 노력이 필요할까요?',
  '회사에서 성공하고 싶다면 항상 친절과 독서를 실천해야 합니다.',
  '회사에는 일을 맡기면 다른 사람보다 빨리 잘 해결하는 사람이 있습니다.',
  '그 사람은 어려운 일이 생겨도 누군가의 도움을 받아 쉽게 해결합니다.',
  '사람들은 그가 운이 좋다고 말합니다.',
  '왜 그 사람에게만 좋은 일이 자주 생길까요?',
  '그 이유는 평소의 작은 친절 때문입니다.',
  '복사기를 도와주고 서류를 함께 들어 주고 우산을 빌려주는 것은 아주 작은 일입니다.',
  '사람들은 이런 작은 친절을 오래 기억했다가 나중에 그 사람을 돕습니다.',
  '그래서 친절한 사람이 그렇지 않은 사람보다 성공할 가능성이 높습니다.',
  '독서를 하는 사람이 성공합니다.',
  '한국의 직장인들은 1년에 평균 16권의 책을 읽습니다.',
  '가장 많이 읽는 책의 종류는 경제 경영 서적과 소설입니다.',
  '경제 경영 서적을 읽으면 업무에 필요한 지식을 얻을 수 있습니다.'
];

const RAW_CUTS = [
  { imgFile: 'c11-cut01.webp', alt: '회사에서 꼭 필요한 사람이 되고 싶어 하는 직장인', distractors: [1, 2, 3], dropSegments: ['', ' 꼭 필요한 사람이 ', ' 싶습니다.'], dropAnswers: ['회사에서', '되고'], dropChoices: ['회사에서', '되고', '친절과 독서를', '해결합니다'], orderTokens: ['회사에서', '꼭 필요한 사람이', '되고', '싶습니다.'], fillBlankAnswers: [['회사에서'], ['되고']], fillPrompt: '[1] 꼭 필요한 사람이 [2] 싶습니다.', hints: ['회사', '필요한 사람', '직장인'], requiredKeywords: ['회사에서', '필요한 사람', '되고'], acceptedPatterns: ['회사에서 꼭 필요한 사람이 되고 싶어요.'] },
  { imgFile: 'c11-cut02.webp', alt: '어떤 노력이 필요한지 고민하는 직장인', distractors: [0, 2, 6], dropSegments: ['그런 사람이 되려면 ', ' 노력이 ', '?'], dropAnswers: ['어떤', '필요할까요'], dropChoices: ['어떤', '필요할까요', '친절과 독서를', '운이 좋다고'], orderTokens: ['그런 사람이 되려면', '어떤 노력이', '필요할까요?'], fillBlankAnswers: [['어떤'], ['필요할까요']], fillPrompt: '그런 사람이 되려면 [1] 노력이 [2]?', hints: ['그런 사람', '노력', '필요하다'], requiredKeywords: ['어떤 노력', '필요'], acceptedPatterns: ['그런 사람이 되려면 어떤 노력이 필요합니까?'] },
  { imgFile: 'c11-cut03.webp', alt: '성공하려면 친절과 독서를 실천해야 한다는 내용', distractors: [0, 10, 11], dropSegments: ['회사에서 성공하고 싶다면 항상 ', '과 ', '를 실천해야 합니다.'], dropAnswers: ['친절', '독서'], dropChoices: ['친절', '독서', '서류', '우산'], orderTokens: ['회사에서 성공하고 싶다면', '항상', '친절과 독서를', '실천해야 합니다.'], fillBlankAnswers: [['친절'], ['독서', '독서를']], fillPrompt: '회사에서 성공하고 싶다면 항상 [1]과 [2]를 실천해야 합니다.', hints: ['성공', '친절', '독서'], requiredKeywords: ['성공', '친절', '독서'], acceptedPatterns: ['회사에서 성공하려면 항상 친절과 독서를 실천해야 합니다.'] },
  { imgFile: 'c11-cut04.webp', alt: '일을 맡기면 빨리 잘 해결하는 직장인', distractors: [4, 5, 14], dropSegments: ['회사에는 일을 맡기면 다른 사람보다 ', ' 잘 ', ' 사람이 있습니다.'], dropAnswers: ['빨리', '해결하는'], dropChoices: ['빨리', '해결하는', '기억했다가', '읽습니다'], orderTokens: ['회사에는', '일을 맡기면', '다른 사람보다', '빨리 잘 해결하는', '사람이 있습니다.'], fillBlankAnswers: [['빨리'], ['해결하는']], fillPrompt: '회사에는 일을 맡기면 다른 사람보다 [1] 잘 [2] 사람이 있습니다.', hints: ['일을 맡기다', '빨리', '해결하다'], requiredKeywords: ['일을 맡기면', '빨리', '해결'], acceptedPatterns: ['회사에는 일을 맡기면 다른 사람보다 빨리 잘 해결하는 사람이 있어요.'] },
  { imgFile: 'c11-cut05.webp', alt: '어려운 일이 생겨도 도움을 받아 쉽게 해결하는 직장인', distractors: [3, 5, 6], dropSegments: ['그 사람은 어려운 일이 생겨도 ', '의 도움을 받아 ', ' 해결합니다.'], dropAnswers: ['누군가', '쉽게'], dropChoices: ['누군가', '쉽게', '운이', '함께'], orderTokens: ['그 사람은', '어려운 일이 생겨도', '누군가의 도움을 받아', '쉽게 해결합니다.'], fillBlankAnswers: [['누군가'], ['쉽게']], fillPrompt: '그 사람은 어려운 일이 생겨도 [1]의 도움을 받아 [2] 해결합니다.', hints: ['어려운 일', '도움', '쉽게'], requiredKeywords: ['어려운 일', '도움', '쉽게'], acceptedPatterns: ['그 사람은 어려운 일이 생겨도 주변의 도움을 받아 쉽게 해결합니다.'] },
  { imgFile: 'c11-cut06.webp', alt: '사람들이 운이 좋다고 말하는 장면', distractors: [4, 6, 9], dropSegments: ['사람들은 그가 ', ' ', '.'], dropAnswers: ['운이 좋다고', '말합니다'], dropChoices: ['운이 좋다고', '말합니다', '실천해야 합니다', '도와줍니다'], orderTokens: ['사람들은', '그가', '운이 좋다고', '말합니다.'], fillBlankAnswers: [['운이 좋다고'], ['말합니다']], fillPrompt: '사람들은 그가 [1] [2].', hints: ['사람들', '운이 좋다', '말하다'], requiredKeywords: ['운이 좋다', '사람들'], acceptedPatterns: ['사람들은 그 사람이 운이 좋다고 말합니다.'] },
  { imgFile: 'c11-cut07.webp', alt: '왜 좋은 일이 자주 생기는지 궁금해하는 사람들', distractors: [1, 5, 8], dropSegments: ['왜 그 사람에게만 ', ' 일이 ', '?'], dropAnswers: ['좋은', '자주 생길까요'], dropChoices: ['좋은', '자주 생길까요', '필요할까요', '기억합니다'], orderTokens: ['왜', '그 사람에게만', '좋은 일이', '자주 생길까요?'], fillBlankAnswers: [['좋은'], ['자주 생길까요']], fillPrompt: '왜 그 사람에게만 [1] 일이 [2]?', hints: ['왜', '좋은 일', '자주'], requiredKeywords: ['좋은 일', '자주', '왜'], acceptedPatterns: ['왜 그 사람에게만 좋은 일이 자주 일어날까요?'] },
  { imgFile: 'c11-cut08.webp', alt: '평소의 작은 친절이 원인이라는 것을 보여 주는 장면', distractors: [6, 9, 10], dropSegments: ['그 이유는 평소의 ', ' ', '입니다.'], dropAnswers: ['작은 친절', '때문'], dropChoices: ['작은 친절', '때문', '독서', '회사'], orderTokens: ['그 이유는', '평소의', '작은 친절', '때문입니다.'], fillBlankAnswers: [['작은 친절'], ['때문']], fillPrompt: '그 이유는 평소의 [1] [2]입니다.', hints: ['이유', '작은 친절', '때문'], requiredKeywords: ['이유', '친절', '때문'], acceptedPatterns: ['그것은 평소의 작은 친절 때문입니다.'] },
  { imgFile: 'c11-cut09.webp', alt: '복사기와 서류와 우산으로 작은 친절을 보여 주는 장면', distractors: [1, 7, 13], dropSegments: ['복사기를 도와주고 ', ' 함께 들어 주고 ', ' 빌려주는 것은 아주 작은 일입니다.'], dropAnswers: ['서류를', '우산을'], dropChoices: ['서류를', '우산을', '독서를', '운이'], orderTokens: ['복사기를 도와주고', '서류를 함께 들어 주고', '우산을 빌려주는 것은', '아주 작은 일입니다.'], fillBlankAnswers: [['서류를'], ['우산을']], fillPrompt: '복사기를 도와주고 [1] 함께 들어 주고 [2] 빌려주는 것은 아주 작은 일입니다.', hints: ['복사기', '서류', '우산'], requiredKeywords: ['복사기', '서류', '우산'], acceptedPatterns: ['복사기를 도와주고 서류를 함께 들어 주고 우산을 빌려주는 것은 아주 작은 일입니다.', '복사기를 도와주고 서류를 같이 들어 주고 우산을 빌려주는 것은 아주 작은 일입니다.'] },
  { imgFile: 'c11-cut10.webp', alt: '사람들이 친절을 오래 기억했다가 도와주는 장면', distractors: [5, 8, 10], dropSegments: ['사람들은 이런 작은 친절을 ', ' 기억했다가 나중에 그 사람을 ', '.'], dropAnswers: ['오래', '돕습니다'], dropChoices: ['오래', '돕습니다', '읽습니다', '생깁니다'], orderTokens: ['사람들은', '이런 작은 친절을', '오래 기억했다가', '나중에 그 사람을 돕습니다.'], fillBlankAnswers: [['오래'], ['돕습니다']], fillPrompt: '사람들은 이런 작은 친절을 [1] 기억했다가 나중에 그 사람을 [2].', hints: ['작은 친절', '오래 기억하다', '돕다'], requiredKeywords: ['친절', '오래 기억', '돕'], acceptedPatterns: ['사람들은 이런 작은 친절을 오래 기억했다가 나중에 그를 돕습니다.'] },
  { imgFile: 'c11-cut11.webp', alt: '친절한 사람이 더 성공할 가능성이 높다고 말하는 장면', distractors: [2, 7, 12], dropSegments: ['그래서 친절한 사람이 그렇지 않은 사람보다 ', ' 가능성이 ', '.'], dropAnswers: ['성공할', '높습니다'], dropChoices: ['성공할', '높습니다', '필요합니다', '읽습니다'], orderTokens: ['그래서', '친절한 사람이', '그렇지 않은 사람보다', '성공할 가능성이 높습니다.'], fillBlankAnswers: [['성공할'], ['높습니다']], fillPrompt: '그래서 친절한 사람이 그렇지 않은 사람보다 [1] 가능성이 [2].', hints: ['친절한 사람', '성공', '가능성'], requiredKeywords: ['친절한 사람', '성공', '가능성'], acceptedPatterns: ['그렇기 때문에 친절한 사람이 그렇지 않은 사람보다 성공할 가능성이 높습니다.'] },
  { imgFile: 'c11-cut12.webp', alt: '독서를 하는 사람이 성공한다는 제목 카드', distractors: [2, 10, 13], dropSegments: ['', ' 하는 사람이 ', '.'], dropAnswers: ['독서를', '성공합니다'], dropChoices: ['독서를', '성공합니다', '친절을', '읽습니다'], orderTokens: ['독서를', '하는 사람이', '성공합니다.'], fillBlankAnswers: [['독서를'], ['성공합니다']], fillPrompt: '[1] 하는 사람이 [2].', hints: ['독서', '사람', '성공'], requiredKeywords: ['독서', '성공'], acceptedPatterns: ['독서를 하는 사람은 성공합니다.'] },
  { imgFile: 'c11-cut13.webp', alt: '한국 직장인이 1년에 평균 16권의 책을 읽는다는 그래프', distractors: [10, 11, 14], dropSegments: ['한국의 직장인들은 1년에 ', ' 16권의 책을 ', '.'], dropAnswers: ['평균', '읽습니다'], dropChoices: ['평균', '읽습니다', '친절', '생깁니다'], orderTokens: ['한국의 직장인들은', '1년에', '평균 16권의 책을', '읽습니다.'], fillBlankAnswers: [['평균'], ['읽습니다']], fillPrompt: '한국의 직장인들은 1년에 [1] 16권의 책을 [2].', hints: ['직장인', '평균', '16권'], requiredKeywords: ['직장인', '평균', '16권'], acceptedPatterns: ['한국의 직장인들은 일 년에 평균 16권의 책을 읽습니다.'] },
  { imgFile: 'c11-cut14.webp', alt: '경제 경영 서적과 소설을 많이 읽는 직장인', distractors: [12, 10, 14], dropSegments: ['가장 많이 읽는 책의 종류는 ', '과 ', '입니다.'], dropAnswers: ['경제 경영 서적', '소설'], dropChoices: ['경제 경영 서적', '소설', '복사기', '우산'], orderTokens: ['가장 많이 읽는 책의 종류는', '경제 경영 서적과', '소설입니다.'], fillBlankAnswers: [['경제 경영 서적', '경제경영 서적', '경제경영서적'], ['소설']], fillPrompt: '가장 많이 읽는 책의 종류는 [1]과 [2]입니다.', hints: ['책의 종류', '경제 경영 서적', '소설'], requiredKeywords: ['경제 경영 서적', '소설', '책'], acceptedPatterns: ['가장 많이 읽는 책의 종류는 경제경영 서적과 소설입니다.'] },
  { imgFile: 'c11-cut15.webp', alt: '경제 경영 서적을 읽으면 업무 지식을 얻는다는 장면', distractors: [3, 12, 13], dropSegments: ['경제 경영 서적을 읽으면 업무에 ', ' 지식을 ', ' 수 있습니다.'], dropAnswers: ['필요한', '얻을'], dropChoices: ['필요한', '얻을', '평균', '성공할'], orderTokens: ['경제 경영 서적을 읽으면', '업무에 필요한 지식을', '얻을 수 있습니다.'], fillBlankAnswers: [['필요한'], ['얻을']], fillPrompt: '경제 경영 서적을 읽으면 업무에 [1] 지식을 [2] 수 있습니다.', hints: ['경제 경영 서적', '업무', '지식'], requiredKeywords: ['경제 경영 서적', '업무', '지식'], acceptedPatterns: ['경제 경영 서적을 읽으면 업무에 필요한 지식을 얻을 수 있습니다.', '경제 경영 서적을 읽으면 새로운 아이디어를 얻고 성장 가능성을 생각할 수 있습니다.'] }
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
  // 교사용: 언제나 다음으로 이동 가능 (summary 제외)
  return state.view !== 'summary';
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
    return `<button type="button" class="${classNames.join(' ')}" data-action="jump-to-step" data-step-index="${index}">${index + 1}. ${label}</button>`;
  }).join('');
}

function renderCutPills() {
  return cuts.map((_, index) => {
    const classNames = ['cut-pill'];
    if (index < state.currentCut) classNames.push('done');
    if (index === state.currentCut) classNames.push('active');
    return `<button type="button" class="${classNames.join(' ')}" data-action="jump-to-cut" data-cut-index="${index}">컷 ${index + 1}</button>`;
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
          <div class="eyebrow">11과 읽기 지문</div>
          <h2 id="passage-title" class="passage-title">직장에서 성공하는 법</h2>
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
        <img src="${IMG_BASE}${cut.imgFile}" alt="${escapeHtml(cut.alt)}" data-primary-image>
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
      <img src="${IMG_BASE}${cut.imgFile}" alt="">
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

  const nextButton = `<button type="button" class="nav-btn" data-action="next">${nextLabel}</button>`;

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>${state.currentStep + 1}단계 · ${STEP_LABELS[state.currentStep]}</h3>
          <p>${STEP_GUIDES[state.currentStep]} 지금은 이 단계로 모든 컷을 차례대로 연습하는 중입니다.</p>
        </div>
        <span class="highlight-tag" style="background:#dbeafe;color:#1e40af;">교사용</span>
      </div>
      ${content}
      <div class="actions">
        <div class="action-group">
          <button type="button" class="ghost-btn" data-action="prev" ${(state.currentCut === 0 && state.currentStep === 0) ? 'disabled' : ''}>이전</button>
          <button type="button" class="reset-btn" data-action="restart">처음부터</button>
          <button type="button" class="show-answer-btn" data-action="show-answer">✅ 정답 보기</button>
        </div>
        ${nextButton}
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

function scheduleStep1CheckScroll() {
  if (state.currentStep !== 0) return;
  scheduleRangeScroll(() => ({
    startElement: app.querySelector('[data-action="check-step1"]'),
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

// ── 교사용: 단계·컷 직접 이동 ──
function jumpToStep(stepIndex) {
  state.currentStep = Number(stepIndex);
  state.activeSlot = 0;
}

function jumpToCut(cutIndex) {
  state.currentCut = Number(cutIndex);
  state.activeSlot = 0;
}

// ── 교사용: 현재 단계 정답 자동 완성 ──
function showAnswer() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  if (state.currentStep === 0) {
    const correctOption = response.step1.optionOrder.find((opt) => opt.label === cut.sentence);
    if (correctOption) {
      response.step1.selected = correctOption.id;
      checkStep1();
    }
  } else if (state.currentStep === 1) {
    cut.dropAnswers.forEach((answer, index) => {
      const match = response.step2.choiceOrder.find((c) => normalizeText(c.label) === normalizeText(answer));
      if (match) response.step2.placements[index] = match.id;
    });
    checkStep2();
  } else if (state.currentStep === 2) {
    response.step3.arranged = cut.orderTokens.map((_, index) => index);
    checkStep3();
  } else if (state.currentStep === 3) {
    cut.fillBlanks.forEach((blank, index) => {
      response.step4.inputs[index] = blank.answers[0];
    });
    checkStep4();
  } else if (state.currentStep === 4) {
    response.step5.text = cut.sentence;
    checkStep5();
  }
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
  let shouldScrollStep1Check = false;

  if (action === 'select-choice') {
    selectChoice(target.dataset.optionId);
    shouldScrollStep1Selection = true;
  }
  else if (action === 'check-step1') {
    checkStep1();
    shouldScrollStep1Check = true;
  }
  else if (action === 'activate-slot') activateSlot(target.dataset.slot);
  else if (action === 'use-word') placeChoice(target.dataset.choiceId);
  else if (action === 'check-step2') checkStep2();
  else if (action === 'reset-step2') resetStep2();
  else if (action === 'pick-order') pickOrder(target.dataset.orderId);
  else if (action === 'remove-order') removeOrder(target.dataset.orderId);
  else if (action === 'check-step3') checkStep3();
  else if (action === 'reset-step3') resetStep3();
  else if (action === 'check-step4') checkStep4();
  else if (action === 'check-step5') checkStep5();
  else if (action === 'prev') goPrev();
  else if (action === 'next') shouldScrollToImagePanel = goNext();
  else if (action === 'restart') restartAll();
  else if (action === 'review-cut') reviewCut(target.dataset.cutIndex);
  else if (action === 'jump-to-step') jumpToStep(target.dataset.stepIndex);
  else if (action === 'jump-to-cut') { jumpToCut(target.dataset.cutIndex); shouldScrollToImagePanel = true; }
  else if (action === 'show-answer') showAnswer();
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
    if (shouldScrollStep1Check) {
      scheduleStep1CheckScroll();
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
