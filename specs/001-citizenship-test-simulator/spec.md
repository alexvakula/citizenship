# Feature Specification: Citizenship Test Simulator

**Created**: 2026-10-24

**Status**: Draft

**Input**: User description: "Web and Android apps to prepare for the Canadian citizenship test, as a test simulator, based on IRCC's Discover Canada guide."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Take a simulated exam (Priority: P1)

A learner starts a mock exam that behaves like the real test: 20 randomly chosen questions (multiple choice and true/false), one at a time, under a 30-minute countdown. At the end they see their score and whether they passed (15 of 20 or more).

**Why this priority**: This is the core of what was asked for; it alone is a usable MVP.

**Independent Test**: Start an exam, answer all 20 questions, and see a score with a pass/fail result.

**Acceptance Scenarios**:

1. **Given** the home screen, **When** the learner starts an exam, **Then** 20 distinct questions are drawn at random and a 30:00 countdown begins.
2. **Given** an exam in progress, **When** the learner answers or skips and navigates between questions, **Then** their answers are kept and they can review before submitting.
3. **Given** 15 correct answers, **When** the exam is submitted, **Then** the result shows 15/20 and "Pass"; with 14 it shows "Fail".
4. **Given** the timer reaches zero, **When** time expires, **Then** the exam is submitted automatically with unanswered questions counted wrong.

---

### User Story 2 - Review mistakes (Priority: P2)

After an exam the learner sees each missed question with their answer, the correct answer, a short explanation, and the guide page it comes from.

**Why this priority**: Learning from mistakes is what makes the simulator useful for preparation.

**Independent Test**: Finish an exam with wrong answers and open the review list.

**Acceptance Scenarios**:

1. **Given** a finished exam, **When** the learner opens the review, **Then** every missed or unanswered question shows the correct answer, explanation and guide reference.

---

### User Story 3 - Practice by topic (Priority: P3)

The learner practises without a timer, optionally limited to a topic (rights and responsibilities, history, government, geography, symbols, economy), and sees instant feedback after each answer.

**Why this priority**: Helps target weak areas, but the exam works without it.

**Independent Test**: Pick a topic, answer a few questions, see immediate right/wrong feedback.

**Acceptance Scenarios**:

1. **Given** practice mode with a topic selected, **When** the learner answers, **Then** they immediately see whether it was correct and the explanation.

---

### User Story 4 - Track progress (Priority: P4)

The learner sees past exam scores and per-topic accuracy, stored on their device only.

**Why this priority**: Motivating, but not required for first use.

**Independent Test**: Complete two exams and see both in history after restarting the app.

**Acceptance Scenarios**:

1. **Given** completed exams, **When** the learner reopens the app, **Then** history and topic accuracy are still shown.

### Edge Cases

- Closing or backgrounding the app mid-exam: the timer keeps counting from the real clock and the exam resumes.
- Submitting with unanswered questions: warn first, then count them wrong.
- Question bank smaller than a requested set: never repeat a question within one exam.
- Device offline: everything still works.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST offer an exam mode of 20 random, non-repeating questions with a 30-minute countdown.
- **FR-002**: System MUST support multiple-choice and true/false questions.
- **FR-003**: System MUST score the exam and report pass when at least 15 of 20 are correct.
- **FR-004**: System MUST auto-submit when the timer ends.
- **FR-005**: System MUST show, for every missed question, the correct answer, an explanation and the guide page reference.
- **FR-006**: System MUST offer an untimed practice mode with instant feedback and topic filtering.
- **FR-007**: System MUST store exam history and per-topic accuracy on the device only, with no account.
- **FR-008**: System MUST work fully offline.
- **FR-009**: The web version and the Android version MUST provide the same features.
- **FR-010**: Every question MUST have a topic tag and a citation to the Discover Canada guide.

### Key Entities

- **Question**: text, type (multiple choice or true/false), options, correct answer, explanation, topic, guide page reference.
- **Exam attempt**: date, the questions asked, the learner's answers, score, pass/fail.
- **Topic stats**: correct/answered counts per topic across attempts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can start an exam within 2 taps of opening the app.
- **SC-002**: A full exam can be completed and scored in under 30 minutes with correct pass/fail result in 100% of tested score cases (14 fails, 15 passes).
- **SC-003**: No question appears twice within one exam across 1,000 simulated draws.
- **SC-004**: The question bank has at least 200 questions covering every topic in the guide's test-relevant chapters.
- **SC-005**: All features work with the device in airplane mode.

## Assumptions

- English only for the first version.
- Questions are written from the guide's text (the guide publishes no official question list); the owner will spot-check accuracy.
- Android only; no iOS in scope.
- No login, sync or sharing between devices.
