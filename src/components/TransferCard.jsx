import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';

import { useLanguage } from '../contexts/LanguageContext';

const TransferCard = ({ icon: Icon, title, description, note, delay, bgImage }) => {
    const { language } = useLanguage();

    return (
        <FadeIn delay={delay} className="relative z-10 flex flex-col items-center text-center p-6 md:p-10 rounded-3xl shadow-xl border border-gray-200 h-full overflow-hidden">
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
                <h4 className={`text-2xl ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[500]'} antialiased text-white mb-4 tracking-wide`}>{title}</h4>
                <p className={`text-gray-100 ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[300] antialiased text-base md:text-lg flex items-start justify-center mb-6 whitespace-pre-line leading-relaxed flex-grow`}>
                    {description}
                </p>
                <div className={`mt-auto text-sm md:text-base ${language === 'th' ? 'font-krub' : 'font-source-serif'} font-[300] antialiased text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-5 rounded-3xl whitespace-pre-line flex text-left w-full items-center justify-center leading-relaxed h-[140px] md:h-[180px]`}>
                    <span className="w-full text-center">{note}</span>
                </div>
            </div>
        </FadeIn>
    );
};

export default TransferCard;
