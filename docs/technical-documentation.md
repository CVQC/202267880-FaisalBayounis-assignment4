# Technical Documentation
## Faisal Bayounis – Web Developer Portfolio (Assignment 4)

---

## 1. Project Overview

This is the final, production-ready version of a personal portfolio website built entirely with HTML5, CSS3, and vanilla JavaScript. Assignment 4 builds on Assignment 3 by adding UI/UX enhancements, accessibility improvements, performance optimizations, professional code quality, and a live Vercel deployment — resulting in a complete, real-world-ready web application.

**Live Site:** https://202267880-faisal-bayounis-assignmen.vercel.app  
**GitHub Repository:** https://github.com/CVQC/202267880-FaisalBayounis-assignment4

---

## 2. File Structure

```
├── index.html                  → Main HTML structure
├── README.md                   → Project overview and setup
├── css/
│   └── styles.css              → All styling, dark mode, animations, responsive design
├── js/
│   └── script.js               → All JavaScript logic and interactivity
├── assets/
│   └── images/                 → Project images
└── docs/
    ├── ai-usage-report.md      → AI tools usage documentation
    └── technical-documentation.md → This file
```

---

## 3. HTML Structure (`index.html`)

| Section | ID / Class | Description |
|---|---|---|
| Scroll Progress Bar | `#scroll-progress` | Fixed bar at top showing scroll position |
| Greeting Banner | `#greeting-banner` | Time-based greeting + visitor name input/display |
| Header | `.header` | Name (gradient), tagline, navigation, dark mode toggle |
| About | `#about` | Personal introduction |
| Skills | `#skills` | Four expandable skill cards with animated counters |
| Projects | `#projects` | Filterable + sortable project cards |
| Contact | `#contact` | Validated contact form |
| GitHub | `#github` | Live GitHub repositories from API |
| Quote | `#quote` | Random inspirational quote from API |
| Music | `#music` | iTunes music search with audio preview |
| Footer | `.footer` | Copyright + live visit timer |

### Performance Tags in `<head>`
```html
<link rel="preconnect" href="https://api.github.com">
<link rel="dns-prefetch" href="https://dummyjson.com">
<script src="js/script.js" defer></script>
```
- `preconnect` — starts the connection to APIs before they are needed
- `dns-prefetch` — resolves DNS early to reduce latency
- `defer` — script loads after HTML is parsed, improving page speed
- `loading="lazy"` — images only load when they scroll into view

### Accessibility Attributes Added in Assignment 4
- `aria-label` added to all icon buttons (dark mode toggle, audio controls)
- `role` attributes on interactive components
- Keyboard navigation support across all interactive elements
- Sufficient color contrast in both light and dark themes

---

## 4. CSS Details (`styles.css`)

### 4.1 CSS Variables
All colors, spacing, shadows, and transitions are defined in `:root`:
```css
--primary: #3498db       → Main blue
--secondary: #2ecc71     → Green
--purple: #9b59b6        → Purple accent
--accent: #e74c3c        → Red for errors
--orange: #f39c12        → Orange accent
```

### 4.2 Layout
- **Flexbox** — header, navigation, search boxes, filter buttons
- **CSS Grid** — skills grid, projects grid, music results grid, GitHub grid

### 4.3 Dark Mode
- Triggered by toggling `.dark` class on `<body>`
- All dark styles scoped under `body.dark` selectors
- All new Assignment 4 components include full dark mode coverage
- Preference saved in `localStorage` and restored on every page load

### 4.4 Responsive Design
- **768px** — stacks header vertically, single column grids
- **480px** — reduces padding, wraps nav links

### 4.5 Animations

| Animation | Used On | Effect |
|---|---|---|
| `fadeInUp` | Cards, sections | Slides up while fading in |
| `slideInLeft` | About, odd skill cards | Slides from left |
| `slideInRight` | Music section, even skill cards | Slides from right |
| `fadeInDown` | Header, greeting banner | Drops from above |
| `popIn` | Project cards, filter buttons | Scales up with bounce |
| `bounceIn` | Success form message | Bounces into view |
| `shakeX` | Error form message | Shakes horizontally |
| `countUp` | Number counters | Animates from 0 to target value on scroll |
| `gradientShift` | Hero name text | Smoothly shifts gradient colors |

### 4.6 New in Assignment 4 — Scroll Progress Bar
```css
#scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--primary);
    z-index: 9999;
    transition: width 0.1s linear;
}
```
- Fixed at the very top of the viewport
- Width updated in real time via JavaScript on scroll
- Fully supports dark mode via CSS variable color

