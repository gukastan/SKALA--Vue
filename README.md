# Weather Pet

도시별 날씨와 다마고치형 펫 시뮬레이션을 결합한 Vue 학습 프로젝트입니다.

사용자가 도시를 선택하면 해당 도시의 날씨와 랜드마크 배경이 적용되고, 날씨 조건에 따라 펫의 상태와 메시지가 변화합니다.

또한 완성된 서비스를 사용하는 것에서 끝나지 않고, Vue가 내부에서 어떻게 동작하는지 확인할 수 있도록 `구현 원리`, `학습모드`, `실습 부록`을 함께 구성했습니다.

---

## Problem

기본 날씨 애플리케이션은 일반적으로 다음 흐름에서 끝납니다.

```text
도시 선택
→ 날씨 정보 출력
→ 종료
```

이 방식은 Vue 실습 결과를 확인하기에는 충분하지만, 학습자가 다음 내용을 이해하기는 어렵다고 생각했습니다.

- 도시를 클릭했을 때 어떤 이벤트가 발생하는가?
- 데이터가 어디에서 변경되는가?
- 데이터가 바뀌면 왜 화면도 자동으로 변경되는가?
- `ref`, `computed`, `v-for`, `v-if`, Pinia 등의 기능이 실제 애플리케이션에서는 어디에 사용되는가?

또한 수업 중 작성한 여러 Vue 실습 코드가 각각 독립된 파일로 남아 있어, 수업 이후 다시 찾아보고 실행하기 번거로운 문제가 있었습니다.

---

## Solution

### 1. Weather + Pet

단순히 날씨를 출력하는 대신 날씨 데이터를 펫의 환경과 상태에 연결했습니다.

```text
도시 선택
→ 도시별 픽셀 배경 변경
→ 날씨 정보 적용
→ 펫 상태 변화
→ 사용자 돌봄 행동
```

예를 들어 비가 오는 도시에서는 펫에게 실내 휴식을 추천하고, 기온과 날씨 상태에 따라 펫의 상태와 메시지가 달라집니다.

### 2. 학습모드

학습모드 토글을 켜면 현재 보고 있는 화면에서 어떤 Vue 개념이 사용되고 있는지 확인할 수 있습니다.

예시:

```text
도시 카드 클릭
→ @click
→ selectedCity 변경
→ computed 재계산
→ 펫 상태 및 화면 갱신
```

결과 화면과 Vue의 내부 동작을 연결해서 볼 수 있도록 구성했습니다.

### 3. 구현 원리

`구현 원리` 페이지에서는 Weather Pet 전체의 동작 과정을 Vue 관점에서 설명합니다.

단순한 Vue 문법 설명이 아니라 다음 흐름을 실제 프로젝트 코드를 기준으로 확인할 수 있습니다.

```text
사용자 행동
→ 이벤트
→ 상태 변경
→ 계산
→ 화면 갱신
```

### 4. 실습 부록

수업 중 작성했던 Vue 실습 파일을 한 곳에서 다시 실행할 수 있도록 구성했습니다.

기존 Component Launcher 방식을 활용하여 `v-for`, `v-if`, `v-bind`, Event, `v-model` 등 수업 중 진행했던 48개 실습을 다시 확인할 수 있습니다.

---

## Project Structure

```text
src/
├── components/
│   ├── exercise/         # 날씨 검색, 도시 카드 등 사용자 화면 컴포넌트
│   ├── pet/              # 펫 화면, 상태 및 돌봄 기능
│   ├── learning/         # 학습모드 설명 UI
│   └── practices/        # 수업 실습 코드 48개
│
├── views/
│   ├── WeatherHomeView.vue        # 사용자 모드
│   ├── WeatherAboutView.vue       # 서비스 소개
│   ├── LearningView.vue           # 구현 원리
│   ├── PracticeAppendixView.vue   # 실습 부록
│   └── WeatherDetailView.vue      # 도시별 상세 날씨
│
├── data/                 # 날씨 Mock Data와 학습 포인트
├── services/             # OpenWeatherMap API 연동
├── stores/               # Pinia 전역 상태
├── router/               # Vue Router
├── App.vue
└── main.js
```

## Page Structure

```text
/
└─ 사용자 모드

/about
└─ 서비스 소개

/how-it-works
└─ 구현 원리

/practice
└─ 실습 부록

/weather/:cityId
└─ 도시별 상세 날씨
```

프로그램 내부의 Route Monitor를 통해 현재 Vue Router 경로를 함께 확인할 수 있도록 구성했습니다.

## Tech Stack

- Vue 3
- Vue Router
- Pinia
- Axios
- Element Plus
- Vite
- OpenWeatherMap API

## Getting Started

### Install

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

## Weather API

실시간 날씨 정보를 사용하려면 `.env.example`을 복사해 `.env` 파일을 만들고 OpenWeatherMap API 키를 입력합니다.

```sh
cp .env.example .env
```

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

API 키가 없거나 요청에 실패하면 프로젝트에 포함된 Mock Data를 사용합니다. `.env` 파일과 실제 API 키는 Git에 커밋하지 않습니다.

## External UI Library

이 프로젝트는 [Element Plus](https://element-plus.org/)를 외부 UI 라이브러리로 사용합니다.

메뉴, 카드, 태그, 입력창, 알림, 진행률 표시 및 레이아웃 요소에 적용했습니다.
