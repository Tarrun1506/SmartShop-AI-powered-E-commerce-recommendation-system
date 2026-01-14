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
            <div className={`relative p-8 flex items-center justify-center ${isHero ? 'md:w-1/2 bg-white/[0.01]' : 'h-48 border-b border-white/[0.05]'}`}>
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
            <div className={`p-8 flex flex-col justify-between ${isHero ? 'md:w-1/2' : 'flex-1'}`}>
                <div>
                    <div className="flex justify-between items-start mb-4">
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

                    <h3 className={`font-medium text-gray-100 mb-4 leading-relaxed group-hover:text-white transition-colors ${isHero ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                        {product.title}
                    </h3>

                    {/* Feature Tags (Dynamic) */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {features.slice(0, isHero ? 4 : 2).map((f, i) => (
                            <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.05]">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer: Price & Action */}
                <div className="flex items-end justify-between border-t border-white/[0.05] pt-6">
                    <div>
                        <span className="text-xs text-gray-500 block mb-1 font-mono">Current Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`font-bold tracking-tighter text-white ${isHero ? 'text-4xl' : 'text-2xl'}`}>
                                {product.price}
                            </span>
                            <span className="text-sm text-green-400 font-mono">-12%</span>
                        </div>
                    </div>

                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 bg-white text-black font-medium transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 ${isHero ? 'px-6 py-3 rounded-xl text-sm' : 'p-3 rounded-xl'}`}
                    >
                        {isHero && <span>View Deal</span>}
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ProductTile;
