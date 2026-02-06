      document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.php-email-form');
        if (!form) return;

        form.addEventListener('submit', async function (e) {
          e.preventDefault();

          const loading = form.querySelector('.loading');
          const errBox  = form.querySelector('.error-message');
          const sentBox = form.querySelector('.sent-message');
          if (errBox)  errBox.style.display = 'none';
          if (sentBox) sentBox.style.display = 'none';
          if (loading) loading.style.display = 'block';

          try {
            const res = await fetch(form.action, {
              method: 'POST',
              body: new FormData(form),
              headers: { 'Accept': 'application/json' }
            });

            if (loading) loading.style.display = 'none';

            if (res.ok) {
              // Aapka custom page:
              window.location.href = '../Thankyou/index.html';
            } else {
              const data = await res.json().catch(() => ({}));
              const msg = (data.errors && data.errors.map(e => e.message).join(', ')) || 'Submission failed. Please try again.';
              if (errBox) { errBox.textContent = msg; errBox.style.display = 'block'; }
            }
          } catch (err) {
            if (loading) loading.style.display = 'none';
            if (errBox) { errBox.textContent = 'Network error. Try again.'; errBox.style.display = 'block'; }
          }
  });
});