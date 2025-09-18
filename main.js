document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#kontakt form');

if (contactForm) {
    const statusBox = contactForm.querySelector('.form-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    const updateStatus = (type, message) => {
        if (!statusBox) {
            return;
        }

        statusBox.classList.remove('success', 'error');
        statusBox.classList.add('is-visible');

        if (type) {
            statusBox.classList.add(type);
        }

        statusBox.textContent = message;
        statusBox.setAttribute('aria-hidden', 'false');
    };

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const payload = {
            name: (formData.get('name') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            unternehmen: (formData.get('unternehmen') || '').toString().trim(),
            nachricht: (formData.get('nachricht') || '').toString().trim()
        };

        if (!payload.name || !payload.email || !payload.nachricht) {
            updateStatus('error', 'Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }

        const encodedData = new URLSearchParams();

        Object.entries(payload).forEach(([key, value]) => {
            encodedData.append(key, value);
        });

        let originalButtonText = '';

        if (submitButton) {
            originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Wird gesendet…';
            submitButton.setAttribute('aria-busy', 'true');
        }

        updateStatus(null, 'Ihre Nachricht wird gesendet…');

        try {
            const method = (contactForm.getAttribute('method') || 'post').toUpperCase();
            const headers = {
                'Accept': 'application/json, text/plain, */*'
            };
            let requestUrl = contactForm.action;
            let requestBody = null;

            if (method === 'GET' || method === 'HEAD') {
                const url = new URL(requestUrl, window.location.origin);

                encodedData.forEach((value, key) => {
                    url.searchParams.set(key, value);
                });

                requestUrl = url.toString();
            } else {
                headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                requestBody = encodedData.toString();
            }

            const requestOptions = {
                method,
                headers
            };

            if (requestBody !== null) {
                requestOptions.body = requestBody;
            }

            const response = await fetch(requestUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            let serverMessage = 'Danke! Ihre Nachricht wurde versendet.';
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                try {
                    const data = await response.json();

                    if (data && typeof data.message === 'string' && data.message.trim() !== '') {
                        serverMessage = data.message.trim();
                    }
                } catch (parseError) {
                    console.warn('Antwort konnte nicht als JSON gelesen werden.', parseError);
                }
            }

            updateStatus('success', serverMessage);
            contactForm.reset();
        } catch (error) {
            console.error('Kontaktformular konnte nicht gesendet werden:', error);
            updateStatus('error', 'Entschuldigung, es gab ein Problem beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an hello@nordlicht-it.de.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.removeAttribute('aria-busy');
            }
        }
    });
}
