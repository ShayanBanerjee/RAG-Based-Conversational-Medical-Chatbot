# Creating directories
mkdir -p src
mkdir -p research

# creating files
touch src/__init__.py
touch src/helper.py
touch src/prompt.py
touch .env
touch setup.py
touch app.py
touch research/trials.ipynb
touch requirements.txt
# Confirmation message
echo "Directory asnd files created successfully!"

# Setting up virtual environment and installing dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Building and installing the package
pip install build
python -m build --wheel
pip install dist/RAG_Based_Conversational_Medical_Chatbot-0.1-py3-none-any.whl