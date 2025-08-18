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