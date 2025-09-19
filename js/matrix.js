// Matrix rain animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-background');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&!?*';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Each column has a y position
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    function draw() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = var(--matrix-green);
        ctx.font = `${fontSize}px 'Courier New', monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            // x coordinate of the drop
            const x = i * fontSize;
            // y coordinate of the drop
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            // Reset drop if it reaches bottom
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Adjust canvas on resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Start animation
    setInterval(draw, 33);
});
