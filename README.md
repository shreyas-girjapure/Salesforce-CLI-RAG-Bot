# Salesforce CLI Search RAG Bot - Chat with your documents using AI

Live page 🚀 : https://shreyas-girjapure.github.io/Salesforce-CLI-RAG-Bot/

## Overview 
Document search implementations generally involve
1. Data Splitting ✂️
1. Embedding 🧵
1. Storing in Vector DB 💾
1. Retrieving with LLM's layer for summary.🕵️

There are some major inaccuracies in search results depending RAG strategy and dataset used. Below are some areas which contributes to inaccuracy.
1. Data splitting
    1. Chunked data may lose important context for the query. Retrieval of such data generates bad results in final outcome.
1. LLM's layer
    1. LLM some times add their own flavors `hallucinations` on vectored context provided.

So by avoiding standard `split and embed` approaches and fine controlling the dataset , Better results can be achieved.

This project is implementation of such finely controlled dataset's RAG strategy.

    Tip : You can easily create and host simple AI powered bots using low code tools like 
        1. RelevanceAI
        1. Flowise

## Problem Statement / Motivations
1. Overcome inaccuracy of simple RAG strategy and provide accurate results.  
1. Implement concepts like `RAG` , `Vector DB` , `LLM Monitoring` using lang-chain JS.
1. Always wanted a personal AI powered `RAG bot` 😁.

## Existing ways to do this [Find CLI commands you need]
1. Actually read through [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. Use `sfdx search` command for keyword searching commands.

## How to Use

1. Visit 🚀[ RAG Bot Page ](https://shreyas-girjapure.github.io/Salesforce-CLI-RAG-Bot/) for salesforce cli documentation searches.
1. Search for any thing related to salesforce CLI.

## Features
1. Semantic search over large document.
1. High accuracy and complete context in results.  
1. Answers* unrelated questions to the context used.
1. Has support to load local vector stores for faster retrieval.
1. `LLM Monitor` support for token and LLM analytics.
1. `0.5` seconds for Salesforce CLI Document related searches.
1. `5+` seconds for Non Salesforce CLI Document related searches.

## AI Awareness section
1. This is more of a hands on product and an implementations of some POCs.
1. AI is not magic , lot of guard rails and code alterations are needed to have a useful AI bot which doesn't hallucinates much.
1. Understanding your own dataset is really important before choosing approach for RAG bot. 
1. Adding chat bot layer over large documents will only improve current businesses and user experiences.

## Limitations
1. Free Server has cold start issues. May face delays in searches.
1. No Rate guards are placed in code , prone to credit loss or server crashes.
    1. `RPM : 3,500`        
    1. `TPM : 90,000` 
1. Since documentations has 2 sections of same semantic commands , deprecated commands may be retrieved.
    1. Example : When you search for `How to login`, vector search might retrieve 
    `auth web login` section or  `sfdx force auth web login`.
    1. Similarly for deploy commands and other similar commands from `sf` and `sfdx` section.
1. `Allowed Requests Per Minute : 3,500`
    1. Current implementation does not involve agent-ish implementations , so RPM limit should be very tough to reach for current project scale.       
1. `Allowed Tokens Per Minute  : 90,000`
    1. Single requests cost around 1000-3000 tokens , So to exhaust daily limits
    more than 30 requests have to be made in a minute.
1. UI Is very poorly designed 😑.


## References

### Project References
1. [Upcoming Features](documentation/Features.md)
1. [Backend Specifications](documentation/Backend.md)

### External References
1. [RAG](https://www.hopsworks.ai/dictionary/retrieval-augmented-generation-llm#:~:text=Retrieval%2Daugmented%20generation%20(RAG),%2C%20and%20recent%2Frelevant%20dataset.)
1. [Vector Database](https://www.pinecone.io/learn/vector-database/)
1. [Faiss](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/)
1. [Lang Chain Framework](https://js.langchain.com/docs/get_started)
1. [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. [Older RAG version used](https://app.relevanceai.com/form/d7b62b/ae1d1b0e-7ea9-4744-8af2-c2f45b2c417e)
1. [Create a simple one using RelevanceAI](https://app.relevanceai.com/)
1. [CLI Plugin](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm)
1. [LLM Monitor](https://app.llmonitor.com/)
