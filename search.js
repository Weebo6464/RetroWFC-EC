
function getErrorInfo() {
    const resultSection = document.getElementById('result-section');
    const resultDescription = document.getElementById('result-description');
    const errorInput = document.getElementById('error-input');

    const errorCode = errorInput.value.trim();
    if (!errorCode) {
        resultSection.innerHTML = '<p>Please enter an error code.</p>';
        return;
    }

    fetch('./ErrorCodes.json') // Ensure the JSON file is in the same directory
        .then(response => response.json())
        .then(data => {
            // Find all matches
            const matches = data.filter(item => new RegExp(item.regex).test(errorCode));
            
            if (matches.length > 0) {
                // Display the most specific match (last in array is typically the most specific)
                const specificMatch = matches[matches.length - 1];        

                resultSection.innerHTML = `<h3>Error Code ${errorCode}: ${specificMatch.comment}</h3>`;
                resultDescription.innerHTML = `<p><strong>Description:</strong> ${parseDescription(specificMatch.description)}</p>`;
                resultDescription.style.display = 'block'; // Show the description section
            } else {
                resultSection.innerHTML = `<p>No information found for error code ${errorCode}.</p>`;
                resultDescription.style.display = 'none'; // Hide the description section, as there is no information anyway
            }
        })
        .catch(error => {
            console.error('Error fetching error codes:', error);
            resultSection.innerHTML = `<p>Failed to load error codes. Please try again later.</p>`;
            resultDescription.style.display = 'none';
        });
}

function parseDescription(description) {

    // If description is not available, return a default message
    if (typeof description === 'undefined') return "Not available.";
    // If description is a string, return it as is
    if (description.length == 1) description[0];
    // If description is an array, join the strings and separate them with line breaks
    return description.map(desc => `${desc}<br><br>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const errorInput = document.getElementById('error-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', getErrorInfo());
    errorInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            getErrorInfo();
        }
    });

});