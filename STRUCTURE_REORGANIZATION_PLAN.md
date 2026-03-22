# Structure Reorganization Plan

## 1. 확정된 기준

이 계획은 아래 기준을 전제로 합니다.

- `c10/`, `c11/`, `c12/`, 상위 `index.html`, `shared/`는 메인 프로젝트다.
- 사이드 프로젝트는 삭제하지 않고 한곳에 모은다.
- 백업 자료는 `backup/` 아래에 유형별로 모은다.
- 메인 프로젝트 자산 구조는 작업 효율성과 확장성을 기준으로 통일한다.

## 2. 최종 권장 구조

메인 프로젝트를 흔들지 않으면서 정리하기에 가장 안전한 구조는 아래와 같습니다.

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
  assets/
    c10/
      images/
      audio/
    c11/
      images/
      audio/
    c12/
      images/
      audio/
    shared/
  apps/
    career-interview-sim/
    career-interview-sim-lite/
    formal-lab/
    writeclass/
    standalone-pages/
  backup/
    html-variants/
    screenshots/
    audio-work/
    asset-sources/
    project-snapshots/
    unsorted/
  .tools/
  .claude/
```

## 3. 자산 구조에 대한 최종 의견

### 권장안

`챕터 폴더 내부에 자산을 넣는 방식`보다 `최상위 assets 폴더 아래에 챕터별로 나누는 방식`을 권장합니다.

즉, 아래 방식입니다.

```text
assets/
  c10/
  c11/
  c12/
```

### 이유

- 페이지와 자산의 역할이 분리되어 구조가 명확해집니다.
- `c13`, `c14`가 추가되어도 같은 규칙으로 확장할 수 있습니다.
- 현재처럼 `c11img/`, `imagesource/c11img/`, `c12img/`처럼 자산 폴더가 여러 군데로 흩어지는 문제를 줄일 수 있습니다.
- 루트 `index.html`이나 챕터 밖 공용 페이지가 자산을 참조할 때도 규칙이 단순합니다.
- 이미지, 오디오, 공통 자산을 별도 정리하기 쉬워집니다.

### 비권장안

아래처럼 챕터마다 `assets/`를 넣는 방식은 이번 프로젝트에는 덜 적합합니다.

```text
c10/assets/
c11/assets/
c12/assets/
```

이 방식은 챕터를 완전히 독립 배포할 때는 편할 수 있지만, 현재처럼 하나의 메인 허브와 공용 `shared/`를 쓰는 구조에서는 자산 중복과 관리 분산이 더 쉽게 생깁니다.

## 4. 자산 폴더 규칙

이후 메인 프로젝트 자산은 아래 규칙으로 맞추는 것을 권장합니다.

- 메인 자산은 모두 `assets/` 아래에 둔다.
- 챕터별 자산은 `assets/c10`, `assets/c11`, `assets/c12`로 구분한다.
- 실제 페이지에서 쓰는 파일만 `assets/`에 둔다.
- 원본 이미지, 편집 중간본, 실험 버전은 `backup/asset-sources/`로 보낸다.
- 공용 자산이 생기면 `assets/shared/`를 사용한다.

예시:

```text
assets/
  c10/
    images/
    audio/
  c11/
    images/
    audio/
  c12/
    images/
    audio/
  shared/
