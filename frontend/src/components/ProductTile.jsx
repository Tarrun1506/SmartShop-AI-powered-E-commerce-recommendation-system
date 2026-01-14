import React from 'react';
import { ExternalLink, Star, Zap } from 'lucide-react';

const ProductTile = ({ product, isWinner, isHero = false }) => {
    const features = product.specs || ["Top Rated", "Best Seller", "Free Shipping", "Verified"];

    return (
        <div className={`bento-card h-full flex ${isHero ? 'flex-col md:flex-row' : 'flex-col'} group bg-[#0A0A0A]`}>

            {/* Background "Spotlight" for Winner */}
            {isWinner && (
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none"></div>
            )}

            {/* --- IMAGE SECTION --- */}
            <div className={`relative flex items-center justify-center ${isHero ? 'md:w-1/2 p-8 bg-white/[0.01]' : 'h-28 p-4 border-b border-white/[0.05]'}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={`object-contain transition-all duration-700 ease-out group-hover:scale-105 ${isHero ? 'w-full max-h-[300px]' : 'w-full h-full'}`}
                />

                {/* Winner Badge */}
                {isWinner && (
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <Zap className="w-3 h-3 fill-black" /> TOP PICK
                        </span>
                    </div>
                )}
            </div>

            {/* --- DETAILS SECTION --- */}
            {/* --- DETAILS SECTION --- */}
            <div className={`flex flex-col relative z-20 ${isHero ? 'md:w-1/2 p-8 h-full' : 'flex-1 p-4 overflow-hidden'}`}>

                {/* Content Wrapper (Takes available space, clamps if needed) */}
                <div className={`flex flex-col flex-1 min-h-0 ${isHero ? 'justify-start gap-4' : 'gap-1'}`}>
                    <div className="flex justify-between items-start mb-1 flex-shrink-0">
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded border ${product.source === 'Amazon'
                            ? 'text-orange-300 border-orange-500/20 bg-orange-500/10'
                            : 'text-blue-300 border-blue-500/20 bg-blue-500/10'
                            }`}>
                            {product.source}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                            <Star className="w-3 h-3 fill-current" /> {product.rating} <span className='text-gray-600 font-normal'>({product.reviews})</span>
                        </div>
                    </div>

                    <h3 className={`font-medium text-gray-100 leading-tight group-hover:text-white transition-colors ${isHero ? 'text-3xl line-clamp-4' : 'text-sm line-clamp-2 mb-2'}`}>
                        {product.title}
                    </h3>

                    {/* Feature Tags (Dynamic) */}
                    <div className={`flex flex-wrap gap-2 ${isHero ? 'mb-auto' : 'mb-0 overflow-hidden h-auto'}`}>
                        {features.slice(0, isHero ? 4 : 2).map((f, i) => (
                            <span key={i} className="text-[9px] font-mono text-gray-400 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.05] whitespace-nowrap">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer: Price & Action (Always Valid & Visible) */}
                <div className={`flex-shrink-0 flex items-end justify-between border-t border-white/[0.05] ${isHero ? 'pt-6' : 'pt-3 mt-2'}`}>
                    <div>
                        <span className="text-[10px] text-gray-500 block mb-0.5 font-mono">Current Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`font-bold tracking-tighter text-white ${isHero ? 'text-4xl' : 'text-lg'}`}>
                                {product.price}
                            </span>
                            {product.discount && (
                                <span className="text-[10px] text-green-400 font-mono bg-green-900/20 px-1 rounded">{product.discount}</span>
                            )}
                        </div>
                    </div>

                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 bg-white text-black font-medium transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 ${isHero ? 'px-6 py-3 rounded-xl text-sm' : 'px-3 py-1.5 rounded-lg text-[10px]'}`}
                    >
                        <span>View Deal</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ProductTile;
