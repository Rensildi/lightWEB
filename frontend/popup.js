document.addEventListener('DOMContentLoaded', () => {
    const savePreferencesButton = document.getElementById('savePreferences');
    const openWebsiteButton = document.getElementById('openWebsite');

    if (savePreferencesButton) {
        savePreferencesButton.addEventListener('click', () => {
            const blockedWebsites = [];
            if (document.getElementById('instagram').checked) blockedWebsites.push('instagram.com');
            if (document.getElementById('facebook').checked) blockedWebsites.push('facebook.com');
            if (document.getElementById('snapchat').checked) blockedWebsites.push('snapchat.com');
            if (document.getElementById('twitter').checked) blockedWebsites.push('twitter.com');

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
        });
    }

    if (openWebsiteButton) {
        openWebsiteButton.addEventListener('click', () => {
            chrome.tabs.create({ url: 'file:///C:/xampp/htdocs/lightWEB/frontend/index.html' });
        });
    }
});
