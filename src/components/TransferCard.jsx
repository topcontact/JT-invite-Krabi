import React from 'react';
import { motion } from 'framer-motion';

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

const TransferCard = ({ icon: Icon, title, description, note, delay }) => {
    return (
        <FadeIn delay={delay} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-6 shadow-md border-4 border-white">
                <Icon className="w-8 h-8 text-blue" />
            </div>
            <h4 className="text-xl font-serif text-navy mb-3">{title}</h4>
            <p className="text-gray-500 font-sans text-sm">
                {description}
            </p>
            <span className="mt-4 text-xs font-sans text-blue bg-blue/10 px-3 py-1 rounded-full whitespace-pre-line">
                {note}
            </span>
        </FadeIn>
    );
};

export default TransferCard;
