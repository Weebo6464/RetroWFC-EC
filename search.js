document.addEventListener('DOMContentLoaded', () => {
    const errorInput = document.getElementById('error-input');
    const searchButton = document.getElementById('search-button');
    const resultSection = document.getElementById('result-section');

    searchButton.addEventListener('click', () => {
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
                    resultSection.innerHTML = `
                        <h3>Error Code: ${errorCode}</h3>
                        <p><strong>Description:</strong> ${specificMatch.comment}</p>
                    `;
                } else {
                    resultSection.innerHTML = `<p>No information found for error code: ${errorCode}.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching error codes:', error);
                resultSection.innerHTML = `<p>Failed to load error codes. Please try again later.</p>`;
            });
    });
});
