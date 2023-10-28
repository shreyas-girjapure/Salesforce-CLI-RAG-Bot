import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "langchain/vectorstores/faiss";
import { LLMonitorHandler } from "langchain/callbacks/handlers/llmonitor";

import dotenv from "dotenv";


dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const LLMONITOR_APP_ID = process.env.LLMONITOR_APP_ID;
const vectorStorePath = 'Vector-Store/EOF-Separated';

const monitorHandler = new LLMonitorHandler({
    appId: LLMONITOR_APP_ID,
    verbose: true,
});

const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
    callbacks: [monitorHandler],
})

const embedder = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY,
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
});

const vectorStore = await FaissStore.load(
    vectorStorePath,
    embedder
);


export { model, embedder, splitter, vectorStore, LLMONITOR_APP_ID };

