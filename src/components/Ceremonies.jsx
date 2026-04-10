import React from 'react';
import { ElegantReveal } from './animations/Motion';

const Ceremonies = () => {
    return (
        <section id="ceremonies" className="min-h-[100dvh] w-full bg-hero-bg bg-cover bg-center text-white relative overflow-hidden snap-start shrink-0 flex flex-col justify-center">
            {/* --- Extended Content: Krabi & Bangkok Ceremonies --- */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-20 pb-20 md:pb-36 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 md:gap-16 relative z-10 my-auto">
                {/* Krabi Ceremony Block */}
                <ElegantReveal delay={0.1} className="w-full md:w-[45%] flex flex-col items-start md:items-end text-left md:text-right pl-0">
                    <h2 className="font-chloe text-[13vw] md:text-[72px] lg:text-[90px] leading-[0.85] uppercase flex flex-col">
                        <span>KRABI</span>
                        <span className="mt-1 md:mt-2">CEREMONY</span>
                        <span className="mt-3 md:mt-4 text-[12vw] md:text-[64px] lg:text-[80px]">04 . 12 . 26</span>
                    </h2>

                    <div className="mt-4 md:mt-10 flex flex-col items-start md:items-end gap-4 md:gap-10 w-full pl-0">
                        <div className="md:h-[80px] flex items-end md:justify-end">
                            <p className="font-source-serif font-[300] antialiased text-[3.6vw] md:text-[19.2px] lg:text-[22.4px] xl:text-[25.6px] uppercase tracking-widest leading-none text-left md:text-right whitespace-nowrap">
                                KINDLY RESPOND BY APRIL 30, 2026
                            </p>
                        </div>

                        <a href="#rsvp" className="inline-block px-11 md:px-14 py-0 border border-white/50 rounded-full hover:bg-white/10 transition-all">
                            <span className="font-chloe text-[9.7vw] md:text-[64px] lg:text-[80px] leading-[1] uppercase block py-[0.08em] text-white text-center tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
                                RSVP
                            </span>
                        </a>
                    </div>
                </ElegantReveal>

                {/* Divider Line & Ampersand (Mobile) */}
                <ElegantReveal delay={0.3} yOffset={20} className="md:hidden w-full relative py-2 flex items-center justify-between pointer-events-none pl-0 pr-[2%]">
                    <div className="w-[75%] h-[0.5px] bg-white/40"></div>
                    <div className="font-chloe text-[14vw] leading-none opacity-80 select-none mr-[5%] -translate-y-[10%]">
                        &
                    </div>
                </ElegantReveal>

                {/* Divider (Desktop) */}
                <ElegantReveal delay={0.3} yOffset={20} className="hidden md:flex flex-col items-center justify-center pointer-events-none w-[10%]">
                    <div className="w-px h-24 lg:h-32 bg-gradient-to-b from-transparent to-white/40"></div>
                    <div className="font-chloe md:text-[72px] lg:text-[90px] leading-none opacity-80 select-none my-8">
                        &
                    </div>
                    <div className="w-px h-24 lg:h-32 bg-gradient-to-t from-transparent to-white/40"></div>
                </ElegantReveal>

                {/* Bangkok Ceremony Block */}
                <ElegantReveal delay={0.5} className="w-full md:w-[45%] flex flex-col items-start text-left pl-0">
                    <h2 className="font-chloe text-[13vw] md:text-[72px] lg:text-[90px] leading-[0.85] uppercase flex flex-col">
                        <span>BANGKOK</span>
                        <span className="mt-1 md:mt-2">CEREMONY</span>
                        <span className="mt-3 md:mt-4 text-[12vw] md:text-[64px] lg:text-[80px]">20 . 11 . 26</span>
                    </h2>

                    <div className="mt-4 md:mt-10 flex flex-col items-start gap-4 md:gap-10 w-full pl-0">
                        <div className="md:h-[80px] flex items-end">
                            <p className="font-source-serif font-[300] antialiased text-[3.6vw] md:text-[19.2px] lg:text-[22.4px] xl:text-[25.6px] uppercase tracking-widest leading-none whitespace-nowrap">
                                (MORE DETAILS TO FOLLOW)
                            </p>
                        </div>

                        <div className="inline-block px-11 md:px-14 py-0 border border-white/30 rounded-full opacity-30 cursor-not-allowed pointer-events-none">
                            <span className="font-chloe text-[9.7vw] md:text-[64px] lg:text-[80px] leading-[1] uppercase block py-[0.08em] text-white text-center tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
                                RSVP
                            </span>
                        </div>
                    </div>
                </ElegantReveal>
            </div>
        </section>
    );
};

export default Ceremonies;
