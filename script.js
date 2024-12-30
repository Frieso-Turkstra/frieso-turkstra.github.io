// Function to handle word generation
function generateWords() {
    const consonants = document.getElementById("consonants").value.trim();
    const vowels = document.getElementById("vowels").value.trim();
    const pattern = document.getElementById("pattern").value.trim();
    const outputElement = document.getElementById("output");

    // Input validation
    if (!consonants || !vowels || !pattern) {
        outputElement.textContent = "Please fill in all fields.";
        return;
    }

    if (!/^[C()V]+$/.test(pattern)) {
        outputElement.textContent = "Pattern can only contain 'C', 'V', and parentheses.";
        return;
    }

    // Helper function to fill a single pattern
    function fillPattern(p) {
        return p.replace(/C/g, () => consonants[Math.floor(Math.random() * consonants.length)])
                .replace(/V/g, () => vowels[Math.floor(Math.random() * vowels.length)])
                .replace(/\((C|V)\)/g, (_, char) => (Math.random() > 0.5 ? char : ""))
                .replace(/\((C|V)\((C|V)\)\)/g, (_, char1, char2) => (Math.random() > 0.5 ? char1 + char2 : ""));
    }

    // Generate words
    const words = [];
    for (let i = 0; i < 100; i++) {
        const syllables = [];
        const numSyllables = Math.floor(Math.random() * 4) + 1; // 1 to 4 syllables
        for (let j = 0; j < numSyllables; j++) {
            syllables.push(fillPattern(pattern));
        }
        words.push(syllables.join(""));
    }

    // Output generated words
    outputElement.innerHTML = words.join("<br>");
}

// Add event listener to the button
document.getElementById("generate").addEventListener("click", generateWords);
