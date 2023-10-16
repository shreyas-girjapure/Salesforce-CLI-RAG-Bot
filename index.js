// const express = require('express');
// const dotenv = require('dotenv');
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
import express from 'express';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;
import dotenv from 'dotenv';
import { getOpenAIResponse } from './langChain/main.js'; // Adjust the path as needed

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

app.get('/query', requiresAuth(), (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    res.json({ query: query });
})

app.get('/openai',requiresAuth(),  async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const output =  await getOpenAIResponse(query);
        res.json({ response: output });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
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
