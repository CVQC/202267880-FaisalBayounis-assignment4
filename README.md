# Faisal Bayounis – Web Developer Portfolio (Assignment 3)

## Project Description

An advanced personal portfolio website built with HTML5, CSS3, and vanilla JavaScript.
This version extends Assignment 2 with external API integrations, complex logic, state management, and performance optimizations.

### What's New in Assignment 3
- 🐙 **GitHub API** — live repositories fetched from my real GitHub profile
- 💬 **Quotes API** — random inspirational quotes loaded on every visit
- 🎵 **iTunes Music Search** — search any artist and play 30-second previews
- 🔃 **Filter + Sort Projects** — filter by category AND sort by name simultaneously
- ⏱️ **Visit Timer** — counts how long the visitor has been on the site
- 👋 **Visitor Name** — remembers your name using localStorage across visits
- ⚡ **Performance Optimized** — lazy loading, preconnect, debounced events, deferred scripts

---

## Features

- 🌙 Dark / Light mode toggle with localStorage persistence
- 👋 Visitor name input — saved and restored on every visit
- 🗂️ Project filter (All / COE / CS) + Sort (A→Z / Z→A)
- 📂 Expand / Collapse skill cards
- 🐙 Live GitHub repositories from GitHub API
- 💬 Random inspirational quotes from DummyJSON API
- 🎵 iTunes Music Search with 30-second audio preview player
- 📬 Contact form with full validation and confirmation message
- ✨ Smooth animations, hover effects, and fade-in transitions
- ⏱️ Live visit duration timer in the footer

---

## Tech Stack

- **HTML5** — Semantic structure and accessibility
- **CSS3** — Custom variables, Flexbox, Grid, animations, dark mode
- **JavaScript (Vanilla)** — DOM manipulation, Fetch API, localStorage, IntersectionObserver

## APIs Used

| API | Purpose | Auth |
|---|---|---|
| GitHub REST API | Fetch live repositories | ❌ No key |
| DummyJSON Quotes | Random inspirational quotes | ❌ No key |
| iTunes Search API | Music search + 30s preview | ❌ No key |

---
## File Structure
├── index.html
├── README.md
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/
└── docs/
├── ai-usage-report.md
└── technical-documentation.md




---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/CVQC/202267880-FaisalBayounis-assignment3.git
   ```

2. Open the project folder:
   ```bash
   cd 202267880-FaisalBayounis-assignment3
   ```

3. Open `index.html` in your browser — no server or install needed.

---

## How to Use the Website

- 🌙 Click the moon button top-right to toggle **dark/light mode** — saved automatically
- 👋 Enter your name in the greeting banner — remembered on every future visit
- 🗂️ Use **All / COE / CS** buttons to filter projects, and the **Sort** dropdown to sort them
- 📂 Click **"Show more"** on any skill card to expand details
- 🐙 Scroll to **My GitHub Projects** to see live repositories
- 💬 Click **✨ New Quote** for a fresh inspirational quote
- 🎵 Type an artist or song in **Music Search** and press Enter or click Search
- ▶ Click **Play Preview** on any song card to hear a 30-second clip
- 📬 Fill the **Contact form** and submit for a confirmation message
- ⏱️ Check the **footer** to see how long you've been visiting

---

## AI Tools Used

I used two AI tools to assist with this assignment:

- **ChatGPT** — Used for understanding concepts and planning features before implementation
- **Claude (Perplexity AI)** — Used for implementing features, debugging issues, and optimizing code quality

All AI-generated code was reviewed, understood, and modified before use.

> Full details in [`docs/ai-usage-report.md`](docs/ai-usage-report.md)

---

## Live Deployment

🔗 [GitHub Repository](https://github.com/CVQC/202267880-FaisalBayounis-assignment3.git)

---

## Author

**Faisal Bayounis**
KFUPM
Student ID: 202267880
