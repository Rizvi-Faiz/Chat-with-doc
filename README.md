# ChatJot

This project is a web application built with Streamlit that allows users to interact with PDF documents using advanced AI capabilities provided by Google's Gemini model. The application enables users to upload PDF files, process them, and ask questions about the content of the PDFs.

## Features

- PDF Upload: Upload multiple PDF documents.
- Text Extraction: Extracts text from the uploaded PDFs.
- Text Chunking: Splits the extracted text into manageable chunks.
- AI Integration: Uses Google's Gemini model to answer questions about the PDF content.
- Conversational Interface: Interact with the PDF content in a chat-like interface.

## Requirements

- Python 3.8+
- Streamlit
- PyPDF2
- LangChain
- Google Generative AI
- FAISS
- Dotenv

## Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/Rizvi-Faiz/Chat-with-doc.git
   ```
   cd your-repository

2. **Create a Virtual Environment**:

   ```sh
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:

   - On Windows:

     ```sh
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```sh
     source venv/bin/activate
     ```

4. **Install Required Packages**:

   ```sh
   pip install -r requirements.txt
   ```

5. **Set Up Environment Variables**:

   Create a `.env` file in the root directory of the project and add your Google API key:

   ```plaintext
   GOOGLE_API_KEY=your_google_api_key
   ```

## Usage

1. **Run the Streamlit App**:

   ```sh
   streamlit run app.py
   ```

2. **Access the Application**:

   Open your web browser and go to `http://localhost:8501` to interact with the application.

## How It Works

1. **Upload PDFs**: Use the sidebar to upload one or more PDF files.
2. **Process Files**: Click "Submit & Process" to extract and process the text from the PDFs.
3. **Ask Questions**: Enter a question in the main content area to get answers based on the PDF content.

## Troubleshooting

- **API Key Error**: Ensure your `.env` file contains a valid Google API key.
- **Missing Dependencies**: Make sure all required packages are installed. Check `requirements.txt` for the list of dependencies.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

**Note:** Make sure to replace placeholders like `your-username`, `your-repository`, and `your_google_api_key` with your actual GitHub username, repository name, and Google API key, respectively.
