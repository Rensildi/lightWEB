// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and background script running.");
});

// Hardcoded blocked websites
const blockedSites = [
    "https://www.facebook.com",
    "https://www.twitter.com",
    "https://www.instagram.com",
    "https://www.tiktok.com",
    "https://www.snapchat.com"
];

// Listen for web requests to block specified sites
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = details.url;
        const shouldBlock = blockedSites.some(site => url.startsWith(site));
        if (shouldBlock) {
            console.log(`Blocking access to: ${url}`);
        }
        return { cancel: shouldBlock }; // Block the request if it matches
    },
    { urls: ["<all_urls>"] }, // Listen to all URLs
    ["blocking"]
);


chrome.runtime.onInstalled.addListener(() => {
    console.log("Content Blocker Extension installed and ready.");
});
