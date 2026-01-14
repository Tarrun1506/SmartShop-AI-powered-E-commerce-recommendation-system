import React from 'react';
import { TrendingUp, Users, Activity } from 'lucide-react';

export const PriceRangeCard = ({ min, max, avg }) => {
    return (
        <div className="bento-card p-6 flex flex-col justify-between h-full bg-[#0A0A0A]/40">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">Price Analysis</h4>
                    <span className="text-lg font-bold text-white tracking-tight">Variance</span>
                </div>
                <Activity className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-mono">
                    <span>{min}</span>
                    <span className="text-white font-bold">{avg}</span>
                    <span>{max}</span>
                </div>
                {/* Visual Range Bar */}
                <div className="h-1.5 bg-white/10 rounded-full relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 bottom-0 left-[20%] right-[30%] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                    <div className="absolute top-0 bottom-0 left-[45%] w-0.5 h-full bg-white blur-[0.5px]"></div> {/* Avg Marker */}
                </div>
            </div>
        </div>
    );
};

export const SentimentCard = ({ score }) => {
    return (
        <div className="bento-card p-6 flex flex-col justify-between h-full bg-[#0A0A0A]/40">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">Consensus</h4>
                    <span className="text-lg font-bold text-white tracking-tight">Positive</span>
                </div>
                <Users className="w-4 h-4 text-blue-400" />
            </div>

            <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold text-white tracking-tighter text-glow-blue">{score}%</span>
                <span className="text-xs text-emerald-400 mb-1.5 font-medium flex items-center gap-0.5 bg-emerald-900/20 px-1 rounded border border-emerald-500/20">
                    <TrendingUp className="w-3 h-3" /> +4%
                </span>
            </div>

            <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
};
