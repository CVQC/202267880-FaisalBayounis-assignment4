# AI Usage Report — Assignment 4
**Student:** Faisal Bayounis  
**Student ID:** 202267880  
**Course:** Web Development  
**Date:** April 24, 2026

---

## 1. Tools Used & Use Cases

### ChatGPT
| Use Case | Description |
|----------|-------------|
| **Concept Understanding** | Used to understand performance optimization concepts like lazy loading, preconnect, dns-prefetch, and image compression before implementing them |
| **Planning & Brainstorming** | Helped identify which polish and quality improvements to prioritize (accessibility, responsiveness, error handling) |
| **Cross-browser Compatibility** | Asked general questions about CSS and JS compatibility across Chrome, Firefox, and Safari |
| **Responsive Design Guidance** | Consulted for best practices on mobile-first layout adjustments and media query breakpoints |

### Perplexity AI (Claude)
| Use Case | Description |
|----------|-------------|
| **Code Polishing** | Reviewed the full codebase from Assignment 3 and suggested improvements for cleanliness, indentation consistency, and naming conventions |
| **Performance Optimization** | Implemented `loading="lazy"`, `preconnect`, `dns-prefetch`, `defer` on script tags, and debounced scroll events to improve page load speed |
| **Error Handling** | Added graceful error messages and loading states to all three API integrations (GitHub, iTunes, DummyJSON) |
| **UI/UX Enhancements** | Suggested and implemented scroll progress bar, animated number counters, gradient text effects, and scroll-reveal animations using IntersectionObserver |
| **Deployment** | Guided the full Vercel deployment workflow including GitHub integration, live URL setup, and automatic redeployment on push |
| **Documentation** | Assisted in writing the README.md, technical documentation, and this AI usage report |
| **Debugging** | Resolved final issues including misplaced JavaScript functions, CSS dark mode inconsistencies on new components, and API loading state bugs |

---

## 2. Recommended AI Tools

| Tool | Primary Role |
|------|-------------|
| **GitHub Copilot** | Inline code completion and generation within the editor |
| **ChatGPT / Claude** | Problem-solving, concept explanations, and architecture decisions |
| **Perplexity AI** | Research-backed answers, full code generation, and documentation support |


---

## 3. Benefits & Challenges

### ✅ Benefits

- **Production Readiness:** AI helped identify and fix non-obvious quality issues such as missing `aria-label` attributes, inconsistent spacing, and components that lacked dark mode support — turning a functional website into a professional-quality one.
- **Performance Gains:** Implementing AI-suggested optimizations like `defer`, `preconnect`, lazy loading, and debounced scroll handlers noticeably improved page load performance and scroll smoothness.
- **Visual Polish:** UI/UX enhancements suggested by AI — including the scroll progress bar, number counters, and gradient hero text — elevated the design significantly beyond the Assignment 3 baseline.
- **Faster Deployment:** Step-by-step Vercel deployment guidance reduced setup time and avoided common configuration mistakes.
- **Error Resilience:** AI consistently reminded me to add loading indicators and fallback error messages to every async operation, making the app more robust.

### ⚠️ Challenges

- **Context Gaps:** Since AI didn't have direct access to the live code files, some suggestions required manual adaptation to match existing CSS variable names and class structure.
- **Dark Mode Coverage:** AI-generated code for new components sometimes missed dark mode styling, requiring manual review and addition of `[data-theme="dark"]` overrides.
- **Over-generation:** AI occasionally suggested more features than necessary; careful selection was needed to avoid scope creep and keep the codebase clean.
- **Testing Still Manual:** AI cannot test across real devices and browsers — all cross-device and cross-browser testing had to be done manually.

---

## 4. Learning Outcomes

### Technical Skills
- Learned how to audit and optimize a web project for production quality, including performance, accessibility, and responsiveness
- Understood how to implement scroll-based animations using IntersectionObserver as a performance-efficient alternative to scroll event listeners
- Gained experience deploying a real web application to a live server using Vercel with GitHub CI/CD integration
- Learned how to structure a project repository professionally with clear documentation, organized file structure, and meaningful commit history
- Understood how CSS custom properties (`--var`) enable consistent theming across light and dark modes at scale

### Concepts
- **Production readiness** — the difference between code that "works" and code that is clean, optimized, and maintainable
- **Continuous deployment** — how pushing to GitHub automatically triggers a new Vercel build and updates the live site
- **Accessibility** — the importance of semantic HTML, `aria-label`, keyboard navigation, and color contrast for real-world users
- **Graceful degradation** — ensuring the app handles API failures and slow connections without breaking the user experience

### Workflow Improvements
- Adopted a structured final review checklist before deployment (console errors, mobile layout, dark mode, API fallbacks)
- Practiced writing clean commit messages that describe changes meaningfully (e.g., `"Add Vercel live deployment link"`)
- Learned to test each new feature in isolation before integrating it into the full codebase

---

## 5. Responsible Use & Modifications

### How I Reviewed AI Output
- Read and understood every line of code before adding it to the project
- Tested each new feature individually in the browser using DevTools before considering it complete
- Checked the console for errors and warnings after every code addition
- Verified that all API integrations returned real, expected data before finalizing

### How I Modified AI Suggestions
- Updated all CSS class names and variable references to match my existing design system (e.g., `var(--primary)`, `var(--bg-secondary)`, `var(--spacing-md)`)
- Replaced all placeholder content with real personal information (name, GitHub username `CVQC`, real project descriptions)
- Manually added dark mode support to every new component AI generated, since it wasn't always included automatically
- Removed all debug `console.log()` statements before final deployment
- Reorganized code structure when AI output was inserted in the wrong location or broke existing logic

### Academic Integrity
- All AI-generated code was understood, tested, and modified before use
- AI was used as a development assistant and learning tool — not as a replacement for my own thinking and decision-making
- The overall design direction, feature priorities, and project content were determined by me
- I can explain every function, feature, and design decision in this project independently

---

## 6. Summary

| Tool | Primary Role | Assignment Areas |
|------|-------------|-----------------|
| **ChatGPT** | Concept understanding & planning | Performance, responsiveness, browser compatibility |
| **Perplexity AI (Claude)** | Implementation, debugging & optimization | All major features, deployment, documentation, UI polish |

---

*This report was prepared honestly and reflects the actual use of AI tools during the completion of Assignment 4.*
