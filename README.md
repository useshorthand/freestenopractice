# Free Steno Practice — Online Shorthand Transcription Platform

A high-performance, offline-ready, responsive, and eye-friendly stenography practice web application built specifically for candidates preparing for national **SSC Stenographer Grade C (100 WPM)** and **Grade D (80 WPM)** skill examinations.

---

## 🎯 Project Overview & Goals

Free Steno Practice is built to serve as a reliable, production-ready, and lightweight testing ground where candidates can practice transcription typing. This setup corresponds to **Part 1 of 3** of the master roadmap, establishing the complete project foundation, UI/UX structure, and full SEO optimization.

### Key Architecture Priorities:
1. **Long-Term Scalability**: Custom structures ready to support hundreds of dictation scripts without manual pages configuration.
2. **Eye Strain Reduction**: A professional slate-dark theme designed specifically for stenographers who sit and practice typing for multiple hours straight.
3. **Pure English Experience**: Strict English navigation, status displays, statistics, notice boxes, and menus (zero regional dialects or script variants).
4. **Complete SEO Optimization**: Semantic HTML5 markup, structured JSON-LD schemes, and metadata definitions ready for search engines and LightHouse auditing.

---

## 📂 Project Directory Structure

The repository follows a clean, modular layout that can be easily compiled into a standalone static build compatible with hosts like GitHub Pages:

```text
/
├── public/                 # Static assets, sitemap, robots.txt
├── src/
│   ├── components/         # Reusable global visual components
│   │   ├── Header.tsx      # Sticky professional nav & search UI
│   │   ├── Footer.tsx      # Detailed quick links & disclaimers
│   │   ├── NoticeBox.tsx   # Essential steno practice warnings
│   │   └── AdPlaceholder.tsx# AdSense-ready structural ad containers
│   │
│   ├── config/             # Centralized settings & dynamic series lists
│   │   └── stenoConfig.ts  # Passing scores, allowed times, features
│   │
│   ├── pages/              # Primary layout page modules
│   │   ├── Home.tsx        # Hero banner, notices, & feature cards
│   │   ├── KailashChandra.tsx # Interactive Volume 1-24 selector
│   │   ├── ProgressiveMagazine.tsx # Month-wise dynamic list explorer
│   │   ├── DictationPage.tsx  # Distraction-free steno editor zone
│   │   ├── UnseenDictation.tsx# "Coming Soon" video/audio teaser layout
│   │   ├── About.tsx       # Narrative of values & exam criteria
│   │   └── Contact.tsx     # Message inbox support channels
│   │
│   ├── types/              # Global Type definitions
│   │   └── index.ts        # Dictation ID, AppView states
│   │
│   ├── index.css           # Google Fonts (Space Grotesk, Inter) & styles
│   ├── main.tsx            # Main react mounting bridge
│   └── App.tsx             # Stateful shell routing controllers
│
├── package.json            # Node dependencies
├── metadata.json           # Cloud environment descriptors
└── vite.config.ts          # Custom Vite configuration
```

---

## ⚙️ Configuration & Customization (`stenoConfig.ts`)

All settings are controlled centrally within `/src/config/stenoConfig.ts`. Never hardcode these variables throughout the components.

```typescript
export const stenoConfig = {
  websiteName: 'Free Steno Practice',
  passingPercentage: {
    gradeC: 95, // 95% minimum accuracy to pass
    gradeD: 93  // 93% minimum accuracy to pass
  },
  allowedTimeMinutes: {
    gradeC: 40,
    gradeD: 50
  },
  featureToggles: {
    enableAudio: false,
    enableSearch: true,
    enableAds: true,
    enableProgressTracking: true
  }
};
```

---

## 📈 Roadmap (Next Phases)

* **Part 2**: Implementation of the custom evaluation comparison algorithm. Integration of the Google Sheets API via Google Apps Script to securely match typed shorthand transcripts with original scripts.
* **Part 3**: Unseen Dictation player engine. High-fidelity audio streaming servers with speed controller utilities (0.8x - 1.2x tuning) to replicate actual examiner speeds.

---

## ⚖️ Compliance & Disclaimers

This is an independent preparation platform and is not connected to, endorsed by, or affiliated with the Staff Selection Commission (SSC) or any government agency. All information provided here is for mock testing and practice purposes only.
