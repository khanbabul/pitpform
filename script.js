const form = document.getElementById('registrationForm');
        const messageBox = document.getElementById('messageBox');
        const messageText = document.getElementById('messageText');
        const MIN_PASSWORD_LENGTH = 3;

        function showMessage(type, message) {
            messageBox.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
            messageText.textContent = message;

            if (type === 'success') {
                messageBox.classList.add('bg-green-100', 'text-green-800');
            } else if (type === 'error') {
                messageBox.classList.add('bg-red-100', 'text-red-800');
            }
        }

        function hideError(fieldId) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const inputElement = document.getElementById(fieldId);
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
            if (inputElement) {
                inputElement.classList.remove('border-red-500');
            }
        }

        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const inputElement = document.getElementById(fieldId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
            }
            if (inputElement) {
                inputElement.classList.add('border-red-500');
            }
        }


        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }


        function validateForm() {
            let isValid = true;
            messageBox.classList.add('hidden');

            const requiredFields = [
                { id: 'name', label: "Your name" },
                { id: 'fatherName', label: "Father's name" },
                { id: 'email', label: "Email" },
                { id: 'password', label: "Password" }
            ];

            requiredFields.forEach(field => {
                const input = document.getElementById(field.id);
                const value = input.value.trim();
                hideError(field.id);


                if (value === "") {
                    showError(field.id, `${field.label} is required.`);
                    isValid = false;
                    return;
                }

                if (field.id === 'email' && !isValidEmail(value)) {
                    showError(field.id, `Please enter a valid email address.`);
                    isValid = false;
                } else if (field.id === 'password' && value.length < MIN_PASSWORD_LENGTH) {
                    showError(field.id, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
                    isValid = false;
                }
            });

            return isValid;
        }


        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (validateForm()) {

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                console.log("Submitting data:", data);
                showMessage('success', 'Form validated and submission simulated...');

                setTimeout(() => {
                    form.reset();
                    showMessage('success', 'Registration Successful! Thank you.');
                }, 500);

            } else {
                showMessage('error', 'Please correct the errors marked in red.');
            }
        });


        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('input', (e) => {

                messageBox.classList.add('hidden');


                const fieldId = e.target.id;
                hideError(fieldId);
                const value = e.target.value.trim();


                if (fieldId === 'email' && value.length > 0 && !isValidEmail(value)) {
                    showError(fieldId, `Enter a valid email.`);
                }

                else if (fieldId === 'password' && value.length > 0 && value.length < MIN_PASSWORD_LENGTH) {
                    showError(fieldId, `Password needs ${MIN_PASSWORD_LENGTH - value.length} more characters.`);
                }
            });
        });