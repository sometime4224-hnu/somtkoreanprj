const IMG_BASE = '../assets/c15/reading-writing/images/writing-cut/';
const IMG_VERSION = '?v=masked1';
const LS_KEY = 'writing_cut_c15_modern_v1';
const STEP_LABELS = ['문장 고르기', '어휘 넣기', '순서 배열', '빈칸 쓰기', '전체 문장 쓰기'];
const STEP_GUIDES = [
  '그림에 맞는 문장을 먼저 찾아 보세요.',
  '핵심 어휘 두 개를 문장에 넣어 보세요.',
  '어절을 순서대로 눌러 문장을 완성해 보세요.',
  '이제 빈칸 두 곳에 들어갈 말을 직접 써 보세요.',
  '마지막으로 도움 없이 전체 문장을 직접 써 보세요.'
];

const PASSAGE_FULL_PARAGRAPHS = [
  "부자가 되려면 작은 돈부터 아껴 써야 합니다. '티끌 모아 태산'이라는 말도 있지요? 그럼 어떻게 해야 돈을 아낄 수 있을까요?",
  '첫째, 영수증을 모으고 가계부를 씁니다. 어디에 어떻게 돈을 사용하고 있는지 알아야 돈을 절약할 수 있습니다.',
  '둘째, 관리비를 줄이지 않으면 안 됩니다. 사용하지 않는 전기 플러그를 뽑아 두고, 설거지할 때에는 물을 계속 틀어 놓지 않습니다. 그리고 사람이 없는 방의 불도 끕니다. 특히 겨울철에 가족들에게 내복을 입게 하면 난방비를 아낄 수 있습니다.',
  '셋째, 알뜰하게 쇼핑합니다. 퇴근하는 길에 마트에 들러서 세일하는 식품을 사면 식비를 절약할 수 있습니다. 직접 요리해서 먹으면 외식비도 아낄 수 있고 건강에도 좋습니다.',
  '돈을 아끼는 방법, 모두가 알고 있는 쉬운 것들이지만 실천하기는 쉽지 않습니다. 미리 목표를 정하고 작은 것부터 실천합시다.'
];

const PASSAGE_SECTIONS = [
  { title: '문제 제기', body: PASSAGE_FULL_PARAGRAPHS[0] },
  { title: '첫째 방법: 가계부', body: PASSAGE_FULL_PARAGRAPHS[1] },
  { title: '둘째 방법: 관리비 줄이기', body: PASSAGE_FULL_PARAGRAPHS[2] },
  { title: '셋째 방법: 알뜰 쇼핑', body: PASSAGE_FULL_PARAGRAPHS[3] },
  { title: '마무리', body: PASSAGE_FULL_PARAGRAPHS[4] }
];

const SENTENCES = [
  '부자가 되려면 작은 돈부터 아껴 써야 합니다.',
  "'티끌 모아 태산'이라는 말도 있지요?",
  '그럼 어떻게 해야 돈을 아낄 수 있을까요?',
  '첫째, 영수증을 모으고 가계부를 씁니다.',
  '어디에 어떻게 돈을 사용하고 있는지 알아야 돈을 절약할 수 있습니다.',
  '둘째, 관리비를 줄이지 않으면 안 됩니다.',
  '사용하지 않는 전기 플러그를 뽑아 두고, 설거지할 때에는 물을 계속 틀어 놓지 않습니다.',
  '그리고 사람이 없는 방의 불도 끕니다.',
  '특히 겨울철에 가족들에게 내복을 입게 하면 난방비를 아낄 수 있습니다.',
  '셋째, 알뜰하게 쇼핑합니다.',
  '퇴근하는 길에 마트에 들러서 세일하는 식품을 사면 식비를 절약할 수 있습니다.',
  '직접 요리해서 먹으면 외식비도 아낄 수 있고 건강에도 좋습니다.',
  '돈을 아끼는 방법, 모두가 알고 있는 쉬운 것들이지만 실천하기는 쉽지 않습니다.',
  '미리 목표를 정하고 작은 것부터 실천합시다.'
];

