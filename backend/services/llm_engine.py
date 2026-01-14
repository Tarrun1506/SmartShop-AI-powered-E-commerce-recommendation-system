import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class LLMEngine:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.client = None
        if self.api_key:
            try:
                self.client = Groq(api_key=self.api_key)
            except Exception as e:
                print(f"Failed to init Groq client: {e}")
        else:
            print("Warning: GROQ_API_KEY not found. Running in Offline Mode.")

    def analyze_intent(self, query: str) -> dict:
        """
        Uses Llama 3 to convert a natural language query into a structured search intent.
        """
        if not self.client:
            return self._mock_intent(query)

        system_prompt = """
        You are an expert E-Commerce Intent Classifier.
        Your job is to extract search parameters from a user query.
        Return ONLY valid JSON. No preamble.
        
        Output Format:
        {
            "category": "string (e.g. laptop, shoes)",
            "budget_range": {"min": int, "max": int, "currency": "INR"},
            "key_features": ["list", "of", "strings"],
            "sort_preference": "price_low | price_high | rating | relevance"
        }
        
        Example: "Best gaming laptop under 80k"
        Output: {"category": "laptop", "budget_range": {"min": 0, "max": 80000, "currency": "INR"}, "key_features": ["gaming"], "sort_preference": "rating"}
        """

        try:
            completion = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                temperature=0.1,
                response_format={"type": "json_object"}
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            print(f"LLM Intent Error: {e}")
            return self._mock_intent(query)

    def generate_market_summary(self, query: str, products: list) -> str:
        """
        Generates an 'Executive Summary' comparing the top products.
        """
        if not self.client or not products:
            return "Market analysis unavailable in offline mode. Please define key features manually."

        # Simplify product data to save context window
        product_summaries = []
        for p in products[:3]: # Compare top 3
            product_summaries.append(f"- {p['title']} (Price: {p['price']}, Rating: {p['rating']})")
        
        data_context = "\n".join(product_summaries)

        system_prompt = """
        You are a Senior Market Analyst.
        Write a concise 2-sentence executive summary comparing these products for the user (who asked: "{query}").
        Focus on value, trade-offs, and the clear winner.
        Do not use markdown. Be professional and direct.
        """

        try:
            completion = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"User Query: {query}\n\nTop Candidates:\n{data_context}"}
                ],
                temperature=0.7,
                max_tokens=150
            )
            return completion.choices[0].message.content
        except Exception as e:
            print(f"LLM Summary Error: {e}")
            return "Real-time analysis interrupted. Top recommendations are based on price-to-performance ratio."

    def _mock_intent(self, query):
        """Fallback for offline mode"""
        return {
            "category": "unknown",
            "budget_range": {"min": 0, "max": 0, "currency": "INR"},
            "key_features": [word for word in query.split() if len(word) > 4],
            "sort_preference": "relevance"
        }
