document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        if (password !== confirm_password) {
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'block';
            return;
        }

        document.getElementById('error-message').style.display = 'none';
        const requestBody = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
        };

        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        // Handle Bad Request error
                        toastr.error('Bad Request: Please check your input and try again.');
                    } else {
                        // Handle other error statuses
                        toastr.error('An error occurred. Please try again later.');
                    }
                    throw new Error('Failed to Register');
                }
                return response.json();
            })
            .then(data => {
                toastr.success('Registration successful!');
                localStorage.setItem('user', JSON.stringify(data.response))
                window.location.href = '/home';
            })
            .catch(error => {
                console.error('Register failed:', error);
            });
    });
});