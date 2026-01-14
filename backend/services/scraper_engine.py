import asyncio
from scrapers.amazon import AmazonScraper
from scrapers.flipkart import FlipkartScraper

class ScraperEngine:
    def __init__(self):
        self.amazon = AmazonScraper()
        self.flipkart = FlipkartScraper()

    async def search(self, query: str):
        """
        Runs scrapers in parallel and merges results.
        """
        print(f"ScraperEngine: Starting parallel search for '{query}'...")
        
        # Run both scrapers concurrently
        results_amazon, results_flipkart = await asyncio.gather(
            self.amazon.search(query),
            self.flipkart.search(query),
            return_exceptions=True
        )

        # Merging logic
        final_results = []
        if isinstance(results_amazon, list): final_results.extend(results_amazon)
        if isinstance(results_flipkart, list): final_results.extend(results_flipkart)

        if not final_results:
            return []

        # 1. Cleaner Logic: Remove items with "Accessory" keywords if unnecessary
        # Simple heuristic: If looking for 'Monitor', exclude 'Stand', 'Cable'
        query_lower = query.lower()
        exclude_terms = ['cable', 'case', 'cover', 'strap', 'guard', 'protector']
        
        filtered_results = []
        for item in final_results:
            title_lower = item['title'].lower()
            # Must strictly contain at least one word from the query
            if any(w in title_lower for w in query_lower.split()):
                if not any(ex in title_lower for ex in exclude_terms):
                    filtered_results.append(item)
        
        if not filtered_results:
            filtered_results = final_results # Fallback if strict filter removes everything

        # 2. Convert Price to Int for Sorting
        for item in filtered_results:
            try:
                # Remove symbols, keep only digits
                raw_price = ''.join(filter(str.isdigit, item['price']))
                item['_price_int'] = int(raw_price) if raw_price else 999999
            except:
                item['_price_int'] = 999999

        # 3. Sort by Price (Lowest First -> "Best Deal")
        filtered_results.sort(key=lambda x: x['_price_int'])

        # 4. Source Diversity Logic (Winner + Runner Up from diff platform)
        final_picks = []
        if filtered_results:
            # Pick the absolute winner (Lowest Price)
            winner = filtered_results[0]
            final_picks.append(winner)
            
            # Identify the other source
            opp_source = "Flipkart" if winner['source'] == "Amazon" else "Amazon"
            
            # Find the best match from the opposite source
            runner_up = next((item for item in filtered_results if item['source'] == opp_source), None)
            
            if runner_up:
                final_picks.append(runner_up)
            else:
                # Fallback: If no cross-platform match, take the next best item
                if len(filtered_results) > 1:
                    final_picks.append(filtered_results[1])

        # 5. Assign IDs
        for i, res in enumerate(final_picks):
            res['id'] = i + 1
            
        return final_picks
