import { OpenAI } from "langchain/llms/openai";
import dotenv from 'dotenv';

dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true
});

export function getOpenAIResponse(text) {
    return model.call(text);
}
