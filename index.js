const express = require('express');
const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


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

// Define a route and send a response
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
app.get('/check', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on :${port}`);
});
