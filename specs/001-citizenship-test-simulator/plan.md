# Implementation Plan: Citizenship Test Simulator

**Spec**: [spec.md](spec.md) | **Date**: 2026-10-24

## Summary
One Vite + React + TypeScript web app (PWA-capable), wrapped for Android with Capacitor. Questions are a static `questions.json`; history lives in localStorage.

## Technical Context
- **Language**: TypeScript 5, React 18, Vite 5
- **Dependencies**: react, react-dom; dev: vite, vitest, typescript, @capacitor/{core,cli,android}
- **Storage**: localStorage (history); no backend
- **Testing**: Vitest for `src/lib/*` (selection, scoring, timer, stats)
- **Targets**: modern browsers; Android 7+ via Capacitor (needs JDK 17 + Android SDK)

## Constitution Check
I one codebase ✅ | II offline/no backend ✅ | III minimal deps (no router/state/UI lib; screen state via useState) ✅ | IV sourced content (every question has `page` + `topic`) ✅ | V tested core logic ✅ | VI mobile-first, labelled buttons ✅

## Structure
```
src/lib/exam.ts        pickQuestions, score (PASS_MARK=15, EXAM_SIZE=20, EXAM_SECONDS=1800)
src/lib/store.ts       history + topic stats in localStorage
src/lib/exam.test.ts
src/data/questions.json
src/App.tsx            Home | Exam | Results | Practice | Progress
src/main.tsx, index.css
```

## Data model
Question `{id, type:"mcq"|"tf", topic, q, options[], answer:number, explanation, page}`; Attempt `{date, total, correct, passed, perTopic}`.

## Decisions
- Timer persisted as an absolute end-timestamp in localStorage so resume survives app close.
- No contracts/ (no API). Research resolved inline: no unknowns.
