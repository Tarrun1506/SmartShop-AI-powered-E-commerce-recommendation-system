# SmartShop Analyst 🧠

**SmartShop Analyst** is an intelligent e-commerce recommendation engine designed to bridge the gap between simple product search and expert buying advice.

Unlike traditional search engines that return a list of links, SmartShop acts as a **Market Analyst**. It understands user intent, aggregates multi-source data from Amazon and Flipkart in real-time, and provides synthesized insights to help users make the "winning" purchase decision.

## 💡 Core Architecture

The project is built around a three-stage intelligence pipeline:

### 1. Intent Understanding (Llama 3.3)
The system doesn't just match keywords; it parses the *context* of the user's request.
*   *Input*: "Best 4K Monitor for coding under 30k"
*   *Extracted Constraints*: Resolution (4K), Use Case (Text Clarity/Coding), Budget (₹30,000).

### 2. Multi-Source Execution Layer
It uses **Playwright** to perform real-time, parallel web scraping of major e-commerce platforms.
*   **Live Data**: Fetches real pricing, ratings, and stock status.
*   **Safety**: Uses rotating user-agents and robust selectors to handle dynamic site structures.
*   **Orchestration**: Runs Amazon and Flipkart scrapers concurrently for sub-second performance.

### 3. Smart Inference Engine
*   **Comparative Analysis**: SmartShop identifies the "Winner" (Lowest Price) and the "Runner Up" (Startling Alternative).
*   **AI Spec Extraction**: Uses Llama 3 to analyze messy product titles and extract key technical specs (e.g., "8GB RAM", "OLED").
*   **Executive Summary**: A "Senior Strategic Buyer" AI persona generates a professional justification for *why* one product beats the other, calculating precise savings.

## 🚀 Key Capabilities

*   **Real-Time Market Pulse**: No stale databases. Data is freshly scraped on every search.
*   **Cross-Platform Comparison**: Instantly compare Amazon vs. Flipkart prices.
*   **Natural Language Processing**: "Best gaming mouse" -> { "category": "mouse", "features": ["high DPI", "gaming"] }.
*   **Deal Validation**: Distinguishes between fake discounts and true price drops.

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

# Install Dependencies
pip install -r requirements.txt
playwright install  # Install browser binaries

# Run Server (Windows Optimized)
python run.py
```

**2. Start the Interface (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

---

*SmartShop Analyst: Making data-driven buying decisions accessible to everyone.*
