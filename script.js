// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('[data-testid="nav-mobile-toggle"]');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-16');
            nav.classList.toggle('left-0');
            nav.classList.toggle('right-0');
            nav.classList.toggle('bg-paper');
            nav.classList.toggle('p-6');
            nav.classList.toggle('border-b-2');
            nav.classList.toggle('border-ink');
            nav.classList.toggle('z-50');
        });
    }

    // Fade-up animation on scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== CONTACT FORM HANDLER =====
    const contactForm = document.querySelector('[data-testid="contact-form"]');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = contactForm.querySelector('[data-testid="contact-input-name"]');
            const emailInput = contactForm.querySelector('[data-testid="contact-input-email"]');
            const subjectInput = contactForm.querySelector('[data-testid="contact-input-subject"]');
            const messageInput = contactForm.querySelector('[data-testid="contact-input-message"]');
            const submitBtn = contactForm.querySelector('[data-testid="contact-submit"]');

            // Get form values
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Basic validation
            if (!name) {
                showFormStatus('Please enter your name.', 'error');
                if (nameInput) nameInput.focus();
                return;
            }
            if (!email) {
                showFormStatus('Please enter your email.', 'error');
                if (emailInput) emailInput.focus();
                return;
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                if (emailInput) emailInput.focus();
                return;
            }
            if (!message) {
                showFormStatus('Please enter a message.', 'error');
                if (messageInput) messageInput.focus();
                return;
            }

            // Disable button while sending
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Build the mailto link with form data
            const recipientEmail = 'ayushkumarshivaliya@gmail.com';
            const mailSubject = subject ? subject : ('Contact from ' + name);
            const mailBody = 'Name: ' + name + '\n' +
                             'Email: ' + email + '\n' +
                             (subject ? 'Subject: ' + subject + '\n' : '') +
                             '\n' + message;

            const mailtoUrl = 'mailto:' + encodeURIComponent(recipientEmail) +
                              '?subject=' + encodeURIComponent(mailSubject) +
                              '&body=' + encodeURIComponent(mailBody);

            // Open the user's email client
            window.location.href = mailtoUrl;

            // Show success status
            showFormStatus('Opening your email client... If it didn\'t open, you can email directly at ayushkumarshivaliya@gmail.com', 'success');

            // Re-enable button after a delay
            setTimeout(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>';
                }
                // Clear the form on success
                contactForm.reset();
            }, 2000);
        });
    }

    // Form status message helper
    function showFormStatus(msg, type) {
        // Remove any existing status message
        const existing = document.querySelector('.form-status-msg');
        if (existing) existing.remove();

        const statusEl = document.createElement('div');
        statusEl.className = 'form-status-msg';
        statusEl.style.cssText = 'margin-top:12px; padding:10px 14px; font-family:"JetBrains Mono",monospace; font-size:12px; text-transform:uppercase; letter-spacing:0.05em; border:2px solid ' +
            (type === 'error' ? '#e53e3e' : '#002DCC') + '; background:' +
            (type === 'error' ? '#fff5f5' : '#f0f4ff') + '; color:' +
            (type === 'error' ? '#e53e3e' : '#002DCC') + ';';
        statusEl.textContent = msg;

        const submitBtn = contactForm.querySelector('[data-testid="contact-submit"]');
        if (submitBtn && submitBtn.parentNode) {
            submitBtn.parentNode.insertBefore(statusEl, submitBtn.nextSibling.nextSibling);
        }

        // Auto-remove after 5 seconds
        setTimeout(function() {
            if (statusEl.parentNode) statusEl.remove();
        }, 5000);
    }
});
