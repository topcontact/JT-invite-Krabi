import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

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

const TransferCard = ({ icon: Icon, title, description, note, delay, bgImage }) => {
    return (
        <FadeIn delay={delay} className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl shadow-sm border border-gray-200 h-full overflow-hidden">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-navy/70 z-0"></div>

            {/* Content (needs higher z-index to sit above overlay) */}
            <div className="relative z-10 w-full flex flex-col items-center flex-grow">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-lg border-2 border-white/20">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-serif text-white mb-3">{title}</h4>
                <p className="text-gray-200 font-sans text-sm h-16 flex items-start justify-center mb-5 whitespace-pre-line">
                    {description}
                </p>
                <span className="mt-auto text-xs font-sans text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-5 rounded-2xl whitespace-pre-line flex text-left">
                    <Info className="w-4 h-4 text-white" />
                    <span className="ml-2">{note}</span>
                </span>
            </div>
        </FadeIn>
    );
};

export default TransferCard;
