import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Percent, Star, ArrowRight } from 'lucide-react';

const HeroSection = ({ onSearch }) => {
    const cards = [
        {
            title: "Market Shifters",
            subtitle: "High volatility items this week",
            query: "High volatility tech items",
            icon: <TrendingUp className="w-5 h-5" />
        },
        {
            title: "Deep Discounts",
            subtitle: "Price drops > 20% detected",
            query: "Best tech deals over 20% off",
            icon: <Percent className="w-5 h-5" />
        },
        {
            title: "Top Rated",
            subtitle: "Crowd favorites & essentials",
            query: "Top rated productivity gear",
            icon: <Star className="w-5 h-5" />
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            className="flex flex-col items-center justify-center h-full w-full px-4 relative flex-1 pb-32"
        >

            {/* --- CENTRAL HERO --- */}
            <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
                {/* Subtle Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 text-[10px] font-mono tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    SYSTEM ONLINE
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 text-glow leading-tight">
                    SmartShop <br />
                    <span className="text-gray-700">Analyst</span>
                </h1>

                <p className="text-gray-400 text-base md:text-lg font-light mb-8 max-w-xl mx-auto leading-relaxed">
                    Advanced market intelligence for the discerning buyer.
                </p>

                {/* --- INSIGHT CARDS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl mb-8">
                    {cards.map((card, i) => (
                        <button
                            key={i}
                            onClick={() => onSearch(card.query)}
                            className="group relative p-4 bg-[#0A0A0A] border border-white/[0.05] hover:border-white/[0.1] rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.02] hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="text-gray-300">{card.icon}</div>
                                <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-500" />
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-white mb-0.5 group-hover:text-blue-200 transition-colors">{card.title}</h3>
                                <p className="text-[10px] text-gray-500 font-mono line-clamp-1">{card.subtitle}</p>
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                        </button>
                    ))}
                </div>

                {/* --- DISCOVERY HINT --- */}
                <div className="flex flex-col items-center gap-2 opacity-40 animate-bounce">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Initialize Search</span>
                    <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
            </div>

        </motion.div>
    );
};

export default HeroSection;
