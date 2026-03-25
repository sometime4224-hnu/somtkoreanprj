const IMG_BASE = '../assets/c10/images/split/';
const STEP_LABELS = ['객관식', '어휘 넣기', '순서 배열', '빈칸 쓰기', '전체 문장 쓰기'];
const STEP_GUIDES = [
  '그림에 맞는 문장을 먼저 골라 보세요.',
  '알맞은 말을 빈칸에 넣어 문장을 완성해 보세요.',
  '주어진 어절을 순서대로 눌러 배열해 보세요.',
  '이제 빈칸에 들어갈 말을 직접 써 보세요.',
  '마지막으로 도움 없이 전체 문장을 완성해 보세요.'
];

const cuts = [
  {
    id: 'cut01',
    imgFile: 'c10-cut01.webp',
    alt: '사랑에 빠진 연인들이 서로를 바라보는 장면',
    sentence: '사랑에 빠진 연인들은 서로의 사랑이 영원할 거라고 생각합니다.',
    mcqOptions: [
      '사랑에 빠진 연인들은 서로의 사랑이 영원할 거라고 생각합니다.',
      '사랑이 식었다고 생각해서 헤어지는 연인들이 많습니다.',
      '둘째, 사랑하는 마음을 자주 표현합니다.',
      '넷째, 함께 할 수 있는 취미를 만듭니다.'
    ],
    dropSegments: ['', ' 연인들은 서로의 사랑이 ', ' 거라고 생각합니다.'],
    dropAnswers: ['사랑에 빠진', '영원할'],
    dropChoices: ['사랑에 빠진', '영원할', '표현', '헤어지는'],
    orderTokens: ['사랑에 빠진', '연인들은', '서로의 사랑이', '영원할 거라고', '생각합니다.'],
    fillPrompt: '[1] 연인들은 서로의 사랑이 [2] 거라고 생각합니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['사랑에 빠진'] },
      { label: '빈칸 2', answers: ['영원할'] }
    ],
    hints: ['연인', '설렘', '서로 바라봄'],
    requiredKeywords: ['사랑', '연인', '영원'],
    acceptedPatterns: [
      '사랑에 빠진 연인들은 서로의 사랑이 영원하다고 생각합니다.'
    ]
  },
  {
    id: 'cut02',
    imgFile: 'c10-cut02.webp',
    alt: '시간이 지나 마음의 두근거림이 줄어드는 장면',
    sentence: '18개월에서 30개월이 지나면 더 이상 가슴이 두근거리지 않습니다.',
    mcqOptions: [
      '18개월에서 30개월이 지나면 더 이상 가슴이 두근거리지 않습니다.',
      '첫째, 서로를 있는 그대로 이해해 줍니다.',
      '사랑에 빠진 연인들은 서로의 사랑이 영원할 거라고 생각합니다.',
      '넷째, 함께 할 수 있는 취미를 만듭니다.'
    ],
    dropSegments: ['18개월에서 ', '이 지나면 더 이상 가슴이 ', ' 않습니다.'],
    dropAnswers: ['30개월', '두근거리지'],
    dropChoices: ['30개월', '두근거리지', '표현', '함께'],
    orderTokens: ['18개월에서 30개월이 지나면', '더 이상', '가슴이', '두근거리지', '않습니다.'],
    fillPrompt: '18개월에서 [1]이 지나면 더 이상 가슴이 [2] 않습니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['30개월'] },
      { label: '빈칸 2', answers: ['두근거리지'] }
    ],
    hints: ['시간 경과', '익숙해짐', '두근거림 감소'],
    requiredKeywords: ['18개월', '30개월', '두근거리'],
    acceptedPatterns: [
      '18개월에서 30개월이 지나면 가슴이 더 이상 두근거리지 않습니다.'
    ]
  },
  {
    id: 'cut03',
    imgFile: 'c10-cut03.webp',
    alt: '사랑이 식었다고 느껴 헤어지는 연인들의 장면',
    sentence: '사랑이 식었다고 생각해서 헤어지는 연인들이 많습니다.',
    mcqOptions: [
      '사랑이 식었다고 생각해서 헤어지는 연인들이 많습니다.',
      '사랑에 빠진 연인들은 서로의 사랑이 영원할 거라고 생각합니다.',
      '둘째, 사랑하는 마음을 자주 표현합니다.',
      '첫째, 서로를 있는 그대로 이해해 줍니다.'
    ],
    dropSegments: ['사랑이 ', '고 생각해서 ', ' 연인들이 많습니다.'],
    dropAnswers: ['식었다', '헤어지는'],
    dropChoices: ['식었다', '헤어지는', '있는', '취미'],
    orderTokens: ['사랑이 식었다고', '생각해서', '헤어지는', '연인들이', '많습니다.'],
    fillPrompt: '사랑이 [1]고 생각해서 [2] 연인들이 많습니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['식었다'] },
      { label: '빈칸 2', answers: ['헤어지는'] }
    ],
    hints: ['마음이 식음', '헤어짐', '연인'],
    requiredKeywords: ['사랑', '헤어지', '연인'],
    acceptedPatterns: [
      '사랑이 식었다고 생각해 헤어지는 연인들이 많습니다.'
    ]
  },
  {
    id: 'cut04',
    imgFile: 'c10-cut04.webp',
    alt: '서로를 있는 그대로 이해해 주는 모습',
    sentence: '첫째, 서로를 있는 그대로 이해해 줍니다.',
    mcqOptions: [
      '첫째, 서로를 있는 그대로 이해해 줍니다.',
      '18개월에서 30개월이 지나면 더 이상 가슴이 두근거리지 않습니다.',
      '둘째, 사랑하는 마음을 자주 표현합니다.',
      '넷째, 함께 할 수 있는 취미를 만듭니다.'
    ],
    dropSegments: ['첫째, 서로를 ', ' 그대로 ', ' 줍니다.'],
    dropAnswers: ['있는', '이해해'],
    dropChoices: ['있는', '이해해', '마음', '영원할'],
    orderTokens: ['첫째,', '서로를', '있는 그대로', '이해해', '줍니다.'],
    fillPrompt: '첫째, 서로를 [1] 그대로 [2] 줍니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['있는'] },
      { label: '빈칸 2', answers: ['이해해'] }
    ],
    hints: ['있는 그대로', '이해', '서로 받아들임'],
    requiredKeywords: ['첫째', '있는 그대로', '이해'],
    acceptedPatterns: [
      '첫째, 서로를 있는 그대로 이해합니다.',
      '첫째, 서로를 있는 그대로 이해해줍니다.'
    ]
  },
  {
    id: 'cut05',
    imgFile: 'c10-cut05.webp',
    alt: '사랑하는 마음을 자주 표현하는 장면',
    sentence: '둘째, 사랑하는 마음을 자주 표현합니다.',
    mcqOptions: [
      '둘째, 사랑하는 마음을 자주 표현합니다.',
      '사랑이 식었다고 생각해서 헤어지는 연인들이 많습니다.',
      '넷째, 함께 할 수 있는 취미를 만듭니다.',
      '첫째, 서로를 있는 그대로 이해해 줍니다.'
    ],
    dropSegments: ['둘째, 사랑하는 ', '을 자주 ', '합니다.'],
    dropAnswers: ['마음', '표현'],
    dropChoices: ['마음', '표현', '30개월', '있는'],
    orderTokens: ['둘째,', '사랑하는 마음을', '자주', '표현합니다.'],
    fillPrompt: '둘째, 사랑하는 [1]을 자주 [2]합니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['마음'] },
      { label: '빈칸 2', answers: ['표현'] }
    ],
    hints: ['마음', '자주 말함', '표현'],
    requiredKeywords: ['둘째', '마음', '표현'],
    acceptedPatterns: [
      '둘째, 사랑하는 마음을 자주 표현해 줍니다.',
      '둘째, 사랑하는 마음을 자주 표현해요.'
    ]
  },
  {
    id: 'cut06',
    imgFile: 'c10-cut06.webp',
    alt: '함께 할 수 있는 취미를 만드는 장면',
    sentence: '넷째, 함께 할 수 있는 취미를 만듭니다.',
    mcqOptions: [
      '넷째, 함께 할 수 있는 취미를 만듭니다.',
      '첫째, 서로를 있는 그대로 이해해 줍니다.',
      '사랑에 빠진 연인들은 서로의 사랑이 영원할 거라고 생각합니다.',
      '18개월에서 30개월이 지나면 더 이상 가슴이 두근거리지 않습니다.'
    ],
    dropSegments: ['넷째, ', ' 할 수 있는 ', '를 만듭니다.'],
    dropAnswers: ['함께', '취미'],
    dropChoices: ['함께', '취미', '표현', '연인'],
    orderTokens: ['넷째,', '함께 할 수 있는', '취미를', '만듭니다.'],
    fillPrompt: '넷째, [1] 할 수 있는 [2]를 만듭니다.',
    fillBlanks: [
      { label: '빈칸 1', answers: ['함께', '같이'] },
      { label: '빈칸 2', answers: ['취미'] }
    ],
    hints: ['함께', '취미', '같이 즐김'],
    requiredKeywords: ['넷째', '함께', '취미'],
    acceptedPatterns: [
      '넷째, 함께할 수 있는 취미를 만듭니다.',
      '넷째, 같이 할 수 있는 취미를 만듭니다.'
    ]
  }
];

