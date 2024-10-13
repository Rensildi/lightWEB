let userData = {};

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Store user data (in a real app, store this in a database)
    userData[username] = { password, preferences: {} };
    alert('Registered successfully!');
    clearInputs();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if user exists
    if (userData[username] && userData[username].password === password) {
        alert('Login successful!');
        document.getElementById('toggleOptions').style.display = 'block';
        loadPreferences(username);
    } else {
        alert('Invalid credentials');
    }
    clearInputs();
}

function loadPreferences(username) {
    const preferences = userData[username].preferences;
    document.getElementById('instagram').checked = preferences.instagram || false;
    document.getElementById('facebook').checked = preferences.facebook || false;
    document.getElementById('snapchat').checked = preferences.snapchat || false;
    document.getElementById('twitter').checked = preferences.twitter || false;
}

function savePreferences() {
    const username = document.getElementById('username').value;
    userData[username].preferences = {
        instagram: document.getElementById('instagram').checked,
        facebook: document.getElementById('facebook').checked,
        snapchat: document.getElementById('snapchat').checked,
        twitter: document.getElementById('twitter').checked,
    };
    alert('Preferences saved!');
}

function clearInputs() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
