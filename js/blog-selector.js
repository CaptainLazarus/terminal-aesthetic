// ===== BLOG POST DATA =====

const blogPosts = [
    {
        filename: "building_terminal_websites.md",
        title: "Building Terminal-Style Websites",
        date: "Aug 18",
        year: "2025",
        tags: ["web-design", "terminal", "css"],
        words: 847,
        readTime: "8 min",
        link: "posts/post1.html"
    },
    // {
    //     filename: "css_grid_mastery.md",
    //     title: "CSS Grid Layout Mastery",
    //     date: "Aug 15",
    //     year: "2025",
    //     tags: ["css", "layout", "grid"],
    //     words: 1200,
    //     readTime: "12 min",
    //     link: "posts/post2.html"
    // },
    // {
    //     filename: "static_site_generators.md",
    //     title: "Static Site Generators in 2025",
    //     date: "Aug 10",
    //     year: "2025",
    //     tags: ["jamstack", "build", "performance"],
    //     words: 956,
    //     readTime: "9 min",
    //     link: "posts/post3.html"
    // },
    // {
    //     filename: "minimal_design_philosophy.md",
    //     title: "The Art of Minimalist Design",
    //     date: "Aug 08",
    //     year: "2025",
    //     tags: ["design", "minimalism", "ux"],
    //     words: 723,
    //     readTime: "7 min",
    //     link: "posts/post4.html"
    // },
    // {
    //     filename: "command_line_productivity.md",
    //     title: "Command Line Productivity Tips",
    //     date: "Aug 05",
    //     year: "2025",
    //     tags: ["cli", "tools", "productivity"],
    //     words: 1150,
    //     readTime: "11 min",
    //     link: "posts/post5.html"
    // },
    // {
    //     filename: "color_theory_terminals.md",
    //     title: "Color Theory for Terminal Interfaces",
    //     date: "Aug 02",
    //     year: "2025",
    //     tags: ["color", "design", "accessibility"],
    //     words: 892,
    //     readTime: "8 min",
    //     link: "posts/post6.html"
    // },
    // {
    //     filename: "monospace_typography.md",
    //     title: "The Beauty of Monospace Typography",
    //     date: "Jul 28",
    //     year: "2025",
    //     tags: ["typography", "fonts", "design"],
    //     words: 634,
    //     readTime: "6 min",
    //     link: "posts/post7.html"
    // },
    // {
    //     filename: "keyboard_navigation.md",
    //     title: "Keyboard-First Web Design",
    //     date: "Jul 25",
    //     year: "2025",
    //     tags: ["accessibility", "keyboard", "ux"],
    //     words: 1080,
    //     readTime: "10 min",
    //     link: "posts/post8.html"
    // },
    // {
    //     filename: "performance_optimization.md",
    //     title: "Web Performance Without Frameworks",
    //     date: "Jul 20",
    //     year: "2025",
    //     tags: ["performance", "optimization", "vanilla"],
    //     words: 1300,
    //     readTime: "13 min",
    //     link: "posts/post9.html"
    // },
    // {
    //     filename: "git_workflow_tips.md",
    //     title: "Modern Git Workflows for Solo Developers",
    //     date: "Jul 15",
    //     year: "2025",
    //     tags: ["git", "workflow", "version-control"],
    //     words: 780,
    //     readTime: "7 min",
    //     link: "posts/post10.html"
    // },
    // {
    //     filename: "async_programming_guide.md",
    //     title: "Understanding Async Programming",
    //     date: "Jul 10",
    //     year: "2025",
    //     tags: ["javascript", "async", "programming"],
    //     words: 1450,
    //     readTime: "14 min",
    //     link: "posts/post11.html"
    // },
    // {
    //     filename: "terminal_ui_patterns.md",
    //     title: "Common Terminal UI Patterns",
    //     date: "Jul 05",
    //     year: "2025",
    //     tags: ["ui", "patterns", "terminal"],
    //     words: 920,
    //     readTime: "9 min",
    //     link: "posts/post12.html"
    // }
];

// ===== BLOG SELECTOR STATE =====

let filteredPosts = [...blogPosts];
let selectedIndex = 0;

// ===== DOM ELEMENTS =====

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');
const resultCount = document.getElementById('resultCount');
const totalCount = document.getElementById('totalCount');

// ===== SEARCH FUNCTIONALITY =====

function fuzzyMatch(query, text) {
    if (!query) return true;
    
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Simple fuzzy matching - check if all query characters appear in order
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
        if (textLower[i] === queryLower[queryIndex]) {
            queryIndex++;
        }
    }
    return queryIndex === queryLower.length;
}

function calculateScore(post, query) {
    if (!query.trim()) return 0;
    
    let score = 0;
    const queryLower = query.toLowerCase();
    
    // Exact filename match gets highest score
    if (post.filename.toLowerCase().includes(queryLower)) {
        score += 100;
    }
    
    // Title match gets high score
    if (post.title.toLowerCase().includes(queryLower)) {
        score += 50;
    }
    
    // Tag matches get medium score
    for (const tag of post.tags) {
        if (tag.toLowerCase().includes(queryLower)) {
            score += 20;
            break; // Only count one tag match
        }
    }
    
    // Fuzzy match bonus
    if (fuzzyMatch(query, post.filename)) score += 10;
    if (fuzzyMatch(query, post.title)) score += 5;
    
    return score;
}

