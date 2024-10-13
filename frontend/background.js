// background.js
const blockedWebsites = []; // This will be dynamically updated later

// Listener for blocking requests
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        return { cancel: true };
    },
    { urls: blockedWebsites.map(website => `*://*.${website}/*`) },
    ["blocking"]
);

// Function to update blocked websites
function updateBlockedWebsites(newWebsites) {
    blockedWebsites.push(...newWebsites);
}

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBlockedWebsites") {
        updateBlockedWebsites(request.websites);
        sendResponse({ success: true });
    }
});
