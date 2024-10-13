// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');

    // Handle signup
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const username = signupForm.username.value;
            const password = signupForm.password.value;

            try {
                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    // Handle successful signup (e.g., show a message, redirect, etc.)
                    console.log('User created:', data.message);
                } else {
                    // Handle signup errors
                    console.error('Signup error:', data.error);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        });
    }

    // Handle signin
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const username = signinForm.username.value;
            const password = signinForm.password.value;

            try {
                const response = await fetch('http://localhost:5000/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    // Handle successful signin (e.g., show a message, redirect, store token, etc.)
                    console.log('User signed in:', data.user);
                    localStorage.setItem('token', data.token); // Store the token for later use
                } else {
                    // Handle signin errors
                    console.error('Signin error:', data.message);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        });
    }
});
