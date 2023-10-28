# Salesforce CLI Command Search RAG Bot - Chat with your documents using AI

## Overview 
Document search implementations generally involve
1. Data Splitting 
1. Embedding
1. Storing in Vector DB
1. Retrieving with LLM's layer for summary.

There are some major issues in search results depending RAG strategy and dataset used. Below are some areas involved in result inaccuracy.
1. Data splitting
    1. Chunked data may lose important context for the query and retrieval of such data generates bad results in final outcome.
1. LLM's layer
    1. LLM some times add their own flavors `[hallucinations]` on vectored context provided.

So by avoiding standard split and embed approaches and fine controlling the dataset , Better results can be achieved.

This project is implementation of such finely controlled dataset's RAG strategy.

    Tip : You can create simple AI powered bots using low code tools like 
        1. RelevanceAI
        1. Flowise

## Problem Statement / Motivations
1. Overcome inaccuracy of simple RAG strategy and provide accurate results.  
1. Always wanted a personal AI powered `RAG bot`.
1. Wanted to implement lang-chain concepts. Understand AI hype better.

## Existing ways to do this [Find CLI commands you need]
1. Actually read through [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. Use `sfdx search` command for keyword searching commands.

## Implementation overview
1. Embedded `SFDX CLI documentation` using openAi's embedding model.
1. LLM model `gpt-3.5-turbo`
1. Embedding model `text-embedding-ada-002` 
1. Stored `Faiss` store for retrieval.
1. added LLM layer for decision making and presentation.
1. `express` as web server.

There are 2 search routes available.

1. `super-search`
    1. Has LLM's support for guessing if question is related to dataset used.
    1. Has cost of LLM's tokenization.
    1. Relatively Slow and has rate limits.
    1. `Requests Per Min : 3,500`
    1. `Tokens Per Min : 90,000`
1. `search` 
    1. Direct search on vector store.
    1. No LLM layer
    1. Faster response time.
    1. Only has query embedding cost.
    1. No* Rate Limits.

## How to Use

### Front end

#### Visit[ RAG Bot Page ](https://shreyas-girjapure.github.io/Salesforce-CLI-RAG-Bot/) for salesforce cli documentation searches.

    Note : Backend is hosted on free tier server. You might face delayed responses due to `cold-start` time

### Backend
### Base API endpoint URL : `https://basicauth-znr4.onrender.com/`

### `super-search` : LLM powered vector search
1. URL : `https://basicauth-znr4.onrender.com/super-search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/super-search?query=How%20to%20logout%20of%20org`
    1. `https://basicauth-znr4.onrender.com/super-search?query=how%20to%20deploy%20metadata`

### `search` : Simple semantic vector search
1. URL : `https://basicauth-znr4.onrender.com/search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/search?query=How%20to%20logout%20of%20org`
    1. `https://basicauth-znr4.onrender.com/search?query=how%20to%20deploy%20metadata`

## Features
1. Understands semantics of both question and files used aka `Vector Search`.
1. Super processed data set for HIGHLY accurate search results.
1. Answers* unrelated questions to the context used.
1. Has support to load local vector stores for faster retrieval.
1. LLM Monitor support for analytics

## Next in line features  
### Priority 1
1. ~~Add UI support~~.
1. Add github links and readme on frontend.
1. Enhance search result output.
1. Add env variables for models
1. Remove unnecessary lines of code.
1. Add referenced from links of web documentation pages.
1. Remove deprecated commands from dataset used.

### Priority 2
1. Add documentation for `How dataset was embedded ?`
1. Add documentation for `What strategies were used ?`
1. Ability to Update dataset
1. Automate update dataset.
1. Maybe create a cli `sfdx plugin` for semantic search
1. Use local LLM for low cost implementation

## AI Awareness section
1. This is more of a hands on product and an implementations of some POCs.
1. AI is not magic , lot of guard rails and code alterations are needed to have a useful AI bot which doesn't hallucinates much.
1. Understanding your own dataset is really important before choosing approach for RAG bot. 
1. Adding chat bot layer over large documents will only improve current businesses and user experiences.

## Limitations and NFRs
1. Free Server has cold start issues.
1. No Rate guards are placed in code , prone to credit loss or server crashes.
    1. `RPM : 3,500`        
    1. `TPM : 90,000` 
1. Since documentations has 2 sections of same semantic commands , deprecated commands may be retrieved.
    1. Example : When you search for `How to login`, vector search might retrieve 
    `auth web login` section or  `sfdx force auth web login`.
    1. Similarly for deploy commands and other similar commands from `sf` and `sfdx` section.
1. `Requests Per Minute : 3,500`
    1. Current implementation does not involve agent-ish implementations , so RPM should be hard to hit given project scale.       
1. `Tokens Per Minute  : 90,000`
    1. Single requests cost around 1000-3000 tokens , So to exhaust daily limits
    more than 30 requests have to be made in a minute.


## References
1. [RAG](https://www.hopsworks.ai/dictionary/retrieval-augmented-generation-llm#:~:text=Retrieval%2Daugmented%20generation%20(RAG),%2C%20and%20recent%2Frelevant%20dataset.)
1. [Vector Database](https://www.pinecone.io/learn/vector-database/)
1. [Faiss](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/)
1. [Lang Chain Framework](https://js.langchain.com/docs/get_started)
1. [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. [Older RAG version used](https://app.relevanceai.com/form/d7b62b/ae1d1b0e-7ea9-4744-8af2-c2f45b2c417e)
1. [Create a simple one using RelevanceAI](https://app.relevanceai.com/)
1. [CLI Plugin](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm)