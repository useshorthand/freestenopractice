# Free Steno Practice — Ultimate Production & Setup Guide

Welcome to the definitive production setup guide for **Free Steno Practice**. This system is engineered as an offline-first, client-side React single-page application (SPA) backed by a zero-cost serverless Google Sheets CMS.

---

## Part 1: First-Time Administrator Setup Guide

This 12-step beginner-friendly checklist is designed for administrators with zero coding experience. Following these steps will establish your site, secure a database, set up Google analytics, configure ads, and publish your platform to search engines.

### 1. Create a GitHub Account & Repository
1. Go to [GitHub.com](https://github.com) and create a free account.
2. In the top-right corner, click the **`+`** icon and select **New repository**.
3. Name your repository (e.g., `free-steno-practice`).
4. Select **Public** so that GitHub Pages can host it for free.
5. Leave "Initialize this repository with" unchecked, then click **Create repository**.

### 2. Copy the Code & Build Your Files
To push this codebase to your repository:
1. Initialize git in your local project folder:
   ```bash
   git init
   git add .
   git commit -m "feat: initial steno practice release"
   ```
2. Link your local directory to your newly created GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/free-steno-practice.git
   git branch -M main
   git push -u origin main
   ```

### 3. Setup a Google Sheets CMS
1. Navigate to [Google Drive](https://drive.google.com) and create a new **Google Sheet**.
2. Name the sheet (e.g., `Steno Practice Database`).
3. Set up **five tabs** within the spreadsheet, matching the exact spelling and headers specified in **Part 2** below.

### 4. Paste and Deploy Google Apps Script
1. Inside your Google Sheet, select **Extensions > Apps Script** from the top menu.
2. Delete any boilerplate code inside the editor.
3. Open the file `/google-apps-script/Code.gs` in this project folder.
4. Copy its entire content and paste it into the Apps Script editor. Click the **Save** (disk) icon.

### 5. Publish the Script as a Web App
1. Click the blue **Deploy** button at the top-right and choose **New deployment**.
2. Click the **Gear** icon next to "Select type" and choose **Web app**.
3. Set the configuration details:
   * **Description:** `Steno Practice API Web App`
   * **Execute as:** `Me (your-email@gmail.com)`
   * **Who has access:** `Anyone` *(Crucial: Enables the website's frontend to securely read passages and settings without requiring logins)*.
4. Click **Deploy**. Authorize any permission requests from Google.
5. Copy the generated **Web app URL** ending in `/exec`.

### 6. Link the Web App URL to the Codebase
1. Open the file `/src/config/stenoConfig.ts` in your text editor.
2. Locate the `apiUrls` object:
   ```typescript
   apiUrls: {
     googleAppsScriptUrl: 'PASTE_YOUR_APPS_SCRIPT_URL_HERE',
     googleSheetsUrl: 'PASTE_YOUR_SPREADSHEET_BROWSER_URL_HERE'
   }
   ```
3. Save the file and push the update to GitHub:
   ```bash
   git add src/config/stenoConfig.ts
   git commit -m "config: link live Google Apps Script API"
   git push
   ```

### 7. Configure GitHub Pages Hosting
1. On your GitHub repository page, click the **Settings** tab.
2. Select **Pages** from the left-hand navigation menu.
3. Under "Build and deployment", set the **Source** to **Deploy from a branch**.
4. Set the **Branch** to `main` (or `gh-pages` if using a build actions workflow) and select `/root` (or `/docs`). Click **Save**.
5. Within 2 minutes, GitHub will publish your site to `https://YOUR_USERNAME.github.io/free-steno-practice/`.

### 8. Set up Custom Domains (Optional)
1. If you own a custom domain (e.g., `freestenopractice.com`), go back to **Settings > Pages** on GitHub.
2. Enter your custom domain under the "Custom domain" section and click **Save**.
3. Configure your domain registrar's DNS settings by creating a `CNAME` pointing to `YOUR_USERNAME.github.io` or `A` records pointing to GitHub's server IPs.

### 9. Verify Website Security (SSL)
1. In **Settings > Pages**, check the **Enforce HTTPS** box. This secures user connection streams, boosts SEO, and ensures browser sandbox permissions are fully active.

### 10. Register on Google Search Console
1. Visit the [Google Search Console](https://search.google.com/search-console).
2. Register your published URL (e.g., `https://YOUR_USERNAME.github.io/free-steno-practice/`).
3. Select the **Sitemaps** section in the sidebar.
4. Enter `sitemap.xml` and click **Submit**. This informs crawlers of your primary paths for instant indexing.

### 11. Connect Google Analytics (GA4)
1. Set up a free Google Analytics account and create a new **Web stream** for your domain.
2. Copy your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`).
3. In `/src/config/stenoConfig.ts`, update the GA ID field so that user click telemetry, word counts, and page events sync to your analytics dashboard.

### 12. Apply for Google AdSense
1. When your platform has sufficient original dictation transcriptions (typically 30+ completed passages) and active organic visitors, sign up for [Google AdSense](https://adsense.google.com).
2. Insert your AdSense publisher script tag into `/index.html`.
3. Ad spaces are pre-configured to render in safe layout areas (header banners, list sidebars, and below evaluation result panels), preserving the typing editor's distraction-free user experience.

---

## Part 2: Complete Google Sheets CMS Specification

Your website reads settings and passages from five distinct sheets. Maintain these names, casing, and column structures precisely.

### Tab 1: `Settings`
Controls website subtitle, target words-per-minute, allowed durations, and PWA configuration parameters.

* **Headers:** `Key` | `Value`
* **Sample Rows:**
  | Key | Value | Notes |
  | :--- | :--- | :--- |
  | websiteSubtitle | Free English Shorthand Practice Platform for SSC Grades C & D | Central slogan |
  | allowedTimeMinutes_C | 40 | Transcribing time allowed for Grade C (1000 words) |
  | allowedTimeMinutes_D | 50 | Transcribing time allowed for Grade D (800 words) |
  | enableSearch | true | Toggle search bar visibility in header |
  | enableProgressTracking | true | Enables/Disables local history charts |

---

### Tab 2: `Notices`
Powers the dynamic announcement ticker on the candidate dashboard page.

* **Headers:** `Title` | `Content` | `SubContent`
* **Sample Rows:**
  | Title | Content | SubContent |
  | :--- | :--- | :--- |
  | Weekly Updates | Volume 14 Transcriptions are now fully active! | Target Grade C and D parameters. |
  | Exam Advisory | SSC Shorthand Grade C & D Skill Tests announced for next month. | Keep practicing daily! |

---

### Tab 3: `KailashChandra`
Stores original transcripts for Kailash Chandra volumes.

* **Headers:** `Book` | `Volume` | `Grade` | `DictationNumber` | `WordCount` | `Transcript` | `Status` | `Notes`
* **Sample Rows:**
  | Book | Volume | Grade | DictationNumber | WordCount | Transcript | Status | Notes |
  | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
  | kailash-chandra | Volume 1 | D | 1 | 800 | Madam Speaker, I rise to support this Bill... | Active | Progressive legislation |
  | kailash-chandra | Volume 1 | C | 2 | 1000 | Sir, the railway budget presented today... | Active | Budget debate terms |

---

### Tab 4: `ProgressiveMagazine`
Stores transcription texts for Progressive Magazine.

* **Headers:** `Book` | `Month` | `Grade` | `DictationNumber` | `WordCount` | `Transcript` | `Status` | `Notes`
* **Sample Rows:**
  | Book | Month | Grade | DictationNumber | WordCount | Transcript | Status | Notes |
  | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
  | progressive-magazine | September 2025 | D | 1 | 800 | My dear friends, today we assemble to discuss... | Active | Modern economic speech |

---

### Tab 5: `GlobalSettings`
Fallback configurations and feature flags toggle.

* **Headers:** `SettingName` | `SettingValue`
* **Sample Rows:**
  | SettingName | SettingValue |
  | :--- | :--- |
  | MAINTENANCE_MODE | false |
  | API_CACHE_DURATION_SEC | 300 |

---

## Part 3: Architecture and Folder Breakdown

```
/
├── .env.example                 # Example environment parameters
├── .gitignore                   # Paths excluded from git tracking
├── index.html                   # Master entry HTML, containing PWA link and GA4 scripts
├── metadata.json                # Project description metadata
├── package.json                 # Core dependencies and vite runtime scripts
├── tsconfig.json                # TypeScript compilation parameters
├── vite.config.ts               # Bundler configuration file, including base './' relative pathing
│
├── public/                      # Static assets copied directory to build output root
│   ├── manifest.json            # PWA installable parameters
│   ├── robots.txt               # Crawler instructions file
│   ├── sitemap.xml              # Indexing pathway targets
│   └── sw.js                    # Service worker file for static shell caching
│
├── google-apps-script/
│   └── Code.gs                  # Google Apps Script Web App source code
│
└── src/
    ├── App.tsx                  # Main client-side router and root component
    ├── main.tsx                 # Script mounting and PWA sw registration hook
    ├── index.css                # Global CSS containing Tailwind classes
    │
    ├── components/              # Extracted reusable components
    │   ├── Header.tsx           # Global search and responsive header navigation bar
    │   ├── Footer.tsx           # Contact, copyright, and relative legal footer
    │   ├── NoticeBox.tsx        # Fetches announcement data dynamically from Sheets
    │   ├── AdPlacement.tsx      # Placeholders to display AdSense ads based on layout rules
    │   └── CopyrightNotice.tsx  # Interactive educational reference & intellectual property notice
    │
    ├── pages/                   # Standalone view screens
    │   ├── Home.tsx             # Master grid landing dashboard
    │   ├── KailashChandra.tsx   # Classical library list selector
    │   ├── ProgressiveMagazine.tsx # Monthly library list selector
    │   ├── DictationPage.tsx    # Strict timer, editor input, and result panels
    │   ├── About.tsx            # Mission narrative screen
    │   ├── Contact.tsx          # Contact forms and spelling support info
    │   ├── PrivacyPolicy.tsx    # CCPA/GDPR compliance terms
    │   ├── TermsOfService.tsx   # Intellectual rights and usage boundaries
    │   ├── Disclaimer.tsx       # SSC independence declarations
    │   ├── CookiePolicy.tsx     # Local draft save information and AdSense disclosures
    │   └── StatusErrorPage.tsx  # Dynamic 404/Offline/Maintenance/NoContent diagnostic screen
    │
    ├── services/
    │   └── apiClient.ts         # Google Apps Script REST interface client, with offline mock fallbacks
    │
    ├── utils/
    │   └── evaluationEngine.ts  # Minimum edit-distance word-matching alignment algorithm
    │
    └── types/
        └── index.ts             # Global TypeScript interface and union definitions
```

---

## Part 4: Advanced Maintenance & Troubleshooting

### Why is my Google Sheet data not showing on the site?
1. **Deploy as Web App:** Make sure you updated the Web App deployment in Google Apps Script when making changes. Re-check **Step 5** above to make sure access is set to "Anyone".
2. **Web App URL Match:** Verify that the Web App URL in `/src/config/stenoConfig.ts` matches your current Apps Script deployment URL.
3. **Column Names:** Check that your Google Sheets tab names and column headers are spelled exactly as specified in the schema. Spelling mistakes can cause the API parser to skip rows.

### How are steno mistakes calculated?
Our evaluation logic matches the Staff Selection Commission's official typing assessment criteria:
* **Full Mistakes:** Omissions, additions, substitution of wrong words, and spellings not matching the original passage.
* **Half Mistakes:** Singular/plural mismatches (e.g., typing "boy" instead of "boys"), capitalization mistakes, and incorrect paragraph structures.
* The system computes these automatically using a **Levenshtein Word-Alignment Algorithm**, rendering highlighted differences on-screen for candidates to analyze.

---

## Part 5: Future Feature Expansion Design

This code has been modularly written with clean interfaces to easily support future features:
1. **User Accounts & Login:** Easily integrate Auth0 or Google Auth since all page selectors run under a clean React state tree.
2. **Personal Progress Dashboard:** The Local History analytics engine is fully pre-designed; history arrays can be synced directly to a database like Firebase Firestore without altering the core UI.
3. **Real-time Audio Dictation dictations:** The dictation page layout includes standard audio tag controls, allowing the player to streams MP3 files fetched from Google Drive links in your Google Sheet database!
