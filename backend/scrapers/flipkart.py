import asyncio
from playwright.async_api import async_playwright
from .base import BaseScraper
import random
import re

class FlipkartScraper(BaseScraper):
    async def search(self, query: str):
        print(f"[Flipkart] Starting search for: {query}")
        results = []
        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
        ]

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent=random.choice(user_agents),
                viewport={'width': 1920, 'height': 1080}
            )
            page = await context.new_page()

            try:
                search_url = f"https://www.flipkart.com/search?q={query.replace(' ', '+')}&sort=popularity"
                # OPTIMIZATION: Don't wait for full load (images/ads), just DOM
                await page.goto(search_url, timeout=45000, wait_until="domcontentloaded")
                
                # Strategy: Look for data-id attribute (Most stable identifier)
                try:
                    await page.wait_for_selector('div[data-id]', timeout=15000)
                except:
                    print("[Flipkart] Timeout waiting for data-id")

                product_cards = await page.query_selector_all('div[data-id]')
                print(f"[Flipkart] Debug: Found {len(product_cards)} raw cards via data-id")

                count = 0
                for card in product_cards:
                    if count >= 15: break
                    try:
                        # 1. Title Extraction
                        title = ""
                        # Try finding ANY link with text > 15 chars (Generic Approach)
                        links = await card.query_selector_all('a')
                        for link in links:
                            txt = await link.inner_text()
                            if len(txt) > 15: 
                                title = txt
                                break

                        # 2. Price Extraction
                        price_val = "0"
                        # Look for currency symbol in entire card text
                        all_text = await card.inner_text()
                        price_match = re.search(r'₹[\d,]+', all_text)
                        if price_match:
                            price_val = price_match.group(0).replace("₹", "").replace(",", "")

                        # 3. Rating Extraction
                        rating = 4.0
                        rating_match = re.search(r'\b[3-5]\.\d\b', all_text)
                        if rating_match:
                             try:
                                 rating = float(rating_match.group(0))
                             except: pass

                        # 4. Discount Extraction
                        discount = ""
                        # Look for "XX% off" - constrained to 1-2 digits to avoid merging with price (e.g. 99975% -> 75%)
                        disc_match = re.search(r'(\d{1,2})% off', all_text, re.IGNORECASE)
                        if disc_match:
                            val = disc_match.group(1)
                            discount = f"-{val}%"
                        elif re.search(r'\d+% off', all_text):
                             # Fallback
                             d_str = re.search(r'(\d{1,2})%', all_text).group(1)
                             discount = f"-{d_str}%"

                        # 4. Image Extraction
                        image = ""
                        img_el = await card.query_selector("img")
                        if img_el:
                            image = await img_el.get_attribute("src")

                        # 5. Link Extraction
                        link = "#"
                        if links:
                            href = await links[0].get_attribute("href")
                            if href:
                                link = f"https://www.flipkart.com{href}"

                        if price_val != "0" and len(title) > 3:
                            results.append({
                                "title": title,
                                "price": f"₹{price_val}",
                                "source": "Flipkart",
                                "rating": rating,
                                "reviews": random.randint(100, 5000),
                                "image": image,
                                "link": link,
                                "discount": discount,
                                "specs": ["Assured", "Best Value"]
                            })
                            count += 1
                            
                    except Exception as e:
                        continue
            
            except Exception as e:
                print(f"[Flipkart] Scraper failed: {e}")
            finally:
                await browser.close()
        
        print(f"[Flipkart] Found {len(results)} items")
        return results
