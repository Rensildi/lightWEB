const blockedWebsites = []; // This will be dynamically updated later

// Function to update blocked websites
function updateBlockedWebsites(newWebsites) {
    // Clear previous rules
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ['block_specific_websites']
    });

    // Create new rules for the blocked websites
    const rules = newWebsites.map((website, index) => ({
        id: `block_${index}`, // Unique rule ID for each website
        condition: {
            urlFilter: `*://*.${website}/*`,
            resourceTypes: ["main_frame"]
        },
        action: {
            type: "block"
        }
    }));

    // Add the new rules
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules
    });
}

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBlockedWebsites") {
        updateBlockedWebsites(request.websites);
        sendResponse({ success: true });
    }
});
