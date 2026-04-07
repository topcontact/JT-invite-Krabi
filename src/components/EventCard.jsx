import React from 'react';
import { FadeInUp } from './animations/Motion';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ title, date, time, location, hotel, mapLink, color, delay, bgImage }) => (
    <FadeInUp
        delay={delay}
        duration={0.8}
        className={`bg-white relative p-6 md:p-10 rounded-3xl shadow-xl w-full max-w-4xl text-center flex flex-col items-center overflow-hidden h-full`}
        style={bgImage ? {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.95)), url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } : {}}
    >
        <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 font-source-serif font-[500] antialiased flex-grow w-full">
            
            {/* Title */}
            <h3 className="text-navy text-[4.26vw] md:text-[24px] lg:text-[32px] uppercase tracking-widest leading-snug">
                {title}
            </h3>

            {/* Location */}
            <div className="flex flex-col items-center gap-1 text-navy leading-tight mt-2">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 md:w-8 md:h-8 text-blue" />
                    <span className="text-[4.26vw] md:text-[24px] lg:text-[32px]">{location}</span>
                </div>
                <span className="text-[4.26vw] md:text-[24px] lg:text-[32px] opacity-80">{hotel}</span>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col items-center gap-1 mt-2">
                <div className="flex items-center gap-2 text-navy">
                    <Calendar className="w-5 h-5 md:w-8 md:h-8 text-navy" />
                    <span className="text-[4.26vw] md:text-[24px] lg:text-[32px]">{date}</span>
                </div>
                {time && (
                    <div className="text-navy text-[4.26vw] md:text-[24px] lg:text-[32px]">
                        {time}
                    </div>
                )}
            </div>

            {mapLink && (
                <div className="w-full flex flex-col items-center mt-4 gap-4 flex-grow">
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-2 md:py-3 bg-white/90 border border-blue text-blue rounded-full hover:bg-blue hover:text-white transition-colors text-sm md:text-lg uppercase tracking-widest font-source-serif font-[300]"
                    >
                        View Map
                    </a>
                    <div className="w-full h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-inner mt-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full border-0"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    </FadeInUp>
);

export default EventCard;
