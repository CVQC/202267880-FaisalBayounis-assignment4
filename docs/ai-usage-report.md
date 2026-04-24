# AI Usage Report
## Assignment 3 – Advanced Portfolio Web Application

---

## 1. Tools Used & Use Cases

### ChatGPT
- **Use Cases:**
  - Understanding concepts before implementation (APIs, localStorage, state management)
  - Getting explanations of JavaScript concepts like `fetch()`, `IntersectionObserver`, and `DOMContentLoaded`
  - Brainstorming which features to implement for each requirement
  - Asking general questions about HTML structure and CSS layout approaches

### Claude (Perplexity AI)
- **Use Cases:**
  - Implementing all major features including GitHub API integration, iTunes Music Search API, DummyJSON Quotes API, project filter + sort, visitor name state management, and the visit timer
  - Debugging issues such as misplaced brackets, code nested in wrong functions, and APIs returning undefined values
  - Code review — Claude identified that the Visitor Name code was incorrectly placed inside `setGreeting()` and fixed the structure
  - UI/UX suggestions including animations, dark mode support for new components, hover effects, and responsive layout improvements
  - Performance optimization — adding `loading="lazy"`, `preconnect`, `dns-prefetch`, `defer`, and debounced scroll events

---

## 2. Benefits & Challenges

### Benefits
- **Faster implementation:** AI helped implement complex features like the iTunes API with audio preview player much faster than researching from scratch
- **Better debugging:** When APIs returned `undefined` or code had mismatched brackets, AI identified the exact problem quickly
- **Code quality:** AI suggested improvements like debouncing scroll events, using `IntersectionObserver` instead of scroll listeners, and consistent CSS variable usage
- **Error handling:** AI reminded me to always add friendly error messages and loading states for every API call
- **Learning by example:** Seeing complete working code helped me understand patterns like chaining `.then()` and `.catch()` on fetch calls

### Challenges
- **API reliability:** Some free APIs like `quotable.io` were completely down and had to be replaced with `dummyjson.com`
- **Copy-paste errors:** When pasting code in the wrong location, it created bugs that were hard to trace (e.g., code nested inside wrong functions)
- **Understanding context:** AI sometimes gave general code that needed to be adapted to fit my existing CSS variable names and class structure
- **Over-reliance risk:** Had to be careful not to just copy without understanding — always reviewed each section before adding it

---

## 3. Learning Outcomes

### Technical Skills
- Learned how to use the **Fetch API** to connect to external APIs and handle responses and errors properly
- Understood how **localStorage** works for saving and retrieving user preferences and data across sessions
- Learned how **IntersectionObserver** works as a more efficient alternative to scroll event listeners
- Understood how to use `data-*` attributes in HTML to store metadata used by JavaScript
- Learned how **CSS animations** (`@keyframes`) work and how to combine `transform` and `opacity` for smooth effects
- Learned about **performance optimization** techniques like lazy loading, preconnect, dns-prefetch, and debouncing

### Concepts
- **State management** — understanding how an app remembers and updates information as users interact with it
- **API error handling** — always showing friendly messages when data fails to load
- **Separation of concerns** — keeping HTML, CSS, and JS responsibilities clearly separated
- **DOM manipulation** — creating, inserting, and removing elements dynamically with JavaScript

### Workflow Improvements
- Started writing code in organized sections with clear comments (`// ===== Section Name =====`)
- Learned to always test APIs in the browser console before using them in code
- Got into the habit of checking DevTools console for errors after every change

---

## 4. Responsible Use & Modifications

### How I reviewed AI output
- Read every line of code before adding it to my project
- Tested each feature individually in the browser to verify it works correctly
- Checked the browser DevTools console for any errors or warnings after each addition

### How I modified AI suggestions
- Changed all CSS class names and variable names to match my existing design system (e.g., `var(--primary)`, `var(--spacing-md)`)
- Replaced placeholder content with my real information (GitHub username `CVQC`, my name, real project details)
- Adjusted API endpoints when suggested ones were outdated or down (replaced `quotable.io` with `dummyjson.com`)
- Reorganized code structure when AI output was placed in the wrong location
- Added `dark mode` support to all new components since AI didn't always include it automatically
- Removed `console.log(data)` debug lines before final submission

### Academic Integrity
- All AI-generated code was understood, tested, and modified before use
- AI was used as a **learning tool and assistant**, not as a replacement for my own thinking
- The overall design, structure, and content decisions were made by me
- I can explain every function and feature in this project

---

## 5. Summary

| Tool | Primary Role | Assignment Areas |
|---|---|---|
| ChatGPT | Concept understanding & planning | All requirements (planning phase) |
| Claude (Perplexity AI) | Implementation, debugging & optimization | Requirements 2, 3, 4, 5 |