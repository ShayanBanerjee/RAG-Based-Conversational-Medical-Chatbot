from setuptools import find_packages, setup

setup(
    name="RAG-Based-Conversational-Medical-Chatbot",
    version="0.1.0",
    author="Shayan Banerjee",
    author_email="shayanbanerjee96@gmail.com",
    packages=find_packages(),
    python_requires=">=3.10",
    install_requires=[
        "langchain<1.0",
        "jupyterlab==4.0.2",
        "flask==3.1.1",
        "python-dotenv==1.1.0",
        "sentence-transformers==4.1.0",
        "pypdf==5.6.1",
        "langchain-pinecone<1.0",
        "langchain-openai<1.0",
        "langchain-contextual<1.0",
    ],
)
