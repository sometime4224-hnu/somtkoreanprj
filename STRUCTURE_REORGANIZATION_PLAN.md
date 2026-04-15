# Structure Reorganization Plan

## 1. 정리 원칙

앞으로의 기준은 단순하다.

- 저장소 안: 배포 가능한 페이지, 소스 코드, 공용 자산, 유지할 문서
- 저장소 밖: 스크린샷, PDF 추출물, 임시 산출물, 수동 백업, 배포 전 검토용 ZIP

즉, 저장소는 제품 본체로 유지하고, 작업 흔적과 보관물은 별도 로컬 아카이브로 분리한다.

## 2. 목표 구조

```text
korean3Bimprove/
  index.html
  c10/
  c11/
  c12/
  c13/
  c14/
  apps/
  assets/
  review/
  shared/
  scripts/
  tests/
  README.md
  LICENSE.md
  ASSET_PATH_GUIDELINES.md
  PATH_STRUCTURE_REPORT.md
  STRUCTURE_REORGANIZATION_PLAN.md

korean3Bimprove_local_archive_YYYYMMDD/
  .codex_tmp/
  tmp/
  backup/
  root-files/
```

## 3. 실행 규칙

1. 루트에는 바로 열어야 하는 페이지와 핵심 문서만 둔다.
2. 장기 보관이 필요한 캡처와 임시 산출물은 `korean3Bimprove_local_archive_YYYYMMDD/` 같은 형식의 바깥 폴더로 옮긴다.
3. ZIP, PDF, 비교 이미지, 시험 대비 묶음처럼 배포 대상이 아닌 산출물은 루트에 오래 두지 않는다.
4. 실험은 우선 브랜치로 분리하고, 임시 파일 폴더는 짧게 쓰고 비운다.
5. 로컬에서만 숨겨야 하는 규칙을 늘리기보다, 가능한 한 공용 `.gitignore` 또는 저장소 밖 이동으로 해결한다.

## 4. 작업 우선순위

### 즉시 정리 대상

- 인코딩이 깨졌거나 오래된 구조 문서
- `.git/info/exclude`에만 있는 로컬 전용 예외 규칙
- `.codex_tmp/`, `tmp/`의 대용량 임시 파일

### 주기적으로 확인할 대상

- 외부 로컬 아카이브 폴더의 누적 용량
- 루트에 새로 생긴 ZIP, PDF, 디버그 PNG
- 한 번성 백업이 저장소 안으로 다시 들어왔는지 여부

## 5. 운영 메모

- 작은 수정은 `main`에서 바로 작업한다.
- 파일 이동, 경로 재배치, 대규모 리팩터링, 실험성 UI 변경은 브랜치에서 진행한다.
- 실험 브랜치는 GitHub Pages 배포 검토에 활용하고, 끝나면 정리한다.
- 정리 작업이 끝난 뒤에는 필요 시 `git gc`로 저장소 메타데이터를 압축한다.
