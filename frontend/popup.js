document.getElementById('openWebsite').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://127.0.0.1:5500/frontend/index.html' });
});
