function addBlockedWebsites(websites) {
    const rules = websites.map((website, index) => ({
        id: index + 1, // Ensure unique IDs
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
        }, () => {
            console.log('Updated rules:', rules);
        });
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateBlockedWebsites") {
        addBlockedWebsites(message.websites);
        sendResponse({ success: true });
    }
});
