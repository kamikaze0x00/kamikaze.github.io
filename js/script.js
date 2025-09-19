// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // ms
            const steps = 60;
            const stepValue = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += stepValue;
                if (current >= target) {
                    clearInterval(timer);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, duration / steps);
        });
    }
    
    // Interactive buttons functionality
    const interactiveBtns = document.querySelectorAll('.interactive-btn');
    interactiveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.closest('.interactive-item').getAttribute('data-action');
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Simulate action
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show success message based on action
                let message = '';
                switch(action) {
                    case 'scan':
                        message = 'Network scan completed. Found 5 open ports.';
                        break;
                    case 'encrypt':
                        message = 'Text encrypted successfully with AES-256.';
                        break;
                    case 'exploit':
                        message = 'Code analysis complete. 2 vulnerabilities found.';
                        break;
                }
                
                // Create notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--accent-red);
                    color: white;
                    padding: 1rem;
                    border-radius: 5px;
                    z-index: 1000;
                    font-family: 'Courier New', monospace;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }, 1500);
        });
    });
    
    // Add animations to elements on scroll
    const animatedElements = document.querySelectorAll('.writeup-card, .stat-item, .interactive-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('animate-fade-in-up');
            }
        });
    }
    
    // Initial check and scroll event listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Terminal cursor animation in hero section
    const terminalCursor = document.querySelector('.terminal-content .cursor');
    if (terminalCursor) {
        setInterval(() => {
            terminalCursor.style.visibility = terminalCursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    }
});
