document.getElementById('openWebsite').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-website.com' });
});
