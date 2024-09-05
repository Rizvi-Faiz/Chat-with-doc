import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import logging

# Set up logging and environment variables
logging.basicConfig(level=logging.INFO)
load_dotenv()
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("Google API key not found in environment.")

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("Google API Key not found in environment variables")

genai.configure(api_key=api_key)


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    if not chunks:
        raise ValueError("Text chunks are empty.")
    logging.info(f"Text chunks: {chunks}")
    return chunks


def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    if not embeddings:
        raise ValueError("Embeddings are not initialized correctly.")
    
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")
    logging.info("FAISS index created and saved.")


def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details. If the answer is not in
    the provided context, just say, 'answer is not available in the context'. Don't provide a wrong answer.\n\n
    Context:\n{context}?\n
    Question: \n{question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain


def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    response = chain(
        {"input_documents": docs, "question": user_question},
        return_only_outputs=True
    )

    st.write("### Reply:")
    st.write(response["output_text"])


def main():
    st.set_page_config(page_title="Chat with PDF", layout="wide")
    
    st.title("🗂️ Chat with PDF Using Gemini")
    
    st.markdown(
        """
        **Welcome to the PDF Chat Interface!**  
        Upload your PDF documents and interact with them using advanced AI capabilities.
        """
    )
    
    # Sidebar for file upload and processing
    with st.sidebar:
        st.header("📂 Upload PDFs")
        pdf_docs = st.file_uploader("Upload your PDF files here", accept_multiple_files=True)
        if st.button("Submit & Process"):
            if pdf_docs:
                with st.spinner("Processing your files..."):
                    raw_text = get_pdf_text(pdf_docs)
                    text_chunks = get_text_chunks(raw_text)
                    get_vector_store(text_chunks)
                    st.success("Files processed successfully! You can now ask questions.")
            else:
                st.error("Please upload PDF files before processing.")

    # Main content area
    st.subheader("Ask Questions")
    user_question = st.text_input("Enter your question about the PDF:")
    if user_question:
        with st.spinner("Getting response..."):
            user_input(user_question)


if __name__ == "__main__":
    main()
