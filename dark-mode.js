document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const body = document.body;
    const tooltipText = document.querySelector('.dark-mode-toggle .tooltip-text');

    const updateTooltip = () => {
        if (body.classList.contains('dark-mode')) {
            tooltipText.textContent = 'Disable Dark Mode (Your Eyes will explode btw :3)';
        } else {
            tooltipText.textContent = 'Enable Dark Mode';
        }
    };

    // Function to apply the theme
    const applySavedTheme = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
        if (isDarkMode) {
            body.classList.add('dark-mode');
            darkModeSwitch.checked = true;
        } else {
            body.classList.remove('dark-mode');
            darkModeSwitch.checked = false;
        }
        updateTooltip();
    };

    // Function to toggle the theme
    const toggleTheme = () => {
        if (darkModeSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
        updateTooltip();
    };

    // Apply theme!
    applySavedTheme();

    // Add event listener for the toggle switch
    darkModeSwitch.addEventListener('change', toggleTheme);
});