import React from 'react';
import { FadeIn, FadeInUpOnLoad } from './animations/Motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
    const { language } = useLanguage();

    const t = {
        location: language === 'th' ? "รายาวดี, หาดไร่เลย์, กระบี่" : "Rayavadee, Railay Beach, Krabi",
        rsvpBy: language === 'th' ? "กรุณาตอบกลับภายในวันที่ 30 เมษายน 2568" : "Kindly RSVP by April 30, 2025.",
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
                    <a href="#rsvp" className="relative group px-8 py-3 md:px-12 md:py-4 bg-navy/80 backdrop-blur-md text-white text-base md:text-lg font-sans uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_32px_rgba(42,77,105,0.4)] hover:shadow-[0_16px_32px_rgba(42,77,105,0.6)] border border-white/20 hover:border-white/40 w-fit overflow-hidden">
                        {/* Liquid/Glass inner glare */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        {/* Top highlight reflection */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none"></div>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-blue/50 transition-opacity duration-300 rounded-full pointer-events-none blur-md"></div>
                        {/* Edge highlights */}
                        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                        <span className="relative z-10 drop-shadow-lg font-semibold">RSVP</span>
                    </a>
                    <h3 className="text-sm font-sans text-blue uppercase tracking-widest mt-4 mb-2">{t.rsvpBy}</h3>

                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        <a href="#location" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            {t.menuLocation}
                        </a>
                        <a href="#program" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            {t.menuProgram}
                        </a>
                        <a href="#where-to-stay" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            {t.menuStay}
                        </a>
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
