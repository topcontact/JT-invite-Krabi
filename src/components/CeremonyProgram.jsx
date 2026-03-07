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
                <span className="text-xl md:text-2xl font-serif text-navy">{time}</span>
                <h4 className="text-lg font-sans text-gray-800 font-medium">{title}</h4>
            </div>
            <p className="text-gray-500 font-sans text-sm md:text-base">{description}</p>
        </div>
    </div>
);

const CeremonyProgram = () => {
    return (
        <section id="program" className="max-w-6xl mx-auto px-10 md:px-8 py-20 bg-white">
            <FadeIn className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-ballet text-navy mb-4">Ceremony Program</h2>
                <div className="w-16 h-px bg-blue/30 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-sans font-medium uppercase tracking-widest text-sm">
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
                        title="Prepare for Ceremony"
                        description="Guests are seated for the ceremony."
                        icon={Sparkles}
                    />
                </FadeIn>
                <FadeIn delay={0.4}>
                    <TimelineItem
                        time="17:30"
                        title="Ceremony"
                        description="The wedding ceremony begins."
                        icon={CalendarHeart}
                    />
                </FadeIn>
                <FadeIn delay={0.5}>
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
