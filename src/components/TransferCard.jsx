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

const TransferCard = ({ icon: Icon, title, description, note, delay }) => {
    return (
        <FadeIn delay={delay} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="w-20 h-20 rounded-full bg-mist flex items-center justify-center mb-6 shadow-md border-4 border-white">
                <Icon className="w-8 h-8 text-blue" />
            </div>
            <h4 className="text-xl font-serif text-navy mb-3">{title}</h4>
            <p className="text-gray-500 font-sans text-sm h-16 flex items-start justify-center mb-5 whitespace-pre-line">
                {description}
            </p>
            <span className="mt-auto text-xs font-sans text-blue bg-blue/10 p-5 rounded-2xl whitespace-pre-line flex items-start">
                <Info className="w-4 h-4 text-blue pb-0.5" />
                {note}
            </span>
        </FadeIn>
    );
};

export default TransferCard;
