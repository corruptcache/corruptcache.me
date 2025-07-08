// main.js: moved from HTML <script> 

// --- PARALLAX & ANIMATION SCRIPT ---



// --- Parallax on Scroll ---
let ticking = false;

function handleScroll() {
    const scrollY = window.scrollY;
    document.body.style.setProperty('--scroll-y', `${scrollY * 0.5}px`);
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// --- Debounced Resize Handler ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const handleResize = debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}, 100);

window.addEventListener('resize', handleResize);

// --- TERMINAL TYPING SCRIPT ---
const asciiArt = [
    " ⣿⡏⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣋⣥⣴⣶⢸ ",
    " ⣿⡇⣠⣤⣤⣤⠀⠀⠀⠙⠻⠿⣿⣿⣿⣿⣿⣿⠟⠃⠀⣾⣿⣿⣿⣿⢸ ",
    " ⣿⡇⣿⠀⢻⣿⣿⡦⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⠏⠀⣿ ",
    " ⣿⡇⢹⡤⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣷⡭⣿⣿⡟⠀⢰⣿ ",
    " ⣿⠇⣿⡇⠀⠀⠀⠀⠀⠀⢠⡀⢀⣦⢐⣦⠀⠀⠄⠈⢉⠶⢾⣿⣿⠀⢹⣿ ",
    " ⡟⠀⠛⢀⣤⣶⣶⣦⠶⠖⠛⠃⠘⣿⣾⣿⣄⠀⠈⠀⠈⠀⠺⣿⣿⡄⠀⣿ ",
    " ⠇⠀⢀⠟⠋⠁⣀⡀⠀⠸⣿⡄⠀⢻⣿⣿⣿⣆⡀⠀⣴⣷⠀⢀⡀⠀⠀⢸ ",
    " ⢀⡄⠀⠀⠀⠀⠈⠓⢤⣄⣀⣠⣀⣸⣿⣿⣿⣿⣆⠀⣀⣀⣀⣼⣁⣤⡀⢸ ",
    " ⠸⣷⣤⣤⡀⠀⢀⣐⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇ ",
    " ⡀⢿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣍⠛⢛⣽⣿⣿⣿⣿⣿⣿⡟⣠ ",
    " ⣷⣄⡈⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠃⠛⢿⣿⣿⣿⣿⠟⠁⣴ ",
    " ⣿⣿⣿⣿⣿⣶⣧⣤⣬⣉⣉⡛⠛⠿⠾⠿⠿⠿⠛⠛⠋⠁⣠⣴"
];
const subtitleText = "The intersection of code and consequence.";
const buttonText = "Explore My Work";

const titleEl = document.getElementById('ascii-title');
const subtitleEl = document.getElementById('subtitle');
const buttonEl = document.getElementById('hero-button');

function typeWriter(element, text, speed, multiLine = false, callback) {
    let i = 0;
    let content = '';
    
    function type() {
        if (i < text.length) {
            if(multiLine) {
                content = text.slice(0, i + 1).join('\n');
            } else {
                content = text.substring(0, i + 1);
            }
            element.innerHTML = content;
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// --- LIVE LOG SCRIPT ---
const logContainer = document.getElementById('live-log-container');
const logMessages = [
    "[INFO] Initializing system...",
    "[INFO] Loading kernel modules...",
    "[OK] Kernel loaded successfully.",
    "[INFO] Mounting filesystems...",
    "[OK] Filesystems mounted.",
    "[INFO] Starting network services...",
    "[OK] Network services started.",
    "[INFO] Establishing connection to 127.0.0.1",
    "<span class='success'>[SUCCESS]</span> Connection established.",
    "[INFO] Authenticating user: corruptcache",
    "[INFO] Fetching user profile...",
    "<span class='error'>[ERROR]</span> Failed to fetch profile. Retrying...",
    "[INFO] Fetching user profile... (Attempt 2)",
    "<span class='success'>[SUCCESS]</span> Profile loaded.",
    "[INFO] Rendering welcome message...",
    "[OK] Welcome message rendered."
];
let logIndex = 0;

function printLog() {
    if (logIndex < logMessages.length) {
        const line = document.createElement('div');
        line.classList.add('log-line');
        line.innerHTML = logMessages[logIndex];
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;
        logIndex++;
        setTimeout(printLog, Math.random() * 500 + 100);
    }
}

// Initialize Matrix Rain on any page with the canvas
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = "日一国会人年大十二本中長出三同時政事自行社見月分議後前民生連五発間対上部東者党地合市業内相方四定今回新場金員九入選立開手米力学問高代明実円関決子動京全目表戦経通外最言氏現理調体化田当八六約主題下首法 valde Sistit アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン!@#$%^&*(){}_-=+";
    const charArray = characters.split('');
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(15, 15, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#a66bff';
        ctx.font = fontSize + 'px "Share Tech Mono", monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Handle window resize
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;
    }

    // Set up the animation
    let lastTime = 0;
    const interval = 33; // roughly 30fps, matching the resume page
    let animationId;

    function animate(currentTime) {
        animationId = requestAnimationFrame(animate);
        const deltaTime = currentTime - lastTime;

        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);
            draw();
        }
    }
    
    // Start the animation
    animate(0);
    
    // Clean up on window resize
    window.addEventListener('resize', handleResize);
    
    // Return cleanup function
    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
    };
}

// --- SCRIPT INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix rain on any page with the canvas
    initMatrixRain();
    
    const terminalPromptContainer = document.getElementById('terminal-prompt-container');
    
    // --- Pre-calculate Height to Prevent Layout Shift ---
    if (terminalPromptContainer) {
        terminalPromptContainer.style.visibility = 'hidden';
        titleEl.innerHTML = asciiArt.join('\n');
        subtitleEl.textContent = subtitleText;
        buttonEl.textContent = buttonText;
        const height = terminalPromptContainer.offsetHeight;
        terminalPromptContainer.style.minHeight = `${height}px`;
        titleEl.innerHTML = '';
        subtitleEl.textContent = '';
        buttonEl.textContent = '';
        terminalPromptContainer.style.visibility = 'visible';

        // Start the typing animations
        typeWriter(titleEl, asciiArt, 5, true, () => {
            typeWriter(subtitleEl, subtitleText, 30, false, () => {
                typeWriter(buttonEl, buttonText, 50, false, () => {
                    buttonEl.onclick = () => document.getElementById('work').scrollIntoView();
                });
            });
        });
    }
    

    
    // Start the live log after a short delay
    if(logContainer) {
        setTimeout(printLog, 1000); 
    }
});
