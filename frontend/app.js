let userData = {};
let loggedInUser = null;

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    userData[username] = { password, preferences: {} };
    alert('Registered successfully!');
    clearInputs();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (userData[username] && userData[username].password === password) {
        alert('Login successful!');
        loggedInUser = username; // Set the logged-in user
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
    if (loggedInUser) {
        userData[loggedInUser].preferences = {
            instagram: document.getElementById('instagram').checked,
            facebook: document.getElementById('facebook').checked,
            snapchat: document.getElementById('snapchat').checked,
            twitter: document.getElementById('twitter').checked,
        };
        alert('Preferences saved!');
        console.log('Preferences:', userData[loggedInUser].preferences);

        const blockedWebsites = [];
        if (userData[loggedInUser].preferences.instagram) blockedWebsites.push('instagram.com');
        if (userData[loggedInUser].preferences.facebook) blockedWebsites.push('facebook.com');
        if (userData[loggedInUser].preferences.snapchat) blockedWebsites.push('snapchat.com');
        if (userData[loggedInUser].preferences.twitter) blockedWebsites.push('twitter.com');

        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({
                action: 'updateBlockedWebsites',
                websites: blockedWebsites
            }, (response) => {
                if (response.success) {
                    alert('Websites blocked successfully!');
                } else {
                    alert('Failed to block websites');
                }
            });
        } else {
            console.error('Chrome runtime not available. Make sure you are running this in a Chrome extension context.');
        }
    } else {
        alert('Error: No user logged in');
    }
}


function logout() {
    document.getElementById('toggleOptions').style.display = 'none';
    alert('Logged out successfully!');
    clearInputs();
    loggedInUser = null;
}

function clearInputs() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
