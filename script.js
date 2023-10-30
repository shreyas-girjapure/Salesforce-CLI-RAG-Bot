const queryInput = document.getElementById('query');
const responseContainer = document.getElementById('responseContainer');
const vectorSearchButton = document.getElementById('vector-search');
const llmSearchButton = document.getElementById('llm-search');
const baseUrl = 'https://basicauth-znr4.onrender.com';
let searchMode = 'search';//default
let isRequestSuccess = false;


async function performSearch(e) {
    try {
        let buttonId = e?.target?.id;        
        if(buttonId === 'llm-search'){
            searchMode = 'super-search'
        }
        const query = queryInput.value;
        const finalURL = `${baseUrl}/${searchMode}?query=${encodeURIComponent(query)}`;
        console.log('here s url ' + finalURL);

        let primaryResponse = await fetch(finalURL);
        if(primaryResponse.status == '200'){
            isRequestSuccess = true;
            let textData = await primaryResponse.text();
            console.log(textData);
            console.log(responseContainer)
            responseContainer.innerHTML = textData;
        }

    } catch (error) {
        console.log(error)
    }
}

vectorSearchButton.addEventListener('click', performSearch);
llmSearchButton.addEventListener('click', performSearch);

queryInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});
