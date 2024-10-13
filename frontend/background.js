// background.js

// Function to add rules dynamically
function addBlockedWebsites(websites) {
    const rules = websites.map((website, index) => ({
        id: index + 1, // Rule IDs must be unique
        action: { type: "block" },
        condition: { 
            urlFilter: `*://*.${website}/*`, 
            resourceTypes: ["main_frame"] 
        }
    }));

    // Remove all existing dynamic rules before adding new ones
    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
        const existingRuleIds = existingRules.map(rule => rule.id);
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: existingRuleIds,
            addRules: rules
        });
    });
}

// Listener for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateBlockedWebsites") {
        addBlockedWebsites(message.websites);
        sendResponse({ success: true });
    }
});
