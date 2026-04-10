import React, { useState, useEffect } from 'react';
import { FadeIn, FadeInUpOnLoad } from './animations/Motion';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Calendar, Bed, Send, Globe, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    const { language, setLanguage } = useLanguage();
    const [navOpacity, setNavOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(0, 1 - scrollY / 250);
            setNavOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'program', label: 'Program', icon: Calendar },
        { id: 'where-to-stay', label: 'Hotels', icon: Bed },
        { id: 'rsvp', label: 'RSVP', icon: Send },
    ];

    const t = {
        location: language === 'th' ? "โรงแรม รายาวดี, หาดไร่เลย์, กระบี่" : "Rayavadee, Railay Beach, Krabi",
        rsvpBy: language === 'th' ? "กรุณาตอบกลับภายในวันที่ 30 เมษายน 2569" : "Kindly RSVP by April 30, 2026.",
        menuLocation: language === 'th' ? "สถานที่" : "Location",
        menuProgram: language === 'th' ? "กำหนดการ" : "Program",
        menuStay: language === 'th' ? "ที่พักแนะนำ" : "Where to Stay"
    };

    return (
        <section className="min-h-[100dvh] w-full flex flex-col items-center bg-hero-bg text-white relative overflow-hidden snap-start shrink-0">
            {/* --- Initial Hero Section (Names & Save the Date) --- */}
            <div className="h-[100dvh] w-full flex flex-col items-center justify-between relative shrink-0 pt-20 pb-10">
                <div className="flex-1"></div>

                {/* Names Section */}
                <FadeInUpOnLoad duration={1} yOffset={20} className="w-full relative flex flex-col justify-center items-center z-10 -translate-y-16 md:-translate-y-24">
                    <div className="relative w-full flex justify-center">
                        <h1 className="font-chloe text-[16vw] md:text-[80px] lg:text-[120px] leading-[0.8] mb-2 text-center text-white relative z-10 bg-hero-bg px-4 md:px-8">
                            SUPICHA
                        </h1>
                    </div>

                    <h1 className="font-chloe text-[16vw] md:text-[80px] lg:text-[120px] leading-[0.8] text-center text-white ml-0 md:ml-12 relative z-10">
                        TEERAWAT
                    </h1>
                </FadeInUpOnLoad>

                <div className="flex-1"></div>

                {/* Save The Date Section */}
                <FadeIn delay={1.5} duration={1} className="w-full absolute bottom-[22vh] md:bottom-[25vh] flex justify-center items-center z-10">
                    <div className="flex flex-col items-center bg-transparent px-6 relative z-10">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] lg:w-[77px] lg:h-[77px] mb-4 md:mb-6">
                            <defs>
                                <mask id="left-ring">
                                    <rect width="100" height="100" fill="white" />
                                    <circle cx="40.6" cy="59.4" r="24" fill="black" />
                                </mask>
                                <mask id="right-ring">
                                    <rect width="100" height="100" fill="white" />
                                    <circle cx="59.4" cy="40.6" r="24" fill="black" />
                                </mask>
                                <clipPath id="bottom-overlap">
                                    <rect x="55" y="55" width="25" height="25" />
                                </clipPath>
                            </defs>
                            <circle cx="40" cy="60" r="25" fill="white" mask="url(#left-ring)" />
                            <circle cx="60" cy="40" r="25" fill="white" mask="url(#right-ring)" />
                            <circle cx="40" cy="60" r="25" fill="white" mask="url(#left-ring)" clipPath="url(#bottom-overlap)" />
                        </svg>
                        <p className="font-source-serif font-[300] antialiased text-[4.26vw] md:text-[24px] lg:text-[32px] uppercase tracking-widest leading-none text-white">
                            SAVE THE DATE
                        </p>
                    </div>
                </FadeIn>

                {/* Scroll Indicator - Bottom most */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: navOpacity * 0.7 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 pb-4 md:pb-6"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="text-white/60 w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                {/* Navigation Pill - Sticky/Absolute at bottom of first section */}
                <FadeInUpOnLoad delay={1.8} duration={1} yOffset={20} className="z-30 w-full flex justify-center pb-20 md:pb-24 absolute bottom-0">
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
                                    className="flex flex-col items-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-white/90 md:hover:text-white md:hover:bg-white/30 active:bg-white/30 md:hover:scale-105"
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">{item.label}</span>
                                </a>
                            );
                        })}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                            className="flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-white/90 md:hover:text-white md:hover:bg-white/30 active:bg-white/30 md:hover:scale-105 cursor-pointer border-none bg-transparent"
                            aria-label="Toggle Language"
                        >
                            <Globe className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">
                                {language === 'en' ? 'TH' : 'EN'}
                            </span>
                        </button>
                    </div>
                </FadeInUpOnLoad>
            </div>

            {/* Ceremonies block moved to Ceremonies.jsx */}
        </section>
    );
};

export default Hero;
