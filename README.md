# Salesforce CLI RAG Bot - Chat with your documents using AI

## Project Overview

### Problem Statement 
1. Simple chunking content and putting in vector db gives hallucinated results. Wanted to improve searches on dataset and use efficient retrieval.
1. Just Cant remember `DX commands` and their examples.
1. Always wanted a personal AI powered `RAG bot`.
1. Wanted to implement lang-chain concepts. Understand AI hype better.

### Existing ways to do this [Find CLI commands you need]
1. Actually read through [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. Use `sfdx search` command for keyword searching commands.

### Overview 
This is a simple [Lang-Chain JS](https://js.langchain.com/docs/get_started) based RAG implementation. Using locally stored `FaissStore` as vector database for semantic retrieval.

dataset / document chosen for implementation is [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf).

#### Implementation overview
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
    1. Relatively Slow and has token limits.
1. `search` 
    1. Direct search on vector store.
    1. No LLM layer
    1. Faster response time.
    1. Only has query embedding cost.

## How to Use
For now there is no UI available for access. Feel free to contribute a UI layer for this.

### Base API endpoint URL : `https://basicauth-znr4.onrender.com/`

### `super-search` : LLM powered vector search
1. URL : `https://basicauth-znr4.onrender.com/super-search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/super-search?query=How to logout of org`
    1. `https://basicauth-znr4.onrender.com/super-search?query=How to deploy metadata`

### `search` : simple semantic vector search
1. URL : `https://basicauth-znr4.onrender.com/search`
1. parameters
    1. `query`
1. Examples 
    1. `https://basicauth-znr4.onrender.com/search?query=How to logout of org`
    1. `https://basicauth-znr4.onrender.com/search?query=How to deploy metadata`

## Features
1. Understands semantics of both question and files used aka `Vector Search`.
1. Super processed data set for HIGHLY accurate search results.
1. Answers* unrelated questions to the context used.
1. Has support to load local vector stores for faster retrieval.

## Next in line features  
### Priority 1
1. Add UI support.
1. Add env variables for models
1. Remove unnecessary lines of code.
1. Add referenced from links of web documentation pages.

### Priority 2
1. Add documentation for `How dataset was embedded ?`
1. Add documentation for `What strategies were used ?`
1. Ability to Update dataset base
1. Automate update dataset.
1. Maybe create a cli `sfdx plugin` for semantic search
1. Use local LLM for low cost implementation

### AI Awareness section
1. This is more of a hands on product and an implementations of some POCs.
1. AI is not magic , lot of guard rails and code alterations are needed to have a useful AI bot which doesn't hallucinates much.
1. Understanding your own dataset is really important before choosing approach for RAG bot. 
1. Adding chat bot layer over large documents will only improve current businesses and user experiences.

## References
1. [RAG](https://www.hopsworks.ai/dictionary/retrieval-augmented-generation-llm#:~:text=Retrieval%2Daugmented%20generation%20(RAG),%2C%20and%20recent%2Frelevant%20dataset.)
1. [Vector Database](https://www.pinecone.io/learn/vector-database/)
1. [Faiss](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/)
1. [Lang Chain Framework](https://js.langchain.com/docs/get_started)
1. [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. [Older RAG version used](https://app.relevanceai.com/form/d7b62b/ae1d1b0e-7ea9-4744-8af2-c2f45b2c417e)
1. [Create a simple one using RelevanceAI](https://app.relevanceai.com/)
1. [CLI Plugin](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm)