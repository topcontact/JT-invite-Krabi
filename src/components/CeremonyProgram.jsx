import React from 'react';
import { FadeInUp as FadeIn } from './animations/Motion';
import { Clock, CalendarHeart, Camera, Sparkles, Utensils } from 'lucide-react';

const TimelineItem = ({ time, title, description, icon: Icon, isLast }) => (
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
                <span className="text-xl md:text-2xl font-source-serif font-[500] text-navy antialiased">{time}</span>
                <h4 className="text-lg font-source-serif font-[500] text-gray-800 antialiased">{title}</h4>
            </div>
            <p className="text-gray-500 font-source-serif font-[300] antialiased text-sm md:text-base leading-relaxed">{description}</p>
        </div>
    </div>
);

const CeremonyProgram = () => {
    return (
        <section id="program" className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 bg-white">
            <FadeIn className="text-center mb-16">
                <h2 className="text-[10.5vw] md:text-[64px] lg:text-[80px] font-chloe text-navy mb-4 drop-shadow-lg leading-tight uppercase">Ceremony Program</h2>
                <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-source-serif font-[500] antialiased uppercase tracking-widest text-sm">
                    Friday, December 4, 2026
                </p>
            </FadeIn>

            <div className="max-w-xl mx-auto">
                <FadeIn delay={0.2}>
                    <TimelineItem
                        time="16:00"
                        title="Photos"
                        description="Pre-ceremony photo session."
                        icon={Camera}
                    />
                </FadeIn>
                <FadeIn delay={0.3}>
                    <TimelineItem
                        time="17:00"
                        title="Ceremony"
                        description="The wedding ceremony begins."
                        icon={Sparkles}
                    />
                </FadeIn>
                <FadeIn delay={0.4}>
                    <TimelineItem
                        time="18:00"
                        title="Dinner till 22:00"
                        description="Dinner reception and celebration at The Grotto."
                        icon={Utensils}
                        isLast={true}
                    />
                </FadeIn>
            </div>
        </section>
    );
};

export default CeremonyProgram;
