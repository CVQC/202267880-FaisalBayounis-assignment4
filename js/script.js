'use strict';

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            func(...args);
        }, wait);
    };
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== Element References =====
    const themeToggle    = document.getElementById('theme-toggle');
    const themeIcon      = document.querySelector('.theme-icon');
    const greeting       = document.getElementById('greeting');
    const contactForm    = document.getElementById('contact-form');
    const formMessage    = document.getElementById('form-message');
    const navLinks       = document.querySelectorAll('.nav-links a');
    const sections       = document.querySelectorAll('section');

    // ===== Dark Mode =====
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => { themeToggle.style.transform = ''; }, 300);
    });

    themeToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // ===== Dynamic Greeting =====
    function setGreeting() {
        const hour = new Date().getHours();
        let message, emoji;
        if (hour < 12)      { message = 'Good Morning';   emoji = '☀️'; }
        else if (hour < 17) { message = 'Good Afternoon'; emoji = '🌤️'; }
        else                { message = 'Good Evening';   emoji = '🌙'; }
        greeting.textContent = `${message} ${emoji} Welcome to my portfolio!`;
    }
    setGreeting();

    // ===== Visitor Name State Management =====
    const namePrompt        = document.getElementById('name-prompt');
    const visitorNameInput  = document.getElementById('visitor-name-input');
    const saveNameBtn       = document.getElementById('save-name-btn');
    const skipNameBtn       = document.getElementById('skip-name-btn');
    const returningMsg      = document.getElementById('returning-msg');
    const resetNameBtn      = document.getElementById('reset-name-btn');

    function showReturningState(name) {
        namePrompt.classList.add('hidden');
        returningMsg.textContent = `👋 Welcome back, ${name}!`;
        returningMsg.classList.remove('hidden');
        resetNameBtn.classList.remove('hidden');
    }

    function showNewVisitorState() {
        namePrompt.classList.remove('hidden');
        returningMsg.classList.add('hidden');
        resetNameBtn.classList.add('hidden');
    }

    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        showReturningState(savedName);
    } else {
        showNewVisitorState();
    }

    saveNameBtn.addEventListener('click', function () {
        const name = visitorNameInput.value.trim();
        if (!name) {
            visitorNameInput.style.borderColor = 'rgba(231,76,60,0.8)';
            visitorNameInput.placeholder = 'Please enter your name!';
            return;
        }
        localStorage.setItem('visitorName', name);
        showReturningState(name);
    });

    visitorNameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') saveNameBtn.click();
    });

    skipNameBtn.addEventListener('click', function () {
        namePrompt.classList.add('hidden');
        resetNameBtn.classList.remove('hidden');
    });

    resetNameBtn.addEventListener('click', function () {
        localStorage.removeItem('visitorName');
        visitorNameInput.value = '';
        visitorNameInput.style.borderColor = '';
        visitorNameInput.placeholder = 'Enter your name...';
        showNewVisitorState();
    });

    // ===== Active Nav Highlight =====
    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').slice(1) === current;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    }

    window.addEventListener('scroll', debounce(highlightActiveSection, 100));

    // ===== Project Filter + Sort =====
    const filterButtons   = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.project-card');
    const projectCount    = document.getElementById('project-count');
    const sortSelect      = document.getElementById('sort-select');
    let currentFilter     = 'all';

    function updateCount(count) {
        projectCount.textContent = `${count} project${count === 1 ? '' : 's'} shown`;
    }

    function applyFilterAndSort() {
        const cards     = Array.from(allProjectCards);
        const sortValue = sortSelect.value;

        cards.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            if (sortValue === 'name-asc')  return nameA.localeCompare(nameB);
            if (sortValue === 'name-desc') return nameB.localeCompare(nameA);
            return 0;
        });

        const grid = document.querySelector('.projects-grid');
        cards.forEach(card => grid.appendChild(card));

        let visible = 0;
        cards.forEach(card => {
            const match = currentFilter === 'all' || card.dataset.category === currentFilter;
            card.classList.toggle('hidden', !match);
            if (match) visible++;
        });

        const existing = document.getElementById('no-projects-msg');
        if (existing) existing.remove();

        if (visible === 0) {
            const msg = document.createElement('p');
            msg.id        = 'no-projects-msg';
            msg.className = 'no-projects-msg';
            msg.setAttribute('role', 'status');
            msg.textContent = '😕 No projects found in this category.';
            document.querySelector('.projects-grid').after(msg);
        }

        updateCount(visible);
    }

    sortSelect.addEventListener('change', applyFilterAndSort);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            currentFilter = this.dataset.filter;
            applyFilterAndSort();
        });
    });

    applyFilterAndSort();

    // ===== Expand / Collapse Skills =====
    document.querySelectorAll('.skill-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const extra   = this.previousElementSibling;
            const isOpen  = extra.classList.toggle('open');
            extra.setAttribute('aria-hidden', String(!isOpen));
            this.setAttribute('aria-expanded', String(isOpen));
            this.textContent = isOpen ? 'Show less ▲' : 'Show more ▼';
        });
    });

    // ===== Scroll Animation (IntersectionObserver) =====
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== Project Card Hover =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ===== Contact Form =====
    function setFieldError(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (message) {
            field.classList.add('invalid');
            error.textContent = message;
        } else {
            field.classList.remove('invalid');
            error.textContent = '';
        }
    }

    function clearAllErrors() {
        ['name', 'email', 'message'].forEach(id => {
            setFieldError(id, `${id}-error`, '');
        });
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearAllErrors();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let   hasError = false;

        if (!name) {
            setFieldError('name', 'name-error', 'Name is required.');
            hasError = true;
        }
        if (!email) {
            setFieldError('email', 'email-error', 'Email is required.');
            hasError = true;
        } else if (!isValidEmail(email)) {
            setFieldError('email', 'email-error', 'Please enter a valid email address.');
            hasError = true;
        }
        if (!message) {
            setFieldError('message', 'message-error', 'Message is required.');
            hasError = true;
        } else if (message.length < 10) {
            setFieldError('message', 'message-error', 'Message must be at least 10 characters.');
            hasError = true;
        }

        if (hasError) return;

        const submitBtn       = contactForm.querySelector('.btn-submit');
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            showFormMessage(`Thanks ${name}! Your message has been received. I'll get back to you soon! 🎉`, 'success');
            contactForm.reset();
            clearAllErrors();
            submitBtn.disabled    = false;
            submitBtn.textContent = 'Send Message';
        }, 1500);
    });

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className   = `form-message ${type}`;
        formMessage.style.display = 'block';
        setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    }

    // ===== GitHub Repositories API =====
    const githubResults = document.getElementById('github-results');
    const githubLoading = document.getElementById('github-loading');
    const githubError   = document.getElementById('github-error');

    function fetchGitHubRepos() {
        githubLoading.style.display = 'block';
        githubResults.innerHTML     = '';
        githubError.textContent     = '';

        fetch('https://api.github.com/users/CVQC/repos?sort=updated&per_page=6')
            .then(response => {
                if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
                return response.json();
            })
            .then(repos => {
                githubLoading.style.display = 'none';
                if (!repos.length) {
                    githubResults.innerHTML = '<p style="text-align:center;color:var(--text-light)">No public repositories found.</p>';
                    return;
                }
                githubResults.innerHTML = repos.map(repo => `
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-card" aria-label="${repo.name} repository">
                        <h4>📁 ${repo.name}</h4>
                        <p>${repo.description ? repo.description : 'No description provided.'}</p>
                        <div class="github-meta">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                            ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                        </div>
                    </a>
                `).join('');
            })
            .catch(err => {
                githubLoading.style.display = 'none';
                githubError.textContent = '⚠️ Could not load GitHub repositories. Please check your connection and try again.';
                console.error('GitHub API failed:', err.message);
            });
    }

    fetchGitHubRepos();

    // ===== Inspirational Quotes API =====
    const quoteText   = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const quoteError  = document.getElementById('quote-error');

    function fetchQuote() {
        quoteText.textContent   = 'Loading...';
        quoteAuthor.textContent = '';
        quoteError.textContent  = '';
        newQuoteBtn.disabled    = true;

        fetch('https://dummyjson.com/quotes/random')
            .then(response => {
                if (!response.ok) throw new Error(`Quotes API error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                quoteText.textContent   = `"${data.quote}"`;
                quoteAuthor.textContent = `— ${data.author}`;
                newQuoteBtn.disabled    = false;
            })
            .catch(err => {
                quoteText.textContent  = '';
                quoteError.textContent = '⚠️ Could not load a quote. Please check your connection.';
                newQuoteBtn.disabled   = false;
                console.error('Quotes API failed:', err.message);
            });
    }

    fetchQuote();
    newQuoteBtn.addEventListener('click', fetchQuote);

    // ===== iTunes Music Search API =====
    const musicInput     = document.getElementById('music-input');
    const musicSearchBtn = document.getElementById('music-search-btn');
    const musicResults   = document.getElementById('music-results');
    const musicError     = document.getElementById('music-error');

    function searchMusic() {
        const query = musicInput.value.trim();
        if (!query) {
            musicError.textContent = '⚠️ Please enter an artist or song name.';
            musicInput.focus();
            return;
        }

        musicError.textContent   = '';
        musicResults.innerHTML   = '<p style="text-align:center;color:var(--text-light);grid-column:1/-1">🎵 Searching...</p>';
        musicSearchBtn.disabled  = true;

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=8`)
            .then(response => {
                if (!response.ok) throw new Error(`iTunes API error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                musicSearchBtn.disabled = false;
                if (!data.results.length) {
                    musicResults.innerHTML = '';
                    musicError.textContent = '⚠️ No results found. Try a different search.';
                    return;
                }

                musicResults.innerHTML = data.results.map((track, index) => `
                    <div class="music-card">
                        <img src="${track.artworkUrl100}"
                             alt="Album art for ${track.trackName || 'Unknown Track'} by ${track.artistName}"
                             loading="lazy" width="100" height="100">
                        <h4>${track.trackName || 'Unknown Track'}</h4>
                        <p>${track.artistName || 'Unknown Artist'}</p>
                        ${track.previewUrl
                            ? `<audio id="audio-${index}" src="${track.previewUrl}" preload="none"></audio>
                               <button class="play-btn" data-index="${index}" aria-label="Play preview of ${track.trackName}">▶ Play Preview</button>`
                            : '<p class="no-preview">No preview available</p>'
                        }
                    </div>
                `).join('');

                // Audio play/pause logic
                document.querySelectorAll('.play-btn').forEach(btn => {
                    btn.addEventListener('click', function () {
                        const index = this.dataset.index;
                        const audio = document.getElementById(`audio-${index}`);

                        // Pause all other audios
                        document.querySelectorAll('.music-results audio').forEach(a => {
                            if (a.id !== `audio-${index}`) {
                                a.pause();
                                a.currentTime = 0;
                            }
                        });
                        document.querySelectorAll('.play-btn').forEach(b => {
                            b.textContent = '▶ Play Preview';
                            b.setAttribute('aria-label', b.getAttribute('aria-label').replace('Pause', 'Play'));
                        });

                        if (audio.paused) {
                            audio.play().catch(() => {
                                musicError.textContent = '⚠️ Could not play this preview.';
                            });
                            this.textContent = '⏸ Pause';
                        } else {
                            audio.pause();
                            this.textContent = '▶ Play Preview';
                        }

                        audio.onended = () => { this.textContent = '▶ Play Preview'; };
                    });
                });
            })
            .catch(err => {
                musicSearchBtn.disabled = false;
                musicResults.innerHTML  = '';
                musicError.textContent  = '⚠️ Could not load results. Please check your connection.';
                console.error('iTunes API failed:', err.message);
            });
    }

    musicSearchBtn.addEventListener('click', searchMusic);
    musicInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') searchMusic();
    });

    // ===== Visit Timer =====
    let seconds   = 0;
    const visitTime = document.getElementById('visit-time');

    setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        visitTime.textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    }, 1000);

    // ===== Console Messages =====
    console.log('%c👋 Welcome to Faisal\'s Portfolio!', 'color: #3498db; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/CVQC', 'color: #2ecc71; font-size: 14px;');

    window.addEventListener('load', function () {
        const loadTime = performance.now();
        console.log(`✨ Page fully loaded in ${loadTime.toFixed(2)}ms`);
    });

}); // ← END of DOMContentLoaded