const app = document.getElementById('app');

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

let state = buildInitialState();

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

function feedbackBlock(type, title, body, extra = '') {
  return `
    <div id="step-feedback" class="feedback ${type}">
      <strong>${title}</strong>
      <div>${body}</div>
      ${extra}
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
    return feedbackBlock('correct', '잘 골랐어요.', `그림의 핵심 내용을 정확하게 찾았습니다.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
  }
  return feedbackBlock('wrong', '다시 한 번 볼까요?', `그림과 가장 잘 맞는 문장은 다음입니다.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
}

function getStep2Feedback(cut, response) {
  if (!response.step2.checked) return '';
  if (response.step2.correct) {
    return feedbackBlock('correct', '빈칸이 잘 채워졌어요.', `핵심 어휘 두 개가 정확하게 들어갔습니다.<br>완성 문장: ${escapeHtml(cut.sentence)}`);
  }
  return feedbackBlock('warn', '빈칸 위치를 다시 볼까요?', `두 칸의 말을 다시 바꿔 보세요.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
}

function getStep3Feedback(cut, response) {
  if (!response.step3.checked) return '';
  if (response.step3.correct) {
    return feedbackBlock('correct', '순서가 맞습니다.', '어절의 흐름을 잘 배열했어요.');
  }
  return feedbackBlock('warn', '어절 순서를 다시 맞춰 보세요.', `문장의 자연스러운 순서를 다시 생각해 보세요.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
}

function getStep4Feedback(cut, response) {
  if (!response.step4.checked) return '';
  if (response.step4.correct) {
    return feedbackBlock('correct', '빈칸 쓰기 성공입니다.', `두 빈칸을 모두 정확하게 썼습니다.<br>완성 문장: ${escapeHtml(cut.sentence)}`);
  }
  if (response.step4.correctCount > 0) {
    return feedbackBlock('warn', '한 칸은 잘 썼어요.', `맞은 빈칸: ${response.step4.correctCount} / ${cut.fillBlanks.length}<br>모범 문장: ${escapeHtml(cut.sentence)}`);
  }
  return feedbackBlock('wrong', '빈칸을 다시 써 볼까요?', `핵심어를 다시 떠올려 보세요.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
}

function getStep5Feedback(cut, response) {
  if (!response.step5.checked || !response.step5.evaluation) return '';
  const result = response.step5.evaluation;
  if (result.level === 'exact') {
    return feedbackBlock('correct', '완전한 문장을 잘 썼어요.', `모범 문장과 거의 같습니다.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
  }
  if (result.level === 'accepted' || result.level === 'strong') {
    return feedbackBlock('correct', '의미와 핵심 표현이 잘 들어갔어요.', `표현이 조금 달라도 충분히 좋은 문장입니다.<br>모범 문장: ${escapeHtml(cut.sentence)}`);
  }
  if (result.level === 'partial') {
    const missing = result.missingKeywords.length ? `보완하면 좋은 핵심어: ${escapeHtml(result.missingKeywords.join(', '))}` : '';
    return feedbackBlock('warn', '조금만 더 다듬으면 좋아요.', `${missing}<br>모범 문장: ${escapeHtml(cut.sentence)}`);
  }
  return feedbackBlock('wrong', '핵심어를 더 살려서 다시 써 보세요.', `모범 문장: ${escapeHtml(cut.sentence)}`);
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

function renderImagePanel(cut) {
  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>컷 ${state.currentCut + 1}</h3>
          <p>그림을 먼저 보고, 표정과 행동에서 핵심 단서를 찾으세요.</p>
        </div>
        <span class="highlight-tag">그림 보기</span>
      </div>
      <div class="image-wrap">
        <img src="${IMG_BASE}${cut.imgFile}" alt="${escapeHtml(cut.alt)}">
      </div>
      <div class="image-caption">그림 속 인물, 행동, 분위기를 먼저 보고 아래 키워드로 상황을 추측해 보세요.</div>
      <div class="support-row">
        ${cut.hints.map((hint) => `<span class="support-chip">${escapeHtml(hint)}</span>`).join('')}
      </div>
    </section>
  `;
}

function renderStep1(cut, response) {
  const needsSelection = response.step1.selected === null;
  const needsCheck = response.step1.selected !== null && !response.step1.checked;
  const choicesBlock = `
    <div class="choice-list">
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
      <span>그림에 맞는 문장 하나를 고르세요.</span>
    </div>
    ${needsSelection ? renderGuideZone(choicesBlock, '먼저 맞는 문장을 하나 누르세요') : choicesBlock}
    ${needsCheck ? renderGuideZone(actionsBlock, '선택했으면 정답 확인을 누르세요') : actionsBlock}
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
      <span>알맞은 어휘를 끌어 놓거나 눌러서 빈칸에 넣으세요. 채워진 칸을 누르면 다시 비워집니다.</span>
    </div>
    ${needsPlacement ? renderGuideZone(workBlock, `빈칸 ${emptySlotIndex + 1}에 들어갈 말을 넣으세요`) : workBlock}
    ${!needsPlacement && !response.step2.checked ? renderGuideZone(actionsBlock, '모두 넣었으면 확인을 누르세요') : actionsBlock}
    ${getStep2Feedback(cut, response)}
  `;
}

function renderStep3(cut, response) {
  const arrangedItems = response.step3.arranged.map((id) => findById(response.step3.bankOrder, id));
  const bankItems = response.step3.bankOrder.filter((item) => !response.step3.arranged.includes(item.id));
  const needsOrdering = response.step3.arranged.length < cut.orderTokens.length;
  const orderLabel = response.step3.arranged.length === 0
    ? '아래 어절부터 눌러 위에 올리세요'
    : '남은 어절을 계속 눌러 문장을 완성하세요';
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
    ${!needsOrdering && !response.step3.checked ? renderGuideZone(actionsBlock, '문장이 완성되면 순서 확인을 누르세요') : actionsBlock}
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
    ${needsWriting ? renderGuideZone(workBlock, '빈칸 두 곳에 들어갈 말을 직접 쓰세요') : workBlock}
    ${!needsWriting && !response.step4.checked ? renderGuideZone(actionsBlock, '다 썼으면 빈칸 확인을 누르세요') : actionsBlock}
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
    ${!needsSentenceWrite && !response.step5.checked ? renderGuideZone(actionsBlock, '문장을 다 썼으면 확인을 누르세요') : actionsBlock}
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
    ? (state.currentStep === STEP_LABELS.length - 1 ? '마지막이면 종합 피드백으로 넘어가세요' : '이 단계가 끝났어요. 다음 단계로 가세요')
    : '이 컷이 끝났어요. 다음 컷으로 가세요';
  const nextButton = `<button type="button" class="nav-btn" data-action="next" ${canGoNext() ? '' : 'disabled'}>${nextLabel}</button>`;

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>${state.currentStep + 1}단계 · ${STEP_LABELS[state.currentStep]}</h3>
          <p>${STEP_GUIDES[state.currentStep]} 지금은 이 단계로 모든 컷을 차례대로 돌고 있습니다.</p>
        </div>
        <span class="highlight-tag">지금 하기</span>
      </div>
      ${content}
      <div class="actions">
        <div class="action-group">
          <button type="button" class="ghost-btn" data-action="prev" ${(state.currentCut === 0 && state.currentStep === 0) ? 'disabled' : ''}>이전</button>
          <button type="button" class="reset-btn" data-action="restart">처음부터</button>
        </div>
        ${canGoNext() ? renderGuideZone(nextButton, nextGuide, 'success', true) : nextButton}
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
  if (result.level === 'accepted' || result.level === 'strong') return '의미 맞음';
  if (result.level === 'partial') return '부분 성공';
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
          <h2 class="progress-title">컷 문장 쓰기 결과를 확인해 보세요</h2>
          <p class="progress-desc">어떤 단계가 쉬웠는지, 어느 컷을 다시 보면 좋은지 한눈에 볼 수 있습니다.</p>
        </div>
        <span class="focus-chip">마무리</span>
      </div>
    </div>

    <section class="summary-layout">
      <div class="summary-metrics">
        <div class="metric"><strong>${getStepMetricValue(0)} / ${cuts.length}</strong><span>객관식</span></div>
        <div class="metric"><strong>${getStepMetricValue(1)} / ${cuts.length}</strong><span>어휘 넣기</span></div>
        <div class="metric"><strong>${getStepMetricValue(2)} / ${cuts.length}</strong><span>순서 배열</span></div>
        <div class="metric"><strong>${getStepMetricValue(3)} / ${cuts.length}</strong><span>빈칸 쓰기</span></div>
        <div class="metric"><strong>${sentenceSuccess} / ${cuts.length}</strong><span>전체 문장 쓰기</span></div>
      </div>

      <div class="summary-card">
        <div class="panel-head">
          <div>
            <h3>컷별 확인</h3>
            <p>학생 문장과 모범 문장을 같이 보면서 다시 볼 컷을 고르세요.</p>
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
                <p>내 문장: ${response.step5.text.trim() ? escapeHtml(response.step5.text.trim()) : '아직 쓰지 않았어요.'}</p>
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
              <p>핵심어가 빠진 컷부터 다시 보면 학습 효과가 큽니다.</p>
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
    <div class="progress-card">
      <div class="progress-top">
        <div>
          <div class="eyebrow">${state.currentStep + 1}단계 / ${STEP_LABELS.length}단계</div>
          <h2 class="progress-title">${STEP_LABELS[state.currentStep]}</h2>
          <p class="progress-desc">현재 단계에서 컷 ${state.currentCut + 1} / ${cuts.length}를 진행 중입니다. 이번 단계를 모든 컷에 적용한 뒤 다음 단계로 넘어갑니다.</p>
        </div>
        <span class="focus-chip">컷 ${state.currentCut + 1}</span>
      </div>
      <div class="step-pills">${renderStepPills()}</div>
      <div class="cut-pills">${renderCutPills()}</div>
    </div>
    <div class="workspace">
      ${renderImagePanel(cut)}
      ${renderStepPanel(cut, response)}
    </div>
  `;
}

function renderApp() {
  app.innerHTML = state.view === 'summary' ? renderSummary() : renderActivity();
}

function resetStepFeedback() {
  const feedback = document.getElementById('step-feedback');
  if (feedback) feedback.remove();
  const nextButton = app.querySelector('[data-action="next"]');
  if (nextButton) nextButton.disabled = true;
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
  if (!canGoNext()) return;
  if (state.currentCut < cuts.length - 1) {
    state.currentCut += 1;
    state.activeSlot = 0;
    return;
  }
  if (state.currentStep < STEP_LABELS.length - 1) {
    state.currentStep += 1;
    state.currentCut = 0;
    state.activeSlot = 0;
    return;
  }
  state.view = 'summary';
}

function restartAll() {
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

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const { action } = target.dataset;
  let shouldRender = true;

  if (action === 'select-choice') selectChoice(target.dataset.optionId);
  else if (action === 'check-step1') checkStep1();
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
  else if (action === 'next') goNext();
  else if (action === 'restart') restartAll();
  else if (action === 'review-cut') reviewCut(target.dataset.cutIndex);
  else shouldRender = false;

  if (shouldRender) {
    renderApp();
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

renderApp();
