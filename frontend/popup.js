// popup.js

const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton');

signupButton.addEventListener('click', async () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('User created successfully!'); // Alert for success
        } else {
            alert(data.error || 'An error occurred during sign up.'); // Alert for error
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});

signinButton.addEventListener('click', async () => {
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Sign in successful!'); // Alert for success
            // Optionally, store the token for later use
            localStorage.setItem('token', data.token);
        } else {
            alert(data.error || 'An error occurred during sign in.'); // Alert for error
        }
    } catch (error) {
        console.error('Error during sign in:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});