const RAW_CUTS = [
  {
    imgFile: 'c15-cut01.webp',
    alt: '작은 동전과 저금통을 보며 부자가 되는 방법을 생각하는 장면',
    distractors: [3, 8, 13],
    dropSegments: ['부자가 되려면 ', ' 돈부터 ', ' 써야 합니다.'],
    dropAnswers: ['작은', '아껴'],
    dropChoices: ['작은', '아껴', '관리비', '목표'],
    orderTokens: ['부자가 되려면', '작은 돈부터', '아껴 써야 합니다.'],
    fillPrompt: '부자가 되려면 [1] 돈부터 [2] 써야 합니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['작은'] },
      { label: '빈칸 2', answers: ['아껴'] }
    ],
    hints: ['작은 돈', '아끼다', '부자'],
    requiredKeywords: ['부자', '작은 돈', '아껴'],
    acceptedPatterns: ['부자가 되려면 작은 돈부터 아껴야 합니다.']
  },
  {
    imgFile: 'c15-cut02.webp',
    alt: '티끌이 모여 큰 산이 되는 속담을 보여 주는 장면',
    distractors: [0, 4, 10],
    dropSegments: ["'", "'이라는 말도 ", '?'],
    dropAnswers: ['티끌 모아 태산', '있지요'],
    dropChoices: ['티끌 모아 태산', '있지요', '세일하는 식품', '절약할 수 있습니다'],
    orderTokens: ["'티끌 모아 태산'이라는", '말도', '있지요?'],
    fillPrompt: "'[1]'이라는 말도 [2]?",
    fillBlanks: [
      { label: '빈칸 1', answers: ['티끌 모아 태산', '티끌모아태산'] },
      { label: '빈칸 2', answers: ['있지요', '있죠'] }
    ],
    hints: ['속담', '티끌', '태산'],
    requiredKeywords: ['티끌', '태산', '말'],
    acceptedPatterns: ['티끌 모아 태산이라는 말도 있지요?', '티끌 모아 태산이라는 말도 있죠?']
  },
  {
    imgFile: 'c15-cut03.webp',
    alt: '돈을 아끼는 방법을 질문하는 장면',
    distractors: [1, 5, 11],
    dropSegments: ['그럼 ', ' 해야 돈을 ', ' 수 있을까요?'],
    dropAnswers: ['어떻게', '아낄'],
    dropChoices: ['어떻게', '아낄', '직접', '줄이지'],
    orderTokens: ['그럼', '어떻게 해야', '돈을 아낄 수 있을까요?'],
    fillPrompt: '그럼 [1] 해야 돈을 [2] 수 있을까요?',
    fillBlanks: [
      { label: '빈칸 1', answers: ['어떻게'] },
      { label: '빈칸 2', answers: ['아낄', '아끼'] }
    ],
    hints: ['방법 질문', '어떻게', '돈을 아끼다'],
    requiredKeywords: ['어떻게', '돈', '아낄'],
    acceptedPatterns: ['그럼 어떻게 돈을 아낄 수 있을까요?']
  },
  {
    imgFile: 'c15-cut04.webp',
    alt: '영수증을 모으고 가계부를 쓰는 첫째 방법',
    distractors: [0, 6, 9],
    dropSegments: ['첫째, ', '을 모으고 ', '를 씁니다.'],
    dropAnswers: ['영수증', '가계부'],
    dropChoices: ['영수증', '가계부', '전기 플러그', '쇼핑'],
    orderTokens: ['첫째,', '영수증을 모으고', '가계부를 씁니다.'],
    fillPrompt: '첫째, [1]을 모으고 [2]를 씁니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['영수증'] },
      { label: '빈칸 2', answers: ['가계부'] }
    ],
    hints: ['첫째', '영수증', '가계부'],
    requiredKeywords: ['첫째', '영수증', '가계부'],
    acceptedPatterns: ['첫째, 영수증을 모아서 가계부를 씁니다.']
  },
  {
    imgFile: 'c15-cut05.webp',
    alt: '어디에 돈을 쓰는지 확인하고 절약하는 장면',
    distractors: [2, 7, 12],
    dropSegments: ['어디에 어떻게 돈을 ', ' 알아야 돈을 ', '.'],
    dropAnswers: ['사용하고 있는지', '절약할 수 있습니다'],
    dropChoices: ['사용하고 있는지', '절약할 수 있습니다', '불도 끕니다', '실천하기는 쉽지 않습니다'],
    orderTokens: ['어디에 어떻게', '돈을 사용하고 있는지', '알아야', '돈을 절약할 수 있습니다.'],
    fillPrompt: '어디에 어떻게 돈을 [1] 알아야 돈을 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['사용하고 있는지', '사용하는지'] },
      { label: '빈칸 2', answers: ['절약할 수 있습니다', '절약할수있습니다'] }
    ],
    hints: ['돈 사용', '알아야', '절약'],
    requiredKeywords: ['돈', '사용', '절약'],
    acceptedPatterns: ['어디에 돈을 사용하는지 알아야 돈을 절약할 수 있습니다.']
  },
  {
    imgFile: 'c15-cut06.webp',
    alt: '관리비를 줄여야 한다고 알려 주는 둘째 방법',
    distractors: [3, 8, 13],
    dropSegments: ['둘째, ', '를 ', '.'],
    dropAnswers: ['관리비', '줄이지 않으면 안 됩니다'],
    dropChoices: ['관리비', '줄이지 않으면 안 됩니다', '난방비', '실천합시다'],
    orderTokens: ['둘째,', '관리비를', '줄이지 않으면 안 됩니다.'],
    fillPrompt: '둘째, [1]를 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['관리비'] },
      { label: '빈칸 2', answers: ['줄이지 않으면 안 됩니다', '줄이지않으면안됩니다'] }
    ],
    hints: ['둘째', '관리비', '줄이다'],
    requiredKeywords: ['둘째', '관리비', '줄이지'],
    acceptedPatterns: ['둘째, 관리비를 줄여야 합니다.']
  },
  {
    imgFile: 'c15-cut07.webp',
    alt: '전기 플러그를 뽑고 설거지할 때 물을 아끼는 와이드 장면',
    distractors: [4, 8, 10],
    dropSegments: ['사용하지 않는 ', '를 뽑아 두고, 설거지할 때에는 ', '.'],
    dropAnswers: ['전기 플러그', '물을 계속 틀어 놓지 않습니다'],
    dropChoices: ['전기 플러그', '물을 계속 틀어 놓지 않습니다', '세일하는 식품', '난방비를 아낄 수 있습니다'],
    orderTokens: ['사용하지 않는 전기 플러그를 뽑아 두고,', '설거지할 때에는', '물을 계속', '틀어 놓지 않습니다.'],
    fillPrompt: '사용하지 않는 [1]를 뽑아 두고, 설거지할 때에는 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['전기 플러그', '전기플러그'] },
      { label: '빈칸 2', answers: ['물을 계속 틀어 놓지 않습니다', '물을계속틀어놓지않습니다', '물을 틀어 놓지 않습니다'] }
    ],
    hints: ['와이드 컷', '전기 플러그', '물을 아끼다'],
    requiredKeywords: ['전기 플러그', '설거지', '물'],
    acceptedPatterns: ['사용하지 않는 전기 플러그를 뽑고 설거지할 때 물을 계속 틀어 놓지 않습니다.']
  },
  {
    imgFile: 'c15-cut08.webp',
    alt: '사람이 없는 방의 불을 끄는 장면',
    distractors: [2, 5, 11],
    dropSegments: ['그리고 ', ' 방의 ', '도 끕니다.'],
    dropAnswers: ['사람이 없는', '불'],
    dropChoices: ['사람이 없는', '불', '직접 요리해서', '관리비'],
    orderTokens: ['그리고', '사람이 없는 방의', '불도 끕니다.'],
    fillPrompt: '그리고 [1] 방의 [2]도 끕니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['사람이 없는'] },
      { label: '빈칸 2', answers: ['불'] }
    ],
    hints: ['방', '사람이 없다', '불을 끄다'],
    requiredKeywords: ['사람이 없는', '방', '불'],
    acceptedPatterns: ['그리고 사람이 없는 방에는 불도 끕니다.']
  },
  {
    imgFile: 'c15-cut09.webp',
    alt: '겨울철에 내복을 입어 난방비를 아끼는 가족',
    distractors: [0, 6, 12],
    dropSegments: ['특히 겨울철에 가족들에게 ', '을 입게 하면 ', '를 아낄 수 있습니다.'],
    dropAnswers: ['내복', '난방비'],
    dropChoices: ['내복', '난방비', '작은 돈', '실천하기'],
    orderTokens: ['특히 겨울철에', '가족들에게 내복을 입게 하면', '난방비를', '아낄 수 있습니다.'],
    fillPrompt: '특히 겨울철에 가족들에게 [1]을 입게 하면 [2]를 아낄 수 있습니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['내복'] },
      { label: '빈칸 2', answers: ['난방비'] }
    ],
    hints: ['겨울철', '내복', '난방비'],
    requiredKeywords: ['겨울철', '내복', '난방비'],
    acceptedPatterns: ['겨울철에 가족들이 내복을 입으면 난방비를 아낄 수 있습니다.']
  },
  {
    imgFile: 'c15-cut10.webp',
    alt: '알뜰하게 쇼핑하는 셋째 방법을 소개하는 장면',
    distractors: [1, 3, 5],
    dropSegments: ['', ', 알뜰하게 ', '.'],
    dropAnswers: ['셋째', '쇼핑합니다'],
    dropChoices: ['셋째', '쇼핑합니다', '첫째', '관리비를 줄입니다'],
    orderTokens: ['셋째,', '알뜰하게', '쇼핑합니다.'],
    fillPrompt: '[1], 알뜰하게 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['셋째'] },
      { label: '빈칸 2', answers: ['쇼핑합니다', '쇼핑'] }
    ],
    hints: ['셋째', '알뜰하게', '쇼핑'],
    requiredKeywords: ['셋째', '알뜰하게', '쇼핑'],
    acceptedPatterns: ['셋째, 알뜰하게 장을 봅니다.']
  },
  {
    imgFile: 'c15-cut11.webp',
    alt: '퇴근길 마트에서 세일 식품을 사 식비를 절약하는 장면',
    distractors: [4, 7, 13],
    dropSegments: ['퇴근하는 길에 마트에 들러서 ', '을 사면 ', '를 절약할 수 있습니다.'],
    dropAnswers: ['세일하는 식품', '식비'],
    dropChoices: ['세일하는 식품', '식비', '불', '목표'],
    orderTokens: ['퇴근하는 길에', '마트에 들러서', '세일하는 식품을 사면', '식비를 절약할 수 있습니다.'],
    fillPrompt: '퇴근하는 길에 마트에 들러서 [1]을 사면 [2]를 절약할 수 있습니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['세일하는 식품', '세일 식품'] },
      { label: '빈칸 2', answers: ['식비'] }
    ],
    hints: ['퇴근길', '마트', '식비 절약'],
    requiredKeywords: ['마트', '세일', '식비'],
    acceptedPatterns: ['퇴근길에 마트에서 세일하는 식품을 사면 식비를 절약할 수 있습니다.']
  },
  {
    imgFile: 'c15-cut12.webp',
    alt: '직접 요리해 먹어서 외식비와 건강을 챙기는 장면',
    distractors: [2, 9, 12],
    dropSegments: ['', ' 먹으면 외식비도 아낄 수 있고 ', '에도 좋습니다.'],
    dropAnswers: ['직접 요리해서', '건강'],
    dropChoices: ['직접 요리해서', '건강', '알뜰하게 쇼핑해서', '실천'],
    orderTokens: ['직접 요리해서 먹으면', '외식비도 아낄 수 있고', '건강에도 좋습니다.'],
    fillPrompt: '[1] 먹으면 외식비도 아낄 수 있고 [2]에도 좋습니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['직접 요리해서', '직접요리해서'] },
      { label: '빈칸 2', answers: ['건강'] }
    ],
    hints: ['직접 요리', '외식비', '건강'],
    requiredKeywords: ['직접 요리', '외식비', '건강'],
    acceptedPatterns: ['직접 요리해서 먹으면 외식비도 아끼고 건강에도 좋습니다.']
  },
  {
    imgFile: 'c15-cut13.webp',
    alt: '알고는 있지만 실천하기 쉽지 않다는 마무리 장면',
    distractors: [0, 5, 10],
    dropSegments: ['돈을 아끼는 방법, 모두가 알고 있는 ', '이지만 ', '.'],
    dropAnswers: ['쉬운 것들', '실천하기는 쉽지 않습니다'],
    dropChoices: ['쉬운 것들', '실천하기는 쉽지 않습니다', '관리비', '절약할 수 있습니다'],
    orderTokens: ['돈을 아끼는 방법,', '모두가 알고 있는 쉬운 것들이지만', '실천하기는', '쉽지 않습니다.'],
    fillPrompt: '돈을 아끼는 방법, 모두가 알고 있는 [1]이지만 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['쉬운 것들', '쉬운것들'] },
      { label: '빈칸 2', answers: ['실천하기는 쉽지 않습니다', '실천하기쉽지않습니다'] }
    ],
    hints: ['알고 있다', '쉬운 것', '실천은 어렵다'],
    requiredKeywords: ['돈을 아끼는 방법', '쉬운 것', '실천'],
    acceptedPatterns: ['돈을 아끼는 방법은 쉽지만 실천하기는 쉽지 않습니다.']
  },
  {
    imgFile: 'c15-cut14.webp',
    alt: '목표를 정하고 작은 것부터 실천하자는 와이드 마무리 장면',
    distractors: [1, 6, 11],
    dropSegments: ['미리 ', '를 정하고 작은 것부터 ', '.'],
    dropAnswers: ['목표', '실천합시다'],
    dropChoices: ['목표', '실천합시다', '전기 플러그', '요리합시다'],
    orderTokens: ['미리 목표를 정하고', '작은 것부터', '실천합시다.'],
    fillPrompt: '미리 [1]를 정하고 작은 것부터 [2].',
    fillBlanks: [
      { label: '빈칸 1', answers: ['목표'] },
      { label: '빈칸 2', answers: ['실천합시다', '실천'] }
    ],
    hints: ['와이드 컷', '목표', '작은 실천'],
    requiredKeywords: ['목표', '작은 것', '실천'],
    acceptedPatterns: ['미리 목표를 세우고 작은 것부터 실천합시다.']
  }
];

