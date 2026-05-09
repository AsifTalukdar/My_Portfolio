/* ============================================
   ISTIAQ AHMED — PORTFOLIO JAVASCRIPT
   ============================================ */

// ---- Tab Switcher ----
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    for (var tablink of tablinks) tablink.classList.remove("active-link");
    for (var tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ---- Nav Highlight on Scroll ----
const sections = document.querySelectorAll('div[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ---- Typing Animation ----
const typingEl = document.querySelector('.header-text p');
if (typingEl) {
    const text = typingEl.getAttribute('data-text') || typingEl.textContent;
    typingEl.textContent = '';
    typingEl.setAttribute('data-text', text);

    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typingEl.appendChild(cursor);

    let i = 0;
    setTimeout(() => {
        const interval = setInterval(() => {
            typingEl.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 55);
    }, 900);
}

// ---- Scroll-Reveal for Project Cards ----
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeUp 0.6s ease forwards';
            }, i * 130);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
cards.forEach(card => cardObserver.observe(card));

// ---- Scroll-Reveal for Other Elements ----
const revealEls = document.querySelectorAll('.contact-card, .about-col-1, .about-col-2, .social-icons');
revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- Toast Notification ----
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s, transform 0.4s';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ---- Resume Button ----
const resumeBtns = document.querySelectorAll('.resume-trigger');
resumeBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const hasResume = false; // Set to true and add resume.pdf to folder to enable download
        if (!hasResume) {
            e.preventDefault();
            showToast('📄 Resume coming soon! Check back later.');
        }
    });
});

// ---- Project Card Tilt Effect ----
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
    });
});
