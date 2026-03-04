import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Car } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.8 }}
        className={className}
    >
        {children}
    </motion.div>
);

const HowToGet = () => {
    return (
        <section id="getting-there" className="max-w-6xl mx-auto px-4 md:px-8 py-20 bg-white">
            <FadeIn className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-script text-navy mb-4">How to Get There</h2>
                <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                <p className="mt-6 text-gray-500 font-sans max-w-2xl mx-auto">
                    Railay can only be reached by boat. Here is our recommended travel route from Bangkok to Krabi, and finally to Railay.
                </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-[64px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue/10 via-blue/30 to-blue/10 z-0"></div>

                <FadeIn delay={0.1} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-6 shadow-md border-4 border-white">
                        <Plane className="w-8 h-8 text-blue" />
                    </div>
                    <h4 className="text-xl font-serif text-navy mb-3">Flight to Krabi</h4>
                    <p className="text-gray-500 font-sans text-sm">
                        Fly directly to Krabi International Airport (KBV) from Bangkok.
                    </p>
                    <span className="mt-4 text-xs font-sans text-blue bg-blue/10 px-3 py-1 rounded-full"> Flights are available from both Don Mueang and Suvarnabhumi airports.
                        <br />Estimated round-trip fare: 4,000 – 7,000 THB </span>
                </FadeIn>

                <FadeIn delay={0.3} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-6 shadow-md border-4 border-white">
                        <Car className="w-8 h-8 text-blue" />
                    </div>
                    <h4 className="text-xl font-serif text-navy mb-3">Transfer to Pier</h4>
                    <p className="text-gray-500 font-sans text-sm">
                        Take a taxi or pre-arranged van from the airport to Ao Nam Mao Pier (Short bridge) or Ao Nang.
                    </p>
                    <span className="mt-4 text-xs font-sans text-blue bg-blue/10 px-3 py-1 rounded-full"> We provide van transfers from KBV Airport to the pier on December 3rd and 4th,<br /> departing before 12:00 PM. EST: 40 minutes</span>
                </FadeIn>
                <FadeIn delay={0.5} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-6 shadow-md border-4 border-white">
                        <Ship className="w-8 h-8 text-blue" />
                    </div>
                    <h4 className="text-xl font-serif text-navy mb-3">Boat to Railay</h4>
                    <p className="text-gray-500 font-sans text-sm">
                        Longtail boat ride (approx. 15-20 min) from the pier to Railay.
                    </p>
                    <span className="mt-4 text-xs font-sans text-blue bg-blue/10 px-3 py-1 rounded-full"> Guests traveling by our van transfer can directly board the provided boat to Railay. </span>
                </FadeIn>
            </div>
        </section>
    );
};

export default HowToGet;