```

## 5. 현재 폴더별 처리 방침

### 유지

아래 항목은 현재 위치를 유지합니다.

- `index.html`
- `review-quiz-10-12.html`
- `speaking-lab.html`
- `vietnamese-pronunciation-lab.html`
- `shared/`
- `c10/`
- `c11/`
- `c12/`

### 이동

아래 항목은 메인 프로젝트 밖으로 분리합니다.

- `career-interview-sim/` -> `apps/career-interview-sim/`
- `career-interview-sim-lite/` -> `apps/career-interview-sim-lite/`
- `formal-lab/` -> `apps/formal-lab/`
- `writeclass/` -> `apps/writeclass/`
- `voiceinvader.html` -> `apps/standalone-pages/voiceinvader.html`
- `escape.html` -> `apps/standalone-pages/escape.html`
- `pronunciation-practice.html` -> `apps/standalone-pages/pronunciation-practice.html`

### 백업 이동

아래 항목은 `backup/` 기준으로 재배치합니다.

- 루트 스크린샷 PNG -> `backup/screenshots/`
- `input_recording.m4a` -> `backup/audio-work/`
- `tmp_korean_test.txt` -> `backup/unsorted/`
- `새 텍스트 문서.txt` -> `backup/unsorted/`
- 챕터 내부 `*_backup_*` HTML -> `backup/html-variants/`
- `*upgraded*`, `*v2*`, `*v3*` 중 현재 미사용본 -> `backup/html-variants/`
- 기존 `backup/` 폴더 안의 스냅샷은 `backup/project-snapshots/` 기준으로 재정리

### 로컬 전용 유지 또는 Git 제외

아래 항목은 메인 프로젝트 구조에는 필요 없으므로 로컬 전용으로 유지하거나 Git에서 제외합니다.

- `.tools/`
- `.claude/`
- `c11/.claude/`
- `career-interview-sim/node_modules/`
- `career-interview-sim/dist/`
- `.tmp_imgcmp/`

## 6. 자산 폴더 통합 계획

### c10

현재 `c10`은 주로 `imagesource/` 쪽 자산을 참조하고 있습니다.

권장 이동 방향:

- `imagesource/split/`, `imagesource/split_text_hidden/`, `imagesource/split_text_hidden_mobile/`, `imagesource/split_text_hidden_mobile_vocab/`
  -> `assets/c10/images/`
- `c10/Trk_09.mp3`, `c10/Trk_10.mp3`
  -> `assets/c10/audio/`
- `imagesource/` 루트의 원본 PNG
  -> 필요시 `backup/asset-sources/c10/`

### c11

현재 `c11`은 `../imagesource/c11img/...`를 참조하고 있고, 동시에 루트 `c11img/`가 동일 내용으로 중복 존재합니다.

권장 방향:

- `imagesource/c11img/`를 현재 기준 자산 소스로 본다.
- `c11img/`는 중복이므로 최종적으로 제거하거나 `backup/asset-sources/c11-duplicate/`로 이동한다.
- 실제 서비스용 파일은 `assets/c11/images/`로 모은다.
- `c11` HTML의 이미지 참조를 나중에 `../assets/c11/images/...` 기준으로 변경한다.

### c12

현재 `c12/vocabulary.html`은 `../imagesource/c12img`를 바라보지만 실제 폴더는 루트 `c12img/`입니다.

권장 방향:

- `c12img/`를 `assets/c12/images/`로 옮긴다.
- `c12/vocabulary.html`과 `c12/vocab-card-game.html`의 경로 기준을 `../assets/c12/images/...`로 통일한다.
- `c12` 음성 원본과 분할 파일은 실제 서비스용과 원본용을 나눈다.
- `c12 reference voice source.m4a`
  -> `backup/audio-work/c12/reference-audio.m4a`
- `c12 reference voice source_split/`
  -> `backup/audio-work/c12/reference-audio-split/`

## 7. 파일명 규칙

향후 새 파일은 아래 규칙을 따르는 것을 권장합니다.

- 폴더명은 소문자와 하이픈 위주로 사용한다.
- 공백은 피한다.
- `v2`, `v3`, `upgraded`, `final-final` 같은 임시 표기를 운영 파일명에 남기지 않는다.
- 챕터 파일은 역할이 드러나게 적는다.

예시:

- `grammar3-drill-1.html`
- `grammar3-drill-2.html`
- `speaking-pro.html`
- `grammar1-soccer-game.html`
- `grammar34-life-rpg.html`

## 8. 링크/경로 수정 우선순위

폴더 이동 전에 아래 불일치 항목을 기록해두고, 이동 후 한 번에 수정하는 것이 좋습니다.

### 즉시 확인 대상

- `index.html`
  - `c13/index.html` ~ `c18/index.html` 링크 존재
- `c10/index.html`
  - `grammar34-life-rpg.html` 링크가 실제 파일명과 불일치 가능
  - `g1game-soccer.html` 링크가 실제 파일명과 불일치 가능
- `c12/vocabulary.html`
  - `../imagesource/c12img` 경로가 현재 구조와 불일치
- `voiceinvader.html`
  - 루트에 있으면서 `../index.html`로 이동하는 링크 존재

## 9. 실제 실행 순서

### Phase 1. 상위 구조 만들기

먼저 아래 폴더를 만든다.

- `assets/`
- `assets/c10/`
- `assets/c11/`
- `assets/c12/`
- `assets/shared/`
- `apps/`
- `apps/standalone-pages/`
- `backup/html-variants/`
- `backup/screenshots/`
- `backup/audio-work/`
- `backup/asset-sources/`
- `backup/project-snapshots/`
- `backup/unsorted/`

### Phase 2. 사이드 프로젝트 이동

아래 항목을 `apps/`로 먼저 이동한다.

- `career-interview-sim/`
- `career-interview-sim-lite/`
- `formal-lab/`
- `writeclass/`
- `voiceinvader.html`
- `escape.html`
- `pronunciation-practice.html`

이 단계는 메인 챕터 경로에 거의 영향을 주지 않으므로 먼저 처리하기 좋습니다.

### Phase 3. 백업/작업 산출물 이동

아래 항목을 `backup/`으로 이동한다.

- 루트 PNG 스크린샷
- 임시 오디오
- 임시 텍스트 파일
- 챕터 내부의 백업 HTML
- 사용 여부가 불분명한 변형본 HTML

### Phase 4. 자산 통합

아래 기준으로 실제 서비스용 자산을 `assets/` 아래로 모은다.

- `c10` 관련 실사용 이미지와 오디오 -> `assets/c10/`
- `c11` 관련 실사용 이미지와 오디오 -> `assets/c11/`
- `c12` 관련 실사용 이미지와 오디오 -> `assets/c12/`

원본/중간본/중복본은 `backup/asset-sources/`로 이동한다.

### Phase 5. 코드 내 경로 수정

폴더 이동이 끝난 뒤 HTML/JS/CSS 안의 자산 경로를 새 규칙으로 변경한다.

예:

- `../imagesource/c11img/...`
  -> `../assets/c11/images/...`
- `../imagesource/c12img/...`
  -> `../assets/c12/images/...`
- 챕터 오디오 파일 경로
  -> `../assets/c10/audio/...` 또는 해당 챕터 경로

### Phase 6. 메인 링크 정리

마지막으로 메인 허브와 챕터 허브의 링크를 정리한다.

- 없는 챕터 링크 제거 또는 비활성화
- 실제 파일명과 메뉴 링크 일치
- 잘못된 상대경로 수정

## 10. 이번 정리에서의 원칙

- 메인 챕터 폴더 `c10`, `c11`, `c12`는 당장 이름을 바꾸지 않는다.
- 메인 페이지 구조보다 먼저 자산 규칙을 통일한다.
- 원본과 실사용본을 절대 같은 폴더에 섞지 않는다.
- 백업 파일은 삭제하지 말고 `backup/` 아래로 옮긴다.
- 경로 수정은 이동 후 한 번에 처리한다.

## 11. 바로 실행해도 되는 1차 작업

지금 바로 착수해도 안전한 작업은 아래 3가지입니다.

- `apps/`로 사이드 프로젝트 이동
- `backup/`로 루트 스크린샷과 임시 파일 이동
- `assets/` 상위 구조 생성

이 3가지는 메인 챕터의 실제 페이지 경로를 거의 건드리지 않으면서 구조를 빠르게 안정화할 수 있습니다.
