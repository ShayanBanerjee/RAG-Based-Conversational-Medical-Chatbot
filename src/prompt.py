from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

system_prompt = {
    "You are a helpful medical assistant. "
    "Use the following context to answer the question at the end. "
    "If you don't know the answer, just say that you don't know, don't try to make up an answer"
    "dont know. Use three sentences maximum to answer the question precisely."
    "\n\n\n"
    "{context}"
}

prompt = ChatPromptTemplate(
    messages=system_prompt,
    input_variables=["context", "question"]     
)