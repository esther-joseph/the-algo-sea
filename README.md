# The Algo Sea

A maritime-themed mobile AR coding interview prep app. Learn LeetCode patterns through nautical metaphors, a live code editor with AI evaluation, and a chat tutor — Captain Algo.

**Tech stack:** React 18 · Vite · Vercel Serverless Functions · Anthropic Claude API

---

## Project Structure

```
the-algo-sea/
├── api/                         # Vercel serverless functions (API key lives here)
│   ├── captain.js               # POST /api/captain  — Captain Algo chat proxy
│   └── evaluate.js              # POST /api/evaluate — code evaluation proxy
├── public/
│   └── anchor.svg               # Favicon
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Root shell — view routing
│   ├── components/
│   │   ├── captain/
│   │   │   └── CaptainView.jsx  # AI chat tutor UI
│   │   ├── chart/
│   │   │   ├── ARToggle.jsx     # AR camera on/off toggle strip
│   │   │   ├── ChartView.jsx    # Pattern selection grid
│   │   │   └── PatternCard.jsx  # Single pattern card
│   │   ├── layout/
│   │   │   ├── Background.jsx   # Ocean / AR camera / HUD layers
│   │   │   ├── BottomNav.jsx    # Persistent bottom navigation
│   │   │   └── Header.jsx       # Logo button + status + compass
│   │   ├── lesson/
│   │   │   ├── LessonView.jsx   # Pattern lesson shell + tab router
│   │   │   ├── problems/
│   │   │   │   ├── CodeEditor.jsx      # Tab-aware textarea editor
│   │   │   │   ├── ProblemAccordion.jsx # Full accordion with timer + eval
│   │   │   │   ├── ProblemTimer.jsx    # MM:SS interval timer
│   │   │   │   └── TestResults.jsx     # Pass/fail result rows
│   │   │   └── tabs/
│   │   │       ├── InsightsTab.jsx
│   │   │       ├── OverviewTab.jsx
│   │   │       ├── ProblemsTab.jsx
│   │   │       └── TemplateTab.jsx
│   │   └── ui/
│   │       ├── Badge.jsx        # Difficulty badge (easy/medium/hard)
│   │       ├── CodeBlock.jsx    # Maritime syntax-highlighted code block
│   │       └── SectionLabel.jsx # Amber section header with rule
│   ├── context/
│   │   └── AppContext.jsx       # Global nav + lesson state (no prop drilling)
│   ├── data/
│   │   ├── patterns.js          # 10 coding patterns with metaphors + problems
│   │   └── problems.js          # 40 problems with descriptions + test cases
│   ├── hooks/
│   │   ├── useAR.js             # AR camera stream management
│   │   └── useTimer.js          # Per-problem interval timer
│   ├── services/
│   │   └── api.js               # Client → /api/* fetch wrappers
│   ├── styles/
│   │   ├── animations.css       # All @keyframes in one place
│   │   ├── globals.css          # Component styles
│   │   └── variables.css        # CSS custom properties + syntax colors
│   └── utils/
│       └── syntaxHighlight.js   # Character-by-character Python tokenizer
├── .env.example                 # Copy to .env and add your API key
├── .gitignore
├── index.html
├── package.json
├── vercel.json                  # API rewrites for Vercel deployment
└── vite.config.js               # Vite + dev proxy config
```

---

## Local Development

### Prerequisites
- Node.js 18+
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the Vercel dev server (runs /api/* serverless functions)
vercel dev
# This starts on http://localhost:3000

# 4. In a second terminal, start the Vite dev server
npm run dev
# Opens http://localhost:5173  (proxies /api/* to port 3000)
```

> **Why two servers?** The Vite dev server handles the React frontend with HMR. The Vercel CLI dev server runs the serverless functions in `/api/` with your `.env` secrets. The proxy in `vite.config.js` bridges them so the browser only hits one origin.

---

## Deploy to Vercel

```bash
# First deploy — follow the prompts
vercel

# Set your API key as a secret
vercel env add ANTHROPIC_API_KEY

# Production deploy
vercel --prod
```

The `vercel.json` rewrites ensure `/api/captain` and `/api/evaluate` are served by the serverless functions, not the React SPA router.

---

## AI Features

| Feature | Route | Model |
|---|---|---|
| Captain Algo chat | `POST /api/captain` | claude-sonnet-4-20250514 |
| Code evaluation | `POST /api/evaluate` | claude-sonnet-4-20250514 |

The API key **never touches the client bundle**. All Anthropic calls are proxied through `/api/*` Vercel functions.

---

## Adding a New Pattern

1. Add an entry to `src/data/patterns.js` following the existing shape.
2. Add problem detail entries to `src/data/problems.js` keyed by LC number.
3. No component changes needed — `ChartView` and `ProblemsTab` render dynamically.

---

## Coding Conventions

- **Components** — one file per component, named exports where reusable, default export for views
- **Hooks** — `use` prefix, single responsibility, return plain objects not arrays where > 2 values
- **Services** — all API calls go through `src/services/api.js`; components never `fetch()` directly
- **Styles** — CSS custom properties for all colors/tokens; no inline style objects except dynamic values
- **Data** — static data lives in `src/data/`; no data in components
- **AI calls** — always server-side via `/api/*`; never expose the API key to the client

---

Built with ⚓ and a love of maritime metaphors.
