# Path Structure Report

## 목적

이 문서는 현재 프로젝트 루트의 파일/폴더 구조를 검토하고, 경로 일관성을 확보하기 위해 어떤 폴더를 유지하고, 어떤 폴더를 분리하고, 어떤 이름을 정리해야 하는지 제안하기 위한 보고서입니다.

검토 기준은 아래 3가지입니다.

- 실제 서비스/수업 페이지로 보이는 파일과 폴더인가
- 경로 참조가 일관되고 유지보수 가능한가
- GitHub 저장소에 올렸을 때 불필요한 파일이 섞이지 않는가

## 현재 구조 요약

현재 루트는 하나의 정리된 웹 프로젝트라기보다, 아래 성격이 서로 다른 항목이 한 곳에 섞여 있는 상태입니다.

- 실제 공개/수업용 페이지
  - `index.html`
  - `review-quiz-10-12.html`
  - `c10/`
  - `c11/`
  - `c12/`
  - `shared/`
  - `speaking-lab.html`
  - `vietnamese-pronunciation-lab.html`

- 자산 폴더
  - `imagesource/`
  - `c11img/`
  - `c12img/`

- 실험/보조 프로젝트
  - `career-interview-sim/`
  - `career-interview-sim-lite/`
  - `formal-lab/`
  - `writeclass/`
  - `voiceinvader.html`
  - `pronunciation-practice.html`
  - `escape.html`

- 백업/임시/작업 산출물
  - `backup/`
  - `.tmp_imgcmp/`
  - 루트의 다수 PNG 스크린샷 파일
  - `input_recording.m4a`
  - `tmp_korean_test.txt`
  - `새 텍스트 문서.txt`

- 로컬 도구/개발 환경
  - `.tools/`
  - `.claude/`
  - `c11/.claude/`

## 핵심 진단

### 1. 루트 폴더에 역할이 다른 항목이 너무 많이 섞여 있습니다

현재 루트에는 수업 본편, 실험용 페이지, 이미지 원본, 이미지 가공본, 백업, 스크린샷, 음성 원본, 로컬 도구가 함께 있습니다.

이 구조에서는 아래 문제가 반복됩니다.

- 무엇이 실제 배포 대상인지 즉시 판단하기 어렵습니다.
- Git 커밋 시 불필요한 파일이 함께 올라가기 쉽습니다.
- 폴더명을 바꾸면 어떤 페이지가 깨질지 예측하기 어렵습니다.
- 백업본과 실제 사용본이 같은 레벨에 있어 최신 파일을 고르기 어렵습니다.

### 2. 챕터 폴더는 비교적 중심 구조이지만, 내부 파일명 규칙이 제각각입니다

`c10/`, `c11/`, `c12/`는 현재 프로젝트의 핵심 본편으로 보입니다. 다만 내부 파일명 규칙은 통일되어 있지 않습니다.

대표 사례:

- `c11/gram3-1.html`, `c11/gram3-2.html`
- `c11/conv2.html`
- `c11/speak_pro.html`
- `c10/g1gamesoc.html`
- `c10/grammar34game.html`
- `c10/vocabulary-upgraded.html`
- `c10/vocabulary-upgraded-v2.html`
- `c10/vocabulary-upgraded-v3.html`
- `c10/listen1_backup_original.html`
- `c10/listen1_backup_nounverbmask.html`
- `c12/grammar1-upgraded.html`
- `c12/speak-upgraded.html`

문제는 "현재 실제 사용본"과 "옛 버전/실험본/백업본"이 같은 폴더에 섞여 있다는 점입니다.

### 3. 실제 깨질 가능성이 있는 경로 불일치가 확인됩니다

확인된 대표 사례:

- 루트 허브가 존재하지 않는 챕터를 직접 링크합니다.
  - `index.html`에서 `c13/index.html` ~ `c18/index.html` 링크 존재

- `c10/index.html`이 존재하지 않는 파일명을 사용합니다.
  - `grammar34-life-rpg.html`
  - `g1game-soccer.html`
  - 실제 폴더에는 `grammar34game.html`, `g1gamesoc.html`가 있습니다.

- `c12/vocabulary.html`은 존재하지 않는 자산 기준 경로를 사용합니다.
  - `const c12ImageBasePath = "../imagesource/c12img";`
  - 현재 `imagesource/` 아래에는 `c12img/`가 없고, 별도 루트 폴더 `c12img/`만 있습니다.

- `voiceinvader.html`은 루트에 있으면서 뒤로 가기 링크를 `../index.html`로 가리킵니다.
  - 루트 기준이라면 `index.html`이어야 맞습니다.

