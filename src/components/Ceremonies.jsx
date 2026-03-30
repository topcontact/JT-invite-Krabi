import React, { useState, useEffect, useRef } from 'react';
import { ElegantReveal, FadeInUpOnLoad } from './animations/Motion';
import { MapPin, Calendar, Bed, Send, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Ceremonies = () => {
    const { language, setLanguage } = useLanguage();
    const [navOpacity, setNavOpacity] = useState(1);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const top = sectionRef.current.getBoundingClientRect().top;
            
            // Calculate opacity based on how far we've scrolled past the top of the section
            if (top <= 0) {
                const scrolledPast = -top;
                const newOpacity = Math.max(0, 1 - scrolledPast / 250);
                setNavOpacity(newOpacity);
            } else {
                setNavOpacity(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'program', label: 'Program', icon: Calendar },
        { id: 'where-to-stay', label: 'Hotels', icon: Bed },
        { id: 'rsvp', label: 'RSVP', icon: Send },
    ];

    return (
        <section ref={sectionRef} id="ceremonies" className="min-h-screen w-full bg-hero-bg bg-cover bg-center text-white relative overflow-hidden snap-start shrink-0">
            {/* Background Image / Overlay (if needed to match Hero, otherwise transparent/ocean) */}
            
            {/* --- Extended Content: Krabi & Bangkok Ceremonies (Single Viewport) --- */}
            <div className="min-h-[100dvh] w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-[10vh] md:pb-[15vh] flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-0 relative z-10 overflow-hidden -translate-y-[2vh] md:-translate-y-[4vh]">
                {/* Krabi Ceremony Block */}
                <ElegantReveal delay={0.1} className="w-full md:w-[45%] flex flex-col items-start md:items-end text-left md:text-right pl-0">
                    <h2 className="font-chloe text-[13vw] md:text-[72px] lg:text-[90px] leading-[0.85] uppercase flex flex-col">
                        <span>KRABI</span>
                        <span className="mt-1 md:mt-2">CEREMONY</span>
                        <span className="mt-3 md:mt-4 text-[12vw] md:text-[64px] lg:text-[80px]">04 . 12 . 26</span>
                    </h2>

                    <div className="mt-6 md:mt-10 flex flex-col items-start md:items-end gap-6 md:gap-10 w-full pl-0">
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

                    <div className="mt-6 md:mt-10 flex flex-col items-start gap-6 md:gap-10 w-full pl-0">
                        <div className="md:h-[80px] flex items-end">
                            <p className="font-source-serif font-[300] antialiased text-[3.6vw] md:text-[19.2px] lg:text-[22.4px] xl:text-[25.6px] uppercase tracking-widest leading-none whitespace-nowrap">
                                (MORE DETAILS TO FOLLOW)
                            </p>
                        </div>

                        <a href="#rsvp" className="inline-block px-11 md:px-14 py-0 border border-white/50 rounded-full hover:bg-white/10 transition-all">
                            <span className="font-chloe text-[9.7vw] md:text-[64px] lg:text-[80px] leading-[1] uppercase block py-[0.08em] text-white text-center tracking-[0.12em]" style={{ fontFeatureSettings: '"salt", "swsh", "ss01", "liga"' }}>
                                RSVP
                            </span>
                        </a>
                    </div>
                </ElegantReveal>
            </div>

            {/* Navigation Pill - Sticky/Absolute at bottom, fades on scroll down */}
            <ElegantReveal delay={0.7} duration={1} yOffset={20} className="z-30 w-full flex justify-center pb-8 absolute bottom-0">
                <div
                    style={{ opacity: navOpacity, pointerEvents: navOpacity > 0.1 ? 'auto' : 'none', transition: 'opacity 0.1s ease-out' }}
                    className="flex items-center justify-around bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-full px-2 py-3 md:px-4 md:py-4 w-[95%] max-w-sm md:max-w-[480px]"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="flex flex-col items-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-white/90 hover:text-white hover:bg-white/30 hover:scale-105"
                            >
                                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">{item.label}</span>
                            </a>
                        );
                    })}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                        className="flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-white/90 hover:text-white hover:bg-white/30 hover:scale-105 cursor-pointer border-none bg-transparent"
                        aria-label="Toggle Language"
                    >
                        <Globe className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">
                            {language === 'en' ? 'TH' : 'EN'}
                        </span>
                    </button>
                </div>
            </ElegantReveal>
        </section>
    );
};

export default Ceremonies;
