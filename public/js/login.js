document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const requestBody = {
            email: email,
            password: password
        };

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        })
        .then(data => {
            toastr.success('Login successful!');
            localStorage.setItem('user',JSON.stringify(data.response))
            window.location.href = '/home';
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Handle login failure (e.g., display error message to the user)
            toastr.error('Failed to login. Please check your credentials and try again.');
        });
    });
});