### 4. 자산 폴더 구조가 중복되거나 모호합니다

확인 결과:

- `c11img/`와 `imagesource/c11img/`는 정확히 같은 202개 파일을 중복 보관하고 있습니다.
- `c12img/`는 루트에 존재하지만, `c12/vocabulary.html`은 `imagesource/c12img`를 참조합니다.
- `imagesource/`라는 이름은 "원본"인지 "실사용 자산"인지 의미가 불명확합니다.

즉, 현재는 아래 3개 개념이 분리되지 않았습니다.

- 원본 자산
- 가공된 실사용 자산
- 백업/변형 자산

### 5. 공백, 버전 접미사, 임시 이름이 경로 일관성을 해칩니다

대표 사례:

- `c12 reference voice source_split/`
- `c12 reference voice source.m4a`
- `12과 어휘 이미지 (1).png`
- `gatev2.html`, `gatev3.html`
- `vocabulary-upgraded-v3.html`

이런 이름은 사람이 보기엔 이해되더라도, 프로젝트가 커질수록 아래 문제가 생깁니다.

- 어떤 파일이 최종본인지 불명확
- 링크 수정 시 실수 가능성 증가
- 스크립트/자동화 처리 불편
- Git diff와 파일 검색 가독성 저하

### 6. 별도 프로젝트가 같은 저장소 루트에 섞여 있습니다

다음 항목은 현재 수업 본편과는 성격이 다릅니다.

- `career-interview-sim/`
  - Vite 기반 별도 앱 구조
  - `node_modules/`, `dist/`, `src/` 포함

- `career-interview-sim-lite/`
  - 경량 버전 또는 프로토타입 성격

- `formal-lab/`
- `writeclass/`

이 항목들은 유지할 수는 있지만, 루트의 메인 수업 구조와 같은 계층에 두면 프로젝트의 성격이 흐려집니다.

### 7. 루트에 작업 산출물이 많이 남아 있습니다

예:

- `listen1-shot*.png`
- `listen2-shot*.png`
- `c11-listen1-shot*.png`
- `vocab-debug-shot.png`
- `vocab-fixed-shot.png`
- `input_recording.m4a`

이 파일들은 현재 서비스 구조보다 작업 기록에 가깝고, 루트에 남겨두면 Git 저장소 품질이 바로 떨어집니다.

## 결론

가장 안전한 방향은 "대규모 경로 변경"보다 먼저 "배포 대상과 작업용 자료 분리"를 하는 것입니다.

즉, 지금 당장 `c10/`, `c11/`, `c12/`를 통째로 `lessons/` 아래로 옮기는 것보다 아래 순서가 안전합니다.

1. 루트에서 비배포 파일을 분리
2. 챕터 내부에서 파일명 규칙 통일
3. 자산 폴더를 한 군데로 통합
4. 그다음 필요하면 상위 구조까지 재배치

## 권장 목표 구조

### 1차 정리안: 경로 파손을 최소화하는 보수적 구조

이 안은 현재 링크를 크게 깨지 않으면서 정리하는 방법입니다.

```text
/
  index.html
  review-quiz-10-12.html
  speaking-lab.html
  vietnamese-pronunciation-lab.html
  shared/
  c10/
  c11/
  c12/
  imagesource/
  _assets_work/
  _apps/
  _archive/
  _tools/
```

권장 이동 대상:

- `_archive/`
  - `backup/`
  - 챕터 내부의 `*_backup_*`, `*upgraded*`, `*v2*`, `*v3*` 중 현재 미사용본

- `_assets_work/`
  - 루트 스크린샷 PNG
  - `input_recording.m4a`
  - 임시 비교 이미지
  - 원본 작업 이미지

- `_apps/`
  - `career-interview-sim/`
  - `career-interview-sim-lite/`
  - `formal-lab/`
  - `writeclass/`
  - `voiceinvader.html`
  - `pronunciation-practice.html`
  - `escape.html`

- `_tools/`
  - `.tools/`
  - `.claude/`
  - `c11/.claude/`

이 구조의 장점은 현재 메인 수업 경로를 거의 유지할 수 있다는 점입니다.

### 2차 정리안: 장기적으로 가장 깔끔한 구조

```text
/
  index.html
  shared/
  lessons/
    c10/
    c11/
    c12/
  assets/
    c10/
    c11/
    c12/
  labs/
    speaking/
    vietnamese-pronunciation/
  apps/
    career-interview-sim/
    career-interview-sim-lite/
    formal-lab/
    writeclass/
  archive/
  tools/
```

