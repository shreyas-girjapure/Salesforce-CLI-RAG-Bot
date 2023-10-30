const queryInput = document.getElementById('query');
const darkModeSwitch = document.getElementById('dark-mode-switch');
const darkModeIcon = document.getElementById('dark-icon');
const responseContainer = document.getElementById('responseContainer');
const vectorSearchButton = document.getElementById('vector-search');
const llmSearchButton = document.getElementById('llm-search');
const errorTextElement = document.getElementById('errorText');
const spinner = document.getElementById('spinner');
const body = document.querySelector('body');


const baseUrl = 'https://basicauth-znr4.onrender.com';
let searchMode = 'search';//default
let isRequestSuccess = false;


async function performSearch(event) {
    try {
        let buttonId = event?.target?.id;
        if (buttonId === 'llm-search') {
            searchMode = 'super-search'
        }
        spinner.classList.toggle('slds-hide');
        const query = queryInput.value;
        responseContainer.classList.add('slds-hide')

        const finalURL = `${baseUrl}/${searchMode}?query=${encodeURIComponent(query)}`;
        console.log('here s url ' + finalURL);

        let primaryResponse = await fetch(finalURL);
        let textData = await primaryResponse.text();
        if (primaryResponse.status == '200') {
            isRequestSuccess = true;
        } else {
            isRequestSuccess = false;
        }
        spinner.classList.toggle('slds-hide');
        responseContainer.classList.remove('slds-hide');
        responseContainer.innerHTML = textData;

    } catch (error) {
        spinner.classList.toggle('slds-hide');
        responseContainer.classList.remove('slds-hide');
        responseContainer.innerHTML = `<pre>${error}</pre>`;
        console.log(error)
    }
}

vectorSearchButton.addEventListener('click', performSearch);
llmSearchButton?.addEventListener('click', performSearch);

darkModeSwitch.addEventListener('click', handleDarkModeSwitch);

queryInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function handleDarkModeSwitch(event) {
    console.log('dark mode toggle start');
    toogleModes();
    if(darkModeIcon.classList.contains('fa-sun')){
        darkModeIcon.classList.replace('fa-sun','fa-moon')
    }else{
        darkModeIcon.classList.replace('fa-moon','fa-sun')
    }
}

function toogleModes() {
    body.classList.toggle('darkModeRoot');
    responseContainer.classList.toggle('containerDark');
}