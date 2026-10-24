# Citizenship Test Simulator

Web + Android (Capacitor) practice exams for the Canadian citizenship test, from IRCC's *Discover Canada*.
Built with GitHub Spec Kit: see `specs/001-citizenship-test-simulator/`.

```
cd app
npm install
npm test            # vitest
npm run dev         # web
npm run build && npx cap sync android
cd android && gradlew assembleDebug   # needs JDK 17+ and Android SDK (ANDROID_HOME)
```

Questions live in `app/src/data/*.ts` (correct answer first; options shuffled at runtime; each cites a guide page).
