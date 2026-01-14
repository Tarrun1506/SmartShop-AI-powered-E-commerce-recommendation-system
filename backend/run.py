import uvicorn
import sys
import asyncio

if __name__ == "__main__":
    # FAILSAFE: Force the correct Event Loop Policy for Windows + Playwright
    if sys.platform.startswith("win"):
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    
    print("🚀 Starting SmartShop Backend with Proactor Loop (Windows Fix)...")
    # CRITICAL: reload=False is required on Windows. 
    # reload=True spawns a subprocess that resets the Event Loop Policy, breaking Playwright.
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
