import dotenv from 'dotenv';
import { model, vectorStore } from "./helperScripts/entityDefinitions.js";

dotenv.config();

export async function getVectorSearchResult(text, numberOfResults) {
    let result = await vectorStore.similaritySearch(text, numberOfResults);
    return result;
}

export async function isRelatedToSalesforceCLI(text, vectorContext) {
    let promptText = `You are an expert programmer and problem-solver, tasked with answering any question about Salesforce and Salesforce. 
    question:${text}.
    context:${vectorContext}.
    Is context provided above meaningfully relevant to the question asked, Say Yes if it is related else No ?`
    let result = await model.call(promptText);
    return result == 'Yes';
}
export async function answerNonRelatedQuestion(questionText) {
    let promptText = `You are an expert programmer and problem-solver, tasked with answering any question about Salesforce and Salesforce CLI. 
    Generate a comprehensive and informative answer of 80 words or less for the given question.
    question:${questionText}.
    Always use bullet points in your answer for readability.
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
export function formatRawResult(rawVectorResult) {
    const output = rawVectorResult;
    const escapedText = output.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre>${escapedText}</pre>`;
};

