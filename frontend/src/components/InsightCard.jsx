import React from 'react';
import { Sparkles } from 'lucide-react';

const InsightCard = ({ request, summary }) => {
    return (
        <div className="bento-card col-span-1 md:col-span-12 p-5 flex flex-col justify-between h-full relative overflow-hidden group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="bg-blue-500/10 text-blue-300 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                        Executive Summary
                    </span>
                    <span className="text-gray-600 text-[10px] font-mono">ID: {Math.floor(Math.random() * 9999)}</span>
                </div>

                <div className='flex items-start justify-between'>
                    <h3 className="text-lg font-medium text-white tracking-tight">Market Analysis: <span className="text-gray-400">"{request}"</span></h3>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed font-light">
                    {summary || "Based on strict parameter analysis, we identified clear market leaders. The primary tradeoff in this category is between build quality and pure price-to-performance ratio. Our algorithm recommends the Amazon listing for speed and the Flipkart listing for maximum value."}
                </p>
            </div>
        </div>
    );
};

export default InsightCard;
