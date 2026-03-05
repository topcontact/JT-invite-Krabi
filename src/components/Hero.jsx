import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-mist text-navy relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-sky/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center z-10 px-4"
            >
                <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-widest font-serif leading-none text-navy">
                    SUPICHA
                </h1>

                <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-widest font-serif leading-none mt-2 text-navy">
                    TEERAWAT
                </h1>

                <div className="text-4xl md:text-6xl text-blue font-ballet text-right pr-2 mt-4 md:-mt-4">
                    Wedding
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12 text-sm md:text-lg font-sans text-navy/70 tracking-widest uppercase flex flex-col gap-2"
                >
                    <p>December 4, 2026</p>
                    <p>Rayavadee, Railay Beach, Krabi</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-4 z-10"
                >
                    <a href="#rsvp" className="px-6 py-3 md:px-10 md:py-4 bg-navy text-white text-base md:text-lg font-sans uppercase tracking-widest rounded-full hover:bg-blue transition-colors shadow-lg shadow-navy/20 w-fit border border-navy/20 hover:border-blue/20">
                        RSVP
                    </a>
                    <h3 className="text-sm font-sans text-blue uppercase tracking-widest mt-4 mb-2">Kindly RSVP by April 30, 2025.</h3>

                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        <a href="#location" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            Location
                        </a>
                        <a href="#timeline" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            Ceremony Program
                        </a>
                        <a href="#events" className="px-5 py-2 underline text-navy font-sans text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-navy/10 transition-colors">
                            Events
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 animate-bounce text-navy/50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5" />
                    <path d="M7 6l5 5 5-5" />
                </svg>
            </motion.div>
        </section>
    );
};

export default Hero;