다만 이 안은 `href`와 이미지 경로를 많이 수정해야 하므로, 첫 Git 정리 전에는 권장하지 않습니다.

## 폴더명/파일명 정리 권장안

### 유지 권장

- `c10/`
- `c11/`
- `c12/`
- `shared/`

이 4개는 현재 메인 구조의 중심이므로, 당장 이름을 바꾸지 않는 편이 안전합니다.

### 우선 통합 권장

- `c11img/`와 `imagesource/c11img/`
  - 둘 중 하나만 남겨야 합니다.
  - 현재 참조는 `imagesource/c11img/...` 쪽이므로, 단기적으로는 `imagesource/c11img/`를 기준 폴더로 삼고 루트 `c11img/`는 작업용 또는 보관용으로 이동하는 편이 안전합니다.

- `c12img/`
  - `c12/vocabulary.html` 기준으로는 현재 경로가 맞지 않습니다.
  - 둘 중 하나를 선택해야 합니다.
  - 선택안 A: `imagesource/c12img/`를 새로 만들고 자산을 옮긴 뒤 코드 유지
  - 선택안 B: `c12/vocabulary.html`의 기준 경로를 `../c12img` 또는 새 공통 자산 폴더로 수정

### 이름 변경 권장

- `gram3-1.html` -> `grammar3-drill-1.html`
- `gram3-2.html` -> `grammar3-drill-2.html`
- `conv2.html` -> `conversation-2.html`
- `speak_pro.html` -> `speaking-pro.html`
- `g1gamesoc.html` -> `grammar1-soccer-game.html`
- `grammar34game.html` -> `grammar34-life-rpg.html` 또는 반대로 하나만 유지
- `c12 reference voice source_split/` -> `reference-audio-split/`
- `c12 reference voice source.m4a` -> `reference-audio.m4a`

### 이름 유지보다 "정리 폴더 이동"이 더 적합한 항목

- `vocabulary-upgraded.html`
- `vocabulary-upgraded-v2.html`
- `vocabulary-upgraded-v3.html`
- `grammar1-upgraded.html`
- `grammar2-upgraded.html`
- `grammar3-upgraded.html`
- `grammar4-upgraded.html`
- `listen1_backup_original.html`
- `listen1_backup_nounverbmask.html`
- `listen2_backup_original.html`
- `listen2_backup_nounverbmask.html`

이 파일들은 리네임보다는 먼저 `archive/variants/` 또는 챕터별 `_archive/`로 분리하는 편이 더 좋습니다.

## 지금 기준으로 남겨야 할 "실제 운영 구조"

우선 아래만 메인 프로젝트로 보고 정리하는 것이 좋습니다.

- `index.html`
- `review-quiz-10-12.html`
- `speaking-lab.html`
- `vietnamese-pronunciation-lab.html`
- `shared/`
- `c10/`
- `c11/`
- `c12/`
- 실사용 자산 폴더 1세트

그 외는 보조 프로젝트, 백업, 작업 파일로 분류하는 편이 안전합니다.

## 우선순위 제안

### 1순위

- 루트에서 비배포 파일 분리
- `backup/`, `.tools/`, 스크린샷 PNG, 임시 오디오, 임시 텍스트 파일 이동
- `c11img/` 중복 제거 방향 결정
- `c12/vocabulary.html` 자산 경로 기준 결정

### 2순위

- `index.html`의 없는 챕터 링크 정리
- `c10/index.html`의 실제 파일명과 메뉴 링크 일치시키기
- `voiceinvader.html` 잘못된 뒤로 가기 경로 수정

### 3순위

- 챕터 내부 파일명 규칙 통일
- `backup`, `upgraded`, `v2`, `v3` 파일을 별도 보관 폴더로 이동
- 공백/임시 명명 제거

## 최종 권장 방향

가장 현실적인 정리 기준은 아래입니다.

- 루트는 "메인 수업 진입점 + 챕터 폴더 + shared + 소수의 공개 도구"만 남긴다.
- 자산은 "실사용 폴더 1개"와 "원본/작업 폴더 1개"로 나눈다.
- 별도 앱은 `_apps/`로 묶는다.
- 백업과 스크린샷은 `_archive/` 또는 로컬 외부 폴더로 뺀다.
- `backup`, `upgraded`, `v2`, `v3`는 운영 폴더에서 제거한다.

## 한 줄 권고

지금은 "폴더명을 예쁘게 바꾸는 단계"보다 먼저 "운영 파일과 작업 파일을 분리하는 단계"가 우선입니다. 그 정리가 끝난 뒤에만 경로 변경을 해도, 링크 파손 없이 훨씬 안전하게 구조를 다듬을 수 있습니다.
