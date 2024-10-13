let blockedWebsites = ["example.com"]; 

// Function to update blocked websites and reload rules
function updateBlockedWebsites(newWebsites) {
    // Clear existing rules
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ['block_specific_websites'] // Remove previous rules by ID
    });

    // Create new rules based on the updated blocked websites
    const rules = newWebsites.map((website) => ({
        id: "block_specific_websites",
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

// Listen for messages from popup to update blocked websites
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBlockedWebsites") {
        blockedWebsites.push(...request.websites);
        updateBlockedWebsites(blockedWebsites); // Update the rules with the new websites
        sendResponse({ success: true });
    }
});
