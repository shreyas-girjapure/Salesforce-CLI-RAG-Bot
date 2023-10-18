import { OpenAI } from "langchain/llms/openai";
import dotenv from 'dotenv';
import { FaissStore } from "langchain/vectorstores/faiss";
import { embedder, model, vectorStorePath } from "./helperScripts/entityDefinitions.js";

dotenv.config();


const vectorStore = await FaissStore.load(
    vectorStorePath,
    embedder
);

export async function getOpenAIResponse(text, numberOfResults) {
    let result = await vectorStore.similaritySearch(text, numberOfResults);

    return result;
    // return model.call(text);
}
