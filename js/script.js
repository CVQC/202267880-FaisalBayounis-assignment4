// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', function() {

    // ===== Element References =====
    const themeToggle = document.getElementById('theme-toggle');
    const greeting = document.getElementById('greeting');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const themeIcon = document.querySelector('.theme-icon');

    // ===== Dark Mode Toggle =====
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }

        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    // ===== Dynamic Greeting =====
    function setGreeting() {
        const hour = new Date().getHours();
        let message, emoji;

        if (hour < 12) {
            message = 'Good Morning';
            emoji = '☀️';
        } else if (hour < 17) {
            message = 'Good Afternoon';
            emoji = '🌤️';
        } else {
            message = 'Good Evening';
            emoji = '🌙';
        }

        greeting.textContent = `${message} ${emoji} Welcome to my portfolio!`;
    }

    setGreeting();

    // ===== Visitor Name State Management =====
    const namePrompt = document.getElementById('name-prompt');
    const visitorNameInput = document.getElementById('visitor-name-input');
    const saveNameBtn = document.getElementById('save-name-btn');
    const skipNameBtn = document.getElementById('skip-name-btn');
    const returningMsg = document.getElementById('returning-msg');
    const resetNameBtn = document.getElementById('reset-name-btn');

    const savedName = localStorage.getItem('visitorName');

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

    if (savedName) {
        showReturningState(savedName);
    } else {
        showNewVisitorState();
    }

    saveNameBtn.addEventListener('click', function() {
        const name = visitorNameInput.value.trim();
        if (!name) {
            visitorNameInput.style.borderColor = 'var(--accent)';
            visitorNameInput.placeholder = 'Please enter your name!';
            return;
        }
        localStorage.setItem('visitorName', name);
        showReturningState(name);
    });

    visitorNameInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') saveNameBtn.click();
    });

    skipNameBtn.addEventListener('click', function() {
        namePrompt.classList.add('hidden');
        resetNameBtn.classList.remove('hidden');
    });

    resetNameBtn.addEventListener('click', function() {
        localStorage.removeItem('visitorName');
        visitorNameInput.value = '';
        visitorNameInput.style.borderColor = '';
        visitorNameInput.placeholder = 'Enter your name...';
        showNewVisitorState();
    });

    // ===== Active Nav Highlight =====
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function highlightActiveSection() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(highlightActiveSection, 100));

    // ===== Form Validation & Submission =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (message.length < 10) {
            showMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }

        submitForm(name, email, message);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function submitForm(name, email, message) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            showMessage(`Thanks ${name}! Your message has been received. I'll get back to you soon! 🎉`, 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            console.log('Form submitted:', { name, email, message });
        }, 1500);
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ===== Scroll Animation (IntersectionObserver) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== Project Card Hover =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== Keyboard Support =====
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // ===== Console Messages =====
    console.log('%c👋 Welcome to my Portfolio!', 'color: #3498db; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #2ecc71; font-size: 14px;');

    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`✨ Page loaded in ${loadTime.toFixed(2)}ms`);
    });

    // ===== Project Filter + Sort =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.project-card');
    const projectCount = document.getElementById('project-count');
    const sortSelect = document.getElementById('sort-select');
    let currentFilter = 'all';

    function updateCount(count) {
        projectCount.textContent = count + ' project' + (count === 1 ? '' : 's') + ' shown';
    }

    function filterProjects(filter) {
        currentFilter = filter;
        applyFilterAndSort();
    }

    function applyFilterAndSort() {
        const cards = Array.from(allProjectCards);
        const sortValue = sortSelect.value;

        cards.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            if (sortValue === 'name-asc') return nameA.localeCompare(nameB);
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
            msg.id = 'no-projects-msg';
            msg.className = 'no-projects-msg';
            msg.textContent = '😕 No projects found in this category.';
            document.querySelector('.projects-grid').after(msg);
        }

        updateCount(visible);
    }

    sortSelect.addEventListener('change', applyFilterAndSort);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(this.dataset.filter);
        });
    });

    filterProjects('all');

    // ===== Expand/Collapse Skills =====
    document.querySelectorAll('.skill-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const extra = this.previousElementSibling;
            extra.classList.toggle('open');
            this.textContent = extra.classList.contains('open') ? 'Show less ▲' : 'Show more ▼';
        });
    });

    // ===== Music Search API =====
    const musicInput = document.getElementById('music-input');
    const musicSearchBtn = document.getElementById('music-search-btn');
    const musicResults = document.getElementById('music-results');
    const musicError = document.getElementById('music-error');

    function searchMusic() {
        const query = musicInput.value.trim();
        if (!query) {
            musicError.textContent = '⚠️ Please enter an artist or song name.';
            return;
        }

        musicError.textContent = '';
        musicResults.innerHTML = '<p style="text-align:center;color:var(--text-light)">Searching...</p>';
        musicSearchBtn.disabled = true;

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=8`)
            .then(response => {
                if (!response.ok) throw new Error('Failed');
                return response.json();
            })
            .then(data => {
                musicSearchBtn.disabled = false;
                if (data.results.length === 0) {
                    musicResults.innerHTML = '';
                    musicError.textContent = '⚠️ No results found. Try a different search.';
                    return;
                }
                musicResults.innerHTML = data.results.map((track, index) => `
                    <div class="music-card">
                        <img src="${track.artworkUrl100}" alt="${track.trackName}" loading="lazy">
                        <h4>${track.trackName}</h4>
                        <p>${track.artistName}</p>
                        ${track.previewUrl ? `
                            <audio id="audio-${index}" src="${track.previewUrl}"></audio>
                            <button class="play-btn" data-index="${index}">▶ Play Preview</button>
                        ` : '<p class="no-preview">No preview available</p>'}
                    </div>
                `).join('');

                document.querySelectorAll('.play-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = this.dataset.index;
                        const audio = document.getElementById('audio-' + index);

                        document.querySelectorAll('.music-results audio').forEach(a => {
                            if (a.id !== 'audio-' + index) {
                                a.pause();
                                a.currentTime = 0;
                            }
                        });
                        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶ Play Preview');

                        if (audio.paused) {
                            audio.play();
                            this.textContent = '⏸ Pause';
                        } else {
                            audio.pause();
                            this.textContent = '▶ Play Preview';
                        }

                        audio.onended = () => {
                            this.textContent = '▶ Play Preview';
                        };
                    });
                });
            })
            .catch(() => {
                musicSearchBtn.disabled = false;
                musicResults.innerHTML = '';
                musicError.textContent = '⚠️ Could not load results. Please check your connection.';
            });
    }

    musicSearchBtn.addEventListener('click', searchMusic);
    musicInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') searchMusic();
    });

    // ===== GitHub Repositories API =====
    const githubResults = document.getElementById('github-results');
    const githubError = document.getElementById('github-error');

    function fetchGitHubRepos() {
        githubResults.innerHTML = '<p style="text-align:center;color:var(--text-light)">Loading repositories...</p>';

        fetch('https://api.github.com/users/CVQC/repos?sort=updated&per_page=6')
            .then(response => {
                if (!response.ok) throw new Error('Failed');
                return response.json();
            })
            .then(repos => {
                if (repos.length === 0) {
                    githubResults.innerHTML = '<p style="text-align:center">No repositories found.</p>';
                    return;
                }
                githubResults.innerHTML = repos.map(repo => `
                    <a href="${repo.html_url}" target="_blank" class="github-card">
                        <h4>📁 ${repo.name}</h4>
                        <p>${repo.description || 'No description provided.'}</p>
                        <div class="github-meta">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                            ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                        </div>
                    </a>
                `).join('');
            })
            .catch(() => {
                githubResults.innerHTML = '';
                githubError.textContent = '⚠️ Could not load GitHub repositories. Please try again later.';
            });
    }

    fetchGitHubRepos();

    // ===== Inspirational Quotes API =====
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const quoteError = document.getElementById('quote-error');

    function fetchQuote() {
        quoteText.textContent = 'Loading...';
        quoteAuthor.textContent = '';
        quoteError.textContent = '';
        newQuoteBtn.disabled = true;

        fetch('https://dummyjson.com/quotes/random')
            .then(response => {
                if (!response.ok) throw new Error('Failed');
                return response.json();
            })
            .then(data => {
                quoteText.textContent = `"${data.quote}"`;
                quoteAuthor.textContent = `— ${data.author}`;
                newQuoteBtn.disabled = false;
            })
            .catch(() => {
                quoteText.textContent = '';
                quoteError.textContent = '⚠️ Could not load a quote. Please check your connection.';
                newQuoteBtn.disabled = false;
            });
    }

    fetchQuote();
    newQuoteBtn.addEventListener('click', fetchQuote);

    // ===== Visit Timer =====
    let seconds = 0;
    const visitTime = document.getElementById('visit-time');

    setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        visitTime.textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    }, 1000);

}); // ← END of DOMContentLoaded


// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}