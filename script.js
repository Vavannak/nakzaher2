// ----------------------------------------------
// 50 Essential English words with Khmer translation
// ----------------------------------------------
const vocabulary = [
    { en: "wash", kh: "លាង" },
    { en: "slice", kh: "កាត់" },
    { en: "bike", kh: "កង់" },
    { en: "Sorry", kh: "សុំទោស" },
    { en: "gun", kh: "កាំភ្លើង" },
    { en: "fry", kh: "បំពង" },
    { en: "fat", kh: "ធាត" },
    { en: "Man", kh: "បុរស" },
    { en: "Woman", kh: "ស្ត្រី" },
    { en: "Child", kh: "កុមារ" },
    { en: "peel", kh: "បក" },
    { en: "serve", kh: "បម្រើ" },
    { en: "Rice", kh: "បាយ" },
    { en: "Fruit", kh: "ផ្លែឈើ" },
    { en: "pour", kh: "ចាក់" },
    { en: "shop", kh: "ហាង" },
    { en: "stir", kh: "ច្របូក" },
    { en: "Car", kh: "ឡាន" },
    { en: "Dog", kh: "ឆ្កែ" },
    { en: "Cat", kh: "ឆ្មា" },
    { en: "Big", kh: "ធំ" },
    { en: "Small", kh: "តូច" },
    { en: "Hot", kh: "ក្តៅ" },
    { en: "Cold", kh: "ត្រជាក់" },
    { en: "Good", kh: "ល្អ" },
    { en: "Bad", kh: "អាក្រក់" },
    { en: "New", kh: "ថ្មី" },
    { en: "Old", kh: "ចាស់" },
    { en: "One", kh: "មួយ" },
    { en: "Two", kh: "ពីរ" },
    { en: "Three", kh: "បី" },
    { en: "Four", kh: "បួន" },
    { en: "Five", kh: "ប្រាំ" },
    { en: "Morning", kh: "ព្រឹក" },
    { en: "Afternoon", kh: "រសៀល" },
    { en: "Night", kh: "យប់" },
    { en: "Today", kh: "ថ្ងៃនេះ" },
    { en: "Tomorrow", kh: "ថ្ងៃស្អែក" },
    { en: "Yesterday", kh: "ម្សិលមិញ" },
    { en: "Eat", kh: "ញ៉ាំ" },
    { en: "Drink", kh: "ផឹក" },
    { en: "Sleep", kh: "គេង" },
    { en: "Walk", kh: "ដើរ" },
    { en: "Run", kh: "រត់" },
    { en: "cut", kh: "កាត់" },
    { en: "mix", kh: "លាយ" },
    { en: "Speak", kh: "និយាយ" },
    { en: "Read", kh: "អាន" },
    { en: "Write", kh: "សរសេរ" },
    { en: "Learn", kh: "រៀន" }
];

// ----------------------------------------------
// Render vocabulary grid
// ----------------------------------------------
function renderVocabulary() {
    const grid = document.getElementById('vocabGrid');
    if (!grid) return;
    grid.innerHTML = '';
    vocabulary.forEach(word => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        card.innerHTML = `
            <div class="english">${word.en}</div>
            <div class="khmer">${word.kh}</div>
            <button onclick="speak('${word.en}')" title="Listen">🔊</button>
        `;
        grid.appendChild(card);
    });
}

// ----------------------------------------------
// Text-to-Speech function
// ----------------------------------------------
function speak(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';       // English
    utterance.rate = 0.9;           // Slightly slower for learners
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// ----------------------------------------------
// Quiz logic
// ----------------------------------------------
function checkAnswer(selected) {
    const correct = "apple";
    const feedback = document.getElementById('quiz-feedback');
    if (selected === correct) {
        feedback.innerHTML = "✅ Correct! Well done.";
        feedback.style.color = "green";
    } else {
        feedback.innerHTML = "❌ Not quite. Try again!";
        feedback.style.color = "red";
    }
}

// ----------------------------------------------
// Subscribe form handler
// ----------------------------------------------
document.getElementById('subscribeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const message = document.getElementById('form-message');
    if (email) {
        message.textContent = `📧 Thanks! We'll send lessons to ${email}`;
        this.reset();
    } else {
        message.textContent = "Please enter a valid email.";
    }
});

// ----------------------------------------------
// Smooth scroll for navigation
// ----------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ----------------------------------------------
// Initialize on page load
// ----------------------------------------------
window.addEventListener('DOMContentLoaded', renderVocabulary);
