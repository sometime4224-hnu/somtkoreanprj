# Gemini Prompt Guide

`grammar-detective`는 슬롯 고정형 에셋 구조를 사용합니다.

## 기본 규칙

- 배경: 가로형 16:9 일러스트, 텍스트 없음
- 인물: 투명 배경 cutout WebP, 전신 또는 3/4신, 같은 학생은 스테이지가 달라도 대표 복장 유지
- 소품: 투명 배경 cutout WebP, 단독 오브젝트, 텍스트 없음
- 저장 경로: `assets/cXX/grammar/images/grammar-detective/<slot_id>.webp`

## 권장 프롬프트 템플릿

### 배경

`Create a wide classroom game background for a Korean grammar detective lesson.`

- visual brief: `{stage background brief}`
- style: clean educational illustration, warm daylight, readable shapes, no text, no watermark
- output: 16:9 composition

### 인물

`Create a reusable character cutout for a Korean classroom detective board.`

- character brief: `{cast asset brief}`
- style: clean educational illustration, consistent proportions, transparent background, no text
- output: single character cutout

### 소품

`Create a reusable prop cutout for a Korean classroom detective board.`

- prop brief: `{prop asset brief}`
- style: clean educational illustration, transparent background, centered object, no text
- output: single prop cutout

## 슬롯 운영 팁

- 같은 인물은 슬롯을 새로 만들지 말고 기존 슬롯 이미지만 교체합니다.
- 장면 배경과 인물 컷아웃은 색온도와 그림자 방향을 맞추면 조합이 자연스럽습니다.
- 학생 식별용 핵심 단서 하나는 항상 시각적으로 크게 남깁니다.

## 현재 슬롯 범위

- `gd-c13-s1`: `-고 있다` 장면
- `gd-c10-s2`: `-던` 장면
- `gd-c12-s3`: 사건 추리 장면

세부 슬롯 목록은 `asset-manifest.json`을 기준으로 관리합니다.
