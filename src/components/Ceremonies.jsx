import React from 'react';
import { ElegantReveal } from './animations/Motion';

const Ceremonies = () => {
    return (
        <section className="min-h-screen w-full bg-hero-bg bg-cover bg-center text-white relative overflow-hidden snap-start shrink-0">
            {/* Background Image / Overlay (if needed to match Hero, otherwise transparent/ocean) */}
            
            {/* --- Extended Content: Krabi & Bangkok Ceremonies (Single Viewport) --- */}
            <div className="min-h-[100dvh] w-full max-w-6xl mx-auto px-6 md:px-20 pt-8 pb-[10vh] md:pb-[15vh] flex flex-col justify-center gap-6 md:gap-8 relative z-10 overflow-hidden -translate-y-[2vh] md:-translate-y-[4vh]">
                {/* Krabi Ceremony Block */}
                <ElegantReveal delay={0.1} className="w-full flex flex-col items-start text-left pl-[8%] md:pl-[12%]">
                    <h2 className="font-chloe text-[13vw] md:text-[95pt] lg:text-[120pt] leading-[0.85] uppercase flex flex-col">
                        <span>KRABI</span>
                        <span className="mt-1">CEREMONY</span>
                        <span className="mt-3 text-[12vw] md:text-[85pt] lg:text-[110pt]">04 . 12 . 26</span>
                    </h2>

                    <div className="mt-6 md:mt-10 flex flex-col items-start gap-6 md:gap-10 w-full pl-0">
                        <p className="font-source-serif font-[300] antialiased text-[4.5vw] md:text-[34pt] lg:text-[42pt] uppercase tracking-widest leading-none">
                            KINDLY RESPOND BY APRIL 30, 2026
                        </p>

                        <a href="#rsvp" className="inline-block px-11 md:px-14 py-0 border border-white/50 rounded-full hover:bg-white/10 transition-all">
                            <span className="font-chloe text-[9.7vw] md:text-[85pt] lg:text-[110pt] leading-[1] uppercase block py-[0.08em] text-white text-center tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
                                RSVP
                            </span>
                        </a>
                    </div>
                </ElegantReveal>

                {/* Divider Line & Ampersand */}
                <ElegantReveal delay={0.3} yOffset={20} className="w-full relative py-2 md:py-6 flex items-center justify-between pointer-events-none pl-[8%] md:pl-[12%] pr-[2%] md:pr-4">
                    <div className="w-[75%] h-[0.5px] bg-white/40"></div>
                    <div className="font-chloe text-[14vw] md:text-[110pt] lg:text-[140pt] leading-none opacity-80 select-none mr-[5%] md:mr-10 -translate-y-[10%]">
                        &
                    </div>
                </ElegantReveal>

                {/* Bangkok Ceremony Block */}
                <ElegantReveal delay={0.5} className="w-full flex flex-col items-start text-left pl-[8%] md:pl-[12%]">
                    <h2 className="font-chloe text-[13vw] md:text-[95pt] lg:text-[120pt] leading-[0.85] uppercase flex flex-col">
                        <span>BANGKOK</span>
                        <span className="mt-1">CEREMONY</span>
                        <span className="mt-3 text-[12vw] md:text-[85pt] lg:text-[110pt]">20 . 11 . 26</span>
                    </h2>

                    <div className="mt-6 md:mt-10 flex flex-col items-start gap-6 md:gap-10 w-full pl-0">
                        <p className="font-source-serif font-[300] antialiased text-[4.5vw] md:text-[34pt] lg:text-[42pt] uppercase tracking-widest leading-none">
                            (MORE DETAILS TO FOLLOW)
                        </p>

                        <a href="#rsvp" className="inline-block px-11 md:px-14 py-0 border border-white/50 rounded-full hover:bg-white/10 transition-all">
                            <span className="font-chloe text-[9.7vw] md:text-[85pt] lg:text-[110pt] leading-[1] uppercase block py-[0.08em] text-white text-center tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
                                RSVP
                            </span>
                        </a>
                    </div>
                </ElegantReveal>
            </div>
        </section>
    );
};

export default Ceremonies;
