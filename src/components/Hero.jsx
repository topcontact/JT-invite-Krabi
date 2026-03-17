import React, { useState, useEffect } from 'react';
import { FadeIn, FadeInUpOnLoad } from './animations/Motion';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Calendar, Bed, Send, Globe } from 'lucide-react';

const Hero = () => {
    const { language, setLanguage } = useLanguage();
    const [navOpacity, setNavOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const newOpacity = Math.max(0, 1 - currentScrollY / 250);
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
        <section className="h-screen w-full flex flex-col items-center justify-center bg-mist text-navy relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-sky/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <FadeInUpOnLoad duration={1} yOffset={20} className="text-center z-10 px-4">
                <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-widest font-instrument leading-none text-navy">
                    SUPICHA
                </h1>

                <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-widest font-instrument leading-none mt-2 text-navy">
                    TEERAWAT
                </h1>

                <div className="text-4xl md:text-6xl text-blue font-ballet text-right pr-2 mt-4 md:-mt-4">
                    Wedding
                </div>

                <FadeIn delay={1.5} duration={1} className="mt-12 text-sm md:text-lg font-sans text-navy/70 tracking-widest uppercase flex flex-col gap-2">
                    <p>December 4, 2026</p>
                    <p>Rayavadee, Railay Beach, Krabi</p>
                </FadeIn>

                {/* Action Buttons */}
                <FadeInUpOnLoad delay={1.8} duration={1} yOffset={20} className="mt-12 flex flex-col items-center gap-4 z-10">
                    <a href="#rsvp" className="px-8 py-3 md:px-12 md:py-4 bg-navy text-white text-base md:text-lg font-sans uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-navy/90 hover:scale-[1.02] shadow-md hover:shadow-lg w-fit">
                        <span className="font-semibold">RSVP</span>
                    </a>
                    <h3 className="text-sm font-sans text-blue uppercase tracking-widest mt-4 mb-2">{t.rsvpBy}</h3>

                    <div
                        style={{ opacity: navOpacity, pointerEvents: navOpacity > 0.1 ? 'auto' : 'none', transition: 'opacity 0.1s ease-out' }}
                        className="flex items-center justify-around bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] rounded-full px-2 py-3 md:px-4 md:py-4 mt-2 w-[95%] max-w-sm md:max-w-[480px]"
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="flex flex-col items-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-navy/80 hover:text-blue hover:bg-white/30 hover:scale-105"
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">{item.label}</span>
                                </a>
                            );
                        })}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                            className="flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 md:w-20 rounded-xl py-1 text-navy/80 hover:text-blue hover:bg-white/30 hover:scale-105 cursor-pointer border-none bg-transparent"
                            aria-label="Toggle Language"
                        >
                            <Globe className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-[9px] md:text-[10px] font-sans tracking-widest uppercase">
                                {language === 'en' ? 'TH' : 'EN'}
                            </span>
                        </button>
                    </div>
                </FadeInUpOnLoad>
            </FadeInUpOnLoad>

            {/* Scroll Indicator */}
            <FadeIn delay={2} duration={1} className="absolute bottom-10 animate-bounce text-navy/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5" />
                    <path d="M7 6l5 5 5-5" />
                </svg>
            </FadeIn>
        </section>
    );
};

export default Hero;
