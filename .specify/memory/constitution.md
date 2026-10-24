# Citizen Test Simulator Constitution

## Core Principles

### I. One Codebase, Two Apps
The web app and the Android app MUST be built from a single shared codebase (web app wrapped
for Android with Capacitor). Platform-specific code MUST be limited to the thin wrapper layer.

### II. Offline-First, No Backend
The app MUST work fully offline. There MUST be no server, no accounts and no network calls
at runtime. All user data (history, settings) stays on the device.

### III. Minimal Dependencies
Prefer platform features and the standard library over packages. A new dependency MUST be
justified by something that cannot be done in a few lines.

### IV. Sourced, Accurate Content
Every question MUST cite a page or section of the IRCC guide "Discover Canada" and carry a
topic tag. Answer keys MUST be verifiable against that cited text.

### V. Tested Core Logic (NON-NEGOTIABLE)
Question selection, scoring, pass/fail threshold and timer logic MUST have automated tests.
UI is verified by driving a full exam end to end.

### VI. Mobile-First and Accessible
Layouts MUST work at phone width. Interactive elements MUST be keyboard operable, have
accessible labels and sufficient contrast.

## Constraints

Exam rules mirror the official test: 20 questions, 30 minutes, pass mark 15 of 20 (75%).
Content is English only until a spec says otherwise.

## Governance

This constitution supersedes other practices. Amendments are made by editing this file with a
version bump (MAJOR: principle removed or redefined; MINOR: principle added; PATCH: wording).
Plans MUST be checked against these principles before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-10-24 | **Last Amended**: 2026-10-24
