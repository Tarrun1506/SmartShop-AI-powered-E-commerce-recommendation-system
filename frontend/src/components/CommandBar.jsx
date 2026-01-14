import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Command } from 'lucide-react';

const CommandBar = ({ onSearch, isSearching, hasSearched }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery(''); // Clear input after search
        }
    };


    return (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`relative group ${isSearching ? 'pointer-events-none opacity-80' : ''}`}
            >
                <div className={`glass-panel rounded-full p-2 flex items-center gap-3 transition-all duration-300 ${isFocused ? 'ring-1 ring-white/20 shadow-white/5' : 'animate-pulse-slow shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20'}`}>
                    <div className="pl-4 text-gray-500">
                        {isSearching ? (
                            <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Command className="w-5 h-5" />
                        )}
                    </div>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={hasSearched ? "Refine analysis... (e.g. 'Sort by lowest price' or 'Filter by Samsung')" : "Describe your requirements... (e.g. 'Best 4K Monitor for coding under 30k')"}
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm h-10 font-medium"
                        autoFocus
                    />

                    <div className="pr-1">
                        <button
                            type="submit"
                            disabled={!query.trim()}
                            className="bg-[#2C2D31] hover:bg-white text-white hover:text-black p-2 rounded-full transition-all disabled:opacity-0 disabled:scale-75"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.form>

            <div className="text-center mt-3">
                <p className="text-[10px] text-gray-600 font-medium tracking-wide uppercase relative inline-block">
                    Powered by SmartShop Intelligence {isSearching && '• Processing...'}
                    {!isSearching && !hasSearched && !isFocused && (
                        <span className="absolute left-full top-0 ml-3 text-blue-400 opacity-0 animate-fade-in delay-1000 fill-mode-forwards whitespace-nowrap">
                            Try "Best 4K Monitor"
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default CommandBar;
