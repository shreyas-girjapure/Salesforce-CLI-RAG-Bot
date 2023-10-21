import dotenv from 'dotenv';
import { model, vectorStore } from "./helperScripts/entityDefinitions.js";

dotenv.config();

export async function getVectorSearchResult(text, numberOfResults) {
    let result = await vectorStore.similaritySearch(text, numberOfResults);
    return result;
}

export async function isRelatedToSalesforceCLI(text, vectorContext) {
    // let promptText = `question:${text}. Is the question asked related to salesforce or programming, Say Yes if it is related else No ? `
    let promptText = `question:${text}.
    context:${vectorContext}.
    Is context and question related, Say Yes if it is related else No ?`
    let result = await model.call(promptText);
    return result == 'Yes';
}

export async function getOpenAiResponse(text, vectorResultContext) {
    let promptText = `question:${text}

    context:${vectorResultContext}
    
    Based on question and context. Please provide relevant answer.
    Tell answer only if question is related to context provided , else say question is not related to salesforce.
    `
    let result = await model.call(promptText);
    return result;
}

export async function handleVectorSearchFormatted(query, nItems) {
    if (!query) {
        throw new Error('Query parameter is required');
    }
    if (!nItems) {
        nItems = 1;
    }
    const output = await getVectorSearchResult(query, nItems);
    const pageContent = output[0].pageContent;
    console.log('the string' + JSON.stringify(pageContent));
    const escapedText = pageContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre>${escapedText}</pre>`;
};
export async function handleVectorSearchRaw(query, nItems) {
    if (!query) {
        throw new Error('Query parameter is required');
    }
    if (!nItems) {
        nItems = 1;
    }
    const output = await getVectorSearchResult(query, nItems);
    const pageContent = output[0].pageContent;

    return pageContent;
};
export async function formatRawResult(rawVectorResult) {
    const output = rawVectorResult;
    const escapedText = output.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre>${escapedText}</pre>`;
};