function filterPosts(query) {
    if (!query.trim()) {
        // No search query - sort by filename alphabetically
        filteredPosts = [...blogPosts].sort((a, b) => 
            a.filename.localeCompare(b.filename)
        );
    } else {
        // Filter and score posts
        const scoredPosts = blogPosts
            .map(post => ({
                ...post,
                score: calculateScore(post, query)
            }))
            .filter(post => post.score > 0)
            .sort((a, b) => {
                // Sort by score (highest first), then by filename
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.filename.localeCompare(b.filename);
            });
        
        filteredPosts = scoredPosts;
    }
    selectedIndex = 0;
    renderResults();
    updateStats();
}

// ===== RENDERING =====

function renderResults() {
    if (filteredPosts.length === 0) {
        resultsList.innerHTML = '<div class="no-results">No posts found matching your search.</div>';
        return;
    }

    const resultsHtml = filteredPosts.map((post, index) => {
        const isSelected = index === selectedIndex;
        const indicator = isSelected ? '▶' : ' ';
        const selectedClass = isSelected ? 'selected' : '';
        
        const tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        return `
            <div class="result-item ${selectedClass}" data-index="${index}">
                <span class="result-indicator">${indicator}</span>
                <span class="result-filename">${post.filename}</span>
                <span class="result-date">${post.date}</span>
                <span class="result-tags">${tagsHtml}</span>
                <span class="result-stats">${post.words} words</span>
            </div>
        `;
    }).join('');

    resultsList.innerHTML = resultsHtml;
    
    // Scroll selected item into view
    const selectedElement = resultsList.querySelector('.selected');
    if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
    }
}

function updateStats() {
    if (resultCount && totalCount) {
        resultCount.textContent = filteredPosts.length;
        totalCount.textContent = blogPosts.length;
    }
}

// ===== NAVIGATION =====

function selectPost(index) {
    if (index >= 0 && index < filteredPosts.length) {
        selectedIndex = index;
        renderResults();
    }
}

function openSelectedPost() {
    if (filteredPosts[selectedIndex]) {
        const post = filteredPosts[selectedIndex];
        window.location.href = post.link;
    }
}

function copySelectedLink() {
    if (filteredPosts[selectedIndex]) {
        const post = filteredPosts[selectedIndex];
        const fullUrl = window.location.origin + '/' + post.link;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullUrl).then(() => {
                showFeedback('Link copied!');
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyToClipboard(fullUrl);
            });
        } else {
            fallbackCopyToClipboard(fullUrl);
        }
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showFeedback('Link copied!');
    } catch (err) {
        showFeedback('Copy failed');
    }
    document.body.removeChild(textArea);
}

function showFeedback(message) {
    const stats = document.getElementById('statsDisplay');
    if (stats) {
        const originalText = stats.innerHTML;
        stats.innerHTML = `<span style="color: var(--accent);">${message}</span>`;
        setTimeout(() => {
            stats.innerHTML = originalText;
        }, 1000);
    }
}

// ===== EVENT LISTENERS =====

function setupBlogSelectorEvents() {
    if (!searchInput) return;

    // Search input
    searchInput.addEventListener('input', (e) => {
        filterPosts(e.target.value);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectPost(selectedIndex + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectPost(selectedIndex - 1);
                break;
            case 'Enter':
                e.preventDefault();
                openSelectedPost();
                break;
            case 'Tab':
                e.preventDefault();
                // Could implement preview functionality here
                break;
            case 'Escape':
                e.preventDefault();
                goToMain();
                break;
        }
        
        // Ctrl combinations
        if (e.ctrlKey) {
            switch(e.key) {
                case 'c':
                    e.preventDefault();
                    copySelectedLink();
                    break;
                case 'o':
                    e.preventDefault();
                    if (filteredPosts[selectedIndex]) {
                        window.open(filteredPosts[selectedIndex].link, '_blank');
                    }
                    break;
            }
        }
    });

    // Mouse interaction
    if (resultsList) {
        resultsList.addEventListener('click', (e) => {
            const item = e.target.closest('.result-item');
            if (item) {
                const index = parseInt(item.dataset.index);
                selectedIndex = index;
                openSelectedPost();
            }
        });

        resultsList.addEventListener('mouseover', (e) => {
            const item = e.target.closest('.result-item');
            if (item) {
                const index = parseInt(item.dataset.index);
                selectPost(index);
            }
        });
    }
}

// ===== INITIALIZATION =====

function initializeBlogSelector() {
    // Only run if we're on the blog selector page
    if (!searchInput) return;
    
    setupBlogSelectorEvents();
    filterPosts('');
    searchInput.focus();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlogSelector);
