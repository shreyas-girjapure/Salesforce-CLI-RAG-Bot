# Salesforce CLI RAG Bot - Chat with your long text data using AI

## Project Overview

### Problem Statement 
1. Just Cant remember `DX commands` and their examples.
1. Super lazy to remember indexes of documentation page.
1. Always wanted a personal RAG bot.
1. Simple chunking content and putting in vector db gives hallucinated results. Wanted to improve data set and use efficient retrieval.

### Existing ways to do this [Find CLI commands you need]
1. Actually read through [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. User `sfdx search` command for keyword matching search.

### Overview 
This is a simple [Lang-Chain JS](https://js.langchain.com/docs/get_started) based RAG implementation. Using locally stored `FaissStore` as vector database for semantic retrieval.

Knowledge base chosen for implementation is [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf).

**Too Nerdy;Did not Read: Chat with your long text data using AI**
 

## Features
1. Understands semantics of both question and files used aka `Vector Search`.
1. Super processed data set for HIGHLY accurate search results.
1. Answers* unrelated questions to the context used.
1. Has support to load local vector stores for faster retrieval.

## Future Scope Features

### Priority 1
1. Add env variables for models
1. Remove unnecessary lines of code.
1. Add UI support.

### Priority 2
1. Add documentation for `How knowledge was embedded?`
1. Ability to Update knowledge base
1. Automate knowledge update.
1. Maybe create a cli `sfdx plugin` for semantic search

### AI Awareness sections
1. AI is not magic , there has to be lot of guard rails to have a useful AI bot which doesn't hallucinates much.
1. Understanding your own dataset is really important before choosing approach for RAG bot. 
1. Adding chat bot layer over large documents will only improve current systems and businesses.

## References
1. [RAG](https://www.hopsworks.ai/dictionary/retrieval-augmented-generation-llm#:~:text=Retrieval%2Daugmented%20generation%20(RAG),%2C%20and%20recent%2Frelevant%20knowledge.)
1. [Vector Database](https://www.pinecone.io/learn/vector-database/)
1. [Faiss](https://engineering.fb.com/2017/03/29/data-infrastructure/faiss-a-library-for-efficient-similarity-search/)
1. [Lang Chain Framework](https://js.langchain.com/docs/get_started)
1. [Salesforce CLI Reference Documentation](https://resources.docs.salesforce.com/246/latest/en-us/sfdc/pdf/sfdx_CLI_reference.pdf)
1. [Older RAG version used](https://app.relevanceai.com/form/d7b62b/ae1d1b0e-7ea9-4744-8af2-c2f45b2c417e)
1. [Create a simple one using RelevanceAI](https://app.relevanceai.com/)
1. [CLI Plugin](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm)