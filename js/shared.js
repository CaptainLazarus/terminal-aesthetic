// ===== BLOG POST DATA (shared between pages) =====

const blogPosts = [
    {
        filename: "building_terminal_websites.md",
        title: "Building Terminal-Style Websites",
        date: "Aug 18",
        year: "2025",
        tags: ["web-design", "terminal", "css"],
        words: 847,
        readTime: "8 min",
        link: "posts/post1.html",
        description: "In an era of increasingly complex web frameworks and bloated JavaScript bundles, there's something refreshing about returning to the fundamentals. Terminal-style websites offer a unique blend of nostalgia, functionality, and aesthetic appeal."
    }
];

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
    document.addEventListener('keydown', function(event) {
        // Check if Alt is pressed
        if (event.altKey) {
            switch(event.key) {
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
    document.addEventListener('click', function(event) {
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
    window.location.href = 'index.html';
}

function goToBlog() {
    window.location.href = 'blog.html';
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// ===== INITIALIZE WHEN DOM IS LOADED =====

document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardShortcuts();
    setupClickOutside();
    loadSavedScheme();
    
    // Load latest posts and topics on main page
    loadLatestPosts();
    loadTopicsList();
    updateThemeDisplay();
    
    // Only show help on main page
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname.endsWith('/')) {
        showInitialHelp();
    }
});

// Make functions available globally
window.setScheme = setScheme;
window.toggleSwitcher = toggleSwitcher;
window.toggleHelp = toggleHelp;
window.goToMain = goToMain;
window.goToBlog = goToBlog;
window.goBack = goBack;