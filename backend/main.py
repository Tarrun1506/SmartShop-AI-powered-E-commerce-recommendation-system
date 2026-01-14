from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from services.llm_engine import LLMEngine

llm_engine = LLMEngine()

@app.get("/search")
def search(q: str):
    """
    Stage 2 Endpoint: AI-Powered Analysis.
    """
    print(f"Processing query: {q}")
    
    # 1. Analyze Intent (Llama 3)
    intent = llm_engine.analyze_intent(q)
    print(f"Intent detected: {intent}")

    # 2. Fetch Data (Mock for now, but using intent context)
    # In Stage 3, this will call the Scraper logic
    fake_price = intent.get('budget_range', {}).get('max', 5000) or 5000
    category = intent.get('category', 'Generic Item')
    
    # Safe feature extraction
    features = intent.get('key_features', [])
    top_feature = features[0] if features else "Best Selling"
    
    # Text Cleanup: Don't repeat "Bluetooth" if it's already in "Bluetooth Speaker"
    if top_feature.lower() in category.lower():
        display_feature = "Pro"
    else:
        display_feature = top_feature.title()

    results = [
        {
            "id": 1,
            "title": f"Premium {category} ({display_feature} Edition)",
            "price": f"₹{int(fake_price * 0.9)}",
            "source": "Amazon",
            "rating": 4.8,
            "reviews": 1240,
            "image": "https://source.unsplash.com/random/400x400/?" + category.replace(" ", ","),
            "link": "#",
            "specs": ["Top Rated", "Free Shipping", "Best Seller"]
        },
        {
            "id": 2,
            "title": f"Value {category} (Budget Pick)",
            "price": f"₹{int(fake_price * 0.7)}",
            "source": "Flipkart",
            "rating": 4.3,
            "reviews": 850,
            "image": "https://source.unsplash.com/random/400x400/?" + category.replace(" ", ",") + ",tech",
            "link": "#",
            "specs": ["Value Choice", "Fast Tech", "Discounted"]
        }
    ]

    # 3. Generate Insight (Llama 3)
    summary = llm_engine.generate_market_summary(q, results)

    # 4. Return Response
    return {
        "query": q,
        "intent": intent, 
        "reasoning": [
            f"Intent classified: {intent.get('category')}",
            f"Budget constraints identified: Max ₹{fake_price}",
            "Aggregating live market data...",
            "Computing sentiment scores...",
            "Synthesizing executive summary..."
        ],
        "insight_summary": summary, # New field for UI
        "results": results
    }
