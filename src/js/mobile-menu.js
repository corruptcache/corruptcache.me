document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const overlay = document.querySelector('.nav-overlay');
    
    // Toggle mobile menu
    function toggleMenu() {
        const isOpening = !hamburger.classList.contains('active');
        
        // Toggle active classes
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        // Update aria-expanded
        hamburger.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
        
        // Add/remove event listeners for keyboard navigation
        if (isOpening) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
    
    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
        
        // Trap focus within the menu when open
        if (e.key === 'Tab') {
            const focusableElements = 'a[href], button:not([disabled])';
            const focusable = Array.from(navMenu.querySelectorAll(focusableElements));
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    // Close menu function
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', handleKeyDown);
    }
    
    // Initialize event listeners if elements exist
    if (hamburger && navMenu && overlay) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu on overlay click
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu on window resize if it becomes desktop view
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768 && navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });
    }
});
