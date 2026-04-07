// script.js - Theme toggling, dynamic year, logo click, parallax effect
(function() {
    // Theme system
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
    
    // Update current year
    const currentYear = new Date().getFullYear();
    const yearSpans = document.querySelectorAll('#currentYear, #footerYear');
    yearSpans.forEach(span => {
        if (span) span.textContent = currentYear;
    });
    
    // Logo click → smooth scroll to top
    const siteLogo = document.getElementById('siteLogo');
    if (siteLogo) {
        siteLogo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Hero subtle parallax effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const x = (e.clientX / window.innerWidth) * 12;
                const y = (e.clientY / window.innerHeight) * 8;
                heroContent.style.transform = `perspective(1000px) rotateX(${y * 0.04}deg) rotateY(${x * 0.04}deg)`;
            }
        });
        heroContent.addEventListener('mouseleave', () => {
            heroContent.style.transform = '';
        });
    }
    
    // Fallback if logo.jpg missing
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            console.warn('logo.jpg not found. Please add logo.jpg to the project folder.');
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.fallback-icon')) {
                const fallback = document.createElement('i');
                fallback.className = 'fas fa-crown fallback-icon';
                fallback.style.fontSize = '28px';
                fallback.style.color = '#ffd966';
                fallback.style.padding = '6px';
                parent.insertBefore(fallback, this.nextSibling);
            }
        });
    }
    
    console.log("✅ Modular setup active | CSS + JS separated | logo.jpg referenced");
})();
