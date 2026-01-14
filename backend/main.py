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

@app.get("/")
def read_root():
    return {"status": "SmartShop AI Backend Running (Re-Initialized)"}

@app.get("/search")
def search(q: str):
    """
    Mock endpoint for Stage 1.
    Simulates a search delay and returns fake product data.
    """
    time.sleep(2) # Simulate thinking time
    
    # Mock Response
    return {
        "query": q,
        "reasoning": [
            f"Analyzing user request: '{q}'...",
            "Identifying intent: Physical Product Search",
            "Detected constraints: Budget-friendly, High Ratings",
            "Searching Amazon...",
            "Searching Flipkart...",
            "Comparing prices and reviews...",
            "Conclusion: Found 2 best matches."
        ],
        "results": [
            {
                "id": 1,
                "title": "Mock Amazon Product - " + q,
                "price": "₹1,499",
                "source": "Amazon",
                "rating": 4.5,
                "image": "https://via.placeholder.com/150",
                "link": "#"
            },
            {
                "id": 2,
                "title": "Mock Flipkart Product - " + q,
                "price": "₹1,299",
                "source": "Flipkart",
                "rating": 4.2,
                "image": "https://via.placeholder.com/150",
                "link": "#"
            }
        ]
    }
