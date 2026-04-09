// DARKFORGE-X v4.0 – NEO SYSTEM CONTROLLER
(function(){
    // ------------------- GLOBALS -------------------
    let currentLang = 'km'; // km / en
    let visitorCount = localStorage.getItem('visitorCount') ? parseInt(localStorage.getItem('visitorCount')) : 1234;
    let projectsData = [
        { title: { km: "គេហទំព័រឆ្លើយតប", en: "Responsive Web" }, desc: { km: "HTML/CSS/JS ទំនើប", en: "Modern HTML/CSS/JS" }, icon: "fa-code" },
        { title: { km: "ប្រព័ន្ធងងឹត/ភ្លឺ", en: "Dark/Light System" }, desc: { km: "ការផ្លាស់ប្តូររបៀប", en: "Theme toggle with persistence" }, icon: "fa-moon" },
        { title: { km: "Command Palette", en: "Command Palette" }, desc: { km: "Ctrl+K ស្វែងរកផ្នែក", en: "Ctrl+K quick navigation" }, icon: "fa-terminal" }
    ];
    
    // Update visitor counter
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitorCount').innerText = visitorCount;
    document.getElementById('projectCount').innerText = projectsData.length;

    // ------------------- THEME SYSTEM (persistent) -------------------
    const body = document.body;
    const themeToggle = document.getElementById('themeToggleNav');
    const applyTheme = (theme) => {
        if(theme === 'dark') body.classList.add('dark');
        else body.classList.remove('dark');
        localStorage.setItem('theme', theme);
        document.getElementById('themeStatus').innerText = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    };
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => applyTheme(body.classList.contains('dark') ? 'light' : 'dark'));

    // ------------------- TYPED.JS -------------------
    new Typed('#typed-role', {
        strings: ['Digital Cyber Enthusiast', 'Student & Coder', 'អ្នកសរសេរកូដ', 'Cybersecurity Learner'],
        typeSpeed: 60, backSpeed: 40, loop: true
    });

    // ------------------- SKILLS RADIAL PROGRESS (Canvas) -------------------
    document.querySelectorAll('.skill-item').forEach(el => {
        let skill = parseInt(el.dataset.skill);
        let canvas = el.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        let startAngle = -0.5 * Math.PI;
        let endAngle = startAngle + (2 * Math.PI * skill / 100);
        ctx.beginPath();
        ctx.arc(60,60,50,0,2*Math.PI);
        ctx.fillStyle = '#2c6e9e20';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(60,60,50,startAngle,endAngle);
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#4c9aff';
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(skill+'%',45,70);
    });

    // ------------------- PROJECTS RENDER (Bilingual) -------------------
    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';
        projectsData.forEach(proj => {
            let card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<i class="fas ${proj.icon} fa-2x"></i><h3>${proj.title[currentLang]}</h3><p>${proj.desc[currentLang]}</p>`;
            grid.appendChild(card);
        });
    }

    // ------------------- BILINGUAL SYSTEM (I18n) -------------------
    const translations = {
        km: { nav_home:"ទំព័រដើម", nav_about:"អំពីខ្ញុំ", nav_skills:"ជំនាញ", nav_projects:"គម្រោង", nav_contact:"ទំនាក់ទំនង", hero_greeting:"សួស្តី! ខ្ញុំឈ្មោះ", hero_i_am:"ខ្ញុំជា", hero_view_work:"មើលគម្រោង", hero_contact:"ទាក់ទង", stat_projects:"គម្រោង", stat_grade:"ថ្នាក់", stat_visitors:"អ្នកទស្សនា", about_title:"អំពីខ្ញុំ", skills_title:"ជំនាញ & ចំណូលចិត្ត", projects_title:"គម្រោងពិសេស", dashboard_title:"System Dashboard", contact_title:"ទំនាក់ទំនង", form_title:"ផ្ញើសារមកខ្ញុំ", form_name:"ឈ្មោះរបស់អ្នក" },
        en: { nav_home:"Home", nav_about:"About", nav_skills:"Skills", nav_projects:"Projects", nav_contact:"Contact", hero_greeting:"Hello! I'm", hero_i_am:"I am", hero_view_work:"View Work", hero_contact:"Contact", stat_projects:"Projects", stat_grade:"Grade", stat_visitors:"Visitors", about_title:"About Me", skills_title:"Skills & Hobbies", projects_title:"Projects", dashboard_title:"System Dashboard", contact_title:"Contact", form_title:"Send a message", form_name:"Your name" }
    };
    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            let key = el.getAttribute('data-i18n');
            if(translations[lang][key]) el.innerText = translations[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            let key = el.getAttribute('data-i18n-placeholder');
            if(translations[lang][key]) el.placeholder = translations[lang][key];
        });
        renderProjects();
    }
    document.getElementById('langToggleBtn').addEventListener('click', () => {
        let newLang = currentLang === 'km' ? 'en' : 'km';
        updateLanguage(newLang);
    });
    
    // ------------------- LIVE CLOCK & DEVICE INFO -------------------
    function updateClock() {
        let now = new Date();
        document.getElementById('liveClock').innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
    document.getElementById('deviceInfo').innerText = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile Device' : 'Desktop';
    document.getElementById('connectionStatus').innerText = navigator.onLine ? 'Online' : 'Offline';
    window.addEventListener('online', () => document.getElementById('connectionStatus').innerText = 'Online');
    window.addEventListener('offline', () => document.getElementById('connectionStatus').innerText = 'Offline');
    let storage = localStorage.length * 0.1;
    document.getElementById('storageUsed').innerText = storage.toFixed(1) + ' MB';
    document.getElementById('sessionCount').innerText = sessionStorage.getItem('sessions') || 1;
    sessionStorage.setItem('sessions', (parseInt(sessionStorage.getItem('sessions')||0)+1));
    
    // ------------------- CONTACT FORM (LocalStorage Mock) -------------------
    document.getElementById('sendMsgBtn').addEventListener('click', () => {
        let name = document.getElementById('msgName').value;
        let email = document.getElementById('msgEmail').value;
        let text = document.getElementById('msgText').value;
        if(!name || !text) { showToast('សូមបំពេញឈ្មោះ និងសារ','error'); return; }
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({ name, email, text, date: new Date().toISOString() });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        showToast('សាររបស់អ្នកត្រូវបានរក្សាទុក! (demo)','success');
        document.getElementById('msgName').value = '';
        document.getElementById('msgEmail').value = '';
        document.getElementById('msgText').value = '';
    });
    function showToast(msg, type) {
        let toast = document.getElementById('toastMsg');
        toast.innerText = msg;
        toast.style.opacity = '1';
        setTimeout(() => toast.style.opacity = '0', 2500);
    }
    
    // ------------------- COMMAND PALETTE (Ctrl+K) -------------------
    const cmdModal = document.getElementById('cmdPalette');
    const cmdInput = document.getElementById('cmdInput');
    const cmdResults = document.getElementById('cmdResults');
    document.getElementById('cmdPaletteBtn').addEventListener('click', () => cmdModal.style.display = 'flex');
    document.addEventListener('keydown', (e) => { if(e.ctrlKey && e.key === 'k') { e.preventDefault(); cmdModal.style.display = 'flex'; } });
    cmdInput.addEventListener('input', () => {
        let val = cmdInput.value.toLowerCase();
        let sections = ['home','about','skills','projects','contact'];
        let filtered = sections.filter(s => s.includes(val));
        cmdResults.innerHTML = filtered.map(s => `<li data-section="${s}">Go to ${s}</li>`).join('');
        document.querySelectorAll('#cmdResults li').forEach(li => {
            li.addEventListener('click', () => {
                let sec = li.dataset.section;
                document.getElementById(sec).scrollIntoView({ behavior: 'smooth' });
                cmdModal.style.display = 'none';
            });
        });
    });
    cmdModal.addEventListener('click', (e) => { if(e.target === cmdModal) cmdModal.style.display = 'none'; });
    
    // ------------------- BURGER MENU -------------------
    const burger = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    burger.addEventListener('click', () => navLinks.classList.toggle('active'));
    
    // ------------------- SCROLL TO TOP / LOGO CLICK -------------------
    document.querySelector('.nav-logo').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('scrollDown').addEventListener('click', () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }));
    
    // ------------------- PARTICLE BACKGROUND (Lightweight) -------------------
    const particleContainer = document.getElementById('particlesBg');
    for(let i=0;i<80;i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random()*100 + '%';
        p.style.top = Math.random()*100 + '%';
        p.style.animationDuration = 5+Math.random()*10 + 's';
        p.style.opacity = 0.3+Math.random()*0.5;
        p.style.width = p.style.height = 2+Math.random()*4 + 'px';
        p.style.position = 'absolute';
        p.style.background = '#4c9aff';
        p.style.borderRadius = '50%';
        particleContainer.appendChild(p);
    }
    
    // Initialize everything
    updateLanguage('km');
    renderProjects();
    console.log('✅ DarkForge-X v4.0 NeoSystem Online');
})();
