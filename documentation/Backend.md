### Backend
1. Hosted on render.com
1. Free tier

#### Base API endpoint URL : `https://basicauth-znr4.onrender.com/`

### `super-search` : LLM powered vector search
1. URL : `https://basicauth-znr4.onrender.com/super-search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/super-search?query=How%20to%20logout%20of%20org`
    1. `https://basicauth-znr4.onrender.com/super-search?query=how%20to%20deploy%20metadata`
1. Average Response time: 
    1. `5+` seconds for Non Salesforce CLI Document related searches.
    1. `0.5` seconds for Salesforce CLI Document related searches.

### `search` : Simple semantic vector search
1. URL : `https://basicauth-znr4.onrender.com/search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/search?query=How%20to%20logout%20of%20org`
    1. `https://basicauth-znr4.onrender.com/search?query=how%20to%20deploy%20metadata`
1. Average Response time: 
    1. `0.3` seconds for Salesforce CLI Document related searches.