const cuts = RAW_CUTS.map(({ distractors, ...cut }, index) => ({
  id: `cut${String(index + 1).padStart(2, '0')}`,
  sentence: SENTENCES[index],
  mcqOptions: [SENTENCES[index], ...distractors.map((choiceIndex) => SENTENCES[choiceIndex])],
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
    // Storage can fail in private browsing; the activity still works without it.
  }
}

let state = loadState();
if (typeof state.passageOpen !== 'boolean') state.passageOpen = false;

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[\s.,!?~'"“”‘’]/g, '')
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

function getImageSrc(cut) {
  return `${IMG_BASE}${cut.imgFile}${IMG_VERSION}`;
}

function getStepResponse(response, stepIndex) {
  return response[`step${stepIndex + 1}`];
}

function canGoNext() {
  if (state.view === 'summary') return false;
  return getStepResponse(getCurrentResponse(), state.currentStep).checked;
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
  const normalizedRaw = normalizeText(raw);
  const matchedKeywords = cut.requiredKeywords.filter((keyword) =>
    normalizedRaw.includes(normalizeText(keyword))
  );

  if (!raw) {
    return { level: 'empty', matchedKeywords, missingKeywords: cut.requiredKeywords };
  }

  if (normalizedRaw === normalizeText(cut.sentence)) {
    return { level: 'exact', matchedKeywords: cut.requiredKeywords, missingKeywords: [] };
  }

  if (cut.acceptedPatterns.some((pattern) => normalizedRaw === normalizeText(pattern))) {
    return { level: 'accepted', matchedKeywords, missingKeywords: [] };
  }

  if (matchedKeywords.length === cut.requiredKeywords.length) {
    return { level: 'strong', matchedKeywords, missingKeywords: [] };
  }

  return {
    level: matchedKeywords.length >= Math.max(2, cut.requiredKeywords.length - 1) ? 'partial' : 'weak',
    matchedKeywords,
    missingKeywords: cut.requiredKeywords.filter((keyword) => !matchedKeywords.includes(keyword))
  };
}

function feedbackBlock(type, title, body, extra = '') {
  return `
    <div id="step-feedback" class="feedback ${type}">
      <strong>${title}</strong>
      <div>${body}</div>
      ${extra ? `<div>${extra}</div>` : ''}
    </div>
  `;
}

function renderTopTools(label) {
  return `
    <div class="top-tools">
      <button type="button" class="passage-open-btn" data-action="open-passage" aria-haspopup="dialog" aria-controls="passage-dialog">
        <span class="passage-open-btn__label">전체 글 보기</span>
        <span class="passage-open-btn__hint">${label}을 쓰다가 지문을 확인할 수 있어요</span>
      </button>
    </div>
  `;
}

function renderGuideZone(buttonMarkup, message, tone = 'primary', compact = false) {
  return `
    <div class="guide-zone ${compact ? 'compact' : ''}">
      <div class="guide-callout ${tone}">${escapeHtml(message)}</div>
      ${buttonMarkup}
    </div>
  `;
}

function renderStepPills() {
  return STEP_LABELS.map((label, index) => {
    const done = state.responses.every((response) => getStepResponse(response, index).checked);
    const active = index === state.currentStep;
    return `<div class="step-pill ${done ? 'done' : ''} ${active ? 'active' : ''}">${index + 1}. ${escapeHtml(label)}</div>`;
  }).join('');
}

function renderCutPills() {
  return cuts.map((cut, index) => {
    const response = state.responses[index];
    const done = getStepResponse(response, state.currentStep).checked;
    const active = index === state.currentCut;
    return `<div class="cut-pill ${done ? 'done' : ''} ${active ? 'active' : ''}">컷 ${index + 1}</div>`;
  }).join('');
}

function renderPassageModal() {
  return `
    <div class="passage-backdrop" data-action="close-passage"></div>
    <section id="passage-dialog" class="passage-modal" role="dialog" aria-modal="true" aria-labelledby="passage-title" tabindex="-1">
      <div class="passage-head">
        <div>
          <div class="eyebrow">15과 읽기 지문</div>
          <h2 id="passage-title" class="passage-title">돈을 아끼는 방법</h2>
          <p class="passage-subtitle">문장을 쓰다가 원문 흐름을 확인하고 싶을 때 열어 보세요.</p>
        </div>
        <button type="button" class="ghost-btn" data-action="close-passage" data-passage-close-button>닫기</button>
      </div>
      <div class="passage-body">
        <div class="passage-card">
          <strong>전체 지문</strong>
          ${PASSAGE_FULL_PARAGRAPHS.map((paragraph) => `<p class="passage-copy">${escapeHtml(paragraph)}</p>`).join('')}
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
  const wideLabel = state.currentCut === 6 || state.currentCut === 13 ? '와이드 컷' : '그림 보기';
  return `
    <section class="panel" data-image-panel>
      <div class="panel-head">
        <div>
          <h3>컷 ${state.currentCut + 1}</h3>
          <p>그림을 먼저 보고, 인물과 행동, 핵심 장면을 떠올려 보세요.</p>
        </div>
        <span class="highlight-tag">${wideLabel}</span>
      </div>
      <div class="image-wrap">
        <img src="${getImageSrc(cut)}" alt="${escapeHtml(cut.alt)}" data-primary-image>
      </div>
      <div class="image-caption">그림 속 장면을 읽고, 아래 힌트로 어떤 문장이 어울리는지 추측해 보세요.</div>
      <div class="support-row">
        ${cut.hints.map((hint) => `<span class="support-chip">${escapeHtml(hint)}</span>`).join('')}
      </div>
    </section>
  `;
}

function renderFloatingPreview(cut) {
  return `
    <button type="button" class="floating-image-preview" data-action="scroll-to-image" data-floating-preview aria-label="현재 그림으로 다시 이동하기">
      <img src="${getImageSrc(cut)}" alt="">
      <span class="floating-image-preview__copy">
        <strong>현재 그림</strong>
        <span>컷 ${state.currentCut + 1} 다시 보려면 누르세요</span>
      </span>
    </button>
  `;
}

function renderStep1(cut, response) {
  const feedback = !response.step1.checked ? '' : response.step1.correct
    ? feedbackBlock('correct', '좋아요. 그림과 문장이 잘 맞습니다.', `정답 문장: ${escapeHtml(cut.sentence)}`)
    : feedbackBlock('warn', '그림과 문장을 한 번 더 비교해 보세요.', `모범 문장: ${escapeHtml(cut.sentence)}`);

  return `
    <div class="instruction-card">
      <strong>1단계</strong>
      <span>컷을 보고 가장 잘 맞는 문장을 고르세요.</span>
    </div>
    <div class="choice-list" data-step1-choice-list>
      ${response.step1.optionOrder.map((option) => {
        const selected = response.step1.selected === option.id;
        const correct = response.step1.checked && option.label === cut.sentence;
        const wrong = response.step1.checked && selected && !correct;
        return `
          <button type="button" class="choice-btn ${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}" data-action="select-choice" data-option-id="${option.id}" aria-pressed="${selected ? 'true' : 'false'}">
            ${escapeHtml(option.label)}
          </button>
        `;
      }).join('')}
    </div>
    ${feedback}
    <div class="actions">
      <button type="button" class="nav-btn" data-action="check-step1" ${response.step1.selected === null ? 'disabled' : ''}>확인하기</button>
    </div>
  `;
}

function renderTemplateLine(cut, response) {
  return cut.dropSegments.map((segment, index) => {
    const choice = findById(response.step2.choiceOrder, response.step2.placements[index]);
    const slot = index < cut.dropAnswers.length
      ? `<button type="button" class="drop-slot ${state.activeSlot === index ? 'active' : ''} ${choice ? 'filled' : ''}" data-action="activate-slot" data-slot="${index}">${choice ? escapeHtml(choice.label) : `빈칸 ${index + 1}`}</button>`
      : '';
    return `${escapeHtml(segment)}${slot}`;
  }).join('');
}

function renderStep2(cut, response) {
  const complete = response.step2.placements.every((value) => value !== null);
  const feedback = !response.step2.checked ? '' : response.step2.correct
    ? feedbackBlock('correct', '핵심 어휘가 정확합니다.', '이제 같은 문장을 순서대로 배열해 볼 수 있어요.')
    : feedbackBlock('warn', '어휘 위치를 다시 확인해 보세요.', `정답 어휘: ${cut.dropAnswers.map(escapeHtml).join(', ')}`);

  return `
    <div class="instruction-card">
      <strong>2단계</strong>
      <span>빈칸을 누른 뒤 알맞은 어휘를 넣어 문장을 완성하세요.</span>
    </div>
    <div class="template-box">
      <div class="template-line">${renderTemplateLine(cut, response)}</div>
    </div>
    <div class="word-bank">
      ${response.step2.choiceOrder.map((choice) => {
        const used = response.step2.placements.includes(choice.id);
        return `<button type="button" class="word-chip ${used ? 'used' : ''}" data-action="use-word" data-choice-id="${choice.id}" ${used ? 'disabled' : ''}>${escapeHtml(choice.label)}</button>`;
      }).join('')}
    </div>
    ${feedback}
    <div class="actions">
      <button type="button" class="ghost-btn" data-action="reset-step2">다시 놓기</button>
      <button type="button" class="nav-btn" data-action="check-step2" ${complete ? '' : 'disabled'}>확인하기</button>
    </div>
  `;
}

function renderStep3(cut, response) {
  const complete = response.step3.arranged.length === cut.orderTokens.length;
  const arrangedItems = response.step3.arranged.map((id) => findById(response.step3.bankOrder, id)).filter(Boolean);
  const feedback = !response.step3.checked ? '' : response.step3.correct
    ? feedbackBlock('correct', '문장 순서가 정확합니다.', '이 흐름을 기억하고 빈칸 쓰기로 넘어가 보세요.')
    : feedbackBlock('warn', '어절 순서를 다시 배열해 보세요.', `정답: ${escapeHtml(cut.sentence)}`);

  return `
    <div class="instruction-card">
      <strong>3단계</strong>
      <span>아래 어절을 눌러 올바른 문장 순서로 배열하세요.</span>
    </div>
    <div class="arranged-box">
      <div class="arranged-line">
        ${arrangedItems.length ? arrangedItems.map((item) => `<button type="button" class="order-chip" data-action="remove-order" data-order-id="${item.id}">${escapeHtml(item.label)}</button>`).join('') : '<span class="blank-inline">여기에 순서대로 쌓입니다</span>'}
      </div>
    </div>
    <div class="order-row">
      ${response.step3.bankOrder.map((item) => {
        const used = response.step3.arranged.includes(item.id);
        return `<button type="button" class="order-chip ${used ? 'used' : ''}" data-action="pick-order" data-order-id="${item.id}" ${used ? 'disabled' : ''}>${escapeHtml(item.label)}</button>`;
      }).join('')}
    </div>
    ${feedback}
    <div class="actions">
      <button type="button" class="ghost-btn" data-action="reset-step3">다시 배열</button>
      <button type="button" class="nav-btn" data-action="check-step3" ${complete ? '' : 'disabled'}>확인하기</button>
    </div>
  `;
}

function renderStep4(cut, response) {
  const feedback = !response.step4.checked ? '' : response.step4.correct
    ? feedbackBlock('correct', '빈칸을 모두 정확히 썼습니다.', '마지막 단계에서는 문장 전체를 도움 없이 써 보세요.')
    : feedbackBlock('warn', `${response.step4.correctCount} / ${cut.fillBlanks.length}개가 맞았습니다.`, `정답: ${cut.fillBlanks.map((blank) => escapeHtml(blank.answers[0])).join(', ')}`);

  return `
    <div class="instruction-card">
      <strong>4단계</strong>
      <span>힌트를 보지 않고 빈칸에 들어갈 말을 직접 써 보세요.</span>
    </div>
    <div class="fill-preview">${escapeHtml(cut.fillPrompt)}</div>
    <div class="fill-grid">
      ${cut.fillBlanks.map((blank, index) => `
        <div class="fill-field">
          <label for="fill-${index}">${escapeHtml(blank.label)}</label>
          <input id="fill-${index}" type="text" value="${escapeHtml(response.step4.inputs[index])}" data-action="fill-input" data-fill-index="${index}" autocomplete="off">
        </div>
      `).join('')}
    </div>
    ${feedback}
    <div class="actions">
      <button type="button" class="nav-btn" data-action="check-step4" ${response.step4.inputs.some((value) => !value.trim()) ? 'disabled' : ''}>확인하기</button>
    </div>
  `;
}

function getSentenceLabel(result) {
  if (result.level === 'exact' || result.level === 'accepted') return '정확';
  if (result.level === 'strong') return '핵심 표현 포함';
  if (result.level === 'partial') return '부분 완성';
  if (result.level === 'weak') return '보완 필요';
  return '미작성';
}

function renderStep5(cut, response) {
  const result = response.step5.evaluation;
  const feedback = !response.step5.checked ? '' : (() => {
    if (['exact', 'accepted', 'strong'].includes(result.level)) {
      return feedbackBlock('correct', `좋아요. ${getSentenceLabel(result)}입니다.`, `모범 문장: ${escapeHtml(cut.sentence)}`);
    }
    return feedbackBlock('warn', `조금 더 보완해 보세요. ${getSentenceLabel(result)} 상태입니다.`, `빠진 핵심 표현: ${escapeHtml(result.missingKeywords.join(', ') || '문장 흐름')}`, `모범 문장: ${escapeHtml(cut.sentence)}`);
  })();

  return `
    <div class="instruction-card">
      <strong>5단계</strong>
      <span>그림만 보고 문장 전체를 직접 써 보세요. 원문과 완전히 같지 않아도 핵심 표현을 살리면 됩니다.</span>
    </div>
    <div class="fullwrite-box">
      <label for="full-text">전체 문장</label>
      <textarea id="full-text" data-action="full-text" placeholder="여기에 문장을 써 보세요.">${escapeHtml(response.step5.text)}</textarea>
    </div>
    ${feedback}
    <div class="actions">
      <button type="button" class="nav-btn" data-action="check-step5" ${response.step5.text.trim() ? '' : 'disabled'}>확인하기</button>
    </div>
  `;
}

function renderStepPanel(cut, response) {
  const renderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];
  const content = renderers[state.currentStep](cut, response);
  let nextLabel = '다음 컷';
  if (state.currentCut === cuts.length - 1) {
    nextLabel = state.currentStep === STEP_LABELS.length - 1 ? '종합 피드백 보기' : '다음 단계';
  }

  const nextGuide = state.currentCut === cuts.length - 1
    ? (state.currentStep === STEP_LABELS.length - 1 ? '마지막이면 종합 피드백으로 넘어갑니다' : '이 단계가 끝나면 다음 단계로 이동합니다')
    : '이 컷이 끝나면 다음 컷으로 이동합니다';
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
        ${renderGuideZone(nextButton, canGoNext() ? nextGuide : '먼저 위 활동을 끝내면 진행할 수 있어요', canGoNext() ? 'success' : 'primary', true)}
      </div>
    </section>
  `;
}

function getStepMetricValue(stepIndex) {
  return state.responses.filter((response) => getStepResponse(response, stepIndex).checked).length;
}

function renderSummary() {
  const sentenceSuccess = state.responses.filter((response, index) => {
    const result = response.step5.evaluation || evaluateSentence(response.step5.text, cuts[index]);
    return ['exact', 'accepted', 'strong'].includes(result.level);
  }).length;

  return `
    <section class="summary-card">
      <div class="panel-head">
        <div>
          <div class="eyebrow">15과 컷 쓰기 완료</div>
          <h2 class="progress-title">돈을 아끼는 방법을 끝까지 다시 썼습니다</h2>
          <p>필요한 컷은 다시 돌아가서 문장을 보완할 수 있습니다.</p>
        </div>
        ${renderTopTools('마무리')}
      </div>

      <div class="summary-metrics">
        <div class="metric"><strong>${getStepMetricValue(0)} / ${cuts.length}</strong><span>문장 고르기</span></div>
        <div class="metric"><strong>${getStepMetricValue(1)} / ${cuts.length}</strong><span>어휘 넣기</span></div>
        <div class="metric"><strong>${getStepMetricValue(2)} / ${cuts.length}</strong><span>순서 배열</span></div>
        <div class="metric"><strong>${getStepMetricValue(3)} / ${cuts.length}</strong><span>빈칸 쓰기</span></div>
        <div class="metric"><strong>${sentenceSuccess} / ${cuts.length}</strong><span>전체 문장 쓰기</span></div>
      </div>
    </section>

    <section class="summary-card">
      <div class="panel-head">
        <div>
          <h3>컷별 문장 확인</h3>
          <p>내가 쓴 문장과 모범 문장을 비교해 보세요.</p>
        </div>
        <span class="highlight-tag">다시 보기</span>
      </div>
      <div class="summary-list">
        ${state.responses.map((response, index) => {
          const cut = cuts[index];
          const result = response.step5.evaluation || evaluateSentence(response.step5.text, cut);
          return `
            <div class="summary-item">
              <strong>컷 ${index + 1} · ${getSentenceLabel(result)}</strong>
              <p>내 문장: ${response.step5.text.trim() ? escapeHtml(response.step5.text.trim()) : '아직 쓰지 않았습니다.'}</p>
              <p>모범 문장: ${escapeHtml(cut.sentence)}</p>
              <div class="actions">
                <button type="button" class="ghost-btn" data-action="review-cut" data-cut-index="${index}">이 컷 다시 하기</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
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
              <p class="progress-desc">현재 컷 ${state.currentCut + 1} / ${cuts.length}을 ${STEP_LABELS[state.currentStep]} 단계에서 연습하고 있습니다. 모든 컷이 끝나면 다음 단계로 넘어갑니다.</p>
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
    focusAfterRender('[data-nav-open-passage]');
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
  if (state.view !== 'activity' || !floatingPreviewMedia.matches || typeof IntersectionObserver !== 'function') return;

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
    window.requestAnimationFrame(scrollToImagePanel);
  });
}

