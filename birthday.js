// Password validation
const PASSWORD = 'champion';

// DOM elements
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const errorMessage = document.getElementById('errorMessage');
const lockedState = document.getElementById('lockedState');
const unlockedState = document.getElementById('unlockedState');
const closeBtn = document.getElementById('closeBtn');
const unlockSound = document.getElementById('unlockSound');
const confettiContainer = document.getElementById('confettiContainer');

// Toggle password visibility
togglePassword.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Handle password form submission
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PASSWORD) {
        unlockMessage();
    } else {
        showError('Wrong password! Try again.');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.animation = 'none';
    setTimeout(() => {
        errorMessage.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
    
    passwordInput.style.borderColor = '#ffcccc';
    setTimeout(() => {
        passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }, 500);
}

// Unlock message
function unlockMessage() {
    errorMessage.textContent = '';
    
    // Play unlock sound
    try {
        unlockSound.play().catch(() => {
            // Silent fail if audio can't play
        });
    } catch (e) {
        // Silent fail
    }

    // Transition between states
    lockedState.classList.remove('active');
    setTimeout(() => {
        unlockedState.classList.add('active');
        createConfetti();
    }, 400);
}

// Close and return to locked state
closeBtn.addEventListener('click', () => {
    unlockedState.classList.remove('active');
    setTimeout(() => {
        lockedState.classList.add('active');
        passwordInput.value = '';
        errorMessage.textContent = '';
        clearConfetti();
    }, 400);
});

// Confetti animation
function createConfetti() {
    const confettiPieces = 50;
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#ff00ff', '#ff6ec7'];
    
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        const xOffset = (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 720;
        
        confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
        confetti.style.setProperty('--x-offset', xOffset + 'px');
        confetti.style.setProperty('--rotation', rotation + 'deg');
    }
}

// Clear confetti
function clearConfetti() {
    const confetti = document.querySelectorAll('.confetti');
    confetti.forEach(piece => piece.remove());
}

// Add confetti animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) translateX(var(--x-offset)) rotateZ(var(--rotation));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Focus on password input on load
window.addEventListener('load', () => {
    passwordInput.focus();
});

// Allow Enter key to submit
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && lockedState.classList.contains('active')) {
        passwordForm.dispatchEvent(new Event('submit'));
    }
});

// Allow Escape key to close message
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && unlockedState.classList.contains('active')) {
        closeBtn.click();
    }
});

// Create multiple floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartCount = 5;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'absolute';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.textContent = '💕';
        heart.style.animation = `float ${Math.random() * 4 + 6}s infinite ease-in-out`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Initialize
window.addEventListener('load', () => {
    createFloatingHearts();
});
