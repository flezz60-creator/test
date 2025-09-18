document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const yearTarget = document.getElementById('current-year');
    const newsletterForm = document.querySelector('.newsletter-form');

    const updateHeaderState = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 10);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    if (yearTarget) {
        yearTarget.textContent = String(new Date().getFullYear());
    }

    if (contactForm) {
        const statusEl = contactForm.querySelector('.form-status');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const errors = [];

            const name = (formData.get('name') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const project = (formData.get('project') || '').toString().trim();
            const privacyAccepted = contactForm.querySelector('#privacy')?.checked;

            if (!name) {
                errors.push('Bitte geben Sie Ihren Namen an.');
            }

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                errors.push('Bitte geben Sie eine gültige E-Mail-Adresse an.');
            }

            if (!project) {
                errors.push('Bitte beschreiben Sie Ihr Projekt oder Ihre Herausforderung.');
            }

            if (!privacyAccepted) {
                errors.push('Bitte stimmen Sie der Datenverarbeitung zu.');
            }

            if (errors.length) {
                if (statusEl) {
                    statusEl.textContent = errors[0];
                    statusEl.classList.remove('success');
                    statusEl.classList.add('error');
                }
                return;
            }

            if (statusEl) {
                statusEl.textContent = 'Vielen Dank! Wir melden uns innerhalb eines Werktags bei Ihnen.';
                statusEl.classList.remove('error');
                statusEl.classList.add('success');
            }

            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');

            if (!emailInput) {
                return;
            }

            const email = emailInput.value.trim();
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                emailInput.focus();
                emailInput.classList.add('has-error');
                emailInput.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                emailInput.reportValidity();
                return;
            }

            emailInput.classList.remove('has-error');
            emailInput.setCustomValidity('');
            emailInput.value = '';

            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Danke für Ihr Interesse!';
                submitButton.disabled = true;
                setTimeout(() => {
                    submitButton.textContent = originalText || 'Anmelden';
                    submitButton.disabled = false;
                }, 3200);
            }
        });
    }
});
