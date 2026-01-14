import React, { useState } from 'react';
import axios from 'axios';
import CommandBar from './components/CommandBar';
import ProductTile from './components/ProductTile';
import InsightCard from './components/InsightCard';
import HeroSection from './components/HeroSection';
import { PriceRangeCard, SentimentCard } from './components/StatComponents';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    setIsSearching(true);
    setHasSearched(true);
    setLastQuery(query);
    setResults([]);

    try {
      const response = await axios.get(`http://localhost:8000/search?q=${encodeURIComponent(query)}`);
      // Simulate delay for "Analysis" feel
      setTimeout(() => {
        setResults(response.data.results);
        setIsSearching(false);
      }, 1500);
    } catch (error) {
      console.error("Search failed", error);
      setIsSearching(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050505] text-gray-100 font-inter selection:bg-white/20 relative flex flex-col">

      {/* Subtle Background Texture */}
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60"></div>
      <div className="ambient-light top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/20 animate-pulse"></div>
      <div className="ambient-light bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/20 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <main className="container mx-auto px-6 pt-6 flex-1 relative z-10 max-w-[1400px] flex flex-col">
        {/* Header */}
        <nav className="flex justify-between items-center mb-12 opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <span className="font-semibold tracking-tight">SmartShop Analyst</span>
          </div>

        </nav>

        {/* Hero Section (Disappears on Search) */}
        <AnimatePresence>
          {!hasSearched && (
            <HeroSection onSearch={handleSearch} />
          )}
        </AnimatePresence>

        {/* The Mosaic Dashboard */}
        {hasSearched && !isSearching && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple "Spring" ease
            className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-140px)] pb-20"
          >
            {/* 1. Header Analysis (Auto Height) */}
            <div className="md:col-span-12 h-fit">
              <InsightCard request={lastQuery} />
            </div>

            {/* 2. THE HERO: Fills remaining space */}
            <div className="md:col-span-8 md:row-span-2 relative h-full min-h-0">
              <ProductTile product={results[0]} isWinner={true} isHero={true} />
            </div>

            {/* 3. The Comparison */}
            {results[1] && (
              <div className="md:col-span-4 md:row-span-1 h-full min-h-0">
                <ProductTile product={results[1]} isWinner={false} />
              </div>
            )}

            {/* 4. Stats Stack */}
            <div className="md:col-span-4 md:row-span-1 grid grid-cols-2 gap-4 h-full min-h-0">
              <PriceRangeCard min="₹1.2k" max="₹1.8k" avg="₹1.5k" />
              <SentimentCard score={92} />
            </div>

          </motion.div>
        )}

        {/* Loading Skeleton */}
        {isSearching && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[500px]">
            <div className="md:col-span-12 h-32 bg-[#0A0A0A] border border-white/[0.05] rounded-3xl animate-pulse"></div>
            <div className="md:col-span-8 md:row-span-2 bg-[#0A0A0A] border border-white/[0.05] rounded-3xl animate-pulse delay-100"></div>
            <div className="md:col-span-4 h-60 bg-[#0A0A0A] border border-white/[0.05] rounded-3xl animate-pulse delay-200"></div>
            <div className="md:col-span-4 h-60 grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-3xl animate-pulse delay-300"></div>
              <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-3xl animate-pulse delay-300"></div>
            </div>
          </div>
        )}

      </main>

      {/* Floating Command Bar */}
      <CommandBar onSearch={handleSearch} isSearching={isSearching} hasSearched={hasSearched} />
    </div>
  );
}

export default App;
