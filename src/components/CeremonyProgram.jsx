import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';
import { Clock, CalendarHeart, Camera, Sparkles, Utensils } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TimelineItem = ({ time, title, description, icon: Icon, isLast, language }) => (
    <div className="flex relative pb-8 md:pb-12">
        {/* Vertical Line */}
        {!isLast && (
            <div className="absolute top-10 left-6 md:left-8 w-px h-full bg-blue/30 -ml-px"></div>
        )}

        {/* Icon */}
        <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-mist border-2 border-blue flex items-center justify-center text-blue shadow-lg bg-white">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>

        {/* Content */}
        <div className="ml-6 md:ml-8 pt-2 md:pt-3">
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                <span className={`text-xl md:text-2xl ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[500]'} text-navy antialiased`}>{time}</span>
                <h4 className={`text-lg ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[500]'} text-gray-800 antialiased`}>{title}</h4>
            </div>
            <p className={`text-gray-500 ${language === 'th' ? 'font-krub font-[300]' : 'font-source-serif font-[300]'} antialiased text-sm md:text-base leading-relaxed`}>{description}</p>
        </div>
    </div>
);

const CeremonyProgram = () => {
    const { language } = useLanguage();

    return (
        <section id="program" className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 bg-white">
            <FadeIn className="text-center mb-16">
                <h2 className="text-[10.5vw] md:text-[64px] lg:text-[80px] font-chloe text-navy mb-4 drop-shadow-lg leading-[0.96] uppercase">
                    Ceremony Program
                </h2>
                <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                <p className={`mt-4 text-gray-500 ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[500] uppercase tracking-widest'} antialiased text-sm`}>
                    {language === 'th' ? "วันศุกร์ที่ 4 ธันวาคม 2026" : "Friday, December 4, 2026"}
                </p>
            </FadeIn>

            <div className="max-w-xl mx-auto">
                <FadeIn delay={0.2}>
                    <TimelineItem
                        language={language}
                        time="16:00"
                        title={language === 'th' ? "ถ่ายภาพร่วมกัน" : "Photos"}
                        description={language === 'th' ? "ร่วมถ่ายภาพเป็นที่ระลึก" : "Pre-ceremony photo session."}
                        icon={Camera}
                    />
                </FadeIn>
                <FadeIn delay={0.3}>
                    <TimelineItem
                        language={language}
                        time="17:00"
                        title={language === 'th' ? "พิธีการ" : "Ceremony"}
                        description={language === 'th' ? "เริ่มต้นพิธีสมรส" : "The wedding ceremony begins."}
                        icon={Sparkles}
                    />
                </FadeIn>
                <FadeIn delay={0.4}>
                    <TimelineItem
                        language={language}
                        time="18:00"
                        title={language === 'th' ? "รับประทานอาหารเย็น ถึง 22:00 น." : "Dinner till 22:00"}
                        description={language === 'th' ? "ร่วมรับประทานอาหารและเฉลิมฉลอง ณ ห้องอาหารเดอะ กรอตโต" : "Dinner reception and celebration at The Grotto."}
                        icon={Utensils}
                        isLast={true}
                    />
                </FadeIn>
            </div>

            {/* Dress Code Section */}
            <FadeIn delay={0.5} className="mt-16 text-center max-w-2xl mx-auto border-t border-blue/10 pt-12">
                <h3 className={`text-xl md:text-2xl ${language === 'th' ? 'font-krub font-[400]' : 'font-source-serif font-[500]'} text-navy antialiased mb-4 uppercase tracking-[0.2em]`}>
                    {language === 'th' ? "การแต่งกาย" : "Dress Code"}
                </h3>
                <div className={`text-gray-500 ${language === 'th' ? 'font-krub font-[300]' : 'font-source-serif font-[300]'} antialiased text-sm md:text-base leading-relaxed space-y-2`}>
                    <p className="text-navy font-[500] tracking-wide">Coastal Glam Palette</p>
                    <p className="max-w-md mx-auto">
                        {language === 'th' 
                            ? "ยินดีต้อนรับทุกเฉดสีและทุกลาย — ในบรรยากาศสบายๆ ริมชายหาดที่แฝงด้วยความหรูหรา" 
                            : "All shades & patterns are welcome — think beach, breeze and a touch of glam."}
                    </p>
                </div>
            </FadeIn>
        </section>
    );
};

export default CeremonyProgram;
