// Function to load blocked words from storage and display them
function loadBlockedWords() {
    // Check if chrome object is available
    if (typeof chrome === 'undefined' || typeof chrome.storage === 'undefined' || typeof chrome.storage.sync === 'undefined') {
        console.error("Chrome API is not available.");
        return;
    }

    chrome.storage.sync.get("blockedWords", (data) => {
        const wordList = document.getElementById("wordList");
        wordList.innerHTML = ""; 
        if (data.blockedWords) {
            data.blockedWords.forEach((word) => {
                const li = document.createElement("li");
                li.textContent = word;
                wordList.appendChild(li);
            });
        }
    });
}

// Function to add a blocked word
function addBlockedWord() {
    const wordInput = document.getElementById("blockedWord");
    const newWord = wordInput.value.trim();
    if (newWord) {
        chrome.storage.sync.get("blockedWords", (data) => {
            const blockedWords = data.blockedWords || [];
            blockedWords.push(newWord);
            chrome.storage.sync.set({ blockedWords }, () => {
                loadBlockedWords(); 
                wordInput.value = ""; 
            });
        });
    }
}

// Event listener for the add button
document.getElementById("addWord").addEventListener("click", addBlockedWord);

// Load the blocked words on popup open
document.addEventListener('DOMContentLoaded', loadBlockedWords);
