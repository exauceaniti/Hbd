// script.js - Version améliorée
class AnnivFou {
    constructor() {
        this.vibrationPhase = document.getElementById('vibration-phase');
        this.photoPhase = document.getElementById('photo-phase');
        this.countdownElement = document.querySelector('.countdown');
        this.replayButton = document.getElementById('replay-btn');
        this.celebrationSound = document.getElementById('celebration-sound');
        this.timeLeft = 15; // 15 secondes de vibration comme indiqué dans le HTML
        
        this.init();
    }

    init() {
        // Démarrer direct la vibration
        this.startCrazyVibration();
        this.startCountdown();
        
        // Au cas où l'user veut arrêter plus tôt
        document.addEventListener('click', () => this.skipToPhoto());
        
        // Bouton rejouer
        this.replayButton.addEventListener('click', () => this.replayAnimation());
        
        // Précharger le son
        this.preloadAudio();
    }

    startCrazyVibration() {
        if (navigator.vibrate) {
            // Pattern: vibre fort pendant 500ms, pause 100ms, répété
            const pattern = [];
            for (let i = 0; i < 30; i++) { 
                pattern.push(250, 50); // vibre, pause, vibre, pause...
            }
            navigator.vibrate(pattern);
        }
    }

    stopVibration() {
        if (navigator.vibrate) {
            navigator.vibrate(0);
        }
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            this.timeLeft--;
            this.updateCountdown();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.countdownInterval);
                this.showPhoto();
            }
        }, 1000);
    }

    updateCountdown() {
        const seconds = this.timeLeft.toString().padStart(2, '0');
        this.countdownElement.textContent = `00:${seconds}`;
        
        // Effet visuel qui s'intensifie
        const scale = 1 + (15 - this.timeLeft) * 0.05;
        this.countdownElement.style.transform = `scale(${scale})`;
        
        // Changement de couleur
        if (this.timeLeft <= 5) {
            this.countdownElement.style.color = '#ff3366';
            this.countdownElement.style.textShadow = '0 0 20px #ff0000';
        }
    }

    skipToPhoto() {
        // Ne permettre le saut qu'après un délai minimal
        if (this.timeLeft < 14) {
            this.showPhoto();
        }
    }

    showPhoto() {
        clearInterval(this.countdownInterval);
        this.stopVibration();
        this.vibrationPhase.classList.remove('active');
        this.photoPhase.classList.add('active');
        this.createConfetti();
        this.playCelebrationSound();
    }

    createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        confettiContainer.innerHTML = '';
        
        const colors = ['#ff3366', '#33ccff', '#ffcc00', '#00ff99', '#ff00cc', '#00ccff'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 3;
            const animationDelay = Math.random() * 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${left}%;
                animation: confettiFall ${animationDuration}s linear ${animationDelay}s infinite;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            
            confettiContainer.appendChild(confetti);
        }
    }

    playCelebrationSound() {
        if (this.celebrationSound) {
            this.celebrationSound.volume = 0.7;
            this.celebrationSound.play().catch(e => {
                console.log("Lecture audio automatique bloquée: ", e);
            });
        }
    }

    preloadAudio() {
        if (this.celebrationSound) {
            this.celebrationSound.load();
        }
    }

    replayAnimation() {
        // Réinitialiser
        this.photoPhase.classList.remove('active');
        this.vibrationPhase.classList.add('active');
        
        // Réinitialiser le compte à rebours
        this.timeLeft = 15;
        this.updateCountdown();
        
        // Redémarrer la vibration
        this.startCrazyVibration();
        this.startCountdown();
        
        // Arrêter et réinitialiser le son
        if (this.celebrationSound) {
            this.celebrationSound.pause();
            this.celebrationSound.currentTime = 0;
        }
    }
}

// LANCER LE BORDEL!
document.addEventListener('DOMContentLoaded', () => {
    new AnnivFou();
});