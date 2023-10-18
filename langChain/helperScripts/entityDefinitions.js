import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import dotenv from "dotenv";


dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const vectorStorePath = 'Vector-Store/EOF-Separated';


const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
})

const embedder = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
});


export { model, embedder, splitter ,vectorStorePath};

