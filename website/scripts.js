document.addEventListener('DOMContentLoaded', () => {
    // Scroll header effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Chatbot functionality
    const chatBtn = document.getElementById('chatBtn');
    const chatPanel = document.getElementById('chatPanel');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const faqItemRes = {
        'services': 'We offer Document Translation, Software Localization, Cultural Adaptation, and Website Localization — all handled by certified native-speaking linguists.',
        'speed': 'Our average turnaround is 24 hours for standard documents. Rush delivery is available. We\'ll give you an exact timeline in your quote.',
        'quote': 'Simply fill out the form on this page or send us your file, and we will get back to you with a detailed quote within 2 business hours.',
        'languages': 'We support 12+ major world languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and more.'
    };

    chatBtn.addEventListener('click', () => {
        chatPanel.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
        chatPanel.classList.remove('active');
    });

    // FAQ clicks
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const question = btn.innerText;
            const answer = faqItemRes[type];

            // Add user msg
            addMessage(question, 'user');
            
            // Add bot thinking and response
            setTimeout(() => {
                addMessage(answer, 'bot');
            }, 600);
        });
    });

    function addMessage(text, role) {
        const msg = document.createElement('div');
        msg.className = `chat-msg msg-${role}`;
        msg.innerText = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Smooth scroll for nav links
    document.querySelectorAll('nav a, .logo, .cta-button, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission mock
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your request! One of our experts will contact you shortly.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});
