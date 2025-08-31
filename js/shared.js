// ===== BLOG POST DATA (shared between pages) =====

const blogPosts = [
    {
        filename: "read_this_first.md",
        title: "Read this first",
        date: "Aug 30",
        year: "2025",
        tags: ["web-design", "terminal", "css"],
        readTime: "8 min",
        link: "posts/post1.html",
        description: "If you didn't catch the title, then go read that first."
    },
    {
        filename: "monads_101.md",
        title: "Monads 101 - As I get them",
        date: "Sep 01",
        year: "2025",
        tags: ["FP", "monads", "tutorial"],
        readTime: "4 min",
        link: "posts/monads_101.html",
        description: "FP version of macros - a practical, no-nonsense intro to monads focusing on usage over theory."
    }
];

// ===== REAL-TIME DATE/TIME =====

function updateDateTime(pid) {
    const dateElement = document.getElementById('dateInfo');
    if (!dateElement) return;

    dateElement.textContent = `[${get_datetime()}] Session initialized | PID: ${pid}`;
}

function create_pid() {
    return Math.floor(Math.random() * 9000) + 1000; // Random 4-digit PID
}

function get_datetime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function startClock() {
    let pid = create_pid();
    updateDateTime(pid); // Initial call
    setInterval(() => { updateDateTime(pid) }, 1000); // Update every second
}

// ===== MAIN PAGE LATEST POSTS =====

function loadLatestPosts() {
    const articlesContainer = document.getElementById('latestArticles');
    if (!articlesContainer) return;

    // Get up to 3 most recent posts (or however many we have)
    const latestPosts = blogPosts.slice(0, Math.min(3, blogPosts.length));

    const commands = [
        'ls -la /blog/latest/',
        'cat /blog/recent/',
        'head -n 20 /blog/recent/'
    ];

    const articlesHTML = latestPosts.map((post, index) => {
        return `
            <div class="terminal-window">
                <div class="terminal-header">${commands[index] || 'cat /blog/'}${post.filename}</div>
                <div class="terminal-content">
                    <article class="article">
                        <h3><a href="${post.link}">${post.title}</a></h3>
                        <div class="byline">terminal_user | ${post.date} ${post.year} | ${post.tags.join(', ')}</div>
                        <p>
                            ${post.description}
                        </p>
                    </article>
                </div>
            </div>
        `;
    }).join('');

    articlesContainer.innerHTML = articlesHTML;
}

function loadTopicsList() {
    const topicsContainer = document.getElementById('topicsList');
    if (!topicsContainer) return;

    // Count tag frequency
    const tagCounts = {};
    blogPosts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    // Sort by frequency and get top 5
    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => tag);

    let topicsHTML;
    if (topTags.length >= 5) {
        topicsHTML = topTags.map(tag =>
            `<li><a href="#${tag}">${tag}</a></li>`
        ).join('') + '<li><a href="blog.html">All Posts</a></li>';
    } else {
        // Not enough topics, show sad face
        topicsHTML = `
            <li style="text-align: center; color: var(--text-muted); font-size: 2em; padding: 20px;">
                :(
            </li>
            <li style="text-align: center; color: var(--text-muted); font-size: 0.9em;">
                Not enough posts for topics yet
            </li>
            <li><a href="blog.html">All Posts</a></li>
        `;
    }

    topicsContainer.innerHTML = topicsHTML;
}

// ===== SHARED COLOR SCHEME FUNCTIONALITY =====

// ===== THEME PERSISTENCE =====

const themeNames = {
    'matrix': 'Matrix Green',
    'amber': 'Amber Terminal',
    'cyan': 'Cyan Blue',
    'purple': 'Purple Haze',
    'retro': 'Retro Orange',
    'paper': 'Paper White',
    'hacker': 'Hacker Green',
    'ocean': 'Ocean Blue',
    'fire': 'Fire Red'
};

function updateThemeDisplay() {
    const themeDisplay = document.getElementById('currentTheme');
    if (!themeDisplay) return;

    const pageType = getPageType();
    const currentScheme = localStorage.getItem(`terminal-color-scheme-${pageType}`) ||
        localStorage.getItem('terminal-color-scheme') ||
        'matrix';

    themeDisplay.textContent = themeNames[currentScheme] || 'Matrix Green';
}

function getPageType() {
    const path = window.location.pathname;
    if (path.includes('blog.html')) return 'blog';
    if (path.includes('posts/') || path.includes('post')) return 'posts';
    return 'main';
}

