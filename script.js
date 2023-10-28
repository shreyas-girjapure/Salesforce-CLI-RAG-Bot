const darkModeSwitch = document.getElementById('darkModeSwitch');
const resultContainer = document.getElementById('resultContainer');
const responseContainer = document.getElementById('response');
const noResponseMessage = document.getElementById('noResponseMessage');
const queryInput = document.getElementById('query');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.querySelector('.loading-spinner');
const darkModeIcon = document.getElementById('darkModeIcon');
const baseUrl = 'https://basicauth-znr4.onrender.com/';
let isDarkMode = false;

darkModeSwitch.addEventListener('change', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    darkModeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

function performSearch() {
    const query = queryInput.value;
    responseContainer.innerHTML = '';
    noResponseMessage.style.display = 'none';
    loadingSpinner.style.display = 'block'; // Show loading spinner

    // Hide result container when making a new search
    resultContainer.style.display = 'none';

    fetch(`${baseUrl}/search?query=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
            responseContainer.innerHTML = data;
            // Show the result container when you have a response
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            console.error(error);
            noResponseMessage.style.display = 'block';
        })
        .finally(() => {
            loadingSpinner.style.display = 'none'; // Hide loading spinner
        });
}

searchBtn.addEventListener('click', performSearch);

// Add event listener for Enter key press
queryInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Set the initial dark mode icon
updateDarkModeIcon();
