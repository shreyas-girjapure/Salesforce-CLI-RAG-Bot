// const express = require('express');
// const dotenv = require('dotenv');
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
import express from 'express';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;
import dotenv from 'dotenv';
import { handleVectorSearchRaw, isRelatedToSalesforceCLI, formatRawResult } from './langChain/main.js'; // Adjust the path as needed

dotenv.config();

// Create an Express application
const app = express();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/query', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    res.json({ query: query, });
})

app.get('/search', async (req, res) => {
    try {
        let { query, nItems } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        if (!nItems) {
            nItems = 1;
        }
        const searchResult = await handleVectorSearch(query, nItems);
        res.send(searchResult);

    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
});

app.get('/super-search', async (req, res) => {
    try {
        let { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const nItems = req.query.nItems || 1;
        const vectorResult = await handleVectorSearchRaw(query, nItems);

        const isRelated = await isRelatedToSalesforceCLI(query, vectorResult);
        if (!isRelated) {
            return res.status(400).json({ error: 'Please ask questions related to salesforce CLI Or Rephrase your query' });
        }
        if (isRelated) {
            let output = await formatRawResult(vectorResult);
            res.send(`<pre>${output}</pre>`);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify(error));
    }
});
app.get('/check', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on :${port}`);
});
