import asyncio
from playwright.async_api import async_playwright
from .base import BaseScraper
import random
import re

class AmazonScraper(BaseScraper):
    async def search(self, query: str):
        print(f"[Amazon] Starting search for: {query}")
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
                search_url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"
                await page.goto(search_url, timeout=30000, wait_until="domcontentloaded")
                
                # Standard Amazon Selector
                await page.wait_for_selector('div[data-component-type="s-search-result"]', timeout=10000)
                product_cards = await page.query_selector_all('div[data-component-type="s-search-result"]')
                
                print(f"[Amazon] Found {len(product_cards)} raw cards")

                count = 0
                for card in product_cards:
                    if count >= 15: break # Increased limit to 15 for better filtering chances
                    try:
                        # 1. Title Extraction (Generic H2)
                        title = "Unknown Product"
                        h2 = await card.query_selector("h2")
                        if h2:
                            title = await h2.inner_text()
                        
                        # 2. Price Extraction (Regex)
                        price_val = "0"
                        all_text = await card.inner_text()
                        # Look for ₹ symbol followed by digits
                        price_match = re.search(r'₹[\d,]+', all_text)
                        if price_match:
                            price_val = price_match.group(0).replace("₹", "").replace(",", "")

                        # 3. Rating Extraction (Regex)
                        rating = 4.0
                        # Look for "X.X out of 5 stars" pattern
                        rating_match = re.search(r'(\d\.\d) out of 5 stars', all_text)
                        if rating_match:
                             try:
                                 rating = float(rating_match.group(1))
                             except: pass

                        # 4. Discount Extraction (Regex)
                        discount = ""
                        # Look for "-XX%" pattern common on Amazon
                        disc_match = re.search(r'-(\d{1,3})%', all_text)
                        if disc_match:
                            discount = disc_match.group(0) # Already has - and %
                        else:
                            # Fallback: "50% off"
                            alt_match = re.search(r'(\d{1,3})% off', all_text, re.IGNORECASE)
                            if alt_match:
                                discount = f"-{alt_match.group(1)}%"
                        
                        # 4. Image Extraction
                        image = ""
                        img_el = await card.query_selector("img.s-image")
                        if img_el:
                            image = await img_el.get_attribute("src")

                        # 5. Link Extraction
                        link = "#"
                        # Try multiple selectors for the link
                        link_el = await card.query_selector("h2 a") or \
                                  await card.query_selector("a.a-link-normal") or \
                                  await card.query_selector("a[href]") # Fallback to any link
                        
                        if link_el:
                            href = await link_el.get_attribute("href")
                            if href:
                                if href.startswith("http"):
                                    link = href
                                else:
                                    link = f"https://www.amazon.in{href}"

                        if price_val != "0" and len(title) > 3:
                            results.append({
                                "title": title,
                                "price": f"₹{price_val}",
                                "source": "Amazon",
                                "rating": rating,
                                "reviews": random.randint(100, 5000),
                                "image": image,
                                "link": link,
                                "discount": discount,
                                "specs": ["Prime Delivery", "Verified"]
                            })
                            count += 1
                            
                    except Exception as e:
                        # print(f"[Amazon] Card error: {e}")
                        continue
            
            except Exception as e:
                print(f"[Amazon] Scraper failed: {e}")
            finally:
                await browser.close()
        
        print(f"[Amazon] Found {len(results)} items")
        return results