function scrollRangeIntoView(startElement, endElement) {
  if (!startElement || !endElement) return;
  const isDesktop = window.matchMedia('(min-width: 961px)').matches;
  const topPadding = isDesktop ? 20 : 92;
  const bottomPadding = 28;
  const startRect = startElement.getBoundingClientRect();
  const endRect = endElement.getBoundingClientRect();
  const rangeTop = Math.min(startRect.top, endRect.top);
  const rangeBottom = Math.max(startRect.bottom, endRect.bottom);
  const viewportBottom = window.innerHeight - bottomPadding;

  if (!isDesktop && rangeTop >= topPadding && rangeBottom <= viewportBottom) return;
  if (isDesktop && rangeTop <= topPadding && rangeBottom <= viewportBottom) return;

  window.scrollTo({
    top: Math.max(window.scrollY + rangeTop - topPadding, 0),
    behavior: isDesktop ? 'auto' : 'smooth'
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
    step4Button.disabled = getCurrentResponse().step4.inputs.some((value) => !value.trim());
  }

  const step5Button = app.querySelector('[data-action="check-step5"]');
  if (step5Button && state.view === 'activity' && state.currentStep === 4) {
    step5Button.disabled = !getCurrentResponse().step5.text.trim();
  }
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

function placeChoice(choiceId) {
  const response = getCurrentResponse();
  const numericId = Number(choiceId);
  if (response.step2.placements.includes(numericId)) return;
  let targetSlot = state.activeSlot;
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
  state.activeSlot = 0;
  setStepUnchecked(response.step2);
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
  const response = getCurrentResponse();
  response.step3.checked = true;
  response.step3.correct = response.step3.arranged.length === getCurrentCut().orderTokens.length &&
    response.step3.arranged.every((id, index) => id === index);
}

function updateFillInput(index, value) {
  const response = getCurrentResponse();
  response.step4.inputs[Number(index)] = value;
  response.step4.checked = false;
  response.step4.correct = false;
  response.step4.correctCount = 0;
}

function checkStep4() {
  const cut = getCurrentCut();
  const response = getCurrentResponse();
  const correctCount = cut.fillBlanks.filter((blank, index) => matchesAnswer(response.step4.inputs[index], blank.answers)).length;
  response.step4.checked = true;
  response.step4.correctCount = correctCount;
  response.step4.correct = correctCount === cut.fillBlanks.length;
}

function updateFullText(value) {
  const response = getCurrentResponse();
  response.step5.text = value;
  response.step5.checked = false;
  response.step5.evaluation = null;
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

function reviewCut(index) {
  state.view = 'activity';
  state.currentCut = Number(index);
  state.currentStep = 0;
  state.activeSlot = 0;
}

function openPassage() {
  state.passageOpen = true;
  shouldFocusPassageClose = true;
  shouldRestorePassageTrigger = false;
}

function closePassage() {
  state.passageOpen = false;
  shouldFocusPassageClose = false;
  shouldRestorePassageTrigger = true;
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
  } else if (action === 'check-step1') {
    checkStep1();
    checkActionToScroll = action;
  } else if (action === 'activate-slot') {
    activateSlot(target.dataset.slot);
  } else if (action === 'use-word') {
    placeChoice(target.dataset.choiceId);
  } else if (action === 'check-step2') {
    checkStep2();
    checkActionToScroll = action;
  } else if (action === 'reset-step2') {
    resetStep2();
  } else if (action === 'pick-order') {
    pickOrder(target.dataset.orderId);
  } else if (action === 'remove-order') {
    removeOrder(target.dataset.orderId);
  } else if (action === 'check-step3') {
    checkStep3();
    checkActionToScroll = action;
  } else if (action === 'reset-step3') {
    resetStep3();
  } else if (action === 'check-step4') {
    checkStep4();
    checkActionToScroll = action;
  } else if (action === 'check-step5') {
    checkStep5();
    checkActionToScroll = action;
  } else if (action === 'prev') {
    goPrev();
  } else if (action === 'next') {
    shouldScrollToImagePanel = goNext();
  } else if (action === 'restart') {
    restartAll();
  } else if (action === 'review-cut') {
    reviewCut(target.dataset.cutIndex);
  } else if (action === 'scroll-to-image') {
    scrollToImagePanel();
    shouldRender = false;
  } else if (action === 'open-passage') {
    openPassage();
  } else if (action === 'close-passage') {
    closePassage();
  } else {
    shouldRender = false;
  }

  if (shouldRender) {
    renderApp();
    if (shouldScrollStep1Selection) scheduleStep1SelectionScroll();
    if (checkActionToScroll) scheduleCheckActionToNextScroll(checkActionToScroll);
    if (shouldScrollToImagePanel) scheduleImagePanelScroll();
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
