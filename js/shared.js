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
    },
    // {
    //     filename: "css_grid_mastery.md",
    //     title: "CSS Grid Layout Mastery",
    //     date: "Aug 15",
    //     year: "2025",
    //     tags: ["css", "layout", "grid"],
    //     words: 1200,
    //     readTime: "12 min",
    //     link: "posts/post2.html",
    //     description: "Modern CSS Grid provides powerful layout capabilities that were previously impossible or required complex workarounds. Learn the essential patterns and techniques for building flexible, responsive layouts."
    // },
    // {
    //     filename: "static_site_generators.md",
    //     title: "Static Site Generators in 2025",
    //     date: "Aug 10",
    //     year: "2025",
    //     tags: ["jamstack", "build", "performance"],
    //     words: 956,
    //     readTime: "9 min",
    //     link: "posts/post3.html",
    //     description: "Static site generators have evolved significantly. From Jekyll to modern tools like Hugo and 11ty, discover which approach works best for different project types and how to choose the right tool for your needs."
    // },
    // {
    //     filename: "minimal_design_philosophy.md",
    //     title: "The Art of Minimalist Design",
    //     date: "Aug 08",
    //     year: "2025",
    //     tags: ["design", "minimalism", "ux"],
    //     words: 723,
    //     readTime: "7 min",
    //     link: "posts/post4.html",
    //     description: "Explore the principles of minimalist design and how reducing visual noise can improve user experience. Less is often more when it comes to effective web interfaces."
    // },
    // {
    //     filename: "command_line_productivity.md",
    //     title: "Command Line Productivity Tips",
    //     date: "Aug 05",
    //     year: "2025",
    //     tags: ["cli", "tools", "productivity"],
    //     words: 1150,
    //     readTime: "11 min",
    //     link: "posts/post5.html",
    //     description: "Master essential command line tools and techniques that can dramatically improve your development workflow. From file manipulation to process management."
    // },
    // {
    //     filename: "color_theory_terminals.md",
    //     title: "Color Theory for Terminal Interfaces",
    //     date: "Aug 02",
    //     year: "2025",
    //     tags: ["color", "design", "accessibility"],
    //     words: 892,
    //     readTime: "8 min",
    //     link: "posts/post6.html",
    //     description: "Understanding color theory is crucial for creating accessible and visually appealing terminal interfaces. Learn about contrast, color psychology, and practical applications."
    // },
    // {
    //     filename: "monospace_typography.md",
    //     title: "The Beauty of Monospace Typography",
    //     date: "Jul 28",
    //     year: "2025",
    //     tags: ["typography", "fonts", "design"],
    //     words: 634,
    //     readTime: "6 min",
    //     link: "posts/post7.html",
    //     description: "Monospace fonts aren't just for code. Discover how consistent character spacing can improve readability and create distinctive design patterns."
    // },
    // {
    //     filename: "keyboard_navigation.md",
    //     title: "Keyboard-First Web Design",
    //     date: "Jul 25",
    //     year: "2025",
    //     tags: ["accessibility", "keyboard", "ux"],
    //     words: 1080,
    //     readTime: "10 min",
    //     link: "posts/post8.html",
    //     description: "Building websites that work seamlessly with keyboard navigation improves accessibility and user experience. Essential techniques for keyboard-first design."
    // },
    // {
    //     filename: "performance_optimization.md",
    //     title: "Web Performance Without Frameworks",
    //     date: "Jul 20",
    //     year: "2025",
    //     tags: ["performance", "optimization", "vanilla"],
    //     words: 1300,
    //     readTime: "13 min",
    //     link: "posts/post9.html",
    //     description: "Achieve excellent web performance without relying on heavy frameworks. Vanilla JavaScript and CSS techniques for fast, lightweight websites."
    // },
    // {
    //     filename: "git_workflow_tips.md",
    //     title: "Modern Git Workflows for Solo Developers",
    //     date: "Jul 15",
    //     year: "2025",
    //     tags: ["git", "workflow", "version-control"],
    //     words: 780,
    //     readTime: "7 min",
    //     link: "posts/post10.html",
    //     description: "Streamline your solo development process with effective Git workflows. Branching strategies, commit practices, and repository organization tips."
    // },
    // {
    //     filename: "async_programming_guide.md",
    //     title: "Understanding Async Programming",
    //     date: "Jul 10",
    //     year: "2025",
    //     tags: ["javascript", "async", "programming"],
    //     words: 1450,
    //     readTime: "14 min",
    //     link: "posts/post11.html",
    //     description: "Master asynchronous JavaScript programming patterns. From callbacks to promises to async/await, understand how to handle asynchronous operations effectively."
    // },
    // {
    //     filename: "terminal_ui_patterns.md",
    //     title: "Common Terminal UI Patterns",
    //     date: "Jul 05",
    //     year: "2025",
    //     tags: ["ui", "patterns", "terminal"],
    //     words: 920,
    //     readTime: "9 min",
    //     link: "posts/post12.html",
    //     description: "Common patterns and conventions used in terminal user interfaces. How traditional CLI design principles can inform modern web development."
    // }
];

// ===== MAIN PAGE LATEST POSTS =====

function loadLatestPosts() {
    const articlesContainer = document.getElementById('latestArticles');
    if (!articlesContainer) return;
    
    // Get the 3 most recent posts
    const latestPosts = blogPosts.slice(0, 3);
    
    const commands = [
        'ls -la /blog/latest/',
        'cat /blog/recent/',
        'head -n 20 /blog/recent/'
    ];
    
    const articlesHTML = latestPosts.map((post, index) => {
        return `
            <div class="terminal-window">
                <div class="terminal-header">${commands[index]}${post.filename}</div>
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

// ===== SHARED COLOR SCHEME FUNCTIONALITY =====

function setScheme(scheme) {
    // Remove all scheme classes
    document.body.className = '';
    
    // Add new scheme class (except for matrix which is default)
    if (scheme !== 'matrix') {
        document.body.classList.add('scheme-' + scheme);
    }
    
    // Store preference
    localStorage.setItem('terminal-color-scheme', scheme);
    
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
    const savedScheme = localStorage.getItem('terminal-color-scheme');
    if (savedScheme && savedScheme !== 'matrix') {
        document.body.classList.add('scheme-' + savedScheme);
        
        // Update active button
        const targetButton = document.querySelector(`.scheme-switcher button[onclick*="${savedScheme}"]`);
        if (targetButton) {
            document.querySelectorAll('.scheme-switcher button').forEach(btn => {
                btn.classList.remove('active');
            });
            targetButton.classList.add('active');
        }
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
    
    // Load latest posts on main page
    loadLatestPosts();
    
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
