import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Car } from 'lucide-react';
import TransferCard from './TransferCard';

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
    const travelSteps = [
        {
            icon: Plane,
            title: "Flight to Krabi",
            description: "Fly directly to Krabi International Airport (KBV) from Bangkok.",
            note: "Flights are available from both Don Mueang and Suvarnabhumi airports.\nEstimated round-trip fare: 4,000 – 7,000 THB",
            delay: 0.1
        },
        {
            icon: Car,
            title: "Transfer to Pier",
            description: "Take a taxi or pre-arranged van from the airport to Ao Nam Mao Pier (Short bridge) or Ao Nang.",
            note: "We provide van transfers from KBV Airport to the pier on December 3rd and 4th,\ndeparting before 12:00 PM. EST: 40 minutes",
            delay: 0.3
        },
        {
            icon: Ship,
            title: "Boat to Railay",
            description: "Longtail boat ride (approx. 15-20 min) from the pier to Railay.",
            note: "Guests traveling by our van transfer can directly board the provided boat to Railay.",
            delay: 0.5
        }
    ];

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

                {travelSteps.map((step, index) => (
                    <TransferCard
                        key={index}
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                        note={step.note}
                        delay={step.delay}
                    />
                ))}
            </div>
        </section>
    );
};

export default HowToGet;
