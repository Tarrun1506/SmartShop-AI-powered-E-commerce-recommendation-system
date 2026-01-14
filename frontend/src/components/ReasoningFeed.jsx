import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ChevronRight } from 'lucide-react';

const ReasoningFeed = ({ logs }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (logs.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full max-w-3xl mx-auto my-8 relative z-30"
        >
            <div className="glass-holo rounded-xl p-[1px] overflow-hidden">
                <div className="bg-black/60 rounded-xl p-6 h-56 overflow-y-auto font-mono text-sm relative border border-white/5 backdrop-blur-xl" ref={scrollRef}>

                    <div className="space-y-4 pt-2">
                        <h4 className="text-cyan-500/80 text-xs uppercase tracking-[0.2em] font-bold mb-6 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                            <BrainCircuit className="w-4 h-4 animate-pulse" />
                            Neural Reasoning Stream_V.01
                        </h4>

                        <AnimatePresence>
                            {logs.map((log, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                        {index === logs.length - 1 ? (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                            </span>
                                        ) : (
                                            <ChevronRight className="w-3 h-3 text-cyan-700" />
                                        )}
                                    </div>
                                    <span className={`${index === logs.length - 1 ? 'text-cyan-100 text-glow-cyan' : 'text-cyan-400/60'} font-space leading-relaxed`}>
                                        {log}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="h-4"></div>
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReasoningFeed;
