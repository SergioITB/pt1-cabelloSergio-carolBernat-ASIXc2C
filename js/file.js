const fs = require('fs');

// Function to read file and extract names
function extractNamesFromFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = event.target.result;
        // Split the content by ';' and trim whitespace
        const names = data.split(';').map(name => name.trim()).filter(name => name.length > 0);
        callback(null, names);
    };
    reader.onerror = function(event) {
        console.error('Error reading file:', event.target.error);
        callback(event.target.error, null);
    };
    reader.readAsText(file);
}

// Export the function
module.exports = { extractNamesFromFile };