function setScheme(scheme) {
    // Remove all scheme classes
    document.body.className = '';

    // Add new scheme class (except for matrix which is default)
    if (scheme !== 'matrix') {
        document.body.classList.add('scheme-' + scheme);
    }

    // Store preference per page type
    const pageType = getPageType();
    localStorage.setItem(`terminal-color-scheme-${pageType}`, scheme);

    // Update active button
    document.querySelectorAll('.scheme-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Find the button that was clicked or corresponds to this scheme
    const targetButton = document.querySelector(`.scheme-switcher button[onclick*="${scheme}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    // Hide switcher after selection
    const switcher = document.getElementById('schemeSwitcher');
    if (switcher) {
        switcher.classList.add('hidden');
    }

    // Update theme display
    updateThemeDisplay();
}

function toggleSwitcher() {
    const switcher = document.getElementById('schemeSwitcher');
    if (switcher) {
        switcher.classList.toggle('hidden');
    }
}

function toggleHelp() {
    const help = document.getElementById('shortcutsHelp');
    if (help) {
        help.classList.toggle('visible');
    }
}

// ===== KEYBOARD SHORTCUTS =====

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function (event) {
        // Check if Alt is pressed
        if (event.altKey) {
            switch (event.key) {
                case 't':
                    event.preventDefault();
                    toggleSwitcher();
                    break;
                case 'h':
                    event.preventDefault();
                    toggleHelp();
                    break;
                case 'b':
                    event.preventDefault();
                    window.location.href = 'blog.html';
                    break;
                case 'm':
                    event.preventDefault();
                    window.location.href = 'index.html';
                    break;
                case '1':
                    event.preventDefault();
                    setScheme('matrix');
                    break;
                case '2':
                    event.preventDefault();
                    setScheme('amber');
                    break;
                case '3':
                    event.preventDefault();
                    setScheme('cyan');
                    break;
                case '4':
                    event.preventDefault();
                    setScheme('purple');
                    break;
                case '5':
                    event.preventDefault();
                    setScheme('retro');
                    break;
                case '6':
                    event.preventDefault();
                    setScheme('paper');
                    break;
                case '7':
                    event.preventDefault();
                    setScheme('hacker');
                    break;
                case '8':
                    event.preventDefault();
                    setScheme('ocean');
                    break;
                case '9':
                    event.preventDefault();
                    setScheme('fire');
                    break;
            }
        }

        // Escape key closes menus
        if (event.key === 'Escape') {
            const switcher = document.getElementById('schemeSwitcher');
            const help = document.getElementById('shortcutsHelp');

            if (switcher) switcher.classList.add('hidden');
            if (help) help.classList.remove('visible');
        }
    });
}

// ===== CLICK OUTSIDE TO CLOSE =====

function setupClickOutside() {
    document.addEventListener('click', function (event) {
        const switcher = document.getElementById('schemeSwitcher');
        const toggle = document.querySelector('.scheme-toggle');

        if (switcher && toggle &&
            !switcher.contains(event.target) &&
            !toggle.contains(event.target)) {
            switcher.classList.add('hidden');
        }
    });
}

// ===== INITIALIZE COLOR SCHEME FROM STORAGE =====

function loadSavedScheme() {
    const pageType = getPageType();
    const savedScheme = localStorage.getItem(`terminal-color-scheme-${pageType}`) ||
        localStorage.getItem('terminal-color-scheme') || // fallback to old key
        'matrix';

    if (savedScheme && savedScheme !== 'matrix') {
        document.body.classList.add('scheme-' + savedScheme);
    }

    // Update active button
    const targetButton = document.querySelector(`.scheme-switcher button[onclick*="${savedScheme}"]`);
    if (targetButton) {
        document.querySelectorAll('.scheme-switcher button').forEach(btn => {
            btn.classList.remove('active');
        });
        targetButton.classList.add('active');
    }
}

// ===== SHOW HELP ON LOAD =====

function showInitialHelp() {
    const help = document.getElementById('shortcutsHelp');
    if (help) {
        help.classList.add('visible');
        setTimeout(() => {
            help.classList.remove('visible');
        }, 4000); // Hide after 4 seconds
    }
}

// ===== NAVIGATION HELPERS =====

function goToMain() {
    // Check if we're in a subdirectory
    if (window.location.pathname.includes('/posts/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

function goToBlog() {
    // Check if we're in a subdirectory  
    if (window.location.pathname.includes('/posts/')) {
        window.location.href = '../blog.html';
    } else {
        window.location.href = 'blog.html';
    }
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        goToMain();
    }
}

// ===== INITIALIZE WHEN DOM IS LOADED =====

document.addEventListener('DOMContentLoaded', function () {
    setupKeyboardShortcuts();
    setupClickOutside();
    loadSavedScheme();

    // Load latest posts and topics on main page
    loadLatestPosts();
    loadTopicsList();
    updateThemeDisplay();

    // Start real-time clock
    startClock();

    // Initialize notes system
    initializeNotesSystem();


    // Only show help on main page
    if (window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')) {
        showInitialHelp();
    }
});

// ===== NOTES SYSTEM FUNCTIONALITY (REPLACE EXISTING) =====

// ===== NOTES SYSTEM FUNCTIONALITY (REPLACE EXISTING) =====

function initializeNotesSystem() {
    let activeNote = null;
    let hideTimer = null;

    // Handle note reference clicks
    const noteRefs = document.querySelectorAll('.note-ref');
    noteRefs.forEach(ref => {

        // Click handler
        ref.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const noteId = this.getAttribute('href').substring(1);
            const noteContent = document.getElementById(noteId);

            if (noteContent) {
                // Hide any currently active note
                if (activeNote && activeNote !== noteContent) {
                    hideNote(activeNote);
                }

                if (noteContent.classList.contains('visible')) {
                    hideNote(noteContent);
                } else {
                    showNote(noteContent, this);
                }
            }
        });

        // Hover handlers for better UX
        ref.addEventListener('mouseenter', function () {
            // Clear any pending hide timer
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
        });

        ref.addEventListener('mouseleave', function () {
            // Set a timer to hide the note after a delay
            if (activeNote) {
                hideTimer = setTimeout(() => {
                    if (activeNote && !isHoveringNote(activeNote)) {
                        hideNote(activeNote);
                    }
                }, 1000); // 1 second delay
            }
        });
    });

    // Functions to show/hide notes
    function showNote(noteElement, trigger) {
        const triggerRect = trigger.getBoundingClientRect();

        if (noteElement.classList.contains('sidenote')) {
            // Sidenotes are positioned with fixed CSS, just show them
            // They'll appear in the right place due to CSS positioning
        } else if (noteElement.classList.contains('note-popup')) {
            // Position popup near the trigger but within viewport
            let left = triggerRect.left;
            let top = triggerRect.bottom + 10;

            // Adjust if popup would go off-screen horizontally
            const viewportWidth = window.innerWidth;
            const popupWidth = 350;

            if (left + popupWidth > viewportWidth - 20) {
                left = viewportWidth - popupWidth - 20;
            }
            if (left < 20) {
                left = 20;
            }

            // Adjust if popup would go off-screen vertically
            const viewportHeight = window.innerHeight;
            const estimatedPopupHeight = 200; // Rough estimate

            if (top + estimatedPopupHeight > viewportHeight - 20) {
                top = triggerRect.top - estimatedPopupHeight - 10;
                // Remove the arrow if popup is above
                noteElement.style.setProperty('--arrow-display', 'none');
            } else {
                noteElement.style.removeProperty('--arrow-display');
            }

            // Ensure minimum distance from edges
            if (top < 20) {
                top = 20;
            }

            noteElement.style.left = left + 'px';
            noteElement.style.top = top + 'px';
        }

        noteElement.classList.add('visible');
        activeNote = noteElement;

        // Add hover handlers to the note itself to prevent premature hiding
        noteElement.addEventListener('mouseenter', function () {
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
        });

        noteElement.addEventListener('mouseleave', function () {
            hideTimer = setTimeout(() => {
                hideNote(noteElement);
            }, 500); // Shorter delay when leaving note
        });
    }

    function hideNote(noteElement) {
        if (noteElement) {
            noteElement.classList.remove('visible');
            if (activeNote === noteElement) {
                activeNote = null;
            }
        }
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    function hideAllNotes() {
        document.querySelectorAll('.note-popup.visible, .sidenote.visible').forEach(note => {
            hideNote(note);
        });
    }

    function isHoveringNote(noteElement) {
        return noteElement.matches(':hover');
    }

    // Close notes when clicking elsewhere
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.note-ref') &&
            !e.target.closest('.note-popup') &&
            !e.target.closest('.sidenote')) {
            hideAllNotes();
        }
    });

    // Close notes on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideAllNotes();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        hideAllNotes();
    });

    // Handle scroll - hide notes when scrolling
    let scrollTimer = null;
    window.addEventListener('scroll', function () {
        if (activeNote) {
            // Clear existing timer
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }

            // Hide notes after scrolling stops
            scrollTimer = setTimeout(() => {
                hideAllNotes();
            }, 150);
        }
    });

    // Debug function to test if notes system is working
    window.testNotes = function () {
        console.log('Notes found:', document.querySelectorAll('.note-ref').length);
        console.log('Sidenotes found:', document.querySelectorAll('.sidenote').length);
        console.log('Popups found:', document.querySelectorAll('.note-popup').length);
    };
}

// Make functions available globally
window.setScheme = setScheme;
window.toggleSwitcher = toggleSwitcher;
window.toggleHelp = toggleHelp;
window.goToMain = goToMain;
window.goToBlog = goToBlog;
window.goBack = goBack;
