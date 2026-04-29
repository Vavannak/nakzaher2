// script.js - Theme toggle, dynamic year, parallax, and background music
// Music starts automatically on first user click anywhere

(function() {
    // ----- THEME SYSTEM -----
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    };
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // ----- DYNAMIC YEAR -----
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#currentYear, #footerYear').forEach(span => {
        if (span) span.textContent = currentYear;
    });
    
    // ----- LOGO CLICK SCROLL TOP -----
    const siteLogo = document.getElementById('siteLogo');
    if (siteLogo) {
        siteLogo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    
    // ----- PARALLAX EFFECT -----
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 12;
            const y = (e.clientY / window.innerHeight) * 8;
            heroContent.style.transform = `perspective(1000px) rotateX(${y * 0.04}deg) rotateY(${x * 0.04}deg)`;
        });
        heroContent.addEventListener('mouseleave', () => heroContent.style.transform = '');
    }
    
    // ----- LOGO IMAGE FALLBACK -----
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            this.src = 'https://placehold.co/400x400?text=V';
        });
    }
    
    // ========== 🎵 BACKGROUND MUSIC (auto-play on first click) ==========
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicControl');
    let isPlaying = false;
    let firstClickDone = false;
    
    const playMusic = () => {
        if (!audio) return;
        audio.play()
            .then(() => {
                isPlaying = true;
                if (musicBtn) {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicBtn.classList.add('playing');
                }
            })
            .catch(err => console.warn('Playback error:', err));
    };
    
    const pauseMusic = () => {
        if (!audio) return;
        audio.pause();
        isPlaying = false;
        if (musicBtn) {
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicBtn.classList.remove('playing');
        }
    };
    
    const toggleMusic = () => {
        if (isPlaying) pauseMusic();
        else playMusic();
    };
    
    // Music button click
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
            if (!firstClickDone) firstClickDone = true;
        });
    }
    
    // First click anywhere on page → auto play music
    const globalClickHandler = () => {
        if (!firstClickDone && audio) {
            if (audio.readyState >= 2) {
                playMusic();
            } else {
                audio.addEventListener('canplaythrough', () => playMusic(), { once: true });
                playMusic(); // try anyway
            }
            firstClickDone = true;
            document.removeEventListener('click', globalClickHandler);
        }
    };
    
    if (audio) {
        // Small delay to ensure DOM ready
        setTimeout(() => document.addEventListener('click', globalClickHandler), 100);
        
        audio.addEventListener('error', () => console.warn('music.mp3 not found — please add the file.'));
        
        // Sync button if audio ends (though loop is active)
        audio.addEventListener('ended', () => {
            if (!audio.loop) {
                isPlaying = false;
                if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    console.log('✅ All systems ready — first click will start background music');
})();
