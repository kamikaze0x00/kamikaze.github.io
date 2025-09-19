document.addEventListener('DOMContentLoaded', function() {
    // Terminal background animation
    function initTerminalAnimation() {
        const terminal = document.getElementById('terminal-background');
        if (!terminal) return;
        
        // Clear any existing content
        terminal.innerHTML = '';
        
        const commands = [
            'kamikaze0x00@ctf:~$ nmap -sS -p- 10.10.10.10',
            'kamikaze0x00@ctf:~$ python3 exploit.py',
            'kamikaze0x00@ctf:~$ john --wordlist=rockyou.txt hash.txt',
            'kamikaze0x00@ctf:~$ sqlmap -u "http://test.com/vuln.php?id=1" --dbs',
            'kamikaze0x00@ctf:~$ binwalk -e suspicious_file.jpg',
            'kamikaze0x00@ctf:~$ strings binary | grep flag',
            'kamikaze0x00@ctf:~$ hydra -l admin -P passlist.txt ftp://10.10.10.10',
            'kamikaze0x00@ctf:~$ msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf > shell.elf',
            'kamikaze0x00@ctf:~$ gdb -q vulnerable_binary',
            'kamikaze0x00@ctf:~$ steghide extract -sf image.jpg',
            'kamikaze0x00@ctf:~$ curl -H "User-Agent: <?php system(\'id\'); ?>" http://test.com',
            'kamikaze0x00@ctf:~$ tcpdump -i eth0 -w capture.pcap',
            'kamikaze0x00@ctf:~$ airmon-ng start wlan0',
            'kamikaze0x00@ctf:~$ aircrack-ng -w wordlist.txt capture.cap',
            'kamikaze0x00@ctf:~$ burpsuite',
            'kamikaze0x00@ctf:~$ metasploit',
            'kamikaze0x00@ctf:~$ nikto -h http://10.10.10.10',
            'kamikaze0x00@ctf:~$ gobuster dir -u http://10.10.10.10 -w common.txt',
            'kamikaze0x00@ctf:~$ hashcat -m 0 -a 0 hash.txt rockyou.txt'
        ];
        
        // Create terminal lines
        for (let i = 0; i < 12; i++) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            const randomCmd = commands[Math.floor(Math.random() * commands.length)];
            line.innerHTML = `<span class="terminal-prompt">kamikaze0x00@ctf:~$</span> ${randomCmd}<span class="terminal-cursor"></span>`;
            terminal.appendChild(line);
            
            // Add random delay to each line
            line.style.animationDelay = `${i * 2}s`;
        }
    }
    
    // Initialize terminal animation
    initTerminalAnimation();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Filter tags functionality (for writeups page)
    const filterTags = document.querySelectorAll('.filter-tag');
    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // View options functionality (for writeups page)
    const viewOptions = document.querySelectorAll('.view-option');
    if (viewOptions.length > 0) {
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                viewOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Load more button functionality (for writeups page)
    const loadMoreBtn = document.querySelector('.load-more-button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = 'Loading... <i class="fas fa-circle-notch fa-spin"></i>';
            setTimeout(() => {
                this.innerHTML = 'No More Writeups <i class="fas fa-check"></i>';
                this.disabled = true;
            }, 1500);
        });
    }
    
    // Contact form submission (for contact page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
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
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
