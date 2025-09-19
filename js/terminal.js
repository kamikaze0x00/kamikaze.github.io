// Terminal animation
document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal-background');
    if (!terminal) return;
    
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
    
    function addTerminalLines() {
        // Clear any existing content
        terminal.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            const randomCmd = commands[Math.floor(Math.random() * commands.length)];
            line.innerHTML = `<span class="terminal-prompt">kamikaze0x00@ctf:~$</span> ${randomCmd}<span class="terminal-cursor"></span>`;
            terminal.appendChild(line);
            
            // Add random delay to each line
            line.style.animationDelay = `${i * 2}s`;
        }
    }
    
    addTerminalLines();
    
    // Refresh terminal lines periodically
    setInterval(addTerminalLines, 30000);
});
