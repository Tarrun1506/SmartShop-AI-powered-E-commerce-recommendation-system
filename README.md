# SmartShop Analyst 🧠

**SmartShop Analyst** is an intelligent e-commerce recommendation engine designed to bridge the gap between simple product search and expert buying advice.

Unlike traditional search engines that return a list of links, SmartShop acts as a **Market Analyst**. It understands user intent, aggregates multi-source data, and provides synthesized insights to help users make the "winning" purchase decision.

## 💡 Core Architecture

The project is built around a three-stage intelligence pipeline:

### 1. Intent Understanding
The system doesn't just match keywords; it parses the *context* of the user's request.
*   *Input*: "Best 4K Monitor for coding under 30k"
*   *Extracted Constraints*: Resolution (4K), Use Case (Text Clarity/Coding), Budget (₹30,000).

### 2. Multi-Source Aggregation
It fetches potential candidates from a dataset of products, simulating a crawl of major e-commerce platforms (Amazon, Flipkart, etc.).

### 3. Smart Ranking & Inference
This is the heart of the project.
*   **Comparative Analysis**: Products are not just listed but *competed* against each other.
*   **Sentiment Engine**: Analyzes massive amounts of review data to generate a single "Sentiment Score" (0-100).
*   **Volatility Index**: Tracks price history to determine if a deal is actually good or just a markup-markdown trick.
*   **LLM Synthesis**: Uses Large Language Model logic to generate an "Executive Summary" explaining *why* a specific product won the category.
*   **LLM Synthesis**: Uses **Llama 3.3 (via Groq)** for ultra-fast, sub-second inference to generate an "Executive Summary" explaining *why* a specific product won the category.

## 🚀 Key Capabilities

*   **Category Winner Identification**: Automatically highlights the single best product that balances specs, price, and sentiment.
*   **Natural Language Processing**: Supports conversational queries rather than rigid filters.
*   **Deal Validation**: Distinguishes between fake discounts and true price drops.
*   **Crowd Wisdom**: Aggregates thousands of user reviews into digestible insights.

## 🛠️ System Setup

### Prerequisites
*   Node.js (v18+)
*   Python (3.9+)
*   **Groq API Key** (Free beta access available at console.groq.com)

### Installation

**1. Start the Intelligence Engine (Backend)**
```bash
cd backend

# Setup Environment
cp .env.example .env
# Edit .env and paste your GROQ_API_KEY

# Install & Run
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**2. Start the Interface (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

---

*SmartShop Analyst: Making data-driven buying decisions accessible to everyone.*
