import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { FaissStore } from "langchain/vectorstores/faiss";

import dotenv from "dotenv";


dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const vectorStorePath = 'Vector-Store/EOF-Separated';


const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
    modelName : 'gpt-3.5-turbo',
    temperature : 0,
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


export { model, embedder, splitter, vectorStore };