### 4.7 New in Assignment 4 — Gradient Hero Text
```css
.hero-name {
    background: linear-gradient(135deg, var(--primary), var(--purple), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

---

## 5. JavaScript Details (`script.js`)

All code runs inside `DOMContentLoaded` except utility functions.

### 5.1 Dark Mode Toggle
```js
document.body.classList.toggle('dark');
localStorage.setItem('theme', 'dark');
```
- Toggles `.dark` on `<body>`, saves to `localStorage`, restores on load

### 5.2 Dynamic Greeting
```js
const hour = new Date().getHours();
```
- Reads system clock and shows Good Morning / Afternoon / Evening

### 5.3 Visitor Name State Management
```js
localStorage.getItem('visitorName');
localStorage.setItem('visitorName', name);
localStorage.removeItem('visitorName');
```
- First visit → shows name input prompt
- Returning visit → shows "Welcome back, [name]!"
- Change Name button → clears localStorage and shows input again
- Skip button → hides prompt without saving

### 5.4 Active Navigation Highlight
```js
window.addEventListener('scroll', debounce(highlightActiveSection, 100));
```
- Uses `debounce` to limit scroll event firing for performance
- Compares scroll position to section offsets and adds `.active` to matching nav link

### 5.5 New in Assignment 4 — Scroll Progress Bar
```js
window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = progress + '%';
}, 10));
```
- Calculates scroll percentage and updates bar width in real time
- Uses a short debounce (10ms) for smoothness without performance cost

### 5.6 New in Assignment 4 — Animated Number Counters
```js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
});
```
- Watches counter elements with IntersectionObserver
- When they enter the viewport, counts from 0 to the target number
- Each counter runs once and then stops being observed

### 5.7 Project Filter + Sort
```js
cards.sort((a, b) => nameA.localeCompare(nameB));
card.classList.toggle('hidden', !match);
```
- Filter uses `data-category` attributes on project cards
- Sort reorders DOM elements using `.appendChild()`
- Both filter and sort run together in `applyFilterAndSort()`
- Shows "No projects found" message when zero cards visible

### 5.8 Expand / Collapse Skills
```js
extra.classList.toggle('open');
```
- Toggles `.open` class on `.skill-extra` div
- Button text switches between "Show more ▼" and "Show less ▲"

### 5.9 Form Validation
Three validation steps before submission:
1. Empty field check — name, email, message all required
2. Email format — tested with regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. Message length — minimum 10 characters
- Success: green animated confirmation message
- Error: red animated shake message

### 5.10 GitHub API
```js
fetch('https://api.github.com/users/CVQC/repos?sort=updated&per_page=6')
```
- Fetches 6 most recently updated public repositories
- Displays name, description, stars, forks, and language
- Each card links directly to the GitHub repository
- Shows friendly error if API fails

### 5.11 Quotes API
```js
fetch('https://dummyjson.com/quotes/random')
```
- Fetches a random quote from DummyJSON (1400+ quotes)
- Displays quote text and author
- "✨ New Quote" button fetches a fresh one
- Shows error message if API fails

### 5.12 iTunes Music Search API
```js
fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=8`)
```
- Searches iTunes for up to 8 matching tracks
- Displays album art, track name, and artist name
- If `previewUrl` exists, shows ▶ Play Preview button
- Only one song plays at a time — others pause automatically
- Shows friendly error if API fails or returns no results

### 5.13 Visit Timer
```js
setInterval(() => { seconds++; }, 1000);
```
- Counts up every second from page load
- Displays in footer as `Xs` or `Xm Xs` format

### 5.14 Scroll Animation (IntersectionObserver)
```js
const observer = new IntersectionObserver(function(entries) {
    if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
    }
});
```
- Watches skill cards and project cards
- Triggers fade-in + slide-up when they enter the viewport
- More performant than scroll event listeners

---

## 6. APIs Used

| API | Endpoint | Purpose | Auth |
|---|---|---|---|
| GitHub REST API | `api.github.com/users/CVQC/repos` | Live repositories | ❌ No |
| DummyJSON | `dummyjson.com/quotes/random` | Random quotes | ❌ No |
| iTunes Search | `itunes.apple.com/search` | Music + previews | ❌ No |

---

## 7. Performance Optimizations

| Technique | Implementation |
|---|---|
| Lazy image loading | `loading="lazy"` on all `<img>` tags |
| Deferred script | `<script defer>` on JS file |
| Preconnect to APIs | `<link rel="preconnect">` in `<head>` |
| DNS prefetch | `<link rel="dns-prefetch">` in `<head>` |
| Debounced scroll | `debounce(highlightActiveSection, 100)` |
| IntersectionObserver | Instead of scroll event for animations and counters |
| No external libraries | Pure HTML/CSS/JS — no jQuery or frameworks |
| Removed debug logs | All `console.log()` statements removed before deployment |

---

## 8. Deployment

The application is deployed on **Vercel** with automatic CI/CD:

| Step | Detail |
|------|--------|
| **Platform** | Vercel (free tier) |
| **Trigger** | Every `git push` to `main` branch auto-deploys |
| **Build** | Static site — no build step required |
| **Live URL** | https://202267880-faisal-bayounis-assignmen.vercel.app |
| **Repo** | https://github.com/CVQC/202267880-FaisalBayounis-assignment4 |

---

## 9. Browser Compatibility

- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Android Chrome)

---

## 10. Known Limitations

- Contact form does not send real emails — simulated only (no backend)
- iTunes previews limited to 30 seconds per track
- Some tracks may not have a preview URL available
- GitHub API only shows public repositories
- Music search and GitHub repos require an internet connection
- GitHub API has a rate limit of 60 requests/hour for unauthenticated requests
