document.addEventListener('DOMContentLoaded', function() {
    // Terminal background animation
    const terminal = document.getElementById('terminal-background');
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
        'kamikaze0x00@ctf:~$ curl -H "User-Agent: <?php system('id'); ?>" http://test.com',
        'kamikaze0x00@ctf:~$ tcpdump -i eth0 -w capture.pcap',
        'kamikaze0x00@ctf:~$ airmon-ng start wlan0',
        'kamikaze0x00@ctf:~$ aircrack-ng -w wordlist.txt capture.cap',
        'kamikaze0x00@ctf:~$ burpsuite',
        'kamikaze0x00@ctf:~$ metasploit',
        'kamikaze0x00@ctf:~$ nikto -h http://10.10.10.10',
        'kamikaze0x00@ctf:~$ gobuster dir -u http://10.10.10.10 -w common.txt',
        'kamikaze0x00@ctf:~$ hashcat -m 0 -a 0 hash.txt rockyou.txt'
    ];
    
    function addTerminalLines() {
        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            const randomCmd = commands[Math.floor(Math.random() * commands.length)];
            line.innerHTML = `<span class="terminal-prompt">kamikaze0x00@ctf:~$</span> ${randomCmd}<span class="terminal-cursor"></span>`;
            terminal.appendChild(line);
        }
    }
    
    addTerminalLines();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (nav) {
                nav.classList.toggle('active');
            }
        });
    }
    
    // Filter buttons on writeups page
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Contact form submission
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
});
