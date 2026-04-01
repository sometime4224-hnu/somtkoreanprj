# Grammar Detective Board

교실 TV 화면에 띄워 두고 함께 읽는 문법 추리 보드입니다.

- `1-1`: `-고 있다` 중심의 이름 매칭
- `1-2`: `-던` 중심의 과거 장면 회상
- `1-3`: `-았/었-`, `-던`, `-고 있었다`를 함께 쓰는 사건 추리

## 조작

- `이전/다음 단계`: 스테이지 이동
- `이전/다음 질문`: 매칭 질문 이동 또는 사건 단서 공개 수 조절
- `팀 투표판`: 1~4팀 의견 기록
- `최다표를 최종 선택으로`: 가장 많은 표를 받은 인물을 교사 선택으로 복사
- `정답 공개`: 현재 질문 또는 사건의 정답 표시

키보드 단축키:

- `← / →`: 질문 이동 또는 단서 수 조절
- `PageUp / PageDown`: 단계 이동
- `A`: 에셋 모드 토글

## 데이터 구조

스테이지 데이터는 `src/data.js`에서 관리합니다.

- `background`: 장면 배경
- `props`: 재사용 가능한 소품
- `cast`: 인물 위치, 대표 소지품, 행동
- `prompts`: 1, 2단계의 이름 맞히기 질문
- `clues`: 3단계 사건 추리 단서
- `answer`: 사건 정답과 이유

## Gemini 에셋 슬롯

에셋 모드를 켜면 각 배경, 소품, 인물에 고정 슬롯 ID가 표시됩니다.

- 슬롯 규격: `apps/grammar-detective/assets/asset-manifest.json`
- 프롬프트 가이드: `apps/grammar-detective/assets/GEMINI_PROMPT_GUIDE.md`

생성 이미지는 chapter-first 규칙에 맞춰 아래 경로에 저장합니다.

- `assets/c10/grammar/images/grammar-detective/`
- `assets/c11/grammar/images/grammar-detective/`
- `assets/c12/grammar/images/grammar-detective/`
- `assets/c13/grammar/images/grammar-detective/`

현재 `c11`은 후속 브리지 스테이지를 위한 예약 폴더로 비워 두었습니다.
